import React from "react";
import NavBar from "../Components/NavBar";
import Main from "../Components/Main";
import { IncentiveProvider } from "../Context/Incentive";

function Page() {
	return (
		<>
			<IncentiveProvider>
				<NavBar />
				<Main />
			</IncentiveProvider>
		</>
	);
}

export default Page;
