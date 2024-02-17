import React, { useState } from 'react';

const Form = () => {
  const[report, setReport] = useState({
	personName: "",
	personAge: "",
	title: "",
	description: "",
	evidence: "",
	date: new Date().toLocaleString(),
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCurrentDate = new Date().toLocaleString();
    setCurrentDate(newCurrentDate);

	if (personAge < 1) {
		alert("Person's age must be greater than or equal to 1.");
		return; // Prevent form submission if age is invalid
	  }

    // Add code here to handle form submission
    
    // Clear input fields after submission
    setPersonName('');
    setPersonAge('');
    setTitle('');
    setDescription('');
    setEvidence('');
  };

  const createNewReport = async (e)=> {
	e.preventDefault();
	try{
		const data = await createReport(report);
	} catch(error){
		console.log(error);
	}
  }

  return (
	<div className="relative">
		<span className="coverLine"></span>
		<div className="relative bg-opacity-75 backgroundMain">
			<div className="relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
					<div className="flex flex-col items-center justify-between xl:flex-row">
						<div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
							<h2 className="max-w-lg mb-6 font-sans text-5xl font-bold tracking-tight text-white sm: text-5xl sm: leading-none">
								LOST N FOUND <br/>
								Save a LIFE today!
							</h2>
							<p className='text-stone-50'>
								Blockchain-powered web3 app for crowdsourcing information gathering (OSINT) to aid in missing person cases.
							</p>
							<a href="https://www.namus.gov/MissingPersons/Search#/results" aria-label="" className="mt-10 inline-flex items-center font-semibold tracking-wider transition-colors duration-200 text-teal-accent-400hover: text-teal-accent-700 • text-gray-200">
								List of Missing People ➪
							</a>
						</div>
				    </div>
			</div>
		</div>
	</div>
    // <div className="flex justify-center items-center h-screen mt-20 w-full">
    //   <div className="bg-white p-4 rounded-lg shadow-lg w-4/12 self-end">
    //     <h2 className="text-center text-lg font-bold mb-2">Form</h2>
    //     <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
    //       <label htmlFor="personName">Person Name:</label>
    //       <input type="text" id="personName" placeholder="Enter Person Name" value={personName} onChange={(e) => setPersonName(e.target.value)} required className="p-2 border border-gray-300 rounded focus:outline-none" />
          
    //       <label htmlFor="personAge">Person Age:</label>
    //       <input type="number" id="personAge" placeholder="Enter Person Age" value={personAge} onChange={(e) => setPersonAge(e.target.value)} required className="p-2 border border-gray-300 rounded focus:outline-none" />
          
    //       <label htmlFor="title">Title:</label>
    //       <input type="text" id="title" placeholder="Enter Title" value={title} onChange={(e) => setTitle(e.target.value)} required className="p-2 border border-gray-300 rounded focus:outline-none" />
          
    //       <label htmlFor="description">Description:</label>
    //       <textarea id="description" placeholder="Enter Description" value={description} onChange={(e) => setDescription(e.target.value)} rows="3" required className="p-2 border border-gray-300 rounded focus:outline-none resize-y"></textarea>
          
    //       <label htmlFor="evidence">Evidence:</label>
    //       <input type="text" id="evidence" placeholder="Enter Evidence" value={evidence} onChange={(e) => setEvidence(e.target.value)} required className="p-2 border border-gray-300 rounded focus:outline-none" />
          
    //       <div className="flex justify-between">
    //         <label>Date of Report: {currentDate}</label>
    //       </div>
          
    //       <button type="submit" className="bg-blue-500 text-white rounded p-2 mt-2 w-full"
	// 	  onClick={(e) => createNewReport(e)}>Submit</button>
    //     </form>
    //   </div>
    // </div>
  );

};

export default Form;
