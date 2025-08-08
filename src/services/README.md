# Services Overview

This directory contains helper modules that encapsulate API calls, smart contract interactions, and other side-effect logic. Each service entry below outlines its purpose, Redux slice connections, reliance on smart contracts or AI, and areas where functionality can be extended.

## ai
- **Purpose:** Provides an abstraction over AI providers (OpenAI by default) to initialize agents, propose tasks, recommend proposals, optimize documents, and observe task metrics.
- **Redux slices:** Used by `aiMiddleware` which dispatches to the `ai` slice.
- **Smart contracts or AI:** Calls the configured AI provider (OpenAI interactions only by default).
- **Extension points:** Add new providers or fine-tune parameters such as model or temperature.

## blockchainService.js
- **Purpose:** Utility for governance token operations and IPFS metadata handling.
- **Redux slices:** none.
- **Smart contracts or AI:** Reads/writes `GovernanceToken` contract and can forward messages to an AI agent.
- **Extension points:** Add more contract helpers or replace the placeholder IPFS/AI endpoints.

## eventListeners.ts
- **Purpose:** Subscribes to blockchain events and dispatches them into Redux.
- **Redux slices:** Dispatches `add*Event` actions in `eventSlices`.
- **Smart contracts or AI:** Listens to numerous on-chain contracts.
- **Extension points:** Filter events, debounce dispatches, or persist events to storage.

## gtService.ts
- **Purpose:** Convenience methods for staking and querying governance tokens.
- **Redux slices:** none.
- **Smart contracts or AI:** Interacts with `GovernanceToken` and `GTStaking` contracts.
- **Extension points:** Expose additional staking utilities or integrate gas estimations.

## hashUtils.js
- **Purpose:** Creates SHA-256 hashes and links metadata with on-chain governance tokens.
- **Redux slices:** none.
- **Smart contracts or AI:** Uses `blockchainService` to mint tokens and retrieve metadata from IPFS.
- **Extension points:** Support alternative hash algorithms or metadata storage backends.

## houseOfTheLawService.ts
- **Purpose:** Facilitates proposal creation, voting, and task validation in the House of the Law.
- **Redux slices:** none.
- **Smart contracts or AI:** Calls the `HouseOfTheLaw` smart contract.
- **Extension points:** Handle proposal status polling or enhanced error handling.

## ipfsService.js
- **Purpose:** Uploads files to IPFS and returns their content hash.
- **Redux slices:** none.
- **Smart contracts or AI:** Communicates with an IPFS HTTP API only.
- **Extension points:** Add download helpers or switch to authenticated gateways.

## provider.js
- **Purpose:** Provides a shared ethers provider and signer for blockchain operations.
- **Redux slices:** none.
- **Smart contracts or AI:** Connects to Ethereum networks.
- **Extension points:** Support multiple networks or fallback providers.

## taskService.ts
- **Purpose:** Reads task metrics and exposes the GT staking contract.
- **Redux slices:** Used by `taskSlice` through the `fetchTaskMetrics` thunk.
- **Smart contracts or AI:** Calls the `GTStaking` contract.
- **Extension points:** Add caching controls or task mutation helpers.

