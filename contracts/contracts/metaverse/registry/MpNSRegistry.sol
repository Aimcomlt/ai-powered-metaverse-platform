// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

/// @title MpNSRegistry
/// @notice Metaverse Naming Service — maps permanent name labels to updatable content URIs (e.g., IPFS)
contract MpNSRegistry is Initializable, UUPSUpgradeable, AccessControlUpgradeable {
    bytes32 public constant REGISTRAR_ROLE = keccak256("REGISTRAR_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    struct NameRecord {
        address owner;
        uint256 expiration;
        string uri;
        bool locked;
    }

    mapping(string => NameRecord) private _records;

    event NameRegistered(string indexed name, address indexed owner, uint256 expiration);
    event NameRenewed(string indexed name, uint256 expiration);
    event NameTransferred(string indexed name, address indexed oldOwner, address indexed newOwner);
    event NameUriUpdated(string indexed name, string newUri);

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

    /// @notice Register a new name and URI
    function register(string calldata name, address owner, uint256 duration, string calldata uri) external onlyRole(REGISTRAR_ROLE) {
        require(owner != address(0), "invalid owner");
        NameRecord storage record = _records[name];
        require(record.expiration < block.timestamp, "name not available");

        record.owner = owner;
        record.expiration = block.timestamp + duration;
        record.uri = uri;
        record.locked = true; // once registered, name string is immutable

        emit NameRegistered(name, owner, record.expiration);
    }

    /// @notice Extend expiration for an existing name
    function renew(string calldata name, uint256 duration) external onlyRole(REGISTRAR_ROLE) {
        NameRecord storage record = _records[name];
        require(record.owner != address(0), "name not registered");

        uint256 base = record.expiration > block.timestamp ? record.expiration : block.timestamp;
        record.expiration = base + duration;

        emit NameRenewed(name, record.expiration);
    }

    /// @notice Transfer ownership of a registered name
    function transfer(string calldata name, address newOwner) external {
        require(newOwner != address(0), "invalid owner");
        NameRecord storage record = _records[name];
        require(record.expiration >= block.timestamp, "name expired");
        require(record.owner == msg.sender, "not owner");

        address oldOwner = record.owner;
        record.owner = newOwner;

        emit NameTransferred(name, oldOwner, newOwner);
    }

    /// @notice Update content URI (e.g. IPFS or app metadata)
    function updateUri(string calldata name, string calldata newUri) external {
        NameRecord storage record = _records[name];
        require(record.owner == msg.sender, "not owner");
        require(record.expiration >= block.timestamp, "name expired");
        require(record.locked, "name must be locked");

        record.uri = newUri;

        emit NameUriUpdated(name, newUri);
    }

    /// @notice Returns the wallet address of a name's current owner (or address(0) if expired)
    function ownerOf(string calldata name) external view returns (address) {
        NameRecord storage record = _records[name];
        return record.expiration >= block.timestamp ? record.owner : address(0);
    }

    /// @notice Returns the expiration timestamp of a name
    function expirationOf(string calldata name) external view returns (uint256) {
        return _records[name].expiration;
    }

    /// @notice Get the current URI for a name (e.g. IPFS or metadata pointer)
    function nameToUri(string calldata name) external view returns (string memory) {
        return _records[name].uri;
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}
}
