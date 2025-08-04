# Metaverse Contract Suite

## Overview
This directory contains an upgradeable smart-contract framework for a decentralized, faction-based metaverse. It is organized into several submodules:

| Folder | Purpose |
| --- | --- |
| `core` | Base factory for deploying faction modules. |
| `governance` | Cross-faction coordination, staking, and proposal management. |
| `registry` | Naming service for on-chain faction identifiers. |
| `tokens` | ERC-1155 contracts for functional and governance tokens. |
| `validation` | Placeholder for proof-of-observation logic. |

All contracts use OpenZeppelin's upgradeable patterns and role-based access control.

## Modules
### Core
- **GenesisBlockFactory**: Upgradeable factory prepared to deploy new factions in future iterations. Currently initializes administrative and upgrader roles only.

### Governance
- **CrossFactionHub**: Placeholder hub intended for cross-faction governance. Initializes admin and upgrader roles without additional logic yet.
- **GTStaking**: Manages staking of soulbound governance tokens (GT) and issues functional tokens (FT) as rewards. Includes task metrics, staking/unstaking, and demand-supply-based reward calculation.
- **HouseOfTheLaw**: Central governance module providing task validation, quadratic voting on proposals, and FT minting tied to GT supply. Supports validator, admin, and upgrader roles.

### Registry
- **MpNSRegistry**: Skeleton for the Metaverse Naming Service. Sets registrar and upgrader roles to manage future namespace registrations.

### Tokens
- **FunctionalToken**: ERC-1155 upgradeable token for both fungible utility tokens and non-fungible educational milestones. Offers minting, batch reward distribution, and multi-ID balance queries.
- **GovernanceToken**: ERC-1155 soulbound token representing faction membership and contribution level. Transfers are blocked except through a staking contract with the `STAKING_ROLE`.

### Validation
- **ProofOfObservation**: Placeholder for validating task completion via "Proof of Observation." Currently provides only role initialization and upgrade authorization hooks.

## Architecture Notes
- **Upgradeability** – Every contract follows the UUPS pattern, enabling logic upgrades while preserving state.
- **Access Control** – Roles such as `DEFAULT_ADMIN_ROLE`, `UPGRADER_ROLE`, `MINTER_ROLE`, `VALIDATOR_ROLE`, `REGISTRAR_ROLE`, and `STAKING_ROLE` enforce permissions across modules.
- **Inter-Module Links** – Governance modules interact with token contracts (e.g., `GTStaking` and `HouseOfTheLaw` both rely on `GovernanceToken`/`FunctionalToken`), establishing a foundation for faction-specific economies and decision-making.

This folder provides a scaffold for a modular, extensible metaverse governance system, with several components still marked as placeholders for future development.
