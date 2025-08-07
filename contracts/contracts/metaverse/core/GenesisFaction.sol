// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

interface IFactionFactory {
    function createFaction(string calldata name) external returns (address);
}

interface ITokenFactory {
    function createToken(string calldata name, string calldata symbol) external returns (address);
}

interface IFactionCharterRegistry {
    function registerCharter(address faction, string calldata uri) external;
}

interface IMpNSRegistry {
    function register(string calldata name, address owner, uint256 duration, string calldata uri) external;
}

interface IAgentOps {
    function registerAgent(address agent, string calldata handle) external;
}

/// @title GenesisFaction
/// @notice Core faction contract that bootstraps sub-factions and agent handles.
contract GenesisFaction is Initializable, AccessControlUpgradeable, UUPSUpgradeable {
    bytes32 public constant COUNCIL_ROLE = keccak256("COUNCIL_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");
    bool public constant immutableGenesis = true;

    IFactionFactory public factionFactory;
    ITokenFactory public tokenFactory;
    IFactionCharterRegistry public charterRegistry;
    IMpNSRegistry public mpns;
    IAgentOps public agentOps;

    event CharterRegistered(string indexed uri);
    event AgentHandleAssigned(address indexed agent, string indexed handle);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        address factionFactory_,
        address tokenFactory_,
        address charterRegistry_,
        address mpns_,
        address agentOps_,
        string calldata charterUri,
        string[] calldata handles,
        address[] calldata agents,
        uint256 handleDuration
    ) external initializer {
        require(handles.length == agents.length, "Mismatched inputs");

        __AccessControl_init();
        __UUPSUpgradeable_init();

        factionFactory = IFactionFactory(factionFactory_);
        tokenFactory = ITokenFactory(tokenFactory_);
        charterRegistry = IFactionCharterRegistry(charterRegistry_);
        mpns = IMpNSRegistry(mpns_);
        agentOps = IAgentOps(agentOps_);

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(COUNCIL_ROLE, msg.sender);
        _grantRole(UPGRADER_ROLE, msg.sender);

        charterRegistry.registerCharter(address(this), charterUri);
        emit CharterRegistered(charterUri);

        for (uint256 i = 0; i < handles.length; i++) {
            mpns.register(handles[i], agents[i], handleDuration, "");
            agentOps.registerAgent(agents[i], handles[i]);
            emit AgentHandleAssigned(agents[i], handles[i]);
        }
    }

    function spawnFaction(string calldata name) external onlyRole(COUNCIL_ROLE) returns (address) {
        return factionFactory.createFaction(name);
    }

    function spawnToken(string calldata name, string calldata symbol) external onlyRole(COUNCIL_ROLE) returns (address) {
        return tokenFactory.createToken(name, symbol);
    }

    function disable() external pure {
        revert("IMMUTABLE");
    }

    function deleteFaction() external pure {
        revert("IMMUTABLE");
    }

    function renounceRole(bytes32, address) public override {
        revert("IMMUTABLE");
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}

    /// @dev Reserve storage space to allow layout changes in the future.
    uint256[50] private __gap;
}

