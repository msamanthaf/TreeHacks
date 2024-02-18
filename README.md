# Sherblock - [TreeHacks 2024]

Blockchain-powered web3 app for crowdsourcing information gathering (OSINT) to help solve missing person cases.

Millions of people disappear every year, according to the International Commission on Missing People. By harnessing the power of open-source intelligence, Sherblock offers a promising avenue for gathering crucial clues and information that could aid in the search for missing person cases.

- To enhance the integrity of information shared through Sherblock, a measure has been implemented wherein the general public is restricted to viewing only the name, age, and associated tag without access to the evidence link. This approach ensures that only permitted authorities can verify the reports. Relatives of the victims retain the option to offer support at their own discretion within this framework.

-   My decision to limit data collection solely to government official postings and to report only publicly available resources online through public links ensures that Sherblock upholds ethical standards regarding data privacy and consent, without granting special treatment to any groups. Blockchain technology allows for tracking all activities with the address of the reporter, and any unacceptable behaviors will not be tolerated and could be addressed legally.

-   Implementation of advanced privacy measures, such as zero-knowledge proof, to enhance evidence privacy within Sherblock. Zero-knowledge proof allows for verifying and checking evidence links to avoid duplication without exposing its values, thereby maintaining the confidentiality of individuals involved in those cases.

### Setup:

-   cd web3
-   npm install

Caldera chain (ETH):

-   Connect wallet and receive Caldera ETH through faucet: https://treehacks-devnet.hub.caldera.xyz/
-   Create .env file with your personal key in a constant named PRIVATE_KEY, chain id in CHAIN_ID, and your rpc url in RPC_URL
-   Open the Incentive.js inside Context folder, and put in your chain network url into the constant RPC_URL
-   npx hardhat run --caldera scripts/deploy.js
-   Artifacts folder -> Contracts -> Drag Incentive.json and Verifier.json to Context folder
-   Copy the 'deployed to' address and paste to constants file in either country
-   npm run dev

Avalanche Fuji chain (AVAX):

-   Connect wallet and receive Avalanche ETH through faucet: https://faucets.chain.link/fuji
-   Create .env file with your personal key in a constant named PRIVATE_KEY, chain id in CHAIN_ID, and your rpc url in RPC_URL
-   Open the Incentive.js inside Context folder, and put in your chain network url into the constant RPC_URL
-   npx hardhat run scripts/deploy.js --network fuji
-   Artifacts folder -> Contracts -> Drag Incentive.json and Verifier.json to Context folder
-   Copy the 'deployed to' address and paste to constants file in either country
-   npm run dev

DONE!!
