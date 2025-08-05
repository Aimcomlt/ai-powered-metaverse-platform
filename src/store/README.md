# Redux Store Overview

This directory houses Redux slices that hold application state for the AI‑Powered Metaverse Platform. Each section below explains what a slice tracks, when it changes, and how it ties into smart contracts and the interface.

## AI Recommendations (`ai`)
- **What it does:** stores AI generated suggestions for the user interface.
- **Key action:** `setRecommendations`.
  - Trigger: API call to the AI service completes.
  - Effect: updates the list of tips shown in the AI console; no blockchain interaction.
- **Example flow:** user opens the AI helper → front end requests recommendations → `setRecommendations` saves them → UI lists the new tips.

## Governance Token (`gt`)
- **What it does:** keeps the user’s governance token profile, wallet balance, and staked amounts.
- **Key actions:**
  - `setProfile` – triggered after reading on-chain profile when the wallet connects. Updates faction and level displayed in the UI.
  - `setBalance` – called after a balance query or token transfer. Refreshes the token amount shown.
  - `stakeGT` – fired when a user clicks a “Stake” button. Sends a transaction to the `GTStaking` contract and adjusts local balance and staked record.
  - `unstakeGT` – triggered by an “Unstake” action. Calls `GTStaking` to release tokens and updates the store.
- **Connections:** interacts with the `GovernanceToken` and `GTStaking` contracts and drives features that depend on token ownership or staking.
- **Example flow:** user connects wallet → app fetches faction/level → `setProfile` updates store → dashboard shows faction content; later the user stakes tokens → blockchain transaction succeeds → `stakeGT` updates balances → staking widgets reflect new totals.

## Tasks (`task`)
- **What it does:** holds available tasks, the currently selected task, and metrics pulled from the blockchain.
- **Key actions:**
  - `setTasks` – invoked after tasks are fetched from an API or contract. Populates the task list.
  - `setCurrentTask` – user selects a task; UI highlights it.
  - `fetchTaskMetrics` – async thunk that calls `getTaskMetrics` (reads `GTStaking.taskMetrics`). When it resolves, metrics are stored for display.
- **Example flow:** user opens the tasks page → `setTasks` loads tasks → user clicks one → `setCurrentTask` sets it → `fetchTaskMetrics` retrieves metrics → UI shows completion stats.

## Contract Event Logs
Each of the following slices records events emitted by a specific smart contract. They share two actions:
- `add<Event>` – dispatched by a Web3 event listener when the contract emits an event.
- `clear<Events>` – triggered by a user action to wipe the log.

### Governance Token Events (`governanceTokenEvents`)
- Tracks minting and transfer events from the `GovernanceToken` contract.
- Example flow: user mints GT → event fires → `addGovernanceTokenEvent` saves it → notifications panel lists the mint.

### Functional Token Events (`functionalTokenEvents`)
- Logs events from the `FunctionalToken` contract.
- Example flow: functional token minted → listener dispatches `addFunctionalTokenEvent` → UI shows the activity.

### MpNS Registry Events (`mpnsRegistryEvents`)
- Watches registrations in the `MpNSRegistry` name service.
- Example flow: a name is registered → `addMpnsRegistryEvent` records it → name registry page updates.

### Cross Faction Hub Events (`crossFactionHubEvents`)
- Captures governance activity from `CrossFactionHub`.
- Example flow: hub proposal created → `addCrossFactionHubEvent` logs it → governance feed shows the new proposal.

### GT Staking Events (`gtStakingEvents`)
- Reflects staking/unstaking events from `GTStaking`.
- Example flow: user stakes tokens → `addGtStakingEvent` runs after the contract event → staking history updates.

### House Of The Law Events (`houseOfTheLawEvents`)
- Monitors actions within `HouseOfTheLaw` (proposal validation, etc.).
- Example flow: law proposal validated → `addHouseOfTheLawEvent` stores it → law console shows the validation.

### Proof Of Observation Events (`proofOfObservationEvents`)
- Logs submissions and validations for `ProofOfObservation`.
- Example flow: task observation submitted → contract emits event → `addProofOfObservationEvent` appends it → activity list refreshes.

### PoO Task Flow Events (`pooTaskFlowEvents`)
- Follows task flow rewards in `PoO_TaskFlow`.
- Example flow: reward distributed → `addPooTaskFlowEvent` saves it → reward tab updates.

### Genesis Block Faction Events (`genesisBlockFactionEvents`)
- Stores events from `GenesisBlockFaction` (e.g., faction creation).
- Example flow: new faction created → `addGenesisBlockFactionEvent` logs it → faction directory shows new entry.

### Genesis Block Factory Events (`genesisBlockFactoryEvents`)
- Records factory-related events from `GenesisBlockFactory`.
- Example flow: faction factory deploys a contract → `addGenesisBlockFactoryEvent` records it → admin page shows the deployment.

These slices allow the UI to react to live blockchain events and present an up‑to‑date activity log for each contract.
