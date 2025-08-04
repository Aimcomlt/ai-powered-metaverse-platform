````markdown
 ⚖️ HouseOfTheLaw.sol

 🧭 What is this?

**HouseOfTheLaw** is the metaverse’s official reward and governance smart contract.

It manages:
- ✅ Distribution of **Governance Tokens (GT)** and **Functional Tokens (FT)** after validated tasks
- ✅ Creation and voting on **governance proposals**
- ✅ Optional execution of **on-chain actions** when a proposal passes

> Think of this as your *constitutional chamber* where tasks get rewarded and policy gets made.

 🧩 Components It Connects To

| Contract | Role |
|---------|------|
| `ProofOfObservation` | Verifies user task completions |
| `GovernanceToken` | ERC-1155 GT system (vote eligibility) |
| `FunctionalToken` | ERC-1155 utility token (FT) minting |
| `GenesisBlockFaction` (optional) | Can call into this contract for local governance |
| `CrossFactionHub` (optional) | This can act as a sub-governance module |

 🎁 Task Rewards

When a user completes a **verified task**:

1. The `ProofOfObservation` contract calls `rewardFromPoO()`
2. The user receives:
   - **Governance Tokens (GT)** → used for voting power
   - **Functional Tokens (FT)** → usable across the metaverse

 💡 Token Math

- **`alpha`** (basis points): Controls how many FT tokens are minted per GT earned  
  > e.g. `alpha = 10_000` means 1 FT per GT
- **`reserveRatio`** (basis points): How much GT is retained to **back the FT economy**  
  > e.g. `reserveRatio = 2000` means 20% GT is not converted into FT

```solidity
FT amount = (gtReward * alpha * (10000 - reserveRatio)) / 10000 / 10000
````

 🗳️ Governance Proposals

Users can create **proposals** with:

* `description` → plain text explanation
* `ipfsHash` → link to detailed metadata off-chain
* `target` → (optional) contract address to execute logic
* `data` → (optional) calldata to send to `target`
* `eligibleGTId` → restrict voting to a certain GT token

 ✅ Requirements to Create

* You **must hold** the GT token ID tied to that proposal’s eligibility

  > Useful for faction-specific votes!

 🧮 Voting Rules

Uses **quadratic voting**:

* The more votes you cast, the **more it costs**
* Cost formula:

```solidity
cost = newVotes² - previousVotes²
```

* Voting is **only allowed** if you hold the required `eligibleGTId`

 🧠 Example

| You cast... | You pay... |
| ----------- | ---------- |
| 1 vote      | 1 GT       |
| 2 votes     | 4 GT       |
| 3 votes     | 9 GT       |

Votes are deducted from your GT balance stored in `HouseOfTheLaw`.

 ⚙️ Proposal Execution

If a proposal:

* Has not already been executed
* Has more than 0 votes
* Has a valid `target` contract

... then anyone can call `executeProposal()` to trigger the on-chain action.

 🗂️ Key Events

| Event              | What It Means                                        |
| ------------------ | ---------------------------------------------------- |
| `TaskRewarded`     | A user received GT + FT from PoO                     |
| `ProposalCreated`  | A new governance proposal was submitted              |
| `Voted`            | A user voted (and spent GT)                          |
| `ProposalExecuted` | An on-chain action was triggered via passed proposal |

> `Voted` and `ProposalExecuted` also include `eligibleGTId` for **faction-based analytics**.

 🛡️ Roles

| Role                 | What They Do                                  |
| -------------------- | --------------------------------------------- |
| `DEFAULT_ADMIN_ROLE` | Assigns PoO and manages contract config       |
| `UPGRADER_ROLE`      | Can upgrade the contract logic via UUPS proxy |

 🔮 Future Suggestions

* ✅ Add GT **staking** before voting
* ✅ Connect faction-specific `GenesisBlock` instances for scoped governance
* ✅ Emit **off-chain metadata** to decentralized indexers (IPFS/Subgraph)
* ✅ Snapshot GT balances across proposals

 🧪 Example Flow

```text
1. Alice completes Task 42 → PoO validates → GT + FT minted to Alice
2. Alice proposes to add a new AI model → `createProposal()` called
3. Voters with GT ID 7 vote using quadratic logic
4. Proposal passes → executes an upgrade on a model registry contract
```

 📚 Related Contracts

* [`ProofOfObservation.sol`](../observation/PoO_TaskFlow.sol)
* [`GovernanceToken.sol`](../tokens/GovernanceToken.sol)
* [`FunctionalToken.sol`](../tokens/FunctionalToken.sol)
* [`CrossFactionHub.sol`](../governance/CrossFactionHub.sol)

 🏛️ *“The House of the Law ensures every voice echoes with value, and every vote pays its price.”*


