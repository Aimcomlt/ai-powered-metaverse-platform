// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC1155Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

/**
 * @title FunctionalToken
 * @notice ERC-1155 token for fungible utility rewards (FTs). Only tokens with ID >= 10000 are transferable.
 */
contract FunctionalToken is Initializable, ERC1155Upgradeable, AccessControlUpgradeable, UUPSUpgradeable {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    uint256 public constant FT_START_ID = 10_000;

    event FunctionalTokenMinted(address indexed to, uint256 id, uint256 amount, string purpose);

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

    /**
     * @notice Mint a single FT token.
     */
    function mint(address to, uint256 id, uint256 amount, bytes calldata data) external onlyRole(MINTER_ROLE) {
        require(id >= FT_START_ID, "ID reserved or invalid for FT");
        _mint(to, id, amount, data);
    }

    /**
     * @notice Mint with an explanation (e.g. "task:ai_101").
     */
    function mintWithPurpose(
        address to,
        uint256 id,
        uint256 amount,
        bytes calldata data,
        string calldata purpose
    ) external onlyRole(MINTER_ROLE) {
        require(id >= FT_START_ID, "ID reserved or invalid for FT");
        _mint(to, id, amount, data);
        emit FunctionalTokenMinted(to, id, amount, purpose);
    }

    /**
     * @notice Gas-optimized batch reward minting.
     */
    function batchRewardMint(address[] calldata recipients, uint256 id, uint256 amount, bytes calldata data) external onlyRole(MINTER_ROLE) {
        require(id >= FT_START_ID, "ID reserved or invalid for FT");
        for (uint256 i; i < recipients.length; ) {
            _mint(recipients[i], id, amount, data);
            unchecked { ++i; }
        }
    }

    /**
     * @notice Get multiple balances.
     */
    function balancesOf(address account, uint256[] calldata ids) external view returns (uint256[] memory balances) {
        balances = new uint256[](ids.length);
        for (uint256 i; i < ids.length; ) {
            balances[i] = balanceOf(account, ids[i]);
            unchecked { ++i; }
        }
    }

    // Protect against accidental GT minting by disallowing any transfer of low-range IDs
    function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes memory data) public virtual override {
        require(id >= FT_START_ID, "Soulbound or reserved token");
        super.safeTransferFrom(from, to, id, amount, data);
    }

    function safeBatchTransferFrom(address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) public virtual override {
        for (uint256 i; i < ids.length; ) {
            require(ids[i] >= FT_START_ID, "Soulbound or reserved token");
            unchecked { ++i; }
        }
        super.safeBatchTransferFrom(from, to, ids, amounts, data);
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}
}
        _mint(to, id, amount, data);
    }

    /**
     * @notice Gas optimised batch reward minting. Mints the same token id and amount to multiple recipients.
     */
    function batchRewardMint(address[] calldata recipients, uint256 id, uint256 amount, bytes calldata data) external onlyRole(MINTER_ROLE) {
        uint256 length = recipients.length;
        for (uint256 i; i < length; ) {
            _mint(recipients[i], id, amount, data);
            unchecked { ++i; }
        }
    }

    /**
     * @notice Convenience function to fetch balances for multiple token ids.
     */
    function balancesOf(address account, uint256[] calldata ids) external view returns (uint256[] memory balances) {
        uint256 length = ids.length;
        balances = new uint256[](length);
        for (uint256 i; i < length; ) {
            balances[i] = balanceOf(account, ids[i]);
            unchecked { ++i; }
        }
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}
}

