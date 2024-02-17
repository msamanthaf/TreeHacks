import React from "react";
import { SignIn } from "../Components";
import { IncentiveProvider } from "../Context/Incentive";

function Index() {
	return (
		<>
			<IncentiveProvider>
				<SignIn />
			</IncentiveProvider>
		</>
	);
}

export default Index;
