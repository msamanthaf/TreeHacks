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
			? "0x9Ad01Fa444Fdc59FB959498a483B55253c96e89d"
			: "0xdA7c397bAFc1B2aA4CF6F13cFd3068E30207934a";
	// Check if localStorage is available (client-side)
	if (typeof window !== "undefined") {
		localStorage.setItem("IncentiveAddress", IncentiveAddress);
	}
};

export const getIncentiveAddress = () => {
	return IncentiveAddress;
};
