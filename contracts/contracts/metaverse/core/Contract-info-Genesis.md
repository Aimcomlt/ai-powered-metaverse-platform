```markdown
 🏗️ GenesisBlockFactory.sol

 🔍 What is this?

The **GenesisBlockFactory** is a special smart contract that lets you deploy and track **faction hubs** in your metaverse.

These faction hubs are called **Genesis Blocks** — they’re like virtual "HQs" or portals for each community, guild, or knowledge cluster in your ecosystem.

Each one is deployed using a **name** that was already registered through the [MpNSRegistry](./MpNSRegistry.sol) (your metaverse’s naming system).

 🧠 Why Use a Factory?

- ✅ It **guarantees** that every Genesis Block uses a verified name (like “ai-lab”, “task-force-7”)
- ✅ It **stores and tracks** all factions that have been deployed
- ✅ It **pulls descriptive context** (like IPFS data or links) from MpNS
- ✅ It **saves gas** using minimal proxy deployment (EIP-1167)

 ⚙️ How It Works

1. Someone first registers a name in `MpNSRegistry` (e.g., "genesis-x")
2. They call `deployFaction("genesis-x")` through this factory
3. The factory checks they own that name
4. It clones a `GenesisBlockFaction` contract
5. That new contract:
   - Binds to the name
   - Stores URI from MpNS (like faction description or rules)
   - Logs creation info

 🔐 Role Permissions

| Role | What They Can Do |
|------|------------------|
| `DEPLOYER_ROLE` | Deploy new GenesisBlock contracts |
| `DEFAULT_ADMIN_ROLE` | Set permissions and update roles |
| `UPGRADER_ROLE` | Upgrade the factory if needed |

> By default, the deployer is the contract creator or your DAO.

 🗂️ Core Functions

 📦 `initialize(mpnsAddress, factionImpl)`
Sets up the factory with:
- The address of the MpNSRegistry
- The address of the GenesisBlockFaction contract template (UUPS logic)

 🚀 `deployFaction(string name)`
Deploys a new Genesis Block using a name from MpNS

- ✅ Only allowed if caller owns the name
- 🧠 Auto-reads URI from MpNS (e.g., IPFS data for faction)

 📬 `factionsByName(name)`
Look up the address of a deployed faction using its name.

 📚 `getAllFactions()`
Returns a list of all faction contracts deployed through this factory.

🧬 Example Use Case

1. Alice registers `"data-federation"` in MpNS
2. She calls `deployFaction("data-federation")`
3. Factory deploys a Genesis Block for that name
4. Anyone can now query it and read its URI data
5. The Genesis Block can later host governance, tasks, and AI models specific to that faction

 🧰 Behind the Scenes

This factory uses the **EIP-1167 minimal proxy pattern**, which means:
- Clones are cheap to deploy
- All clones share the same logic (from a base contract)
- Each faction still has its own unique storage and context

 🧱 Future Extensions

You could extend this factory to:
- Track creator addresses and timestamps
- Assign faction-specific governance tokens
- Auto-connect each faction to `CrossFactionHub`
- Emit on-chain registry proofs for third-party indexing

 🔗 Related Contracts

- [MpNSRegistry.sol](./MpNSRegistry.sol) — Registers immutable names and updatable URIs
- [GenesisBlockFaction.sol](./GenesisBlockFaction.sol) — The deployed faction logic
- [CrossFactionHub.sol](./CrossFactionHub.sol) — A shared DAO/governance space for multi-faction collaboration

 📌 Summary

GenesisBlockFactory ensures:
- 💡 All factions are built from valid MpNS names
- 🧬 All factions inherit consistent logic
- 📖 All creations are traceable and indexable

Think of it as your **official franchise launcher** for the metaverse.

```
