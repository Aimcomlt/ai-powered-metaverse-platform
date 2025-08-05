AI-Powered Metaverse Platform
Overview
The AI-Powered Metaverse Platform leverages IPFS-stored model files to create a knowledge base for a reusable AI agent component. This platform is designed to provide intelligent functionalities within a metaverse environment.

Features
AI Agent Component: Reusable and intelligent.
Decentralized Storage: Uses IPFS for model files.
React Framework: Built with Create React App.
Backend Service: Express server with WebSocket streams in `backend/`.
Smart Contracts: Hardhat workspace with example contracts in `contracts/`.
Installation
Clone the repository:
bash
Copy code
git clone https://github.com/Aimcomlt/ai-powered-metaverse-platform.git
Navigate to the project directory:
bash
Copy code
cd ai-powered-metaverse-platform
Install dependencies:
bash
Copy code
npm install
Usage
Start the development server:
bash
Copy code
npm start
Open http://localhost:3000 in your browser to view the app.

Backend
Install dependencies and start the backend server:
```bash
cd backend
npm install
npm start
```

Contracts
The `contracts/` folder contains a Hardhat workspace. Compile the contracts with:
```bash
cd contracts
npm install
npx hardhat compile
```

### Deployment

Configure the following environment variables when deploying to define the blockchain connection:

- `RPC_URL` – HTTP endpoint of the Ethereum network used if no injected provider is present.
- `CHAIN_ID` – Network chain identifier corresponding to the RPC endpoint.

### Roles and Permissions
Many contract interactions are restricted by Access Control roles. Common UI actions require the following roles:

- **MINTER_ROLE** – needed to mint tokens such as `FunctionalToken.mint` or `GovernanceToken.mintGT`.
- **REGISTRAR_ROLE** – required to register new names in the `MpNSRegistry`.
- **VALIDATOR_ROLE** – required for task validation flows like `ProofOfObservation.validateTask` or `PoO_TaskFlow.rewardAfterTask`.
- **DEFAULT_ADMIN_ROLE** – allows role management through `grantRole` and `revokeRole`.

Ensure the connected wallet has the appropriate role before performing these actions in the UI.
Scripts
npm start: Runs the app in development mode.
npm test: Launches the test runner.
npm run build: Builds the app for production.
Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

License
This project is licensed under the MIT License.
