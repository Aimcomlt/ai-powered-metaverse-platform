// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

interface IFunctionalToken {
    function mint(address to, uint256 id, uint256 amount, bytes calldata data) external;
}

/**
 * @title HouseOfTheLaw
 * @notice Handles reward issuance and proposal voting, triggered only by ProofOfObservation.
 */
contract HouseOfTheLaw is Initializable, AccessControlUpgradeable, UUPSUpgradeable {
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    struct Proposal {
        address proposer;
        string description;
        uint256 voteTally;
        bool executed;
    }

    IFunctionalToken public functionalToken;
    address public proofOfObservation;

    // Governance token balances (non-transferable)
    mapping(address => uint256) public governanceBalance;
    uint256 public totalGT;

    // Parameters for FT minting (basis points):
    // - `alpha` scales functional token (FT) rewards relative to the GT reward.
    //   e.g. alpha = 5_000 means 0.5 FT per GT distributed.
    // - `reserveRatio` retains a portion of GT to back the FT economy.
    uint256 public alpha;
    uint256 public reserveRatio;

    // Proposals
    uint256 public proposalCount;
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => uint256)) public votesCast;

    event TaskValidated(address indexed user, uint256 indexed taskId, uint256 ftId, uint256 ftAmount, uint256 gtReward);
    event ProposalCreated(uint256 indexed proposalId, address indexed proposer, string description);
    event Voted(uint256 indexed proposalId, address indexed voter, uint256 votes, uint256 cost);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address functionalToken_, uint256 alphaBps_, uint256 reserveRatioBps_) public initializer {
        __AccessControl_init();
        __UUPSUpgradeable_init();

        require(reserveRatioBps_ <= 10_000, "reserve too high");

        functionalToken = IFunctionalToken(functionalToken_);
        alpha = alphaBps_;
        reserveRatio = reserveRatioBps_;

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(UPGRADER_ROLE, msg.sender);
    }

    /// @notice Admin sets trusted ProofOfObservation contract
    function setProofOfObservation(address poO) external onlyRole(DEFAULT_ADMIN_ROLE) {
        proofOfObservation = poO;
    }

    /// @notice Only callable by trusted PoO contract
    modifier onlyPoO() {
        require(msg.sender == proofOfObservation, "Caller is not PoO contract");
        _;
    }

    /**
     * @notice Called only by ProofOfObservation after task validation.
     *         Issues governance tokens (GT) to the user and mints
     *         functional tokens (FT) according to the reward economics.
     *         The FT amount is a fraction of the GT reward and is
     *         reduced by `reserveRatio` to keep GT backing.
     */
    function validateTask(
        address user,
        uint256 taskId,
        uint256 ftId,
        uint256 gtReward
    ) external onlyPoO {
        // Update governance balance
        governanceBalance[user] += gtReward;
        totalGT += gtReward;

        // Compute FT mint amount. FT rewards are proportional to the GT
        // reward for this task and are scaled by `alpha`. A portion
        // defined by `reserveRatio` remains in GT to support the FT economy.
        uint256 ftAmount = (gtReward * alpha * (10_000 - reserveRatio)) / 10_000 / 10_000;
        functionalToken.mint(user, ftId, ftAmount, bytes(""));

        emit TaskValidated(user, taskId, ftId, ftAmount, gtReward);
    }

    function createProposal(string calldata description) external returns (uint256 proposalId) {
        proposalId = ++proposalCount;
        proposals[proposalId] = Proposal({
            proposer: msg.sender,
            description: description,
            voteTally: 0,
            executed: false
        });
        emit ProposalCreated(proposalId, msg.sender, description);
    }

    function vote(uint256 proposalId, uint256 votes) external {
        Proposal storage p = proposals[proposalId];
        require(bytes(p.description).length != 0, "invalid proposal");

        uint256 newVotes = votesCast[proposalId][msg.sender] + votes;
        uint256 cost = newVotes * newVotes - votesCast[proposalId][msg.sender] * votesCast[proposalId][msg.sender];
        require(governanceBalance[msg.sender] >= cost, "insufficient GT");

        governanceBalance[msg.sender] -= cost;
        votesCast[proposalId][msg.sender] = newVotes;
        p.voteTally += votes;

        emit Voted(proposalId, msg.sender, votes, cost);
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}
}

