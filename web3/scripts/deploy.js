const hre = require("hardhat");

async function main() {
	const Verifier = await hre.ethers.getContractFactory("Verifier");
	const verifier = await Verifier.deploy();

	await verifier.deployed();

	console.log(`Verifier deployed to address: ${verifier.address}`);

	const Incentive = await hre.ethers.getContractFactory("Incentive");
	const incentive = await Incentive.deploy(verifier.address); // Pass the verifier address to the Incentive contract constructor

	await incentive.deployed();

	console.log(`Incentive deployed to address: ${incentive.address}`);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
