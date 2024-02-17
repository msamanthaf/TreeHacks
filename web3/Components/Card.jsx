import React from 'react';

const Card = ({ reports, setOpenModel, setPay, title }) => {
  console.log("Reports:", reports);

  if (!reports || reports.length === 0) {
    console.log("No reports available");
    return <div>No reports available.</div>;
  }

  console.log("Number of reports:", reports.length);

  return (
    <div className='text-white'>
      {reports.map((report, i) => {
        console.log("Report:", report);
        return (
          <div key={i + 1} className='flex text-white justify-center items-center' onClick={() => { setPay(report); setOpenModel(true); }}>
            <p aria-label="title" className='text-white font-bold'>{report.title}</p>
            <p aria-label="evidence" className='text-white font-semibold'>{report.evidence}</p>
            <p aria-label="description" className='text-white font-semibold'>{report.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
