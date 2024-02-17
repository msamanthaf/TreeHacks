"use client";
import React, { useContext, useEffect, useState } from "react";
import { IncentiveContext } from "../Context/Incentive";
import { Card, Payment } from "../Components";
import { getSelectedCountry } from "../Context/constants";
import dynamic from 'next/dynamic'
 
const Form = dynamic(() => import('../Components/Form'), { ssr: false })

function Main() {
    const { titleData, getReports, createReport, pay, getUserReports, getPays } = useContext(IncentiveContext);

    const [allreport, setAllreport] = useState([]);
    const [userreport, setUserreport] = useState([]);
    const [openModel, setOpenModel] = useState(false);
    const [payReport, setPayReport] = useState(null);
	const { currentAccount, connectWallet } = useContext(IncentiveContext);

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
		 {currentAccount ? (
                <button disabled className='bg-emerald-500 text-stone-50' aria-label='Sign Up' title='Sign Up'>
                    Wallet Connected to: {currentAccount}
                </button>
            ) : (
                <button onClick={() => connectWallet()} className='bg-emerald-500 text-stone-50' aria-label='Sign Up' title='Sign Up'>
                    Connect Wallet
                </button>
            )}
            <Form titleData={titleData} createReport={createReport} selectedCountry={getSelectedCountry()}/>
            <Card title="All Reports" reports={allreport} openModel={handleOpenModel} setPay={setPayReport} setOpenModel={setOpenModel}/>
            <Card title="Your Reports" reports={userreport} openModel={handleOpenModel} setPay={setPayReport} setOpenModel={setOpenModel}/>

            {openModel && (
                <Payment setOpenModel={setOpenModel} pay={payReport} payFunction={pay} />
            )}
        </>
    );
}

export default Main;
