# TreeHacks

Blockchain-powered web3 app for crowdsourcing information gathering (OSINT) to help solve missing person cases.

### Setup:

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

### Ethics

Millions of people disappear every year, according to the International Commission on Missing People. By harnessing the power of open-source intelligence, Sherblock offers a promising avenue for gathering crucial clues and information that could aid in the search for missing person cases. Resonating with the Model Law On The Missing by the International Committee of the Red Cross (www.icrc.org), ensuring respect for privacy alongside establishing a system of accountability and control is imperative to our product. Therefore, several thoughtful integrations of ethical considerations into the design and operation of Sherblock are as follows:

-   To ensure the integrity and transparency of information shared through Sherblock, the team has adopted an approach of only granting permitted authorities the ability to verify the reports. Relatives of the victims are able to offer support at their own discretion.

-   Our decision to limit data collection solely to government official postings and to report only publicly available resources online through public links ensures that we uphold ethical standards regarding data privacy and consent, without granting special treatment to any groups. Blockchain technology allows for tracking all activities with the address of the reporter, and any unacceptable behaviors will not be tolerated and could be addressed legally.

-   Implementation of advanced privacy measures, such as zero-knowledge proof, to enhance evidence privacy within Sherblock. Zero-knowledge proof allows for verifying information without exposing sensitive or personally identifiable details, thereby maintaining the confidentiality of individuals involved in reporting those cases.

For the next steps, it is essential to conduct an ethical impact assessment to ensure user privacy and consent, engage the community for feedback, and establish an ongoing monitoring process. These measures are intended to uphold ethical principles and respect the rights of all involved in missing person cases within Sherblock, which aims to revolutionize the world through crowdsourcing information gathering.
