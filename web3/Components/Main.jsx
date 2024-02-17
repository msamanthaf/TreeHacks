"use client";
import React, { useContext, useEffect, useState } from "react";
import { IncentiveContext } from "../Context/Incentive";
import { Card, Form, Verify } from "../Components";

function Main() {
    const { titleData, getReports, createReport, pay, getUserReports } = useContext(IncentiveContext);

    const [allreport, setAllreport] = useState([]);
    const [userreport, setUserreport] = useState([]);
    const [openModel, setOpenModel] = useState(false);
    const [payReport, setPayReport] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allData = await getReports();
                const userData = await getUserReports();
                setAllreport(allData);
                setUserreport(userData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

        // Cleanup function
        return () => {
            // Any cleanup code if needed
        };
    }, [getReports, getUserReports]);

    const handleOpenModel = (report) => {
        setPayReport(report);
        setOpenModel(true);
    };

    return (
        <>
            <Form titleData={titleData} createReport={createReport} />
            <Card title="All Reports" reports={allreport} openModel={handleOpenModel} />
            <Card title="Your Reports" reports={userreport} openModel={handleOpenModel} />

            {openModel && (
                <Verify setOpenModel={setOpenModel} getPays={getPays} pay={payReport} payFunction={pay} />
            )}
        </>
    );
}

export default Main;
