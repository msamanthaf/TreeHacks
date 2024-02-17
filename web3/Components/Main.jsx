"use client";
import React, { useContext, useEffect, useState } from "react";
import { IncentiveContext } from "../Context/Incentive";
import { Card, Payment } from "../Components";
import { getSelectedCountry } from "../Context/constants";
import dynamic from 'next/dynamic'
 
const Form = dynamic(() => import('../Components/Form'), { ssr: false })

function Main() {
    const { titleData, getReports, createReport, pay, getUserReports, getPays, rejectReport } = useContext(IncentiveContext);
	
    const [allreport, setAllreport] = useState([]);
    const [userreport, setUserreport] = useState([]);
    const [openModel, setOpenModel] = useState(false);
    const [payReport, setPayReport] = useState(null);
	const { currentAccount, connectWallet } = useContext(IncentiveContext);
	const authority = currentAccount == "0x1aD46072B82B0210c4c55519260CAfBFE7A16448".toLowerCase();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allData = await getReports();
                const userData = await getUserReports();
                setAllreport(allData);
                setUserreport(userData);
				console.log(authority);
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
            <Form titleData={titleData} createReport={createReport} selectedCountry={getSelectedCountry()} authority={authority}/>
            <Card title="All Reports" reports={allreport} openModel={handleOpenModel} setPay={setPayReport} setOpenModel={setOpenModel} visible={true} authority={authority}/>
            {!authority && <Card title="Your Reports" reports={userreport} openModel={handleOpenModel} setPay={setPayReport} setOpenModel={setOpenModel} visible={false}/>}

            {openModel && (
                <Payment setOpenModel={setOpenModel} pay={payReport} payFunction={pay} reject={rejectReport} authority={authority}/>
            )}
        </>
    );
}

export default Main;
