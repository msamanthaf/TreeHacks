import React, { useState } from 'react';
import { getSelectedCountry } from '../Context/constants';

const Form = ({ createReport, selectedCountry }) => {
  const [report, setReport] = useState({
    targetName: "",
    targetAge: "",
    title: "",
    description: "",
    evidence: "",
	date: "",
  });

  const createNewReport = async (e) => {
    e.preventDefault();
    try {
      const data = await createReport(report);
	  window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const updateReportDate = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    setReport({ ...report, date: currentDate });
  };

  const country = getSelectedCountry();
console.log(country);

  return (
    <div className="relative bg-opacity-75">
      <div className="relative flex flex-row px-4 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 items-center justify-center">
        <div className="flex flex-col items-center justify-center xl:flex-row w-1/2">
          <div className="w-full">
            <h2 className="max-w-lg mb-6 font-sans text-xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
              SHERBLOCK-CHAIN <br />
              Save a LIFE today!
            </h2>
            <p className="text-stone-50">
              Blockchain-powered web3 app for crowdsourcing information gathering (OSINT) to help solve missing person cases.
            </p>
			<a
  href={selectedCountry === "USA"
      ? "https://www.namus.gov/MissingPersons/Search#/results"
      : "https://bc-cb.rcmp-grc.gc.ca/ViewPage.action?siteNodeId=464&languageId=1&contentId=-1"
  }
  aria-label=""
  className="mt-10 inline-flex items-center font-semibold tracking-wider transition-colors duration-200 text-teal-accent-400 hover:text-teal-accent-700 text-gray-200"
>
  {selectedCountry}'s List of Missing People ➪
</a>


          </div>
        </div>
        <form className="flex flex-col w-1/2 ml-28 bg-white rounded">
          <text className="self-center font-bold mt-5"> Report Submission</text>

          <label className="ml-5 mt-5 inline-block mb-1 font-medium" htmlFor="targetName">
            What Info Did You Find?
          </label>
		  <input
 onChange={(e) => {
    setReport({ ...report, title: e.target.value });
  }}
  onBlur={() => {
    updateReportDate();
  }}
  placeholder="Title"
  required
  type="text"
  className="self-center flex-grow w-3/4 h-8 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
  id="targetName"
  name="targetName"
/>
          <label className="ml-5 mt-1 inline-block mb-1 font-medium" htmlFor="targetName">
            Person Name
          </label>
          <input
            onChange={(e) => setReport({ ...report, targetName: e.target.value })}
            placeholder="Name"
            required
            type="text"
            className="self-center flex-grow w-3/4 h-8 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
            id="targetName"
            name="targetName"
          />

          <label className="ml-5 mt-1 inline-block mb-1 font-medium" htmlFor="targetName">
            Missing Age
          </label>
          <input
            onChange={(e) => {
                setReport({ ...report, targetAge: e.target.value });
            }}
            placeholder="Age"
            required
            type="number"
            className="self-center flex-grow w-3/4 h-8 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
            id="targetAge"
            name="targetAge"
          />

          <label className="ml-5 mt-1 inline-block mb-1 font-medium" htmlFor="targetName">
            Description
          </label>
          <textarea
            onChange={(e) => setReport({ ...report, description: e.target.value })}
            placeholder="Description"
            required
            type="text"
            className="self-center flex-grow w-3/4 h-16 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
            id="description"
            name="description"
          />

          <label className="ml-5 mt-1 inline-block mb-1 font-medium" htmlFor="targetName">
            Evidence
          </label>
          <input
            onChange={(e) => setReport({ ...report, evidence: e.target.value })}
            placeholder="Link to evidence"
            required
            type="text"
            className="self-center flex-grow w-3/4 h-8 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
            id="evidence"
            name="evidence"
          />
<button
    onClick={(e) => {
        createNewReport(e);
    }}
    type="submit"
    className="self-center mt-5 mb-5 inline-flex items-center justify-center w-3/4 h-10 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-slate-700"
>
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
