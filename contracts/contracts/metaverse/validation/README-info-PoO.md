````markdown
# 🔁 PoO_TaskFlow.sol — AI-Gated Task Reward Validator

## 🎯 Purpose

`PoO_TaskFlow` is a smart contract that controls how **Functional Tokens (FTs)** are rewarded **after a task is completed** — but only if the task passes through a multi-layered validation system involving:

- 🤖 An **AI Assistant Console** (must be active for the user)
- ✅ **Proof of Observation (PoO)** records (task must be submitted and validated)
- 🧠 **Content moderation** + **Uniqueness check**
- 🔒 **GT token staking** (user must have staked a Governance Token to access the task)

Only after all conditions are met does this contract:
- 🧬 Unstake the GT
- 🎁 Mint the FT reward
- 📜 Emit reward + validation logs

---

## 🧠 How It Works (Lifecycle Flow)

```text
User stakes GT token (GTStaking)
          ↓
User opens AI Assistant Console (AI Gate required)
          ↓
User completes and submits task (via ProofOfObservation)
          ↓
Validator checks:
    - Was the console open?
    - Was the submission moderated and unique?
    - Was GT staked?
    - Was PoO task validated and matches user?
          ↓
If all pass:
    - GT is unstaked
    - FT is minted
    - Task marked as rewarded ✅
````

---

## 🧰 Core Functions

### 🔐 `initialize(...)`

Sets up references to the four required external contracts:

* `FunctionalToken` (used to mint reward)
* `GTStaking` (to check/unstake GT)
* `ProofOfObservation` (task submissions)
* `AIAssistantGate` (UI layer flag)

---

### 🪙 `rewardAfterTask(...)`

Called by a human validator with the `VALIDATOR_ROLE` after reviewing the task and verifying it off-chain.

Checks:

* AI console was open (`aiGate.isConsoleOpen(user)`)
* Submission passed moderation and is unique
* Task was submitted + validated via PoO
* User staked the required GT token
* Task hasn't been rewarded already

If all pass:

* FT is minted
* GT is unstaked
* Events emitted
* Task marked as rewarded

---

## 🛡️ Roles

| Role                 | Permission                          |
| -------------------- | ----------------------------------- |
| `DEFAULT_ADMIN_ROLE` | Can update references, manage roles |
| `VALIDATOR_ROLE`     | Can call `rewardAfterTask()`        |
| `UPGRADER_ROLE`      | Can upgrade the contract            |

---

## 📦 Events

* `TaskRewarded(user, taskId, ftId, amount)` — After FT minting
* `TaskOffchainValidated(user, taskId, moderationPassed, uniqueSubmission)` — Off-chain review log

---

## 🔌 Connected Contracts

| Contract             | Purpose                           |
| -------------------- | --------------------------------- |
| `FunctionalToken`    | Mints FT rewards                  |
| `GTStaking`          | Verifies and unstakes GTs         |
| `ProofOfObservation` | Validates that task was submitted |
| `AIAssistantGate`    | Ensures UI console was open       |

---

## 💡 Why This Layer Matters

This contract is a **final checkpoint** in the Proof of Observation reward pipeline.

It ensures:

* 🧠 AI interface was used (keeps UX consistent)
* 🧽 Content meets moderation standards
* 🚫 No double rewards or fraudulent reuse
* 🔁 GT token flow is respected
* 👁️ PoO validation is verifiable on-chain

---

## 📌 Summary

> Think of `PoO_TaskFlow` as your **reward guardian**.
> It ensures only **intentional, AI-reviewed, and community-compliant work** results in tokenized rewards.

