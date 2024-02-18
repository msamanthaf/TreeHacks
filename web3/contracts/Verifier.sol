// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@zk-kit/incremental-merkle-tree.sol/IncrementalBinaryTree.sol";

contract Verifier {
    mapping(bytes32 => bool) private evidenceExists;

    struct TreeNode {
        bytes32 hashValue;
        uint256 leftChildIndex;
        uint256 rightChildIndex;
    }

    TreeNode[] private treeNodes;

    // Verify the Merkle Proof using 256 hashing
    function checkEvidenceExists(string memory _evidence) public view returns (bool) {
        bytes32 evidenceHash = keccak256(abi.encodePacked(_evidence));
        return evidenceExists[evidenceHash];
    }

    // Compute the evidence to the Merkle Tree
    function addEvidence(string memory _evidence) public {
        bytes32 evidenceHash = keccak256(abi.encodePacked(_evidence));
        evidenceExists[evidenceHash] = true;
        
        if (treeNodes.length == 0) {
            // Initialize the tree with the first evidence
            treeNodes.push(TreeNode(evidenceHash, 0, 0));
        } else {
            // Update the tree with the new evidence
            insertNode(0, evidenceHash);
        }
    }

    // Recursively insert a new node into the tree
    function insertNode(uint256 currentIndex, bytes32 newValue) private {
        if (treeNodes[currentIndex].hashValue == 0) {
            treeNodes[currentIndex] = TreeNode(newValue, 0, 0);
        } else if (newValue < treeNodes[currentIndex].hashValue) {
            if (treeNodes[currentIndex].leftChildIndex == 0) {
                treeNodes.push(TreeNode(newValue, 0, 0));
                treeNodes[currentIndex].leftChildIndex = treeNodes.length - 1;
            } else {
                insertNode(treeNodes[currentIndex].leftChildIndex, newValue);
            }
        } else {
            if (treeNodes[currentIndex].rightChildIndex == 0) {
                treeNodes.push(TreeNode(newValue, 0, 0));
                treeNodes[currentIndex].rightChildIndex = treeNodes.length - 1;
            } else {
                insertNode(treeNodes[currentIndex].rightChildIndex, newValue);
            }
        }
    }
}
