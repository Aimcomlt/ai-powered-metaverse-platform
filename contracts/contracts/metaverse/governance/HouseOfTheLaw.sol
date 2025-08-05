// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {FunctionalToken} from "../tokens/FunctionalToken.sol";

interface IFunctionalToken {
    function mint(address to, uint256 id, uint256 amount, bytes calldata data) external;
}

interface IGovernanceToken {
    function balanceOf(address user, uint256 tokenId) external view returns (uint256);
}

interface IAIAssistantGate {
    function isConsoleOpen(address user) external view returns (bool);
}

contract HouseOfTheLaw is Initializable, AccessControlUpgradeable, UUPSUpgradeable {
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    struct Proposal {
        address proposer;
        string description;
        string ipfsHash;
        address target;
        bytes data;
        uint256 voteTally;
        bool executed;
        uint256 eligibleGTId;
    }

    IFunctionalToken public functionalToken;
    IGovernanceToken public governanceToken;
    IAIAssistantGate public aiGate;
    address public proofOfObservation;

    mapping(address => uint256) public governanceBalance;
    uint256 public totalGT;

    uint256 public alpha;         // FT mint scaling vs GT reward (bps)
    uint256 public reserveRatio;  // % GT held back to support FT economy

    uint256 public proposalCount;
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => uint256)) public votesCast;

    event TaskRewarded(address indexed user, uint256 indexed taskId, uint256 ftId, uint256 ftAmount, uint256 gtReward);
    event ProposalCreated(uint256 indexed proposalId, address indexed proposer, string ipfsHash);
    event ProposalExecuted(uint256 indexed proposalId, address indexed executor, address indexed target, uint256 gtId);
    event Voted(uint256 indexed proposalId, address indexed voter, uint256 votes, uint256 cost, uint256 indexed gtId);
    event AlphaUpdated(uint256 oldAlpha, uint256 newAlpha, address indexed caller);
    event ReserveRatioUpdated(uint256 oldRatio, uint256 newRatio, address indexed caller);

    constructor() {
        _disableInitializers();
    }

    function initialize(
        address functionalToken_,
        address governanceToken_,
        address aiGate_,
        uint256 alphaBps_,
        uint256 reserveRatioBps_
    ) public initializer {
        __AccessControl_init();
        __UUPSUpgradeable_init();

        require(reserveRatioBps_ <= 10_000, "reserve too high");

        functionalToken = IFunctionalToken(functionalToken_);
        governanceToken = IGovernanceToken(governanceToken_);
        aiGate = IAIAssistantGate(aiGate_);
        alpha = alphaBps_;
        reserveRatio = reserveRatioBps_;

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(UPGRADER_ROLE, msg.sender);
    }

    function setProofOfObservation(address poO) external onlyRole(DEFAULT_ADMIN_ROLE) {
        proofOfObservation = poO;
    }

    function setAlpha(uint256 newAlpha) external onlyGovernanceOrAI {
        uint256 old = alpha;
        alpha = newAlpha;
        emit AlphaUpdated(old, newAlpha, msg.sender);
    }

    function setReserveRatio(uint256 newRatio) external onlyGovernanceOrAI {
        require(newRatio <= 10_000, "reserve too high");
        uint256 old = reserveRatio;
        reserveRatio = newRatio;
        emit ReserveRatioUpdated(old, newRatio, msg.sender);
    }

    modifier onlyPoO() {
        require(msg.sender == proofOfObservation, "Caller is not PoO");
        _;
    }

    modifier onlyAIAuthorized(address user) {
        require(aiGate.isConsoleOpen(user), "AI console not active");
        _;
    }

    modifier onlyGovernanceOrAI() {
        if (!hasRole(DEFAULT_ADMIN_ROLE, msg.sender)) {
            require(aiGate.isConsoleOpen(msg.sender), "AI console not active");
        }
        _;
    }

    /// @notice Called by ProofOfObservation after a task is validated.
    ///         Mints the user's FT reward and credits their GT balance.
    function validateTask(
        address user,
        uint256 taskId,
        uint256 ftId,
        uint256 gtReward
    ) external onlyPoO {
        require(ftId >= FunctionalToken.FT_START_ID(), "invalid FT id");
        require(gtReward > 0, "reward=0");
        governanceBalance[user] += gtReward;
        totalGT += gtReward;

        uint256 ftAmount = (gtReward * alpha * (10_000 - reserveRatio)) / 10_000 / 10_000;
        functionalToken.mint(user, ftId, ftAmount, "");

        emit TaskRewarded(user, taskId, ftId, ftAmount, gtReward);
    }

    function createProposal(
        string calldata description,
        string calldata ipfsHash,
        uint256 eligibleGTId,
        address target,
        bytes calldata data
    ) external onlyAIAuthorized(msg.sender) returns (uint256 proposalId) {
        require(governanceToken.balanceOf(msg.sender, eligibleGTId) > 0, "Must hold GT");

        proposalId = ++proposalCount;
        proposals[proposalId] = Proposal({
            proposer: msg.sender,
            description: description,
            ipfsHash: ipfsHash,
            target: target,
            data: data,
            voteTally: 0,
            executed: false,
            eligibleGTId: eligibleGTId
        });

        emit ProposalCreated(proposalId, msg.sender, ipfsHash);
    }

    function vote(uint256 proposalId, uint256 votes) external {
        Proposal storage p = proposals[proposalId];
        require(!p.executed, "Already executed");
        require(governanceToken.balanceOf(msg.sender, p.eligibleGTId) > 0, "Not eligible GT holder");

        uint256 prevVotes = votesCast[proposalId][msg.sender];
        uint256 newVotes = prevVotes + votes;
        uint256 cost = newVotes * newVotes - prevVotes * prevVotes;
        require(governanceBalance[msg.sender] >= cost, "Not enough GT");

        governanceBalance[msg.sender] -= cost;
        votesCast[proposalId][msg.sender] = newVotes;
        p.voteTally += votes;

        emit Voted(proposalId, msg.sender, votes, cost, p.eligibleGTId);
    }

    function executeProposal(uint256 proposalId) external {
        Proposal storage p = proposals[proposalId];
        require(!p.executed, "Already executed");
        require(p.voteTally > 0, "Not passed");
        require(p.target != address(0), "No target set");

        (bool ok, ) = p.target.call(p.data);
        require(ok, "Execution failed");

        p.executed = true;

        emit ProposalExecuted(proposalId, msg.sender, p.target, p.eligibleGTId);
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}

    /// @dev Reserve storage space to allow layout changes in the future.
    /// New variables must be appended at the end and the gap size adjusted if used.
    uint256[50] private __gap;
}
