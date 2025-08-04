````markdown
# ⛓️ GTStaking.sol — Governance Token Staking Engine

## 🧠 What Is It?

`GTStaking` is the contract that **locks governance tokens (GTs)** for task participation, **mints rewards (FTs)** when tasks are completed, and determines if users are **eligible to access advanced AI features** or propose new ideas.

It's the **bridge between work, governance, and rewards** in your metaverse.

---

## 🧩 Why It Matters

- ✅ Users must **stake GT** before accessing AI assistance or submitting proposals
- ✅ Tasks are **only marked complete** by the trusted `ProofOfObservation` contract
- ✅ Task rewards (FTs) scale with demand/supply ratios
- ✅ Every GT stake is tracked for safety and withdrawal
- ✅ It protects the system from spam proposals and unfounded contributions

---

## 📌 Lifecycle Flow

```mermaid
graph TD
    U[User stakes GT] --> V[Eligible to access AI or propose]
    V --> P[Performs task]
    P --> PoO[ProofOfObservation validates]
    PoO --> S[GTStaking.mintReward()]
    S --> F[User receives FT reward]
    F --> U2[User can now unstake GT]
````

---

## 🔐 Roles & Access

| Role                 | What It Can Do                                      |
| -------------------- | --------------------------------------------------- |
| `DEFAULT_ADMIN_ROLE` | Set task metrics, assign PoO contract               |
| `UPGRADER_ROLE`      | Upgrade contract logic via UUPS                     |
| `ProofOfObservation` | Finalize task completion and trigger reward minting |

---

## ⚙️ Core Features

### 🧱 `stake(uint256 tokenId, uint256 amount)`

Locks GT tokens from the user to access tasks or AI console.

---

### 🪙 `completeTask(address user, uint256 tokenId, uint256 amount, uint256 taskId)`

Called **only by ProofOfObservation** when a task is validated.

* Transfers GT back to the user
* Mints FunctionalToken (FT) as a reward
* Logs the task as completed

---

### 📐 `calculateReward(uint256 taskId)`

Applies basic demand/supply reward logic:

* 🔺 If demand > supply → bonus FT
* 🔻 If supply > demand → lower FT
* ⚖️ Balanced → 1x FT

---

### 👁️ `isEligibleForAI(address user, uint256 tokenId, uint256 minAmount)`

Check if a user has enough GT locked to unlock features like:

* The **AI Assistant UI**
* **Proposal creation** in `HouseOfTheLaw`

---

### 🔓 `unstake(address user, uint256 tokenId)`

User retrieves GT after task completion or cancellation.

---

## 📈 Use Case Example

1. Alice stakes 5 GT with `tokenId = 7`
2. She now gains access to the AI Console UI
3. She completes a faction-specific task
4. `ProofOfObservation` verifies the outcome
5. `completeTask()` is called → she gets rewarded with FTs
6. She can now unstake her GT or keep using them to access the console

---

## 🔗 Dependencies

* `GovernanceToken.sol`: must support `stakeTransferFrom`
* `FunctionalToken.sol`: must support `mint(to, id, amount)`
* `ProofOfObservation.sol`: verifies work validity

---

## 🧱 Future Extensions

* ✅ Add time-based lock windows (vesting)
* 📦 Batch staking for multiple GT IDs
* 🌐 On-chain AI scoring feedback loops
* 🛡️ Slashing penalties for false PoO attempts

---

## 🧬 Summary

> GTStaking ensures every high-value interaction in your metaverse is earned.

It guarantees that users are:

* Contributing work before unlocking rewards
* Gated from sensitive features until committed
* Protected from reward manipulation

> Think of it as your **economic firewall and participation tracker**.

