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
Scripts
npm start: Runs the app in development mode.
npm test: Launches the test runner.
npm run build: Builds the app for production.
Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

License
This project is licensed under the MIT License.
