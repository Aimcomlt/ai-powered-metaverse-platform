// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC1155Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

/**
 * @title FunctionalToken
 * @notice ERC-1155 token for both fungible utility tokens and non-fungible educational milestones.
 *         Utilises UUPS upgradeability and role based access control.
 */
contract FunctionalToken is Initializable, ERC1155Upgradeable, AccessControlUpgradeable, UUPSUpgradeable {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

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
     * @notice Mint a single token type to an address.
     */
    function mint(address to, uint256 id, uint256 amount, bytes calldata data) external onlyRole(MINTER_ROLE) {
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

