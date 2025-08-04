```markdown
# 🏛️ HouseOfTheLaw.sol — Modular Governance for the Metaverse

The `HouseOfTheLaw` smart contract governs how **proposals, voting, and task validations** happen within a decentralized, faction-based Metaverse learning platform.

It embodies the **core values of transparency, meritocracy, and participation** through a *quadratic voting* system and **non-transferable governance tokens (GTs)**. This contract enables platform contributors to shape their factions' futures by **earning their voice** — not buying it.

 🔍 What Does This Contract Do?

 ✅ Task Validation & Rewards
Validators can **verify user-submitted tasks** (e.g., educational modules, content contributions) and:
- Reward the user with **Governance Tokens (GTs)** — used for voting.
- Automatically mint **Functional Tokens (FTs)** — used for in-platform utility like unlocking content or reputation badges.

 🗳️ Proposal System
Anyone with GTs can:
1. **Create proposals** — Describe an idea or improvement for your faction or the broader platform.
2. **Vote using quadratic voting** — The more votes you want to cast, the more GT it costs.

### 🧠 Quadratic Voting Explained
You vote on proposals not just once, but with **weighted conviction**. The more votes you place, the higher the GT cost grows:

| Votes Cast | GT Cost |
|------------|---------|
| 1          | 1       |
| 2          | 4       |
| 3          | 9       |
| 4          | 16      |

This makes it **expensive to monopolize decisions**, and **rewards sincerity over brute power**.

 🛠 Contract Breakdown

| Feature | Description |
|--------|-------------|
| `validateTask(...)` | Mints GT and FTs after successful validation. |
| `createProposal(...)` | Allows a user to propose an idea with a description. |
| `vote(...)` | Lets a GT holder cast votes quadratically on proposals. |
| `governanceBalance` | Tracks each user's GT balance (non-transferable). |
| `functionalToken` | ERC-1155 interface for minting rewards (FTs). |
| `alpha` / `reserveRatio` | Used to calculate FT supply based on GT total. |
| `proposalCount` / `proposals` | Maintains all submitted proposals. |

 🔐 Access Control

- `DEFAULT_ADMIN_ROLE` — Contract administrator.
- `VALIDATOR_ROLE` — Can validate tasks and issue rewards.
- `UPGRADER_ROLE` — Authorized to perform contract upgrades via UUPS proxy.

Roles are managed using **OpenZeppelin's AccessControlUpgradeable**.

 🔄 FT Minting Formula (Reward Logic)

FTs minted are based on total GT supply using:

```

ftAmount = totalGT \* alpha \* (1 - reserveRatio) / 10,000^2

````

This ensures **FT rewards scale sustainably** with platform participation, avoiding inflation while keeping incentives strong.


## 📦 Installation (For Developers)

```bash
npm install @openzeppelin/contracts-upgradeable
````

 🔧 Deployment Notes

* Deploy via OpenZeppelin's upgradeable UUPS proxy pattern.
* Initialize with:

  * `functionalToken` address (ERC-1155 token contract)
  * `alpha` (basis points scaling factor, e.g. 1000 = 10%)
  * `reserveRatio` (basis points, e.g. 2000 = 20%)

Example:

```solidity
initialize(0xFTAddress..., 1000, 2000)
```

 📡 Events Emitted

* `TaskValidated(user, taskId, ftId, ftAmount, gtReward)`
* `ProposalCreated(proposalId, proposer, description)`
* `Voted(proposalId, voter, votes, cost)`

These events make it easy to integrate with frontend dashboards and analytics systems.

 🔍 Use Cases

* Reward members who complete educational modules or contribute content.
* Enable faction-level governance on curriculum, reputation rules, or AI integrations.
* Support **cross-faction governance** (when integrated with `CrossFactionHub`).

 📘 Example Scenario (In Plain English)

1. **Alice completes a blockchain tutorial.**
   A validator approves her work.

2. Alice receives **10 GTs** (for governance) and **50 FTs** (to use in-platform).

3. She proposes: *“Let’s add an AI module to our curriculum.”*

4. **Bob**, who cares a lot, casts **3 votes** — it costs him **9 GTs**.

5. Proposal gathers enough support → action is taken.
   The contract could be extended to trigger smart contract execution.

 🧩 Future Extensions

* Add proposal execution logic (e.g. automatic funding).
* Introduce voting deadlines.
* Integrate AI agent feedback into proposal drafting.
* Hook into `MpNSRegistry` for storing validated content by name.

 ⚖️ License

MIT — Free to use, fork, or build upon.

 👋 Contributing

If you’d like to contribute improvements, integrations, or faction-specific modules, feel free to fork the repo or submit pull requests.

Together, we build **a transparent, participatory, and knowledge-driven metaverse**.

