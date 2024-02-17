import React from "react";
import Main from "../Components/Main";
import { IncentiveProvider } from "../Context/Incentive";

function Dashboard() {
	return (
		<>
			<IncentiveProvider>
				<Main />
			</IncentiveProvider>
		</>
	);
}

export default Dashboard;
