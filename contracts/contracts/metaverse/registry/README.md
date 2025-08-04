````markdown
 🌐 MpNSRegistry – Metaverse Naming System

 🔍 What is This?

**MpNSRegistry** is the official **Metaverse Naming Service**.

It allows humans to register readable names (like `"ai-faction"`) that point to technical content (like an IPFS hash). Once a name is registered, it becomes your unique **descriptive identity** inside the AI-powered metaverse.

Think of it like a **DNS for the Metaverse**, but:
- The name **never changes**
- The linked content (e.g., metadata, rules, URIs) **can be updated**
- Names can be **frozen** for permanent use (like when a faction is deployed)

 🧱 Key Concepts

| Concept | Description |
|--------|-------------|
| **Descriptive Name** | A human-readable name (e.g., `"genesis-builder"`) |
| **URI** | Points to content like IPFS, Arweave, or JSON metadata |
| **Frozen Name** | Once frozen, the name and its ownership can never change |
| **Registry** | This contract holds all names, links, and metadata securely on-chain |

 💡 Why It Matters

- ✅ Used to **deploy factions** via `GenesisBlockFactory`
- ✅ Provides **persistent public identity** across projects
- ✅ Works like a web3-native **indexer**
- ✅ URI can hold project rules, roles, or assets via IPFS

 ⚙️ How It Works

 🆕 `register(name, owner, duration, uri)`
Registers a **new name** to a wallet with:
- A time-limited lease
- A pointer URI (IPFS, Arweave, etc.)

> 🚫 The name (e.g., `"ai-lab"`) **cannot be changed later**

 🔁 `updateURI(name, newUri)`
Lets the name owner **change the linked content** (e.g., update a project’s rules or banner on IPFS).

 🔒 `freezeName(name)`
Locks the name and makes it **immutable forever**:
- Cannot update the URI anymore
- Cannot transfer to another owner
- Used when finalizing a faction identity

 👥 `transfer(name, newOwner)`
Changes who owns the name **(only before freezing)**

 🔍 `nameToUri(name)`
Read the **current IPFS URI** for a name

 🔍 `ownerOf(name)`
Returns the wallet that owns the name

 🔍 `expirationOf(name)`
Returns the lease time left (in seconds)

 🔍 `isFrozen(name)`
Returns `true` if name is permanently locked

 🔐 Roles & Access Control

| Role | What It Can Do |
|------|----------------|
| `REGISTRAR_ROLE` | Register names for users |
| `DEFAULT_ADMIN_ROLE` | Manage access roles |
| `UPGRADER_ROLE` | Upgrade contract logic if needed |

> Registrars may be DAOs, core teams, or automated onboarding bots.

 🔗 Example Use Flow

1. 🧠 Alice registers `"ai-hub"` with a link to an IPFS page describing her faction
2. 🏗️ She deploys a `GenesisBlockFaction` using this name
3. 🔐 The name is frozen — `"ai-hub"` now points to her faction forever
4. 🧬 URI can be updated as the project evolves (until frozen)
5. 🌍 External apps index names like `"ai-hub"` → content hash

 🌐 Integration Map

```text
[User Registers Name]
         ↓
[MpNS stores name → URI]
         ↓
[GenesisBlockFactory deploys faction tied to name]
         ↓
[Faction reads descriptive label and pulls data from MpNS]
         ↓
[URI updates allow live changes to content — unless frozen]
````

 📌 Summary

* MpNS is the **descriptive backbone** of your decentralized metaverse
* Names are readable, immutable, and backed by content-addressable links
* Every faction, project, or initiative can live under a meaningful public label

> The metaverse starts with a name. MpNS makes sure it's permanent, traceable, and decentralized.

```
