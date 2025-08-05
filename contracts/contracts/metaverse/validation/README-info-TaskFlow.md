````markdown
# 🧠 PoO_TaskFlow.sol — Task-Based FT Reward Engine

This smart contract is part of the **AI-Powered Metaverse Platform**.

It handles the final step in the reward process:  
After a user has staked a GT and completed a task — and that task has been validated — this contract mints a **Functional Token (FT)** as a reward and returns the GT back to the user.

---

## 💡 What This Contract Does (In Plain Language)

| Step | What Happens |
|------|---------------|
| 1️⃣ | A user **stakes their GT (Governance Token)** with the AI console open |
| 2️⃣ | The user completes a task (like writing AI prompts or solving a logic challenge) |
| 3️⃣ | The task proof is **filtered off‑chain** for moderation and plagiarism |
| 4️⃣ | The sanitized submission gets **validated** by an authority (via `ProofOfObservation`) |
| 5️⃣ | This contract checks the task is valid and not previously rewarded |
| 6️⃣ | The GT is returned (unstaked), and the user earns a **FT (Functional Token)** |
| 7️⃣ | The reward is recorded so it can’t happen again for the same task |

---

## 🛠️ Why This Matters

This contract protects the **value and fairness** of the system:

- ✅ **Prevents double rewards** for the same task
- ✅ **Ensures real GT commitment** (user had to stake)
- ✅ **Only rewards verified contributors**
- ✅ **Enforces AI console gating at stake and reward**
- ✅ **Uses off-chain moderation & duplicate detection before PoO validation**
- ✅ **Separates proof (PoO) from payout** logic

This contract ensures **only real work gets rewarded** with usable Functional Tokens (FTs) and discourages spam, gaming, or accidental minting.

---

## 🔐 Key Components

| Interface | What It Does |
|-----------|--------------|
| `IGTStaking` | Checks if GT was staked, enforces cooldowns, and unstake it afterward |
| `IFunctionalToken` | Mints the actual reward (FTs) |
| `IProofOfObservation` | Confirms the task was submitted and validated |
| `IAIAssistantGate` | Verifies the user's AI console is open |

---

## ✍️ Example Scenario

Let’s say Alice wants to build a prompt model for an AI assistant.

1. She first **stakes a GT** with her AI console open (staking is blocked during cooldowns)
2. She finishes her task and submits it
3. An off-chain service filters the proof for moderation and plagiarism
4. The **PoO contract validates** her sanitized submission
5. This contract is triggered:
   - Confirms her GT was staked
   - Confirms her task was valid and passed off-chain checks
   - Unstakes her GT
   - Mints a FT to her wallet (reward!)

Now Alice has a tradable or usable token — backed by proof of work.

---

## 🔒 Roles

| Role | Who Has It | What They Can Do |
|------|------------|------------------|
| `VALIDATOR_ROLE` | DAO agents or AI auditors | Call the `rewardAfterTask()` function |
| `UPGRADER_ROLE` | Admin or DAO | Approve upgrades to the contract |
| `DEFAULT_ADMIN_ROLE` | Owner | Set permissions, configure system |

---

## 📦 Deployment Info

### Initialize Function:
```solidity
initialize(
  address functionalToken,
  address gtStaking,
  address proofOfObservation,
  address aiGate
)
````

### Function to Trigger Rewards:

```solidity
rewardAfterTask(
  address user,
  uint256 tokenId,  // GT used
  uint256 taskId,
  uint256 ftId,     // FT to be minted
  uint256 ftAmount,
  bool moderationPassed,
  bool uniqueSubmission
)
```

### Function to Record Failures & Cooldown:

```solidity
failTask(
  address user,
  uint256 tokenId,
  uint256 taskId
)
```

---

## 🧾 Summary

* 🧠 This contract handles final reward minting for validated, GT-backed tasks
* 🧷 It verifies the GT was staked, the task was validated, and prevents double-minting
* 🚦 Tasks that fail moderation or aren't submitted can trigger a cooldown
* 🧩 Works alongside `GTStaking`, `ProofOfObservation`, `AIAssistantGate`, and `FunctionalToken`

This creates a **fair and secure token economy**, ensuring real effort = real reward.

```
