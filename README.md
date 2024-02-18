# TreeHacks

Blockchain-powered web3 app for crowdsourcing information gathering (OSINT) to help solve missing person cases.

Millions of people disappear every year, according to the International Commission on Missing People. By harnessing the power of open-source intelligence, Sherblock offers a promising avenue for gathering crucial clues and information that could aid in the search for missing person cases.

-   To ensure the integrity and transparency of information shared through Sherblock, I adopted an approach of only granting permitted authorities the ability to verify the reports. Relatives of the victims can offer support at their own discretion.

-   My decision to limit data collection solely to government official postings and to report only publicly available resources online through public links ensures that Sherblock upholds ethical standards regarding data privacy and consent, without granting special treatment to any groups. Blockchain technology allows for tracking all activities with the address of the reporter, and any unacceptable behaviors will not be tolerated and could be addressed legally.

-   Implementation of advanced privacy measures, such as zero-knowledge proof, to enhance evidence privacy within Sherblock. Zero-knowledge proof allows for verifying and checking evidence links to avoid duplication without exposing its values, thereby maintaining the confidentiality of individuals involved in those cases.

### Setup:

-   cd web3
-   npm install

Caldera network:

-   Connect wallet and receive Caldera ETH through faucet: https://treehacks-devnet.hub.caldera.xyz/
-   Create .env file with your personal key in a constant named CALDERA_PRIVATE_KEY, and your rpc url in CALDERA_RPC_URL
-   npx hardhat run --caldera localhost scripts/deploy.js

Avalanche network:

-   Connect wallet and receive Avalanche ETH through faucet:
-   Create .env file with your personal key in a constant named AVALANCHE_PRIVATE_KEY, and your rpc url in AVALANCHE_RPC_URL
-   npx hardhat run --avalanche localhost scripts/deploy.js

-   Artifacts folder -> Contracts -> Drag Incentive.json and Verifier.json to Context folder
-   Copy the 'deployed to' address and paste to constants file in either country
-   npm run dev

DONE!!
