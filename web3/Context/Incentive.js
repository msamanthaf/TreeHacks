"use client";
import React, { useState, useEffect } from "react";
import Wenb3Modal from "web3modal";
import { ethers } from "ethers";

import { IncentiveABI, IncentiveAddress } from "./constants";

const fetchContract = (signerOrProvider) =>
	new ethers.Contract(IncentiveAddress, IncentiveABI, signerOrProvider);

export const IncentiveContext = React.createContext();

export const IncentiveProvider = ({ children }) => {
	const titleData = "Incentive Contract";
	const [currentAccount, setCurrentAccount] = useState("");

	const createReport = async (report) => {
		const { title, targetName, targetAge, description, evidence } = report;
		const web3modal = new Wenb3Modal();
		const connection = await web3modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();
		const contract = fetchContract(signer);

		console.log(currentAccount);

		try {
			const transaction = await contract.createReport(
				currentAccount,
				title,
				targetName,
				targetAge,
				description,
				evidence
			);

			await transaction.wait();
			console.log("Success", transaction);
		} catch (error) {
			console.log("Error", error);
		}
	};

	const getReports = async () => {
		const provider = new ethers.providers.JsonRpcProvider();
		const contract = fetchContract(provider);

		const reports = await contract.getReports();

		const parsedReports = reports.map((report, i) => ({
			finder: report.finder,
			title: report.title,
			targetAge: report.targetAge,
			targetName: report.targetName,
			description: report.description,
			evidence: report.evidence,
			pId: i,
		}));

		return parsedReports;
	};

	const getUserReports = async () => {
		const provider = new ethers.providers.JsonRpcProvider();
		const contract = fetchContract(provider);

		const allReports = await contract.getReports();
		const accounts = await window.ethereum.request({
			method: "eth_accounts",
		});

		const currentUser = accounts[0];

		const filteredReports = allReports.filter(
			(report) =>
				report.finder === "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"
		);

		const userData = filteredReports.map((report, i) => ({
			finder: report.finder,
			title: report.title,
			targetAge: report.targetAge,
			targetName: report.targetName,
			description: report.description,
			evidence: report.evidence,
			pId: i,
		}));

		return userData;
	};

	const pay = async (pId, amount) => {
		const web3modal = new Wenb3Modal();
		const connection = await web3modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();
		const contract = fetchContract(signer);

		const reportData = await contract.payToReport(pId, {
			value: ethers.utils.parseEther(amount),
		});

		await reportData.wait();
		location.reload();

		return reportData;
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
			}}
		>
			{children}
		</IncentiveContext.Provider>
	);
};
