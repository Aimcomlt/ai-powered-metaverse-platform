```markdown
 ⚖️ HouseOfTheLaw.sol

 💡 What is this?

`HouseOfTheLaw` is the governance & reward engine for your metaverse.

It:
- 🧠 **Rewards users** with Governance Tokens (GT) and Functional Tokens (FT) after valid contributions.
- 🗳️ **Handles voting** on proposals with quadratic fairness.
- 🛡️ **Protects proposal quality** by requiring AI assistant access before anyone can submit proposals.

 🚦 Key Concepts

| Feature | Role |
|--------|------|
| `GT` | Reputation token (earned, staked, used to vote or access AI) |
| `FT` | Utility token (used to interact with dApps or get benefits) |
| `PoO` | Trusted system that verifies task completion |
| `AI Console` | Only unlocked if user has staked GT and is cleared for interaction |
| `Quadratic Voting` | The more you vote, the more it costs—prevents whales from dominating |

---

 🔄 Lifecycle Overview

```

Task Completed → Verified by PoO
↓
GTs Issued → FTs Minted
↓
User Stakes GT → Opens AI Console
↓
User Creates Proposal (optional on-chain action)
↓
Other users vote (Quadratic Cost)
↓
Proposal Executed (if passed)

````

 🔐 Role-Based Access

| Role | Description |
|------|-------------|
| `DEFAULT_ADMIN_ROLE` | Can configure trusted contracts |
| `UPGRADER_ROLE` | Can upgrade this contract |
| `PoO` (external) | Only this contract can trigger GT/FT rewards |
| `AI Console` (external) | Must be open before a user can propose |

 🧬 Proposal Structure

Each proposal includes:
- `description`: What it's about
- `ipfsHash`: Optional off-chain metadata or visuals
- `target`: Smart contract to call when passed
- `data`: Calldata for that contract
- `eligibleGTId`: Only users holding this GT token can vote

 🧰 Core Functions

 ✅ `rewardFromPoO(user, taskId, ftId, gtReward)`
Issues GT to the user and mints FTs.
- 🔐 Can only be called by the PoO contract

 🧠 `createProposal(desc, ipfsHash, eligibleGTId, target, data)`
Starts a new proposal.
- 🚫 Requires AI Console to be open
- ✅ Checks if proposer holds the GT token required for that faction

 🗳️ `vote(proposalId, votes)`
Quadratic voting.
- Cost = (newVotes² - oldVotes²)
- You must hold the right GT ID

 🚀 `executeProposal(proposalId)`
- Calls external contract using stored `target` and `data`
- Only succeeds if votes are in favor

 🛡️ Anti-Spam AI Gate

> Users can **only create proposals** if they’ve opened the AI Assistant console.

This ensures:
- ❌ No random or harmful proposals
- ✅ Pre-validation before publishing
- 🤖 Option to incorporate GPT checks or curation layers

 📈 Emitted Events

| Event | Description |
|-------|-------------|
| `TaskRewarded` | When a user completes a task and earns tokens |
| `ProposalCreated` | When a valid proposal is published |
| `Voted` | When someone casts quadratic votes |
| `ProposalExecuted` | When a passed proposal is executed on-chain |

 🔗 External Contracts Required

- `IAIAssistantGate` (to check console status)
- `IGovernanceToken` (for GT balance eligibility)
- `IFunctionalToken` (to mint FTs)
- `PoO` (for trusted validation)

 🧱 Example Use Case

```solidity
// From PoO contract
HouseOfTheLaw(rewarder).rewardFromPoO(user, taskId, 1, 20);

// From UI with console open
house.createProposal(
  "Launch new faction model",
  "ipfs://Qm...",
  1,
  address(treasury),
  abi.encodeWithSignature("allocateFunds(address,uint256)", alice, 500 ether)
);
````

 📌 Summary

✅ Encourages quality contributions
🧠 Incentivizes deep participation
🧱 Enforces faction-specific governance
🤖 Builds trust via AI-gated access

> It's the **governing temple** of your metaverse: fair, vetted, and intelligent.
