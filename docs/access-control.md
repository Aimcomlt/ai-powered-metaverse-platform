# Access Control

| Contract | Role | Recommended Holder | Risk if Misconfigured |
| --- | --- | --- | --- |
| ArbCloneFactory | None | n/a | Any address can create clones, enabling unplanned deployments |
| ProxyArbExecutor | None | n/a | Open execute function could be abused if linked to critical logic |
| StrategyRegistry | None | n/a | Anyone can register strategies, potentially overwriting or adding malicious entries |
| GenesisBlockFactory | DEFAULT_ADMIN_ROLE | DAO multisig | Can grant roles or change deployer permissions |
| GenesisBlockFactory | DEPLOYER_ROLE | DAO multisig or approved name owner | Unauthorized factions could be created |
| GenesisBlockFaction | DEFAULT_ADMIN_ROLE | Faction creator or DAO | Control over faction parameters and roles |
| GenesisBlockFaction | UPGRADER_ROLE | DAO multisig | Malicious upgrades could alter faction behavior |
| MpNSRegistry | DEFAULT_ADMIN_ROLE | DAO multisig | Can change registrar or upgrader assignments |
| MpNSRegistry | REGISTRAR_ROLE | Registry service or DAO | Unauthorized names could be registered or existing ones overridden |
| MpNSRegistry | UPGRADER_ROLE | DAO multisig | Malicious upgrades could compromise name resolution |
| GovernanceToken | DEFAULT_ADMIN_ROLE | DAO multisig | Can assign minter or staking roles |
| GovernanceToken | MINTER_ROLE | DAO multisig or trusted minting contract | Unchecked minting inflates token supply |
| GovernanceToken | UPGRADER_ROLE | DAO multisig | Malicious upgrades could alter token logic |
| GovernanceToken | STAKING_CONTRACT_ROLE | GTStaking contract | Unauthorized transfers would break soulbound restrictions |
| FunctionalToken | DEFAULT_ADMIN_ROLE | DAO multisig | Can assign minters or upgrade permissions |
| FunctionalToken | MINTER_ROLE | DAO multisig or reward distributor | Unlimited minting undermines reward economy |
| FunctionalToken | UPGRADER_ROLE | DAO multisig | Malicious upgrades could create counterfeit tokens |
| ProofOfObservation | DEFAULT_ADMIN_ROLE | DAO multisig | Can grant validator or upgrader roles |
| ProofOfObservation | VALIDATOR_ROLE | Trusted human or AI validators | Malicious validation could reward undeserving tasks |
| ProofOfObservation | UPGRADER_ROLE | DAO multisig | Malicious upgrades could falsify validation |
| PoO_TaskFlow | DEFAULT_ADMIN_ROLE | DAO multisig | Controls contract references and validator assignments |
| PoO_TaskFlow | VALIDATOR_ROLE | Trusted off-chain validator | Could mint rewards without proper checks |
| PoO_TaskFlow | UPGRADER_ROLE | DAO multisig | Malicious upgrades could bypass validations |
| GTStaking | DEFAULT_ADMIN_ROLE | DAO multisig | Can set task metrics affecting rewards |
| GTStaking | UPGRADER_ROLE | DAO multisig | Malicious upgrades could drain staked tokens |
| CrossFactionHub | DEFAULT_ADMIN_ROLE | DAO multisig | Can assign voter or upgrader roles |
| CrossFactionHub | DEFAULT_VOTER_ROLE | Validated governance participants | Unauthorized voters can sway proposals |
| CrossFactionHub | UPGRADER_ROLE | DAO multisig | Malicious upgrades could hijack governance |
| HouseOfTheLaw | DEFAULT_ADMIN_ROLE | DAO multisig | Can change ProofOfObservation address or economic params |
| HouseOfTheLaw | UPGRADER_ROLE | DAO multisig | Malicious upgrades could mint or redirect rewards |
