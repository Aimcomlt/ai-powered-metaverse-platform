// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

interface IGovernanceToken {
    function balanceOf(address account, uint256 tokenId) external view returns (uint256);
}

interface IProofOfObservation {
    function isValidated(address proposer) external view returns (bool);
}

/// @notice Cross-faction governance coordinator and proposal executor.
contract CrossFactionHub is Initializable, UUPSUpgradeable, AccessControlUpgradeable {
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");
    bytes32 public constant DEFAULT_VOTER_ROLE = keccak256("DEFAULT_VOTER_ROLE");

    struct Proposal {
        address proposer;
        address target;
        bytes data;
        string title;
        string faction;
        uint256 forVotes;
        uint256 againstVotes;
        bool executed;
    }

    uint256 public proposalCount;

    mapping(uint256 => Proposal) private _proposals;
    mapping(uint256 => mapping(address => bool)) private _hasVoted;

    mapping(string => address) public registeredFactions;

    IGovernanceToken public governanceToken;
    IProofOfObservation public proofOfObservation;
    uint256 public votingTokenId;

    event FactionRegistered(string indexed faction, address indexed by);
    event ProposalCreated(uint256 indexed id, address indexed proposer, string title);
    event VoteCast(uint256 indexed id, address indexed voter, bool support, uint256 weight);
    event ProposalExecuted(uint256 indexed id, address indexed executor);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address governanceToken_, address poO_, uint256 tokenIdForVoting) public initializer {
        __AccessControl_init();
        __UUPSUpgradeable_init();

        governanceToken = IGovernanceToken(governanceToken_);
        proofOfObservation = IProofOfObservation(poO_);
        votingTokenId = tokenIdForVoting;

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(UPGRADER_ROLE, msg.sender);
        _grantRole(DEFAULT_VOTER_ROLE, msg.sender); // initial voter setup
    }

    /// -------------------------
    /// ✅ Faction Registration
    /// -------------------------
    function registerFaction(string calldata factionName) external {
        require(registeredFactions[factionName] == address(0), "Already registered");
        registeredFactions[factionName] = msg.sender;
        emit FactionRegistered(factionName, msg.sender);
    }

    /// -------------------------
    /// 🧠 Proposal Creation
    /// -------------------------
    function createProposal(
        string calldata factionName,
        string calldata title,
        address target,
        bytes calldata data
    ) external returns (uint256 proposalId) {
        require(registeredFactions[factionName] == msg.sender, "Not authorized faction");
        require(proofOfObservation.isValidated(msg.sender), "Proposer not validated");

        proposalId = proposalCount++;
        Proposal storage p = _proposals[proposalId];
        p.proposer = msg.sender;
        p.title = title;
        p.faction = factionName;
        p.target = target;
        p.data = data;

        emit ProposalCreated(proposalId, msg.sender, title);
    }

    /// -------------------------
    /// 📥 Voting
    /// -------------------------
    function vote(uint256 proposalId, bool support) external onlyRole(DEFAULT_VOTER_ROLE) {
        Proposal storage p = _proposals[proposalId];
        require(!p.executed, "Already executed");
        require(!_hasVoted[proposalId][msg.sender], "Already voted");

        uint256 weight = governanceToken.balanceOf(msg.sender, votingTokenId);
        require(weight > 0, "No voting power");

        _hasVoted[proposalId][msg.sender] = true;

        if (support) {
            p.forVotes += weight;
        } else {
            p.againstVotes += weight;
        }

        emit VoteCast(proposalId, msg.sender, support, weight);
    }

    /// -------------------------
    /// 🔓 Execution
    /// -------------------------
    function executeProposal(uint256 proposalId) external {
        Proposal storage p = _proposals[proposalId];
        require(!p.executed, "Already executed");
        require(p.forVotes > p.againstVotes, "Not passed");

        p.executed = true;
        (bool success, ) = p.target.call(p.data);
        require(success, "Call failed");

        emit ProposalExecuted(proposalId, msg.sender);
    }

    /// -------------------------
    /// 🧾 View
    /// -------------------------
    function getProposal(uint256 proposalId) external view returns (Proposal memory) {
        return _proposals[proposalId];
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}
}
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

