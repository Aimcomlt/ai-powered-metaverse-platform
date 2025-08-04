// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";

/// @notice Placeholder for faction deployment factory.
contract GenesisBlockFactory is Initializable, UUPSUpgradeable, AccessControlUpgradeable {
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    /// @notice List of all faction contracts created by this factory.
    address[] private _factions;

    /// @notice Tracks whether an address was deployed through this factory.
    mapping(address => bool) public isFaction;

    /// @notice Emitted when a new faction contract is cloned.
    event FactionDeployed(address indexed implementation, address faction);

    /// @notice Emitted after a faction contract has been initialized.
    event FactionInitialized(address indexed faction);

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

    /// @notice Deploys a new faction by cloning the given implementation contract.
    /// @param implementation Address of the contract to be cloned.
    /// @return faction Address of the newly deployed faction contract.
    function deployFaction(address implementation)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
        returns (address faction)
    {
        faction = Clones.clone(implementation);
        _factions.push(faction);
        isFaction[faction] = true;
        emit FactionDeployed(implementation, faction);
    }

    /// @notice Initializes a previously deployed faction contract.
    /// @param faction Address of the faction contract to initialize.
    /// @param initData Calldata to pass to the faction contract for initialization.
    function initializeFaction(address faction, bytes calldata initData)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        require(isFaction[faction], "Unknown faction");
        (bool ok, ) = faction.call(initData);
        require(ok, "Initialization failed");
        emit FactionInitialized(faction);
    }

    /// @notice Returns all faction addresses deployed by this factory.
    function getFactions() external view returns (address[] memory) {
        return _factions;
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}
}

