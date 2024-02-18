"use client";
import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

import { IncentiveABI, getIncentiveAddress } from "./constants";

const fetchContract = (signerOrProvider) =>
	new ethers.Contract(getIncentiveAddress(), IncentiveABI, signerOrProvider);

export const IncentiveContext = React.createContext();

export const IncentiveProvider = ({ children }) => {
	const titleData = "Incentive Contract";
	const [currentAccount, setCurrentAccount] = useState("");
	const RPC_URL = "https://treehacks-devnet.rpc.caldera.xyz/http";
	// const RPC_URL = "https://api.avax-test.network/ext/bc/C/rpc";

	const createReport = async (report) => {
		const {
			title,
			category,
			targetName,
			targetAge,
			description,
			evidence,
			date,
			status,
			rejectionReason,
		} = report;
		const web3modal = new Web3Modal();
		const connection = await web3modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();
		const contract = fetchContract(signer);

		console.log(currentAccount);

		try {
			const transaction = await contract.createReport(
				currentAccount,
				category,
				title,
				targetName,
				targetAge,
				description,
				evidence,
				date,
				status,
				rejectionReason
			);

			await transaction.wait();
			console.log("Success", transaction);
		} catch (error) {
			console.log("Error", error);
		}
	};

	const getReports = async () => {
		const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
		const contract = fetchContract(provider);

		const reports = await contract.getReports();

		const parsedReports = reports.map((report, i) => ({
			finder: report.finder,
			category: report.category,
			title: report.title,
			targetAge: report.targetAge,
			targetName: report.targetName,
			description: report.description,
			evidence: report.evidence,
			date: report.date,
			status: report.status,
			rejectionReason: report.rejectionReason,
			pId: i,
		}));

		return parsedReports;
	};

	const getUserReports = async () => {
		const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
		const contract = fetchContract(provider);

		const allReports = await contract.getReports();
		const accounts = await window.ethereum.request({
			method: "eth_accounts",
		});

		const currentUser = accounts[0];

		const filteredReports = allReports.filter(
			(report) => report.finder.toLowerCase() === currentAccount
		);

		const userData = filteredReports.map((report, i) => ({
			finder: report.finder,
			category: report.category,
			title: report.title,
			targetAge: report.targetAge,
			targetName: report.targetName,
			description: report.description,
			evidence: report.evidence,
			date: report.date,
			status: report.status,
			rejectionReason: report.rejectionReason,
			pId: i,
		}));

		return userData;
	};

	const pay = async (ID, finder, amount) => {
		const web3modal = new Web3Modal();
		const connection = await web3modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();
		const contract = fetchContract(signer);

		// Convert the string address to an Ethereum address
		const finderAddress = ethers.utils.getAddress(finder);

		try {
			const transaction = await contract.send(ID, finderAddress, {
				value: ethers.utils.parseEther(amount),
			});

			await transaction.wait();
			console.log("Payment successful");
			return transaction;
		} catch (error) {
			console.error("Error paying to report:", error);
			throw error;
		}
	};

	const checkIfWalletConnected = async () => {
		try {
			if (!window.ethereum) {
				return setOpenError(true), setError("Install Metamask");
			}

			const accounts = await window.ethereum.request({
				method: "eth_accounts",
			});

			if (accounts.length) {
				setCurrentAccount(accounts[0]);
			} else {
				console.log("No account found");
			}
		} catch (error) {
			console.log("Wallet error");
		}
	};

	useEffect(() => {
		checkIfWalletConnected();
	}, []);

	const connectWallet = async () => {
		try {
			if (!window.ethereum) {
				return console.log("Install Metamask");
			}

			const accounts = await window.ethereum.request({
				method: "eth_requestAccounts",
			});
			setCurrentAccount(accounts[0]);
		} catch (error) {
			console.log("Error wallet");
		}
	};

	const rejectReport = async (reportId, reason) => {
		try {
			const web3modal = new Web3Modal();
			const connection = await web3modal.connect();
			const provider = new ethers.providers.Web3Provider(connection);
			const signer = provider.getSigner();
			const contract = fetchContract(signer);

			// Call the rejectReport function
			await contract.rejectReport(reportId, reason);

			console.log("Report rejected successfully.");
		} catch (error) {
			console.error("Error rejecting report:", error);
		}
	};

	// Return the IncentiveContext.Provider outside of connectWallet function
	return (
		<IncentiveContext.Provider
			value={{
				titleData,
				currentAccount,
				createReport,
				getReports,
				getUserReports,
				pay,
				connectWallet,
				rejectReport,
			}}
		>
			{children}
		</IncentiveContext.Provider>
	);
};
