// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

interface IMpNSRegistry {
    function ownerOf(string calldata name) external view returns (address);
    function nameToUri(string calldata name) external view returns (string memory);
}

/**
 * @title GenesisBlockFaction
 * @notice Deploys a faction-specific governance container based on a locked MpNS name.
 *         It pulls the associated URI to define context or resources.
 */
contract GenesisBlockFaction is Initializable, AccessControlUpgradeable, UUPSUpgradeable {
    bytes32 public constant DEPLOYER_ROLE = keccak256("DEPLOYER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    struct Faction {
        address creator;
        string name;
        string uri; // fetched from MpNSRegistry at time of creation
        uint256 timestamp;
    }

    mapping(string => Faction) public factions;
    string[] public allFactions;

    IMpNSRegistry public mpns;

    event FactionCreated(string indexed name, address indexed creator, string uri, uint256 timestamp);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address mpnsAddress) public initializer {
        __AccessControl_init();
        __UUPSUpgradeable_init();

        mpns = IMpNSRegistry(mpnsAddress);

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(DEPLOYER_ROLE, msg.sender);
        _grantRole(UPGRADER_ROLE, msg.sender);
    }

    /**
     * @notice Deploy a new faction using a pre-registered MpNS name.
     * @param name The locked, descriptive MpNS name (must already be registered)
     */
    function createFaction(string calldata name) external onlyRole(DEPLOYER_ROLE) {
        require(factions[name].timestamp == 0, "Faction already exists");

        address owner = mpns.ownerOf(name);
        require(owner != address(0), "Name not registered or expired");
        require(owner == msg.sender, "Only name owner can deploy faction");

        string memory uri = mpns.nameToUri(name);

        factions[name] = Faction({
            creator: msg.sender,
            name: name,
            uri: uri,
            timestamp: block.timestamp
        });

        allFactions.push(name);

        emit FactionCreated(name, msg.sender, uri, block.timestamp);
    }

    function getAllFactions() external view returns (string[] memory) {
        return allFactions;
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}

    /// @dev Reserve storage space to allow layout changes in the future.
    /// New variables must be appended at the end and the gap size adjusted if used.
    uint256[50] private __gap;
}
