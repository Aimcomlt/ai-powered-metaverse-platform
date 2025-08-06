# Access Control Matrix

This document outlines role-based permissions for all smart contracts in the repository and the recommended production holders.

| Contract | Role | Production Holder | Risk if Misconfigured |
| --- | --- | --- | --- |
| ArbCloneFactory | None (open access) | N/A | Anyone can create clones, potentially deploying unintended logic |
| ProxyArbExecutor | None (open access) | N/A | Unrestricted execution could allow arbitrary actions |
| StrategyRegistry | None (open access) | N/A | Malicious strategies may be registered without oversight |
| GenesisBlockFaction | DEFAULT_ADMIN_ROLE | DAO multisig | Unauthorized role grants/revocations |
| GenesisBlockFaction | UPGRADER_ROLE | DAO multisig | Unauthorized upgrades could introduce malicious logic |
| GenesisBlockFactory | DEFAULT_ADMIN_ROLE | DAO multisig | Loss of control over role assignments and deployments |
| GenesisBlockFactory | DEPLOYER_ROLE | DAO/deployer multisig | Unauthorized factions could be created |
| MpNSRegistry | DEFAULT_ADMIN_ROLE | DAO multisig | Attackers could assign themselves privileged roles |
| MpNSRegistry | REGISTRAR_ROLE | Authorized registrar service | Fake names or squatting if misassigned |
| MpNSRegistry | UPGRADER_ROLE | DAO multisig | Malicious upgrades compromising name system |
| FunctionalToken | DEFAULT_ADMIN_ROLE | DAO multisig | Unauthorized minting or upgrades through role changes |
| FunctionalToken | MINTER_ROLE | Trusted minter contract or multisig | Token inflation or rewards abuse |
| FunctionalToken | UPGRADER_ROLE | DAO multisig | Malicious upgrades affecting token logic |
| GovernanceToken | DEFAULT_ADMIN_ROLE | DAO multisig | Unauthorized role or staking configuration changes |
| GovernanceToken | MINTER_ROLE | DAO or designated minter contract | Excessive token issuance |
| GovernanceToken | STAKING_CONTRACT_ROLE | GTStaking contract | Unauthorized contract could manipulate staking rewards |
| GovernanceToken | UPGRADER_ROLE | DAO multisig | Malicious upgrades compromising token integrity |
| CrossFactionHub | DEFAULT_ADMIN_ROLE | DAO multisig | Attackers could grant voting rights or upgrade permissions |
| CrossFactionHub | DEFAULT_VOTER_ROLE | DAO members or approved voters | Unauthorized addresses could influence votes |
| CrossFactionHub | UPGRADER_ROLE | DAO multisig | Malicious upgrades affecting governance |
| GTStaking | DEFAULT_ADMIN_ROLE | DAO multisig | Task metrics or PoO references could be altered |
| GTStaking | UPGRADER_ROLE | DAO multisig | Malicious upgrades allowing reward manipulation |
| HouseOfTheLaw | DEFAULT_ADMIN_ROLE | DAO multisig | Misconfigured trusted contracts or roles |
| HouseOfTheLaw | UPGRADER_ROLE | DAO multisig | Malicious upgrades affecting validation |
| ProofOfObservation | DEFAULT_ADMIN_ROLE | DAO multisig | Validators or references could be mismanaged |
| ProofOfObservation | VALIDATOR_ROLE | Approved human/AI validators | Invalid tasks could be approved |
| ProofOfObservation | UPGRADER_ROLE | DAO multisig | Malicious upgrades affecting task validation |
| PoO_TaskFlow | DEFAULT_ADMIN_ROLE | DAO multisig | Invalid configuration of task flows |
| PoO_TaskFlow | VALIDATOR_ROLE | ProofOfObservation contract or validators | Unauthorized reward distribution |
| PoO_TaskFlow | UPGRADER_ROLE | DAO multisig | Malicious upgrades affecting task reward logic |

