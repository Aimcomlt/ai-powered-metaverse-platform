// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

/// @notice Placeholder for cross-faction governance hub.
contract CrossFactionHub is Initializable, UUPSUpgradeable, AccessControlUpgradeable {
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    /// @notice Information about a governance proposal.
    struct Proposal {
        address proposer; // creator of the proposal
        address target; // contract to call when executing
        bytes data; // calldata for execution
        uint256 forVotes; // votes in favor
        uint256 againstVotes; // votes against
        bool executed; // whether the proposal has been executed
    }

    /// @dev incremental identifier for proposals
    uint256 public proposalCount;

    /// @dev mapping of proposal id to proposal data
    mapping(uint256 => Proposal) private _proposals;

    /// @dev tracks whether an address has voted on a given proposal
    mapping(uint256 => mapping(address => bool)) private _hasVoted;

    event ProposalCreated(uint256 indexed id, address indexed proposer, address indexed target, bytes data);
    event VoteCast(uint256 indexed id, address indexed voter, bool support, uint256 weight);
    event ProposalExecuted(uint256 indexed id, address indexed executor);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() public initializer {
        __AccessControl_init();
        __UUPSUpgradeable_init();
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(UPGRADER_ROLE, msg.sender);
    }

    /// @notice Create a new governance proposal.
    /// @param target address of the contract to call upon execution
    /// @param data calldata to execute on the target
    /// @return proposalId identifier of the newly created proposal
    function createProposal(address target, bytes calldata data)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
        returns (uint256 proposalId)
    {
        require(target != address(0), "invalid target");
        proposalId = proposalCount++;
        Proposal storage p = _proposals[proposalId];
        p.proposer = msg.sender;
        p.target = target;
        p.data = data;

        emit ProposalCreated(proposalId, msg.sender, target, data);
    }

    /// @notice Cast a vote on a proposal. Each address has weight 1.
    function vote(uint256 proposalId, bool support) external onlyRole(DEFAULT_ADMIN_ROLE) {
        Proposal storage p = _proposals[proposalId];
        require(!p.executed, "executed");
        require(!_hasVoted[proposalId][msg.sender], "already voted");

        _hasVoted[proposalId][msg.sender] = true;
        uint256 weight = 1;
        if (support) {
            p.forVotes += weight;
        } else {
            p.againstVotes += weight;
        }

        emit VoteCast(proposalId, msg.sender, support, weight);
    }

    /// @notice Execute a proposal if it has more "for" than "against" votes.
    function executeProposal(uint256 proposalId) external onlyRole(DEFAULT_ADMIN_ROLE) {
        Proposal storage p = _proposals[proposalId];
        require(!p.executed, "executed");
        require(p.forVotes > p.againstVotes, "not passed");

        p.executed = true;
        (bool ok, ) = p.target.call(p.data);
        require(ok, "call failed");

        emit ProposalExecuted(proposalId, msg.sender);
    }

    /// @notice Get details for a proposal.
    function getProposal(uint256 proposalId) external view returns (Proposal memory) {
        return _proposals[proposalId];
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}
}

