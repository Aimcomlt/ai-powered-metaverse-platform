// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

interface IFunctionalToken {
    function mint(address to, uint256 id, uint256 amount, bytes calldata data) external;
}

interface IGovernanceToken {
    function balanceOf(address user, uint256 tokenId) external view returns (uint256);
}

contract HouseOfTheLaw is Initializable, AccessControlUpgradeable, UUPSUpgradeable {
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    struct Proposal {
        address proposer;
        string description;
        string ipfsHash;        // Off-chain metadata pointer
        address target;         // Contract to call on execution
        bytes data;             // Calldata to execute
        uint256 voteTally;
        bool executed;
        uint256 eligibleGTId;   // Only voters with this GT ID are eligible
    }

    IFunctionalToken public functionalToken;
    IGovernanceToken public governanceToken;
    address public proofOfObservation;

    mapping(address => uint256) public governanceBalance;
    uint256 public totalGT;

    /// @notice Alpha controls FT mint scaling. 10_000 = 1.0x FT per GT.
    uint256 public alpha;

    /// @notice Reserve ratio (in basis points) reduces FT mint output to support GT economy.
    /// For example, 2_000 = 20% GT backing retained.
    uint256 public reserveRatio;

    uint256 public proposalCount;
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => uint256)) public votesCast;

    event TaskRewarded(address indexed user, uint256 indexed taskId, uint256 ftId, uint256 ftAmount, uint256 gtReward);
    event ProposalCreated(uint256 indexed proposalId, address indexed proposer, string ipfsHash);
    event ProposalExecuted(uint256 indexed proposalId, address indexed executor, address indexed target, uint256 gtId);
    event Voted(uint256 indexed proposalId, address indexed voter, uint256 votes, uint256 cost, uint256 indexed gtId);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        address functionalToken_,
        address governanceToken_,
        uint256 alphaBps_,
        uint256 reserveRatioBps_
    ) public initializer {
        __AccessControl_init();
        __UUPSUpgradeable_init();

        require(reserveRatioBps_ <= 10_000, "reserve too high");

        functionalToken = IFunctionalToken(functionalToken_);
        governanceToken = IGovernanceToken(governanceToken_);
        alpha = alphaBps_;
        reserveRatio = reserveRatioBps_;

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(UPGRADER_ROLE, msg.sender);
    }

    function setProofOfObservation(address poO) external onlyRole(DEFAULT_ADMIN_ROLE) {
        proofOfObservation = poO;
    }

    modifier onlyPoO() {
        require(msg.sender == proofOfObservation, "Caller is not PoO contract");
        _;
    }

    /// @notice Called by PoO to issue GTs and mint FTs after task completion
    function rewardFromPoO(
        address user,
        uint256 taskId,
        uint256 ftId,
        uint256 gtReward
    ) external onlyPoO {
        governanceBalance[user] += gtReward;
        totalGT += gtReward;

        uint256 ftAmount = (gtReward * alpha * (10_000 - reserveRatio)) / 10_000 / 10_000;
        functionalToken.mint(user, ftId, ftAmount, "");

        emit TaskRewarded(user, taskId, ftId, ftAmount, gtReward);
    }

    /// @notice Create a proposal with metadata and optional executable payload
    function createProposal(
        string calldata description,
        string calldata ipfsHash,
        uint256 eligibleGTId,
        address target,
        bytes calldata data
    ) external returns (uint256 proposalId) {
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

    /// @notice Quadratic voting gated by eligible GT ID
    function vote(uint256 proposalId, uint256 votes) external {
        Proposal storage p = proposals[proposalId];
        require(bytes(p.description).length != 0, "invalid proposal");
        require(!p.executed, "already executed");

        require(governanceToken.balanceOf(msg.sender, p.eligibleGTId) > 0, "Not eligible GT holder");

        uint256 prevVotes = votesCast[proposalId][msg.sender];
        uint256 newVotes = prevVotes + votes;
        uint256 cost = newVotes * newVotes - prevVotes * prevVotes;

        require(governanceBalance[msg.sender] >= cost, "insufficient GT");

        governanceBalance[msg.sender] -= cost;
        votesCast[proposalId][msg.sender] = newVotes;
        p.voteTally += votes;

        emit Voted(proposalId, msg.sender, votes, cost, p.eligibleGTId);
    }

    /// @notice Execute proposal if valid and has payload
    function executeProposal(uint256 proposalId) external {
        Proposal storage p = proposals[proposalId];
        require(!p.executed, "Already executed");
        require(p.voteTally > 0, "Not passed");
        require(p.target != address(0), "No target set");

        (bool success, ) = p.target.call(p.data);
        require(success, "Call failed");

        p.executed = true;

        emit ProposalExecuted(proposalId, msg.sender, p.target, p.eligibleGTId);
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}
}
