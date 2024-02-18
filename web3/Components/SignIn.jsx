import React, { useContext, useState } from 'react';
import { IncentiveContext } from '../Context/Incentive';
import { setSelectedCountry, getSelectedCountry } from '../Context/constants';
import Image from 'next/image';
import whitelogo from '../public/whitelogo.png'

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
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }} className='flex-col'>
			 <Image src={whitelogo} alt="Sherblock Logo" className="mb-6" width={300}/>
			 <p className='text-white'>Save lives, rewards arrive</p>
            <div style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', backgroundColor: 'white', padding: '40px', borderRadius: '8px', textAlign: 'center' }} className='mt-5'>
                {currentAccount ? (
                    <button disabled className='bg-emerald-500 h-10 w-50 px-3 rounded-md text-stone-50' aria-label='Sign Up' title='Sign Up'>
                        Wallet Connected to: {deprecateString(currentAccount)}
                    </button>
                ) : (
                    <button onClick={() => connectWallet()} className='bg-emerald-500 text-stone-50' aria-label='Sign Up' title='Sign Up'>
                        Connect Wallet
                    </button>
                )}

                <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                    <label htmlFor="country">Select your country:</label>
                    <select id="country" onChange={handleCountryChange} style={{ marginLeft: '10px', marginBottom: '20px', display: 'block' }} className='mt-5 w-full justify-center self-center items-center'>
                        <option value="">Select</option>
                        <option value="USA">🇺🇸 USA</option>
                        <option value="Canada">🇨🇦 Canada</option>
                    </select>
                    <button type="submit" className='mt-5 bg-slate-700 w-1/3 text-stone-50 hover:bg-slate-400 hover:text-slate-800 py-2 px-4 rounded-xl transition-colors duration-300 ease-in-out'>OK</button>
                </form>
            </div>
        </div>
    );
}

export default SignIn;
