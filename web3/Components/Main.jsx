"use client";
import React, { useContext, useEffect, useState } from "react";
import { IncentiveContext } from "../Context/Incentive";
import { Card, Payment } from "../Components";
import { getSelectedCountry } from "../Context/constants";
import dynamic from 'next/dynamic'
import metamask from '../public/metamask.png'
import Image from 'next/image';

 
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

	const deprecateString = (inputString) => {
		if (inputString.length <= 10) {
		  return inputString; // If the string is 10 characters or less, return it as it is
		}
		// Otherwise, deprecate the string by showing only the first and last 5 characters
		const firstFive = inputString.slice(0, 5);
		const lastFive = inputString.slice(-5);
		return `${firstFive}...${lastFive}`;
	  };

    return (
        <>
		 {currentAccount ? (
                <button disabled className='bg-stone-500 gap-5 flex flex-row rounded-s fixed z-50 px-3 h-10 w-96 justify-center items-center text-stone-50' aria-label='Sign Up' title='Sign Up'>
                     <Image src={metamask} alt="Metamask Logo" width={30}/>
					<p >Wallet Connected to: {deprecateString(currentAccount)}</p>
                </button>
            ) : (
                <button onClick={() => connectWallet()} className='bg-stone-500 gap-5 flex flex-row rounded-s fixed z-50 px-3 text-stone-50' aria-label='Sign Up' title='Sign Up'>
                    <Image src={metamask} alt="Metamask Logo" width={30}/>
					<p >Connect Wallet</p>
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
