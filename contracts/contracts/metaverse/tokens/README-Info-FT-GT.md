````markdown
# 🪙 Token System: Governance Tokens (GTs) & Functional Tokens (FTs)

Welcome to the heart of your decentralized metaverse economy.  
This document explains in plain language how your token system works, why it matters, and how it drives real value through **proof of effort**, **task completion**, and **fair access**.

---

## 🔄 Two Tokens, Two Purposes

| Token Type | Purpose | Transferable? | Minted When? |
|------------|---------|----------------|----------------|
| 🎓 **GT** (Governance Token) | Proof of your contribution, learning, or helpful actions | ❌ Soulbound (non-transferable) | After work is verified by Proof of Observation |
| ⚙️ **FT** (Functional Token) | Usable rewards for completing tasks or powering tools | ✅ Yes | After using GT to unlock and complete a real task |

---

## 🎓 Governance Tokens (GTs)

### What They Represent
GTs are like medals of honor or digital CV entries.  
They show what you've **learned**, **built**, or **contributed** — and each one has its own embedded story (e.g. "AI Level 2 - Data Training Task Complete").

### How They're Created
1. You complete a verifiable task (e.g. training video, tutorial, faction contribution).
2. That work is reviewed and validated using the **Proof of Observation** system.
3. If approved, you're awarded a **non-transferable GT** with metadata:
   - Your faction
   - The task ID
   - Your level
   - A URI to proof (like IPFS)

### Why They're Soulbound
GTs can’t be traded — they're your identity and track record.  
You can't sell your skills, and no one can fake your progress.

### What They're Used For
GTs can be **staked** to:
- Access exclusive tools like AI Task Builders
- Unlock higher-level or faction-specific challenges
- Gain governance influence in HouseOfTheLaw (e.g. voting, proposals)

---

## ⚙️ Functional Tokens (FTs)

### What They Represent
FTs are **earned rewards** for completing AI-powered tasks, contributions, or tool development.  
Think of them like reputation-backed utility tokens.

### How They're Created
1. You stake a GT to access an AI-assisted task (e.g. generate prompts, build modules).
2. After submitting the completed task, it's validated by the system.
3. Your GT is unstaked and you’re rewarded with **FTs**.

### Why They Matter
FTs are transferable and usable:
- You can trade them in your DApp marketplace
- Use them to buy access to tools, spaces, or NFTs
- Use them in staking pools or DAO funding proposals

---

## ⚖️ Economic Integrity: Proof-Backed Minting

This system avoids inflation and abuse by making sure:
- GTs can **only be minted after real, validated work**
- FTs can **only be minted after real, GT-backed tasks are completed**
- All value creation is **anchored to contribution and effort**

---

## 🧠 Example: Your Journey

```plaintext
🎯 You complete a tutorial ➝ submit proof ➝ earn a GT
🧠 You stake GT ➝ unlock AI assistant ➝ build a tool
✅ Task validated ➝ GT unstaked ➝ you earn FTs
````

You now:

* Have a growing on-chain reputation (GTs)
* Earn usable rewards (FTs)
* Unlock new opportunities in the metaverse

---

## 🛡️ Soulbound + Utility = Sustainable

GTs = Your credentials
FTs = Your currency

Together, they:

* Prevent abuse
* Encourage honest learning
* Fuel a thriving ecosystem where **value is earned, not bought**

---

## 📦 Tech Overview

| Smart Contract           | What It Does                                          |
| ------------------------ | ----------------------------------------------------- |
| `GovernanceToken.sol`    | Mints soulbound GTs after Proof of Observation        |
| `FunctionalToken.sol`    | Mints usable FTs after task completion and GT staking |
| `ProofOfObservation.sol` | Validates work and controls minting access            |
| `PoO_TaskFlow.sol`       | Handles FT minting after GT-backed task completion    |

---

> This is more than just tokens.
> It’s a full-circle economy of learning, building, validating, and rewarding — all on-chain.

```
