require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const calderaChainId = process.env.CALDERA_CHAIN_ID;
const calderaRpcUrl = process.env.CALDERA_RPC_URL;
const avalancheChainId = process.env.AVALANCHE_CHAIN_ID;
const avalancheRpcUrl = process.env.AVALANCHE_RPC_URL;
const privateKey = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: "0.8.18",
	networks: {
		caldera: {
			url: calderaRpcUrl,
			chainId: parseInt(calderaChainId),
			accounts: [privateKey],
		},
		fuji: {
			url: avalancheRpcUrl,
			chainId: parseInt(avalancheChainId),
			accounts: [privateKey],
		},
	},
};
