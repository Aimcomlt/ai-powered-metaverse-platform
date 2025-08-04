// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

interface IMpNSRegistry {
    function ownerOf(string calldata name) external view returns (address);
    function nameToUri(string calldata name) external view returns (string memory);
}

/// @notice Interface of deployed GenesisBlockFaction contracts
interface IGenesisBlockFaction {
    function initialize(address mpnsAddress) external;
    function createFaction(string calldata name) external;
}

/// @title GenesisBlockFactory
/// @notice Deploys and tracks GenesisBlockFaction contracts linked to MpNS descriptive labels.
contract GenesisBlockFactory is Initializable, AccessControlUpgradeable, UUPSUpgradeable {
    bytes32 public constant DEPLOYER_ROLE = keccak256("DEPLOYER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    IMpNSRegistry public mpns;
    address public factionImplementation;

    mapping(string => address) public factionsByName;
    address[] public allFactions;

    event FactionDeployed(string indexed name, address indexed deployer, address factionAddress);

    constructor() {
        _disableInitializers();
    }

    function initialize(address mpnsAddress, address factionImpl) public initializer {
        __AccessControl_init();
        __UUPSUpgradeable_init();

        mpns = IMpNSRegistry(mpnsAddress);
        factionImplementation = factionImpl;

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(DEPLOYER_ROLE, msg.sender);
        _grantRole(UPGRADER_ROLE, msg.sender);
    }

    /**
     * @notice Deploys a new GenesisBlockFaction tied to an MpNS-registered name.
     * @param name The descriptive name registered in MpNS
     */
    function deployFaction(string calldata name) external onlyRole(DEPLOYER_ROLE) {
        require(factionsByName[name] == address(0), "Faction already exists");

        address owner = mpns.ownerOf(name);
        require(owner == msg.sender, "Must own name in MpNS");

        // deploy new GenesisBlockFaction using minimal proxy
        address clone = _deployMinimalProxy(factionImplementation);
        IGenesisBlockFaction(clone).initialize(address(mpns));
        IGenesisBlockFaction(clone).createFaction(name);

        factionsByName[name] = clone;
        allFactions.push(clone);

        emit FactionDeployed(name, msg.sender, clone);
    }

    /// @notice Lists all deployed faction contracts
    function getAllFactions() external view returns (address[] memory) {
        return allFactions;
    }

    /// @dev Minimal proxy creation (EIP-1167)
    function _deployMinimalProxy(address logic) internal returns (address proxy) {
        bytes20 targetBytes = bytes20(logic);
        assembly {
            let clone := mload(0x40)
            mstore(clone, 0x3d602d80600a3d3981f3)
            mstore(add(clone, 0x14), shl(0x60, targetBytes))
            mstore(add(clone, 0x28), 0x5af43d82803e903d91602b57fd5bf3)
            proxy := create(0, clone, 0x37)
        }
        require(proxy != address(0), "Create failed");
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}
}
