// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC1155Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract GovernanceToken is Initializable, ERC1155Upgradeable, AccessControlUpgradeable, UUPSUpgradeable {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");
    bytes32 public constant STAKING_CONTRACT_ROLE = keccak256("STAKING_CONTRACT_ROLE");

    struct GTMetadata {
        uint256 factionId;
        uint256 level;
        uint256 taskId;
        string proofURI; // IPFS or metadata link
    }

    mapping(uint256 => GTMetadata) public metadataByTokenId;
    mapping(address => uint256[]) public userGTs;

    uint256 private _tokenIdCounter;

    event GTMinted(
        address indexed to,
        uint256 tokenId,
        uint256 indexed factionId,
        uint256 level,
        uint256 indexed taskId,
        string proofURI
    );

    event StakingRoleGranted(address indexed stakingContract);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(string memory uri_) public initializer {
        __ERC1155_init(uri_);
        __AccessControl_init();
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(UPGRADER_ROLE, msg.sender);
    }

    function grantStakingRole(address stakingContract)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        require(stakingContract != address(0), "invalid staking contract");
        _grantRole(STAKING_CONTRACT_ROLE, stakingContract);
        emit StakingRoleGranted(stakingContract);
    }

    /// @notice Mint a soulbound Governance Token to a user with metadata
    function mintGT(
        address to,
        uint256 factionId,
        uint256 level,
        uint256 taskId,
        string calldata proofURI
    ) external onlyRole(MINTER_ROLE) returns (uint256 tokenId) {
        tokenId = ++_tokenIdCounter;

        _mint(to, tokenId, 1, "");
        metadataByTokenId[tokenId] = GTMetadata(factionId, level, taskId, proofURI);
        userGTs[to].push(tokenId);

        emit GTMinted(to, tokenId, factionId, level, taskId, proofURI);
    }

    function stakeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes calldata data
    ) external onlyRole(STAKING_CONTRACT_ROLE) {
        _safeTransferFrom(from, to, id, amount, data);
    }

    // ❌ Disable transferability (soulbound enforcement)
    function safeTransferFrom(address, address, uint256, uint256, bytes memory) public pure override {
        revert("GTs are soulbound");
    }

    function safeBatchTransferFrom(address, address, uint256[] memory, uint256[] memory, bytes memory) public pure override {
        revert("GTs are soulbound");
    }

    function setApprovalForAll(address, bool) public pure override {
        revert("GTs are soulbound");
    }

    function isApprovedForAll(address, address) public pure override returns (bool) {
        return false;
    }

    /// @notice View all GT token IDs owned by a user
    function getUserGTs(address user) external view returns (uint256[] memory) {
        return userGTs[user];
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155Upgradeable, AccessControlUpgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}

    /// @dev Reserve storage space to allow layout changes in the future.
    /// New variables must be appended at the end and the gap size adjusted if used.
    uint256[50] private __gap;
}
