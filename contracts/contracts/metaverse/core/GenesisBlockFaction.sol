// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

interface IMpNSRegistry {
    function ownerOf(string calldata name) external view returns (address);
    function nameToUri(string calldata name) external view returns (string memory);
    function isFrozen(string calldata name) external view returns (bool);
}

/**
 * @title GenesisBlockFaction
 * @notice Logic contract for a single faction tied to a locked MpNS name.
 */
contract GenesisBlockFaction is Initializable, AccessControlUpgradeable, UUPSUpgradeable {
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    IMpNSRegistry public mpns;
    address public creator;
    string public name;
    string public uri;
    uint256 public timestamp;

    event FactionInitialized(string indexed name, address indexed creator, string uri, uint256 timestamp);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address mpnsAddress, address creatorAddress, string calldata factionName) external initializer {
        __AccessControl_init();
        __UUPSUpgradeable_init();

        mpns = IMpNSRegistry(mpnsAddress);
        require(mpns.ownerOf(factionName) == creatorAddress, "Only name owner can deploy faction");
        require(mpns.isFrozen(factionName), "Name must be frozen");

        creator = creatorAddress;
        name = factionName;
        uri = mpns.nameToUri(factionName);
        timestamp = block.timestamp;

        _grantRole(DEFAULT_ADMIN_ROLE, creatorAddress);
        _grantRole(UPGRADER_ROLE, creatorAddress);

        emit FactionInitialized(factionName, creatorAddress, uri, timestamp);
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}

    /// @dev Reserve storage space to allow layout changes in the future.
    uint256[50] private __gap;
}

