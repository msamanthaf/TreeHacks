import incentive from "./Incentive.json";

let selectedCountry = "";
let IncentiveAddress = "";

// Check if localStorage is available (client-side)
if (typeof window !== "undefined") {
	selectedCountry = localStorage.getItem("selectedCountry") || "";
	IncentiveAddress = localStorage.getItem("IncentiveAddress") || "";
}

export const IncentiveABI = incentive.abi;

export function setSelectedCountry(country) {
	selectedCountry = country;
	setIncentiveAddress();
	// Check if localStorage is available (client-side)
	if (typeof window !== "undefined") {
		localStorage.setItem("selectedCountry", selectedCountry);
		localStorage.setItem("IncentiveAddress", IncentiveAddress);
	}
}

export function getSelectedCountry() {
	return selectedCountry;
}

const setIncentiveAddress = () => {
	IncentiveAddress =
		selectedCountry === "USA"
			? "0x5FbDB2315678afecb367f032d93F642f64180aa3"
			: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
	// Check if localStorage is available (client-side)
	if (typeof window !== "undefined") {
		localStorage.setItem("IncentiveAddress", IncentiveAddress);
	}
};

export const getIncentiveAddress = () => {
	return IncentiveAddress;
};
