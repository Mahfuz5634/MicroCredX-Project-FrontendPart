// src/pages/Dashboard/MyLoans.jsx
import React, { useContext, useEffect, useState } from "react";
import { Authcontext } from "../ContextApi/AuthContext";

const MyLoans = () => {
  const [apps, setApps] = useState([]);
  const [selected, setSelected] = useState(null);
  const { user } = useContext(Authcontext);

  useEffect(() => {
    if (!user?.email) return;
    fetch(`http://localhost:3000/get-loan?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setApps(data))
      .catch(console.error);
  }, [user?.email]);

  const handleCancel = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this loan application?"
    );
    if (!confirmed) return;

    fetch(`http://localhost:3000/cancel-loan/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then(() => {
        setApps((prev) =>
          prev.map((app) =>
            app._id === id ? { ...app, status: "Cancelled" } : app
          )
        );
      })
      .catch(console.error);
  };

  const handlePay = (id) => {
    // integrate payment later
    alert("Redirecting to payment...");
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">
          My Loans
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Track your submitted loan applications and manage payments.
        </p>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl border border-slate-100 shadow-sm">
        <table className="table table-sm">
          <thead>
            <tr className="text-xs text-slate-500">
              <th>Loan ID</th>
              <th>Loan Info</th>
              <th>Amount</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((app) => (
              <tr key={app._id} className="text-xs">
                <td className="font-mono text-[11px] text-slate-500">
                  {app._id.slice(-6)}
                </td>

                <td>
                  <div className="font-medium text-slate-800">
                    {app.loanTitle}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {app.reason} • {app.incomeSource}
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

                <td>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium
                    ${
                      app.status === "Pending"
                        ? "bg-amber-50 text-amber-700"
                        : app.status === "Approved"
                        ? "bg-emerald-50 text-emerald-700"
                        : app.status === "Rejected"
                        ? "bg-rose-50 text-rose-700"
                        : "bg-slate-50 text-slate-600"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>

                <td className="text-right space-x-1">
                  <button
                    onClick={() => setSelected(app)}
                    className="btn btn-xs btn-outline"
                  >
                    View
                  </button>

                  {app.status === "Pending" && (
                    <button
                      onClick={() => handleCancel(app._id)}
                      className="btn btn-xs btn-error text-white"
                    >
                      Cancel
                    </button>
                  )}

                  {app.applicationFeeStatus?.toLowerCase() === "unpaid" && (
                    <button
                      onClick={() => handlePay(app._id)}
                      className="btn btn-xs btn-success text-white"
                    >
                      Pay
                    </button>
                  )}

                  {app.applicationFeeStatus?.toLowerCase() === "paid" && (
                    <button className="btn btn-xs btn-outline" disabled>
                      Paid
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {apps.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-xs text-slate-400"
                >
                  You have no loan applications yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mx-4">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
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
              <div className="grid grid-cols-2 gap-3">
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

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-dashed border-slate-100">
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
                <div className="col-span-2">
                  <p className="text-[11px] text-slate-500">Address</p>
                  <p className="font-medium text-slate-800">
                    {selected.address}
                  </p>
                </div>
              </div>

              {selected.extraNotes && (
                <div className="pt-2 border-t border-dashed border-slate-100">
                  <p className="text-[11px] text-slate-500">Extra Notes</p>
                  <p className="text-slate-800">
                    {selected.extraNotes}
                  </p>
                </div>
              )}
            </div>

            <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
              <div className="space-x-1 text-[11px]">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 font-medium
                  ${
                    selected.status === "Pending"
                      ? "bg-amber-50 text-amber-700"
                      : selected.status === "Approved"
                      ? "bg-emerald-50 text-emerald-700"
                      : selected.status === "Rejected"
                      ? "bg-rose-50 text-rose-700"
                      : "bg-slate-50 text-slate-600"
                  }`}
                >
                  {selected.status}
                </span>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 font-medium ${
                    selected.applicationFeeStatus?.toLowerCase() === "paid"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-50 text-slate-600"
                  } text-[11px]`}
                >
                  Fee:{" "}
                  {selected.applicationFeeStatus
                    ? selected.applicationFeeStatus
                    : "Unknown"}
                </span>
              </div>

              <div className="space-x-2">
                {selected.status === "Pending" && (
                  <button
                    onClick={() => handleCancel(selected._id)}
                    className="btn btn-xs btn-error text-white"
                  >
                    Cancel
                  </button>
                )}
                {selected.applicationFeeStatus?.toLowerCase() === "unpaid" && (
                  <button
                    onClick={() => handlePay(selected._id)}
                    className="btn btn-xs btn-success text-white"
                  >
                    Pay Fee
                  </button>
                )}
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

export default MyLoans;
