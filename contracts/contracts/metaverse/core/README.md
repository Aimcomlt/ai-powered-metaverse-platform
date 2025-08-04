```markdown
 🏗️ GenesisBlockFactory.sol

 🔍 What is this?

The **GenesisBlockFactory** is a powerful smart contract that deploys and tracks **faction hubs** in your AI-powered metaverse. These hubs are called **Genesis Blocks** — smart contracts that represent a guild, team, or knowledge group.

Each Genesis Block is uniquely named using an entry from the [`MpNSRegistry`](./MpNSRegistry.sol) — your decentralized naming service.

 🧠 Why Use a Factory?

- ✅ Guarantees every faction uses a **verified, immutable name**
- ✅ Deploys via **gas-efficient minimal proxy clones**
- ✅ Tracks **all deployed factions** for on-chain discovery
- ✅ Pulls **dynamic metadata (e.g., IPFS link)** via MpNS
- ✅ Prevents spoofing or unauthorized deployments

 🔄 Lifecycle: Name → Factory → Faction

```text
    +---------------------+                     
    |  MpNSRegistry       |                     
    |---------------------|                     
    | "ai-lab" → URI link |  👤 Registered Name 
    +---------------------+                     
                |                                
                |    ① deployFaction("ai-lab")    
                ↓                                
    +-----------------------------+              
    |  GenesisBlockFactory        |              
    |-----------------------------|              
    | ✔️ Verifies name ownership   |              
    | ✔️ Verifies name is frozen   |              
    | 🚀 Clones GenesisBlockFaction|              
    +-----------------------------+              
                |                                
                ↓                                
    +-----------------------------+              
    |  GenesisBlockFaction        |              
    |-----------------------------|              
    | 🔗 Binds to "ai-lab"         |              
    | 🧠 Reads URI from MpNS       |              
    | 💼 Runs faction logic       |              
    +-----------------------------+              
````

 🔐 Role Permissions

| Role                 | What They Can Do                  |
| -------------------- | --------------------------------- |
| `DEPLOYER_ROLE`      | Deploy new GenesisBlock contracts |
| `DEFAULT_ADMIN_ROLE` | Grant/revoke other roles          |
| `UPGRADER_ROLE`      | Upgrade the factory logic         |

> Factory access is DAO-controllable or admin-bound for maximum security.

 🗂️ Core Functions

 📦 `initialize(mpnsAddress, factionImpl)`

Sets the registry and logic blueprint:

* `mpnsAddress` → Address of the MpNSRegistry contract
* `factionImpl` → GenesisBlockFaction UUPS implementation

 🚀 `deployFaction(string name)`

Deploys a GenesisBlockFaction clone tied to the name.

* Requires:

  * Name is **registered and frozen** in MpNS
  * Caller **owns the name** in MpNS
* Auto-links to the descriptive URI stored in MpNS

 📬 `factionsByName(name)`

Returns the smart contract address of a faction tied to a name.

 📚 `getAllFactions()`

Returns a full list of all deployed factions (in order).

 🧬 Example Use Case

1. Alice registers `"data-federation"` in `MpNSRegistry`
2. She **freezes** the name to lock its identity
3. She calls `deployFaction("data-federation")`
4. Factory:

   * Validates ownership + frozen status
   * Deploys a **GenesisBlockFaction**
   * Logs and stores its address
5. Anyone can now:

   * View the faction
   * Read its URI content from MpNS
   * Interact via its governance/task logic

 🧰 Behind the Scenes

This factory uses the **EIP-1167 minimal proxy pattern**, which means:

* Each faction is a lightweight clone of `GenesisBlockFaction`
* Logic is shared, storage is separate
* Saves gas while preserving modularity

---

## 🧱 Future Extensions

You can evolve this factory to:

* Track timestamps and creators
* Auto-stake GTs for new factions
* Register faction rules or tasks on deployment
* Link with `CrossFactionHub` for shared voting

 🔗 Related Contracts

| Contract                                               | Description                                |
| ------------------------------------------------------ | ------------------------------------------ |
| [`MpNSRegistry.sol`](./MpNSRegistry.sol)               | Human-readable name registry + URI indexer |
| [`GenesisBlockFaction.sol`](./GenesisBlockFaction.sol) | Deployed logic per faction instance        |
| [`CrossFactionHub.sol`](./CrossFactionHub.sol)         | DAO and collaboration space for factions   |

 📌 Summary

The GenesisBlockFactory is your **official franchise launcher** in the metaverse. It ensures:

* 💡 Each faction has a unique, traceable identity
* 🧬 Deployments follow strict name ownership rules
* 🔗 Factions are readable and indexable via URI

> No name, no faction. No registry, no identity.
> GenesisBlockFactory keeps everything structured and fair.

```
