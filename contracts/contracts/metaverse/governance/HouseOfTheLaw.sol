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
 * @notice Manages task validation, quadratic proposal voting and reward issuance.
 */
contract HouseOfTheLaw is Initializable, AccessControlUpgradeable, UUPSUpgradeable {
    bytes32 public constant VALIDATOR_ROLE = keccak256("VALIDATOR_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    struct Proposal {
        address proposer;
        string description;
        uint256 voteTally;
        bool executed;
    }

    IFunctionalToken public functionalToken;

    // Governance token balances (non-transferable)
    mapping(address => uint256) public governanceBalance;
    uint256 public totalGT;

    // Parameters for FT minting based on GT supply (in basis points)
    uint256 public alpha; // e.g., 10000 = 100%
    uint256 public reserveRatio; // e.g., 2000 = 20%

    // Proposals
    uint256 public proposalCount;
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => uint256)) public votesCast; // number of votes already cast per user

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
        _grantRole(VALIDATOR_ROLE, msg.sender);
        _grantRole(UPGRADER_ROLE, msg.sender);
    }

    /**
     * @notice Validates a task for `user`, rewards GT and mints FTs based on current supply.
     */
    function validateTask(address user, uint256 taskId, uint256 ftId, uint256 gtReward) external onlyRole(VALIDATOR_ROLE) {
        // update governance balance
        governanceBalance[user] += gtReward;
        totalGT += gtReward;

        // compute FT mint amount
        uint256 ftAmount = (totalGT * alpha * (10_000 - reserveRatio)) / 10_000 / 10_000;
        functionalToken.mint(user, ftId, ftAmount, "");

        emit TaskValidated(user, taskId, ftId, ftAmount, gtReward);
    }

    /**
     * @notice Create a new proposal.
     */
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

    /**
     * @notice Quadratic voting on a proposal. Costs GT squared.
     */
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

