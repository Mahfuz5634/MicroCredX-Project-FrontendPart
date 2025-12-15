import React, { useContext, useEffect, useState } from "react";
import { Authcontext } from "../ContextApi/AuthContext";

const ApprovedLoans = () => {
  const [apps, setApps] = useState([]);
  const [selected, setSelected] = useState(null);
  const { token } = useContext(Authcontext);

  useEffect(() => {
    fetch("https://microcred-server.vercel.app/get-Approved-loans", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setApps(data))
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-4">
      <title>MicroCredX-ApprovedLoans</title>
      <div>
        <h2 className="text-xl font-semibold text-slate-900">
          Approved Applications
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          All loan applications that have been reviewed and approved.
        </p>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl border border-slate-100 shadow-sm">
        <table className="table table-sm">
          <thead>
            <tr className="text-xs text-slate-500 bg-slate-50/80">
              <th>Loan ID</th>
              <th>Borrower</th>
              <th>Amount</th>
              <th>Approved Date</th>
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
                  <div className="text-[11px] text-slate-500">{app.email}</div>
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
                  {new Date(
                    app.updatedAt || app.createdAt
                  ).toLocaleDateString()}
                </td>

                <td className="text-right">
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
                  No approved applications yet.
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
                  Approved Loan Details
                </h3>
                <p className="text-[11px] text-slate-500">ID: {selected._id}</p>
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
                  <p className="font-medium text-slate-800">{selected.email}</p>
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
                  <p className="text-[11px] text-slate-500">Income Source</p>
                  <p className="font-medium text-slate-800">
                    {selected.incomeSource}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500">Monthly Income</p>
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
                  <p className="text-[11px] text-slate-500">Interest Rate</p>
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

            <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between gap-2 sticky bottom-0 bg-white rounded-b-xl text-xs">
              <div className="space-x-1">
                <span className="inline-flex items-center rounded-full px-2 py-0.5 font-medium bg-emerald-50 text-emerald-700">
                  Approved
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
              <button
                onClick={() => setSelected(null)}
                className="btn btn-xs btn-ghost"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovedLoans;
