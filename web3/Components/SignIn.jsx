// SignIn.js
import React, { useContext, useState } from 'react';
import { IncentiveContext } from '../Context/Incentive';
import Main from './Main';
import { setSelectedCountry, getSelectedCountry } from '../Context/constants';

function SignIn() {
    const { currentAccount, connectWallet } = useContext(IncentiveContext);
    const [submitted, setSubmitted] = useState(false);

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value); // Update the selectedCountry using the function
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission
        if (getSelectedCountry()) {
            setSubmitted(true);
			window.location.href = '/dashboard';
        }
    };

    return (
        <div>
            {currentAccount ? (
                <button disabled className='bg-emerald-500 text-stone-50' aria-label='Sign Up' title='Sign Up'>
                    Wallet Connected to: {currentAccount}
                </button>
            ) : (
                <button onClick={() => connectWallet()} className='bg-emerald-500 text-stone-50' aria-label='Sign Up' title='Sign Up'>
                    Connect Wallet
                </button>
            )}

            <form onSubmit={handleSubmit}>
                <label htmlFor="country">Select a country:</label>
                <select id="country" onChange={handleCountryChange}>
                    <option value="">Select</option>
                    <option value="USA">USA</option>
                    <option value="Canada">Canada</option>
                </select>
                <button type="submit" className='bg-white'>OK</button>
            </form>
        </div>
    );
}

export default SignIn;
