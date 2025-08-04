// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

/// @notice Placeholder for Metaverse Naming Service registry.
contract MpNSRegistry is Initializable, UUPSUpgradeable, AccessControlUpgradeable {
    bytes32 public constant REGISTRAR_ROLE = keccak256("REGISTRAR_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    struct NameRecord {
        address owner;
        uint256 expiration;
    }

    mapping(string => NameRecord) private _records;

    event NameRegistered(string indexed name, address indexed owner, uint256 expiration);
    event NameRenewed(string indexed name, uint256 expiration);
    event NameTransferred(string indexed name, address indexed oldOwner, address indexed newOwner);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() public initializer {
        __AccessControl_init();
        __UUPSUpgradeable_init();
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(REGISTRAR_ROLE, msg.sender);
        _grantRole(UPGRADER_ROLE, msg.sender);
    }

    function register(string calldata name, address owner, uint256 duration) external onlyRole(REGISTRAR_ROLE) {
        require(owner != address(0), "invalid owner");
        NameRecord storage record = _records[name];
        require(record.expiration < block.timestamp, "name not available");
        record.owner = owner;
        record.expiration = block.timestamp + duration;
        emit NameRegistered(name, owner, record.expiration);
    }

    function renew(string calldata name, uint256 duration) external onlyRole(REGISTRAR_ROLE) {
        NameRecord storage record = _records[name];
        require(record.owner != address(0), "name not registered");
        uint256 base = record.expiration > block.timestamp ? record.expiration : block.timestamp;
        record.expiration = base + duration;
        emit NameRenewed(name, record.expiration);
    }

    function transfer(string calldata name, address newOwner) external {
        require(newOwner != address(0), "invalid owner");
        NameRecord storage record = _records[name];
        require(record.expiration >= block.timestamp, "name expired");
        require(record.owner == msg.sender, "not owner");
        address oldOwner = record.owner;
        record.owner = newOwner;
        emit NameTransferred(name, oldOwner, newOwner);
    }

    function ownerOf(string calldata name) external view returns (address) {
        NameRecord storage record = _records[name];
        if (record.expiration >= block.timestamp) {
            return record.owner;
        }
        return address(0);
    }

    function expirationOf(string calldata name) external view returns (uint256) {
        return _records[name].expiration;
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}
}

