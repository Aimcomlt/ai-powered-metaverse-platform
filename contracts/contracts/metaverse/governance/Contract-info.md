````markdown
# 🏛️ HouseOfTheLaw.sol

### Your Metaverse Faction's Voting & Rewards Engine — Now Fully Secured by Proof of Observation ✅

---

## 📌 What is This?

`HouseOfTheLaw` is the smart contract that manages:
- 🗳️ **Proposal creation and voting**
- 🎖️ **Issuing Governance Tokens (GTs)** as reputation
- 💰 **Minting Functional Tokens (FTs)** as rewards

But — it only does so when a user's task is **validated and approved by a trusted Proof-of-Observation (PoO) contract**. This ensures **fairness, transparency, and authenticity** in how users earn their influence and rewards.

---

## 🧠 How It Works (For Non-Devs)

### 1. You complete a task or contribution  
📄 Maybe you finished a tutorial, created content, or built a tool.

### 2. Your task is validated by the PoO system  
🔎 A validator (human or AI) reviews it, using the `ProofOfObservation` contract.

### 3. PoO tells this contract to reward you  
✅ If approved, PoO calls `HouseOfTheLaw` to:
- Increase your GT balance (your factional influence)
- Mint FTs (your usable reward)
- Record the event on-chain

---

## 🔐 Why It’s Secure

This contract **cannot be tricked** into rewarding users directly.  
Only the **authorized PoO contract** can trigger GT/FT rewards.

It also supports **upgradeability** for future features, while maintaining strict access control using roles.

---

## 🗳️ Governance: Quadratic Voting

Users can also create proposals and vote using their GTs.

- Voting costs GT, but follows **quadratic rules**:
  - 1 vote = 1 GT
  - 2 votes = 4 GT
  - 3 votes = 9 GT
  - ...and so on

This ensures **fair representation**, so those with more GT can show more support, but not dominate cheaply.

---

## ⚙️ Key Functions (Explained Simply)

| Function | What It Does |
|---------|---------------|
| `validateTask(...)` | Called by the PoO contract to reward GT + FT to a user. |
| `createProposal(...)` | Anyone can suggest an idea for the faction to vote on. |
| `vote(...)` | Users vote on proposals using GTs (with a quadratic cost). |
| `setProofOfObservation(...)` | Admin sets the only contract allowed to call `validateTask`. |

---

## 📁 Connected Components

| Component | Role |
|----------|------|
| `ProofOfObservation.sol` | Verifies task completion and calls `validateTask(...)` here. |
| `FunctionalToken.sol` | Mints FTs when users complete tasks. |
| `GTStaking.sol` (optional) | Manages staking GTs to unlock AI task tools. |
| `Frontend` | Reads GT balances, voting history, and task events to show user progress.

---

## 🧬 Example Flow

```text
You → complete task → PoO contract → ✅ approved → this contract:
  ✔ GT increased
  ✔ FT minted
  ✔ Event logged
````

You’re now:

* 🎖️ More influential in your faction (GT)
* 💰 Rewarded with usable FTs
* 📜 Eligible to vote or propose new initiatives

---

## ✅ Summary

| Feature      | Description                            |
| ------------ | -------------------------------------- |
| Task Rewards | Earn GT + FT after PoO validation      |
| Voting       | Stake GTs to vote on proposals         |
| Secure       | Only PoO contract can mint rewards     |
| Transparent  | All votes and validations are on-chain |

---

> This contract ensures your **contributions actually matter**, and your **influence is earned**, not bought.

```

---

Would you like the README split into multiple files (e.g., `README.md`, `VOTING.md`, `REWARDS.md`) for better navigation in large repos?
```
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

