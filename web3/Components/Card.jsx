import React from 'react';

const Card = ({ reports, setOpenModel, setPay, title, rejected, visible, authority }) => {
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
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 text-white">
      <div className='flex flex-row items-center gap-3'>
		<p className="py-16 text-2xl font-bold leading-5">{title}</p>
		<div className="ml-5 w-4 h-4 rounded-full bg-white"></div> <p className="py-16 text-2xl font-bold leading-5" style={{fontSize: '12px'}}>: Pending</p>
		<div className="w-4 h-4 rounded-full bg-green-500"></div> <p className="py-16 text-2xl font-bold leading-5" style={{fontSize: '12px'}}>: Accepted</p>
		<div className="w-4 h-4 rounded-full bg-red-500"></div> <p className="py-16 text-2xl font-bold leading-5" style={{fontSize: '12px'}}>: Rejected</p>
	  </div>
      <div className="grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
        {reports.map((report, i) => (
          <div
            key={i + 1}
            className={`border overflow-hidden transition-shadow duration-300 bg-white rounded ${
              rejected ? 'bg-gray-300 pointer-events-none' : 'cursor-pointer'
            }`}
          >
            <div className="py-5 pl-2">
            <div className="flex flex-row w-full items-center gap-3">
  <p className="flex text-xs font-semibold text-gray-600">
    {report.date}&nbsp;
  </p>
  <div className="flex z-10 rounded-full w-fit bg-gray-500 px-2 py-1 text-xs font-semibold text-white">
    {report.category}
  </div>
  <div className="ml-16 flex items-center bg-gray-200 rounded-full w-1/4 justify-center right-0">
    <div className="text-slate-500">Status : </div>
	<div className="ml-2">
  {report.status === "accepted" && <div className="w-4 h-4 rounded-full bg-green-500"></div>}
  {report.status === "rejected" && <div className="w-4 h-4 rounded-full bg-red-500"></div>}
  {report.status === "pending" && <div className="w-4 h-4 rounded-full bg-white"></div>}
  </div>
  </div>
</div>

              <a
                href="/"
                aria-label="Article"
                className="inline-block mb-3 text-black transition-colors duration-200 hover:text-deep-purple-accent-700"
              >
                <p className="text-2xl mt-2 font-bold leading-5 text-black">
                  {report.targetName}
                </p>
                <p className=" text-gray-700"> Missing Age: {report.targetAge}</p>
              </a>
              <p className="font-bold text-black mb-4">{report.title}</p>
              <div className="flex text-black flex-col">
                <p className="font-semibold overflow-x-auto">
                  {' '}
                  Description: {report.description}
                </p>
                <p className="font-semibold">
                  {' '}
                  Evidence:{' '}
                  <a href={report.evidence} className="underline">
                    {' '}
                    {report.evidence}{' '}
                  </a>{' '}
                </p>
                <p className="mt-2 text-xs font-semibold text-gray-600">
                  by {deprecateString(report.finder)}
                </p>
              </div>
            </div>
			<div className='flex w-full justify-center'>
			{visible &&
  !authority && (
    <button
      className="text-white mb-3 w-1/2 bg-slate-800 px-4 py-2 rounded mt-4 hover:bg-blue-gray-800 focus:outline-none focus:bg-blue-gray-800"
      onClick={() => {
        if (!rejected) {
          setPay(report);
          setOpenModel(true);
        }
      }}
    >
      Say Thanks!
    </button>
  )}
{authority ? (
  <button
    className="text-white mb-3 w-1/2 bg-slate-800 px-4 py-2 rounded mt-4 hover:bg-blue-gray-800 focus:outline-none focus:bg-blue-gray-800"
    onClick={() => {
      setPay(report);
      setOpenModel(true);
    }}
  >
    Verify
  </button>
) : (
  !authority && !visible && (
    report.status === "rejected" ? (
      <button className="text-white justify-center items-center self-center w-1/2 bg-red-500 px-4 py-2 rounded mb-3">
        Rejected: {report.rejectionReason}
      </button>
    ) : (
      report.status === "accepted" ? (
        <button className="text-white justify-center items-center self-center w-1/2 bg-green-500 px-4 py-2 rounded mb-3">
          Accepted
        </button>
      ) : (
        <button className="text-white justify-center items-center self-center w-1/2 bg-slate-500 px-4 py-2 rounded mb-3">
          Pending
        </button>)
    )
  )
)}
</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
