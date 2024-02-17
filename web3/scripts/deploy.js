const hre = require("hardhat");

async function main() {
	const Incentive = await hre.ethers.getContractFactory("Incentive");
	const incentive = await Incentive.deploy();

	await incentive.deployed();

	console.log(`Incentive deployed to ${incentive.address}`);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
