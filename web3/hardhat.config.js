require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const chainId = process.env.CHAIN_ID;
const rpcUrl = process.env.RPC_URL;
const privateKey = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: "0.8.18",
	networks: {
		caldera: {
			url: rpcUrl,
			chainId: parseInt(chainId),
			accounts: [privateKey],
		},
	},
};
