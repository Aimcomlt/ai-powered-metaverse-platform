// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";
import {GenesisBlockFaction, IMpNSRegistry} from "./GenesisBlockFaction.sol";

/**
 * @title GenesisBlockFactory
 * @notice Deploys and tracks clones of the GenesisBlockFaction contract.
 */
contract GenesisBlockFactory is AccessControl {
    bytes32 public constant DEPLOYER_ROLE = keccak256("DEPLOYER_ROLE");

    IMpNSRegistry public mpns;
    address public immutable implementation;

    mapping(string => address) public factions;
    string[] public allFactions;

    event FactionCreated(
        string indexed name,
        address faction,
        address indexed creator,
        string uri,
        uint256 timestamp
    );

    constructor(address implementationAddress, address mpnsAddress) {
        implementation = implementationAddress;
        mpns = IMpNSRegistry(mpnsAddress);

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(DEPLOYER_ROLE, msg.sender);
    }

    function createFaction(string calldata name) external onlyRole(DEPLOYER_ROLE) returns (address faction) {
        require(factions[name] == address(0), "Faction already exists");

        address owner = mpns.ownerOf(name);
        require(owner != address(0), "Name not registered or expired");
        require(owner == msg.sender, "Only name owner can deploy faction");
        require(mpns.isFrozen(name), "Name must be frozen");

        faction = Clones.clone(implementation);
        GenesisBlockFaction(faction).initialize(address(mpns), msg.sender, name);

        factions[name] = faction;
        allFactions.push(name);

        string memory uri = mpns.nameToUri(name);
        emit FactionCreated(name, faction, msg.sender, uri, block.timestamp);
    }

    function getAllFactions() external view returns (string[] memory) {
        return allFactions;
    }
}

