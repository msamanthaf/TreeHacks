"use client";
import React, { useContext, useEffect, useState } from "react";
import { IncentiveContext } from "../Context/Incentive";
import Card from "./Card";
import Form from "./Form";

function Main() {
	const { titleData, getReports, createReport, pay, getUserReports } = useContext(IncentiveContext);
	
	const [allreport, setAllreport] = useState();
	const [userReport, setUserreport] = useState();
	const [openModel, setOpenModel] = useState(false);
	const [payReport, setPayReport] = useState();

	useEffect(() => {
		const fetchData = async () => {
			const allData = await getReports();
			const userData = await getUserReports();
			setAllreport(allData);
			setUserreport(userData);
		};
		fetchData();
	}, [getReports, getUserReports]);

	console.log(payReport);

	return (
		<>
			<Form titleData={titleData} createReport={createReport}/>
			<Card title="All Reports" allreport={allreport} setOpenModel={setOpenModel} setPay={setPayReport} />
			<Card title="Your Reports" allreport={userReport} setOpenModel={setOpenModel} setPay={setPayReport} />
		</>
	);
}

export default Main;