// src/pages/Dashboard/ApprovedLoans.jsx
import React, { useContext, useEffect, useState } from "react";
import { Authcontext } from "../ContextApi/AuthContext";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css"; // [web:47]

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
  }, [token]);

  const handleInfo = (app) => {
    Swal.fire({
      title: "Approved Loan",
      html: `
        <div class="text-left text-sm text-slate-700">
          <p class="mb-1"><span class="font-semibold">Borrower:</span> ${app.firstName} ${app.lastName}</p>
          <p class="mb-1"><span class="font-semibold">Email:</span> ${app.email}</p>
          <p class="mb-1"><span class="font-semibold">Amount:</span> ৳${app.loanAmount}</p>
          <p class="mb-1"><span class="font-semibold">Interest:</span> ${app.interestRate}%</p>
          <p class="mb-1"><span class="font-semibold">Approved on:</span> ${new Date(
            app.updatedAt || app.createdAt
          ).toLocaleDateString()}</p>
        </div>
      `,
      icon: "success",
      confirmButtonText: "Close",
      buttonsStyling: false,
      customClass: {
        popup: "rounded-2xl shadow-xl",
        title: "text-slate-900 text-base font-semibold",
        htmlContainer: "text-slate-600 text-sm",
        confirmButton:
          "inline-flex justify-center items-center px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-300",
      },
    }); // [web:43][web:79]
  };

  return (
    <div className="min-h-screen bg-slate-50 px-3 py-4 sm:px-6 lg:px-8 space-y-4">
      <title>MicroCredX-ApprovedLoans</title>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
            Approved Applications
          </h2>
          <p className="text-xs sm:text-[13px] text-slate-500 mt-1">
            All loan applications that have been reviewed and approved.
          </p>
        </div>
        <div className="text-[11px] text-slate-500">
          Total approved:{" "}
          <span className="font-semibold text-slate-800">{apps.length}</span>
        </div>
      </div>

      <div className="space-y-2 md:hidden">
        {apps.map((app) => (
          <div
            key={app._id}
            className="bg-white rounded-xl border border-slate-100 shadow-sm p-3 space-y-2"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-mono text-[11px] text-slate-400">
                  #{app._id.slice(-6)}
                </p>
                <p className="font-medium text-slate-900 text-sm">
                  {app.firstName} {app.lastName}
                </p>
                <p className="text-[11px] text-slate-500 break-all">
                  {app.email}
                </p>
                <p className="text-[11px] text-slate-400">
                  {app.incomeSource}
                </p>
              </div>
              <div className="text-right space-y-1">
                <p className="font-semibold text-slate-900">
                  ৳{app.loanAmount}
                </p>
                <p className="text-[11px] text-slate-500">
                  Interest {app.interestRate}%
                </p>
                <p className="text-[11px] text-slate-400">
                  {new Date(
                    app.updatedAt || app.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium bg-emerald-50 text-emerald-700">
                Approved
              </span>
              <div className="flex gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={() => handleInfo(app)}
                  className="flex-1 inline-flex justify-center items-center rounded-lg bg-emerald-500 hover:bg-emerald-600 px-3 py-1.5 text-[11px] font-medium text-white"
                >
                  Quick Info
                </button>
                <button
                  onClick={() => setSelected(app)}
                  className="flex-1 inline-flex justify-center items-center rounded-lg border border-slate-200 px-3 py-1.5 text-[11px] font-medium text-slate-700 hover:bg-slate-50"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}

        {apps.length === 0 && (
          <div className="text-center py-6 text-xs text-slate-400 bg-white rounded-xl border border-slate-100 shadow-sm">
            No approved applications yet.
          </div>
        )}
      </div>

      <div className="hidden md:block overflow-x-auto bg-white rounded-xl border border-slate-100 shadow-sm">
        <table className="min-w-full text-xs">
          <thead>
            <tr className="text-[11px] text-slate-500 bg-slate-50/80 border-b border-slate-100">
              <th className="px-4 py-2 text-left font-medium">Loan ID</th>
              <th className="px-4 py-2 text-left font-medium">Borrower</th>
              <th className="px-4 py-2 text-left font-medium">Amount</th>
              <th className="px-4 py-2 text-left font-medium">
                Approved Date
              </th>
              <th className="px-4 py-2 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {apps.map((app) => (
              <tr key={app._id} className="hover:bg-slate-50/60">
                <td className="px-4 py-3 font-mono text-[11px] text-slate-500">
                  {app._id.slice(-6)}
                </td>

                <td className="px-4 py-3">
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

                <td className="px-4 py-3">
                  <div className="font-semibold text-slate-800">
                    ৳{app.loanAmount}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Interest {app.interestRate}%
                  </div>
                </td>

                <td className="px-4 py-3 text-[11px] text-slate-500">
                  {new Date(
                    app.updatedAt || app.createdAt
                  ).toLocaleDateString()}
                </td>

                <td className="px-4 py-3 text-right space-x-1">
                  <button
                    onClick={() => handleInfo(app)}
                    className="inline-flex items-center rounded-lg bg-emerald-500 hover:bg-emerald-600 px-2.5 py-1 text-[11px] font-medium text-white"
                  >
                    Quick Info
                  </button>
                  <button
                    onClick={() => setSelected(app)}
                    className="inline-flex items-center rounded-lg border border-slate-200 px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-50"
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
