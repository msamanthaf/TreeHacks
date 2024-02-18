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
			? "0x6736231524CD430F5F378e5b75f6c097Df539B89"
			: "0x72aAaC2727ccEFEFA7664D65a5fB2BFe3B45c513";
	// Check if localStorage is available (client-side)
	if (typeof window !== "undefined") {
		localStorage.setItem("IncentiveAddress", IncentiveAddress);
	}
};

export const getIncentiveAddress = () => {
	return IncentiveAddress;
};
