const hre = require("hardhat");

async function main() {
	const Incentive = await hre.ethers.deployContract("Incentive");

	await Incentive.waitForDeployment();

	console.log(`Incentive deployed to ${Incentive.target}`);
}

// 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
