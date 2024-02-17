import React from 'react';

const Card = ({ reports, setOpenModel, setPay, title }) => {

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 text-white">
      <p className="py-16  text-2xl font-bold leading-5">{title}</p>
      <div className="grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
        {reports.map((report, i) => (
          <div
            onClick={() => { setPay(report); setOpenModel(true); }}
            key={i + 1}
            className="cursor-pointer border overflow-hidden transition-shadow duration-300 bg-white rounded"
          >
            <div className="py-5 pl-2">
              <p className="mb-2 text-xs font-semibold text-gray-600 uppercase">
                {report.date}
              </p>
              <a
                href="/"
                aria-label="Article"
                className="inline-block mb-3 text-black transition-colors duration-200 hover:text-deep-purple-accent-700"
              >
                <p className="text-2xl font-bold leading-5 text-black">{report.targetName}</p>
				<p className=" text-gray-700"> Missing Age: {report.targetAge}</p>
              </a>
              <p className="font-bold text-black mb-4">{report.title}</p>
              <div className="flex text-black flex-col">
                <p className="font-semibold"> Description: {report.description}</p> 
                <p className="font-semibold"> Evidence: <a href= {report.evidence} className='underline'> {report.evidence} </a> </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
