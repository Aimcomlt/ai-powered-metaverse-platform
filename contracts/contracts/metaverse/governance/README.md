```markdown
# 🏛️ Governance System – AI-Powered Metaverse

This folder contains smart contracts that govern proposals, voting, and task validation for the AI-powered metaverse platform. These contracts form the **House of the Law**, where decisions are made using **Governance Tokens (GTs)** earned through validated contributions.

---

## 📦 Contracts in This Folder

| Contract | Purpose |
|---------|---------|
| **HouseOfTheLaw.sol** | Core governance contract for proposals, voting, and GT issuance logic |
| **CrossFactionHub.sol** | Placeholder for a DAO gateway to enable multi-faction governance and shared decisions |

---

## 🧠 Governance in Simple Terms

> Contributors **earn GTs** by completing meaningful tasks.  
> GTs can be **staked** to propose or vote on improvements.  
> Voting uses a **quadratic model**, which makes votes cost more the more influence you exert.  
> Once a proposal passes or a task is completed, **FTs (Functional Tokens)** are minted as a reward.

---

## 🪙 Governance Tokens (GTs)

- GTs are **non-transferable** (soulbound) ERC-1155 tokens that:
  - Represent reputation and experience
  - Can be **staked** to unlock AI task UIs
  - Are **unlocked and burned** once the task is completed
- **Minted only by ProofOfObservation.sol**, not directly in governance

---

## 🧰 Key Functions: HouseOfTheLaw.sol

### ✅ `validateTask(user, taskId, ftId, gtReward)`
- Rewards a user with GTs for completing an approved task
- Computes how many FTs to mint based on GT supply and a formula
- Emits an event for transparency

> ⚠️ **Only callable by `VALIDATOR_ROLE`**, which is assigned to `ProofOfObservation`

---

### 🧠 `createProposal(description)`
- Allows any GT holder to propose an idea or system change
- Creates a new proposal with a description and sets vote tally to 0

---

### 🗳️ `vote(proposalId, votes)`
- Users vote on a proposal by spending their GTs
- **Quadratic voting:** Cost = (new_votes² - old_votes²)
- The vote tally increases and user’s GT balance decreases accordingly

---

## 🔐 Roles & Permissions

| Role | Who Uses It |
|------|-------------|
| `DEFAULT_ADMIN_ROLE` | Admins (e.g., DAO, deployer) |
| `VALIDATOR_ROLE` | Assigned to PoO to validate tasks |
| `UPGRADER_ROLE` | Allows safe upgrades via UUPS pattern |

---

## 📊 Tokenomics Parameters

| Parameter | Description |
|----------|-------------|
| `alpha` | Controls FT minted per GT staked (in basis points, e.g., 10000 = 1:1) |
| `reserveRatio` | Portion of FT withheld as system reserve (e.g., 2000 = 20%) |

Formula used to calculate FT reward:

```

// GT reward from the validated task drives FT minting
FT = (gtReward \* alpha \* (1 - reserveRatio)) / 10000²

````

---

## 🌉 CrossFactionHub.sol (WIP)

- Placeholder contract for a **multi-faction DAO coordinator**
- Will enable proposals and interactions **across different Genesis Blocks**
- Currently only sets up roles for future extension

---

## 🧱 Integration Map

```text
User Completes Task ➝ PoO Validates ➝ GT Minted ➝ GT Staked
        ↓                                ↑
   AI Task Unlocked                GT Tracked in HouseOfTheLaw
        ↓
   Task Completed ➝ PoO_TaskFlow Unstakes GT ➝ FTs Minted
        ↓
   HouseOfTheLaw Enables Voting/Proposals
````

---

## 📂 Related Modules

| Module                                      | Purpose                                              |
| ------------------------------------------- | ---------------------------------------------------- |
| [`ProofOfObservation.sol`](../observation/) | Validates submissions and triggers GT minting        |
| [`PoO_TaskFlow.sol`](../observation/)       | Handles FT minting after task is completed           |
| [`GovernanceToken.sol`](../tokens/)         | Soulbound ERC-1155 GTs                               |
| [`FunctionalToken.sol`](../tokens/)         | FTs as utility rewards for task success              |
| [`GenesisBlockFaction.sol`](../core/)       | Faction-specific deployment tied to MpNS             |
| [`MpNSRegistry.sol`](../core/)              | Naming system used to bind factions to metadata/IPFS |

---

## ✅ Deployment Notes

1. Deploy `GovernanceToken` (soulbound GT)
2. Deploy `FunctionalToken` (FT)
3. Deploy `ProofOfObservation`, grant it MINTER role on `GovernanceToken`
4. Deploy `HouseOfTheLaw`, link it to `FunctionalToken`
5. Grant `VALIDATOR_ROLE` in HouseOfTheLaw to PoO contract
6. Deploy `PoO_TaskFlow` and `GTStaking` as needed

---

## 🧠 Summary

The governance contracts in this folder form the **decision-making core** of your AI-powered metaverse. They ensure only real contributors gain voting power, and only after validation. This modular and fair system helps grow a collaborative ecosystem where effort, not wealth, earns influence.

```
