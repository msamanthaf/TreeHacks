// test/IncentiveTest.js
const { expect } = require("chai");

describe("Incentive", function () {
	let Verifier;
	let verifier;
	let Incentive;
	let incentive;
	let owner;
	let addr1;

	beforeEach(async function () {
		[owner, addr1] = await ethers.getSigners();

		Verifier = await ethers.getContractFactory("Verifier");
		verifier = await Verifier.deploy();

		Incentive = await ethers.getContractFactory("Incentive");
		incentive = await Incentive.deploy(verifier.address);
	});

	it("should not allow creating report with existing evidence", async function () {
		const evidence = "Test Evidence";

		// Add evidence to verifier
		await verifier.addEvidence(evidence);

		// Create report with the same evidence
		await expect(
			incentive.createReport(
				addr1.address, // finder
				"Category",
				"Title",
				"Target Name",
				"Target Age",
				"Description",
				evidence, // same evidence
				"Date",
				"Status",
				"Rejection Reason"
			)
		).to.be.revertedWith("Evidence already exists");
	});
});
