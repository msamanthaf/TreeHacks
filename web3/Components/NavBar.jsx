"use client";
import React, { useContext } from 'react';
import { IncentiveContext } from '../Context/Incentive';

function NavBar() {
    const { currentAccount, connectWallet } = useContext(IncentiveContext);

    return (
        <div>
            {currentAccount ? (
                <button disabled
                    className='bg-emerald-500 text-stone-50' aria-label='Sign Up' title='Sign Up'>
                    Wallet Connected to: {currentAccount}
                </button>
            ) : (
                <button onClick={() => connectWallet()}
                    className='bg-emerald-500 text-stone-50' aria-label='Sign Up' title='Sign Up'>
                    Connect Wallet
                </button>
            )}
        </div>
    );
}

export default NavBar;
