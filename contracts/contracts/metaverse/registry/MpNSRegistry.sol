// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

/**
 * @title MpNSRegistry
 * @notice A decentralized naming system for the metaverse that maps human-readable names
 *         (immutable) to updatable content-addressed URIs (e.g., IPFS, Arweave).
 */
contract MpNSRegistry is Initializable, UUPSUpgradeable, AccessControlUpgradeable {
    bytes32 public constant REGISTRAR_ROLE = keccak256("REGISTRAR_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    struct NameRecord {
        address owner;
        uint256 expiration;
        string uri; // IPFS or metadata pointer
        bool frozen; // once true, name cannot be updated or transferred again
    }

    mapping(string => NameRecord) private _records;

    event NameRegistered(string indexed name, address indexed owner, uint256 expiration, string uri);
    event URIUpdated(string indexed name, string oldUri, string newUri);
    event NameTransferred(string indexed name, address indexed oldOwner, address indexed newOwner);
    event NameFrozen(string indexed name);

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

    /**
     * @notice Registers a new human-readable name with a hash-based URI.
     * @dev Once registered, the name itself is immutable; only URI can be updated.
     */
    function register(string calldata name, address owner, uint256 duration, string calldata uri) external onlyRole(REGISTRAR_ROLE) {
        require(owner != address(0), "Invalid owner");
        require(bytes(name).length > 0, "Name required");
        require(_records[name].owner == address(0) || _records[name].expiration < block.timestamp, "Name not available");

        _records[name] = NameRecord({
            owner: owner,
            expiration: block.timestamp + duration,
            uri: uri,
            frozen: false
        });

        emit NameRegistered(name, owner, block.timestamp + duration, uri);
    }

    /**
     * @notice Updates the URI associated with a name.
     * @dev Can only be updated by the current owner while name is valid and unfrozen.
     */
    function updateURI(string calldata name, string calldata newUri) external {
        NameRecord storage record = _records[name];
        require(record.owner == msg.sender, "Not name owner");
        require(record.expiration >= block.timestamp, "Name expired");
        require(!record.frozen, "Name is frozen");

        string memory oldUri = record.uri;
        record.uri = newUri;

        emit URIUpdated(name, oldUri, newUri);
    }

    /**
     * @notice Transfers a name to another user.
     * @dev Transfer is only possible if name is still active and not frozen.
     */
    function transfer(string calldata name, address newOwner) external {
        require(newOwner != address(0), "Invalid owner");

        NameRecord storage record = _records[name];
        require(record.owner == msg.sender, "Not name owner");
        require(record.expiration >= block.timestamp, "Name expired");
        require(!record.frozen, "Name is frozen");

        address oldOwner = record.owner;
        record.owner = newOwner;

        emit NameTransferred(name, oldOwner, newOwner);
    }

    /**
     * @notice Freezes a name so its ownership and metadata become permanent.
     * @dev Useful for names assigned to deployed Genesis Blocks.
     */
    function freezeName(string calldata name) external {
        NameRecord storage record = _records[name];
        require(record.owner == msg.sender, "Not name owner");
        require(record.expiration >= block.timestamp, "Name expired");
        require(!record.frozen, "Already frozen");

        record.frozen = true;
        emit NameFrozen(name);
    }

    // -----------------------
    // 🔎 View Functions
    // -----------------------

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

    function nameToUri(string calldata name) external view returns (string memory) {
        return _records[name].uri;
    }

    function isFrozen(string calldata name) external view returns (bool) {
        return _records[name].frozen;
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}

    /// @dev Reserve storage space to allow layout changes in the future.
    /// New variables must be appended at the end and the gap size adjusted if used.
    uint256[50] private __gap;
}

