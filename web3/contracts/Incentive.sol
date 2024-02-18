// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./Verifier.sol";

contract Incentive {
    struct Report {
        address finder;
        string category;
        string title;
        string targetName;
        string targetAge;
        string description;
        string evidence;
        string date;
        address[] seeker;
        string status;
        string rejectionReason;
    }

    mapping(uint256 => Report) public reports;
    uint256 public numberOfReports = 0;
    Verifier private verifier;

    constructor(address _verifierAddress) {
        verifier = Verifier(_verifierAddress);
    }

   function createReport(
    address _finder,
    string memory _category,
    string memory _title,
    string memory _targetName,
    string memory _targetAge,
    string memory _description,
    string memory _evidence,
    string memory _date,
    string memory _status,
    string memory _rejectionReason
) public returns (uint256) {
    // Check if evidence already exists
    require(!verifier.checkEvidenceExists(_evidence), "Evidence already exists");

    // Add evidence to verifier contract
    verifier.addEvidence(_evidence);

    // Create report
    Report storage report = reports[numberOfReports];
    report.finder = _finder;
    report.category = _category;
    report.title = _title;
    report.targetName = _targetName;
    report.targetAge = _targetAge;
    report.description = _description;
    report.evidence = _evidence;
    report.date = _date;
    report.status = _status;
    report.rejectionReason = _rejectionReason;
    
    numberOfReports++;

    return numberOfReports - 1;
}

	function rejectReport(uint256 reportId, string memory reason) public {
   	 Report storage report = reports[reportId];
   	 report.status = "rejected";
   	 report.rejectionReason = reason;
    }

	function send(uint256 reportId, address to) external payable {
        (bool success,) = to.call{value: msg.value}("");

        if (!success) {
            revert("Failed to send ETH");
        }

        // Set the status to "accepted"
        reports[reportId].status = "accepted";
    }

    function getReports() public view returns (Report[] memory) {
        Report[] memory allReports = new Report[](numberOfReports);

        for (uint256 i = 0; i < numberOfReports; i++) {
            allReports[i] = reports[i];
        }

        return allReports;
    }
}