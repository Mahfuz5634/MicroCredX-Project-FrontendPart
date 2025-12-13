// src/pages/Dashboard/PendingLoans.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const PendingLoans = () => {
  const [apps, setApps] = useState([]);
  const [selected, setSelected] = useState(null);
  const [load,setload]=useState(false);


  //approved
  const handleApprove = async (id) => {
  try {
    await axios.patch(
      `http://localhost:3000/loan-status/${id}`,
      { status: "Approved" }
    );
    setload(!load)
    toast.success("Approved successfully")
  } catch (error) {
    console.error(error);
  }
};

//cancel
const handleCancel = async (id) => {
  try {
    await axios.patch(
      `http://localhost:3000/loan-status/${id}`,
      { status: "Cancelled" }
    );
     setload(!load)
     toast.success("Reject successfully")
  } catch (error) {
    console.error(error);
  }
};


  useEffect(() => {
    fetch("http://localhost:3000/get-allloans")
      .then((res) => res.json())
      .then((data) => {
        const pendingOnly = data.filter((item) => item.status === "Pending");
        setApps(pendingOnly);
      })
      .catch(console.error);
  }, [load]);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">
          Pending Applications
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Review and take action on all loan applications that are waiting for approval.
        </p>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl border border-slate-100 shadow-sm">
        <table className="table table-sm">
          <thead>
            <tr className="text-xs text-slate-500 bg-slate-50/80">
              <th>Loan ID</th>
              <th>Borrower</th>
              <th>Amount</th>
              <th>Date</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((app) => (
              <tr key={app._id} className="text-xs hover:bg-slate-50/60">
                <td className="font-mono text-[11px] text-slate-500">
                  {app._id.slice(-6)}
                </td>

                <td>
                  <div className="font-medium text-slate-800">
                    {app.firstName} {app.lastName}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {app.email}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {app.incomeSource}
                  </div>
                </td>

                <td>
                  <div className="font-semibold text-slate-800">
                    ৳{app.loanAmount}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Interest {app.interestRate}%
                  </div>
                </td>

                <td className="text-[11px] text-slate-500">
                  {new Date(app.createdAt).toLocaleDateString()}
                </td>

                <td className="text-right space-x-1">
                  <button  onClick={()=>handleApprove(app._id)} className="btn btn-xs btn-success text-white">
                    Approve
                  </button>
                  <button onClick={()=>handleCancel(app._id)} className="btn btn-xs btn-error text-white">
                    Reject
                  </button>
                  <button
                    onClick={() => setSelected(app)}
                    className="btn btn-xs btn-outline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}

            {apps.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-xs text-slate-400"
                >
                  No pending applications.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* details modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 sticky top-0 bg-white rounded-t-xl">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Loan Application Details
                </h3>
                <p className="text-[11px] text-slate-500">
                  ID: {selected._id}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-slate-400 hover:text-slate-600 text-lg leading-none"
              >
                ×
              </button>
            </div>

            <div className="px-4 py-3 space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <p className="text-[11px] text-slate-500">Full Name</p>
                  <p className="font-medium text-slate-800">
                    {selected.firstName} {selected.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500">Email</p>
                  <p className="font-medium text-slate-800">
                    {selected.email}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500">Contact</p>
                  <p className="font-medium text-slate-800">
                    {selected.contactNumber}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500">National ID</p>
                  <p className="font-medium text-slate-800">
                    {selected.nationalId}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500">
                    Income Source
                  </p>
                  <p className="font-medium text-slate-800">
                    {selected.incomeSource}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500">
                    Monthly Income
                  </p>
                  <p className="font-medium text-slate-800">
                    ৳{selected.monthlyIncome}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-dashed border-slate-100">
                <div>
                  <p className="text-[11px] text-slate-500">Loan Title</p>
                  <p className="font-medium text-slate-800">
                    {selected.loanTitle}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500">Loan Amount</p>
                  <p className="font-medium text-slate-800">
                    ৳{selected.loanAmount}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500">
                    Interest Rate
                  </p>
                  <p className="font-medium text-slate-800">
                    {selected.interestRate}%
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500">Reason</p>
                  <p className="font-medium text-slate-800 capitalize">
                    {selected.reason}
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-[11px] text-slate-500">Address</p>
                  <p className="font-medium text-slate-800">
                    {selected.address}
                  </p>
                </div>
              </div>

              {selected.extraNotes && (
                <div className="pt-2 border-t border-dashed border-slate-100">
                  <p className="text-[11px] text-slate-500">Extra Notes</p>
                  <p className="text-slate-800">{selected.extraNotes}</p>
                </div>
              )}
            </div>

            <div className="px-4 py-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sticky bottom-0 bg-white rounded-b-xl text-xs">
              <div className="space-x-1">
                <span className="inline-flex items-center rounded-full px-2 py-0.5 font-medium bg-amber-50 text-amber-700">
                  {selected.status}
                </span>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 font-medium ${
                    selected.applicationFeeStatus?.toLowerCase() === "paid"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-50 text-slate-600"
                  }`}
                >
                  Fee: {selected.applicationFeeStatus}
                </span>
              </div>

              <div className="space-x-2 text-right">
                <button  onClick={()=>handleApprove(selected._id)} className="btn btn-xs btn-success text-white">
                  Approve
                </button>
                <button onClick={()=>handleCancel(selected._id)} className="btn btn-xs btn-error text-white">
                  Reject
                </button>
                <button
                  onClick={() => setSelected(null)}
                  className="btn btn-xs btn-ghost"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingLoans;
