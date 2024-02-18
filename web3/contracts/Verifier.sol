// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Verifier {
    mapping(bytes32 => bool) private evidenceExists;

    function checkEvidenceExists(string memory _evidence) public view returns (bool) {
        bytes32 evidenceHash = keccak256(abi.encodePacked(_evidence));
        return evidenceExists[evidenceHash];
    }

    function addEvidence(string memory _evidence) public {
        bytes32 evidenceHash = keccak256(abi.encodePacked(_evidence));
        evidenceExists[evidenceHash] = true;
    }
}
