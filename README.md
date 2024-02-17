# TreeHacks

Blockchain-powered web3 app for crowdsourcing information gathering (OSINT) to help solve missing person cases.

Setup:

-   cd web3
-   npm install

Run 2 terminals:

-   Connect wallet and receive Caldera ETH through faucet: https://treehacks-devnet.hub.caldera.xyz/
-   Create .env file with your personal key in a constant named PRIVATE_KEY, and your rpc url in RPC_URL
-   npx hardhat run --caldera localhost scripts/deploy.js
-   Artifacts folder -> Contracts -> Drag Incentive.json to Context folder
-   Copy the address
-   Paste in constants
-   npm run dev

DONE!!
