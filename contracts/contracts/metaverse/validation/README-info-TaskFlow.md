````markdown
# 🧠 PoO_TaskFlow.sol — Task-Based FT Reward Engine

This smart contract is part of the **AI-Powered Metaverse Platform**.

It handles the final step in the reward process:  
After a user has staked a GT and completed a task — and that task has been validated — this contract mints a **Functional Token (FT)** as a reward and returns the GT back to the user.

---

## 💡 What This Contract Does (In Plain Language)

| Step | What Happens |
|------|---------------|
| 1️⃣ | A user **stakes their GT (Governance Token)** to show they're ready to work |
| 2️⃣ | The user completes a task (like writing AI prompts or solving a logic challenge) |
| 3️⃣ | That task gets **validated** by an authority (via `ProofOfObservation`) |
| 4️⃣ | This contract checks the task is valid and not previously rewarded |
| 5️⃣ | The GT is returned (unstaked), and the user earns a **FT (Functional Token)** |
| 6️⃣ | The reward is recorded so it can’t happen again for the same task |

---

## 🛠️ Why This Matters

This contract protects the **value and fairness** of the system:

- ✅ **Prevents double rewards** for the same task
- ✅ **Ensures real GT commitment** (user had to stake)
- ✅ **Only rewards verified contributors**
- ✅ **Enforces AI console gating and off-chain checks**
- ✅ **Separates proof (PoO) from payout** logic

This contract ensures **only real work gets rewarded** with usable Functional Tokens (FTs) and discourages spam, gaming, or accidental minting.

---

## 🔐 Key Components

| Interface | What It Does |
|-----------|--------------|
| `IGTStaking` | Checks if GT was staked, and unstake it afterward |
| `IFunctionalToken` | Mints the actual reward (FTs) |
| `IProofOfObservation` | Confirms the task was submitted and validated |
| `IAIAssistantGate` | Verifies the user's AI console is open |

---

## ✍️ Example Scenario

Let’s say Alice wants to build a prompt model for an AI assistant.

1. She first **stakes a GT** (proof she’s earned the right to build)
2. She finishes her task and submits it
3. The **PoO contract validates** her submission
4. This contract is triggered:
   - Confirms her GT was staked
   - Confirms her task was valid
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

---

## 🧾 Summary

* 🧠 This contract handles final reward minting for validated, GT-backed tasks
* 🧷 It verifies the GT was staked, the task was validated, and prevents double-minting
* 🧩 Works alongside `GTStaking`, `ProofOfObservation`, `AIAssistantGate`, and `FunctionalToken`

This creates a **fair and secure token economy**, ensuring real effort = real reward.

```
