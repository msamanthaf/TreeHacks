// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

contract Incentive {
    struct Report {
        address finder;
        string title;
        string targetName;
        string targetAge;
        string description;
        string evidence;
		string date;
        address[] seeker;
    }

    mapping(uint256 => Report) public reports;
    uint256 public numberOfReports = 0;

    function createReport(
        address _finder,
        string memory _title,
        string memory _targetName,
        string memory _targetAge,
        string memory _description,
        string memory _evidence,
		string memory _date
    ) public returns (uint256) {
        Report storage report = reports[numberOfReports];

        report.finder = _finder;
        report.title = _title;
        report.targetName = _targetName;
        report.targetAge = _targetAge;
        report.description = _description;
        report.evidence = _evidence;
		report.date = _date;
        
        numberOfReports++;

        return numberOfReports - 1;
    }

    function payToReport(uint256 _id) public payable {
        uint256 amount = msg.value;
        Report storage report = reports[_id];

        report.seeker.push(msg.sender);
        
        (bool sent,) = payable(report.finder).call{value: amount}("");
        require(sent, "Payment failed");
    }

    function getReports() public view returns (Report[] memory) {
        Report[] memory allReports = new Report[](numberOfReports);

        for (uint256 i = 0; i < numberOfReports; i++) {
            allReports[i] = reports[i];
        }

        return allReports;
    }
}