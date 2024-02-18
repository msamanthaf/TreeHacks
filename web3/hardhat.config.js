require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const ChainId = process.env.CHAIN_ID;
const RpcUrl = process.env.RPC_URL;
const privateKey = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: "0.8.18",
	networks: {
		caldera: {
			url: RpcUrl,
			chainId: parseInt(ChainId),
			accounts: [privateKey],
		},
		fuji: {
			url: RpcUrl,
			chainId: parseInt(ChainId),
			accounts: [privateKey],
		},
	},
};
