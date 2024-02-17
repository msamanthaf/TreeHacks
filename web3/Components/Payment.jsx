import React, { useState } from "react";

const Payment = ({ setOpenModel, pay, payFunction, reject, authority }) => {
  const [amount, setAmount] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejected, setRejectedLocally] = useState(false);
  const [accepted, setAcceptedLocally] = useState(false);

  const handleReject = async () => {
    setRejectedLocally(true);
  };

  const handleAccept = async () => {
    setAcceptedLocally(true);
  };

  const handlePay = async () => {
    try {
      // Perform actions for accepting the report (e.g., making payment)
      const data = await payFunction(pay.pId, pay.finder, amount);
      console.log(data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const rejectReport = async (reportId, reason) => {
    try {
      await reject(reportId, reason);
      setRejectedLocally(true);
      setAcceptedLocally(false);
      setOpenModel(false);
	  window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">{pay.title}</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setOpenModel(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b flex-col">
              {!authority ? (
                <>
                  <div className="relative px-6 flex-auto">
                    <input
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Amount"
                      required
                      type="text"
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                      id="amount"
                      name="amount"
                    />
                  </div>
				  <div className="flex flex-row mt-5">
                  <button
                    className="text-white bg-emerald-600 font-bold uppercase px-6 py-2 text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handlePay}
                  >
                    Pay
                  </button>
                  <button
                    className="text-white bg-gray-500 font-bold uppercase px-6 py-2 text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setOpenModel(false)}
                  >
                    Return
                  </button>
				  </div>
                </>
              ) : (
                <>
                  {!rejected && !accepted && (
                     <div className="relative px-6 flex flex-row">
                      <button
                        className="text-white bg-red-500 font-bold uppercase px-6 py-2 text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleReject}
                      >
                        Reject
                      </button>
                      <button
                        className="text-white bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleAccept}
                      >
                        Accept
                      </button>
                    </div>
                  )}
                  {rejected && (
                    <>
                      <div className="relative px-6 flex flex-col">
                        <label htmlFor="rejectionReason" className="block text-sm font-medium text-gray-700">Rejection Reason</label>
                        <select
                          id="rejectionReason"
                          name="rejectionReason"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-deep-purple-500 focus:border-deep-purple-500 sm:text-sm rounded-md"
                          value={rejectionReason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                        >
                          <option value="">Select a reason</option>
                          <option value="Invalid Evidence">Invalid Evidence</option>
                          <option value="Duplicate Report">Duplicate Report</option>
                          <option value="Others">Others</option>
                          {/* Add more options as needed */}
                        </select>
                      </div>
					  <div className="flex flex-row mt-5">
                      <button
                        className="text-white bg-red-500 font-bold uppercase px-6 py-2 text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {
                          rejectReport(pay.pId, rejectionReason);
                          setRejectedLocally(true);
                        }}
                      >
                        Reject
                      </button>
                      <button
                        className="text-white bg-gray-500 font-bold uppercase px-6 py-2 text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setOpenModel(false)}
                      >
                        Return
                      </button>
					  </div>
                    </>
                  )}
                  {accepted && (
                    <>
                      <div className="relative px-6 flex">
                        <input
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="Amount"
                          required
                          type="text"
                          className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                          id="amount"
                          name="amount"
                        />
                      </div>
					  <div className="relative px-6 flex flex-row mt-5">
                      <button
                        className="text-white bg-emerald-600 font-bold uppercase px-6 py-2 text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={handlePay}
                      >
                        Pay
                      </button>
                      <button
                        className="text-white bg-gray-500 font-bold uppercase px-6 py-2 text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setOpenModel(false)}
                      >
                        Return
                      </button>
					  </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default Payment;
