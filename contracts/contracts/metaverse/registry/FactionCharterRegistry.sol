// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title FactionCharterRegistry
 * @notice Stores IPFS-hosted charters for factions. Only the Genesis Faction
 *         may register or update entries. Charters marked as immutable cannot
 *         be modified again.
 */
contract FactionCharterRegistry {
    struct Charter {
        string faction;
        string ipfsHash;
        bool immutableGenesis;
    }

    // Genesis faction address set on first registration
    address public genesisFaction;

    mapping(address => Charter) private _charters;
    mapping(string => address) private _factionAddressByName;

    event CharterRegistered(
        address indexed factionAddress,
        string indexed faction,
        string ipfsHash,
        bool immutableGenesis
    );

    /**
     * @notice Registers or updates a faction charter.
     * @dev The first caller becomes the genesis faction and gains exclusive
     *      rights to register future charters.
     * @param factionAddress Address of the faction contract.
     * @param factionName    Human-readable faction name.
     * @param ipfsHash       IPFS hash pointing to the charter document.
     * @param immutableFlag  Whether this charter is immutable once set.
     */
    function registerCharter(
        address factionAddress,
        string calldata factionName,
        string calldata ipfsHash,
        bool immutableFlag
    ) external {
        if (genesisFaction == address(0)) {
            genesisFaction = msg.sender;
        }
        require(msg.sender == genesisFaction, "Only genesis faction");

        Charter storage existing = _charters[factionAddress];
        require(!existing.immutableGenesis, "Charter immutable");

        _charters[factionAddress] = Charter({
            faction: factionName,
            ipfsHash: ipfsHash,
            immutableGenesis: immutableFlag
        });
        _factionAddressByName[factionName] = factionAddress;

        emit CharterRegistered(factionAddress, factionName, ipfsHash, immutableFlag);
    }

    /// @notice Returns the charter for a given faction address.
    function getCharter(address factionAddress) external view returns (Charter memory) {
        return _charters[factionAddress];
    }

    /// @notice Returns the charter for a given faction name.
    function getCharterByName(string calldata factionName) external view returns (Charter memory) {
        return _charters[_factionAddressByName[factionName]];
    }
}

