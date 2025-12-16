import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Authcontext } from "../ContextApi/AuthContext";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css"; 

const PendingLoans = () => {
  const [apps, setApps] = useState([]);
  const [selected, setSelected] = useState(null);
  const [load, setload] = useState(false);
  const { token } = useContext(Authcontext);

  const handleApprove = async (id) => {
    const result = await Swal.fire({
      title: "Approve this loan?",
      text: "The borrower will be notified and the loan will move to active.",
      icon: "question",
      showCancelButton: true,
      buttonsStyling: false,
      showCloseButton: true,
      confirmButtonText: "Yes, approve",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "rounded-2xl shadow-xl",
        title: "text-slate-900 text-base font-semibold",
        htmlContainer: "text-slate-500 text-sm",
        confirmButton:
          "inline-flex justify-center items-center px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-300 mr-2",
        cancelButton:
          "inline-flex justify-center items-center px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200",
      },
    }); 

    if (!result.isConfirmed) return;

    try {
      await axios.patch(
        `https://microcred-server.vercel.app/loan-status/${id}`,
        { status: "Approved" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setload(!load);
      toast.success("Approved successfully");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: "Reject this loan?",
      text: "This application will be marked as cancelled.",
      icon: "warning",
      showCancelButton: true,
      buttonsStyling: false,
      showCloseButton: true,
      confirmButtonText: "Yes, reject",
      cancelButtonText: "Keep pending",
      customClass: {
        popup: "rounded-2xl shadow-xl",
        title: "text-slate-900 text-base font-semibold",
        htmlContainer: "text-slate-500 text-sm",
        confirmButton:
          "inline-flex justify-center items-center px-4 py-2 rounded-lg bg-rose-500 text-white text-sm font-medium hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-300 mr-2",
        cancelButton:
          "inline-flex justify-center items-center px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200",
      },
    }); 

    if (!result.isConfirmed) return;

    try {
      await axios.patch(
        `https://microcred-server.vercel.app/loan-status/${id}`,
        {
          status: "Cancelled",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setload(!load);
      toast.success("Rejected successfully");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetch("https://microcred-server.vercel.app/get-allloans", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const pendingOnly = data.filter((item) => item.status === "Pending");
        setApps(pendingOnly);
      })
      .catch(console.error);
  }, [load, token]);

  return (
    <div className="min-h-screen bg-slate-50 px-3 py-4 sm:px-6 lg:px-8 space-y-4">
      <title>MicroCredX-PendingLoans</title>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
            Pending Applications
          </h2>
          <p className="text-xs sm:text-[13px] text-slate-500 mt-1">
            Review and take action on all loan applications that are waiting for
            approval.
          </p>
        </div>
        <div className="text-[11px] text-slate-500">
          Total pending:{" "}
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
                  {new Date(app.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium bg-amber-50 text-amber-700">
                Pending
              </span>
              <div className="flex gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={() => handleApprove(app._id)}
                  className="flex-1 inline-flex justify-center items-center rounded-lg bg-emerald-500 hover:bg-emerald-600 px-3 py-1.5 text-[11px] font-medium text-white"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleCancel(app._id)}
                  className="flex-1 inline-flex justify-center items-center rounded-lg bg-rose-500 hover:bg-rose-600 px-3 py-1.5 text-[11px] font-medium text-white"
                >
                  Reject
                </button>
                <button
                  onClick={() => setSelected(app)}
                  className="flex-1 inline-flex justify-center items-center rounded-lg border border-slate-200 px-3 py-1.5 text-[11px] font-medium text-slate-700 hover:bg-slate-50"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}

        {apps.length === 0 && (
          <div className="text-center py-6 text-xs text-slate-400 bg-white rounded-xl border border-slate-100 shadow-sm">
            No pending applications.
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
              <th className="px-4 py-2 text-left font-medium">Date</th>
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
                  {new Date(app.createdAt).toLocaleDateString()}
                </td>

                <td className="px-4 py-3 text-right space-x-1">
                  <button
                    onClick={() => handleApprove(app._id)}
                    className="inline-flex items-center rounded-lg bg-emerald-500 hover:bg-emerald-600 px-2.5 py-1 text-[11px] font-medium text-white"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleCancel(app._id)}
                    className="inline-flex items-center rounded-lg bg-rose-500 hover:bg-rose-600 px-2.5 py-1 text-[11px] font-medium text-white"
                  >
                    Reject
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
                  No pending applications.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-3">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 sticky top-0 bg-white rounded-t-xl">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Loan Application Details
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
                <button
                  onClick={() => handleApprove(selected._id)}
                  className="btn btn-xs bg-emerald-500 hover:bg-emerald-600 text-white"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleCancel(selected._id)}
                  className="btn btn-xs bg-rose-500 hover:bg-rose-600 text-white"
                >
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
