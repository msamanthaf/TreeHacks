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
			? "0x0162D0171D7c45d28F428986fdc4084bEfd06840"
			: "0x72aAaC2727ccEFEFA7664D65a5fB2BFe3B45c513";
	// Check if localStorage is available (client-side)
	if (typeof window !== "undefined") {
		localStorage.setItem("IncentiveAddress", IncentiveAddress);
	}
};

export const getIncentiveAddress = () => {
	return IncentiveAddress;
};
