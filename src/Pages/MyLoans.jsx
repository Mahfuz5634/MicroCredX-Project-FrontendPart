import React, { useContext, useEffect, useState } from "react";
import { Authcontext } from "../ContextApi/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";
import "sweetalert2/dist/sweetalert2.min.css";

const MyLoans = () => {
  const [apps, setApps] = useState([]);
  const [selected, setSelected] = useState(null);
  const { user, token } = useContext(Authcontext);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (!user?.email) return;
    fetch(
      `https://microcred-server.vercel.app/get-loan?email=${user.email}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setApps(data))
      .catch(console.error);
  }, [user?.email, load, token]);

  const deleteItems = (id) => {
    Swal.fire({
      title: "Delete this loan application?",
      text: "This action cannot be undone once deleted.",
      icon: "warning",
      iconColor: "#f97316",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "No, keep it",
      buttonsStyling: false,
      customClass: {
        popup: "rounded-2xl shadow-lg",
        title: "text-slate-900 text-base font-semibold",
        htmlContainer: "text-slate-500 text-sm",
        confirmButton:
          "inline-flex justify-center items-center px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium mr-2",
        cancelButton:
          "inline-flex justify-center items-center px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://microcred-server.vercel.app/delete-loan/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            setLoad((prev) => !prev);
            Swal.fire({
              title: "Deleted",
              text: "The loan application has been removed.",
              icon: "success",
              iconColor: "#22c55e",
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
              buttonsStyling: false,
              customClass: {
                popup: "rounded-2xl shadow-md",
                title: "text-slate-900 text-sm font-semibold",
                htmlContainer: "text-slate-500 text-xs",
              },
            });
          });
      }
    }); 
  };

  const handlePayment = async (appId) => {
    if (!user?.email) return;

    const paymentInfo = {
      cost: Number(10),
      loanId: appId,
      senderEmail: user.email,
    };

    try {
      const res = await axios.post(
        "https://microcred-server.vercel.app/create-checkout-session",
        paymentInfo
      );
      window.location.href = res.data.url;
    } catch (error) {
      console.error("Payment error:", error.response?.data || error.message);
      Swal.fire({
        icon: "error",
        title: "Payment failed",
        text: "Unable to start the payment session. Please try again.",
        buttonsStyling: false,
        confirmButtonText: "Close",
        customClass: {
          popup: "rounded-2xl shadow-xl",
          title: "text-slate-900 text-base font-semibold",
          htmlContainer: "text-slate-600 text-sm",
          confirmButton:
            "inline-flex justify-center items-center px-4 py-2 rounded-lg bg-rose-500 text-white text-sm font-medium hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-300",
        },
      }); 
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-3 py-4 sm:px-6 lg:px-8 space-y-4">
      <title>MicroCredX-MyLoans</title>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
            My Loans
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Track your loan applications, status, and fees in one place.
          </p>
        </div>
        <div className="text-[11px] text-slate-500">
          Total applications:{" "}
          <span className="font-semibold text-slate-800">{apps.length}</span>
        </div>
      </div>

      <div className="hidden md:block">
        <div className="overflow-x-auto bg-white rounded-xl border border-slate-100 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="text-[11px] text-slate-500 bg-slate-50/80 border-b border-slate-100">
                <th className="px-4 py-2 text-left font-medium">Loan ID</th>
                <th className="px-4 py-2 text-left font-medium">Loan Info</th>
                <th className="px-4 py-2 text-left font-medium">Amount</th>
                <th className="px-4 py-2 text-left font-medium">Status</th>
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
                      {app.loanTitle}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {app.reason} • {app.incomeSource}
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

                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${
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

                  <td className="px-4 py-3 text-right space-x-1">
                    <button
                      onClick={() => setSelected(app)}
                      className="inline-flex items-center rounded-lg border border-slate-200 px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-50"
                    >
                      View
                    </button>

                    {app.status === "Pending" && (
                      <button
                        onClick={() => deleteItems(app._id)}
                        className="inline-flex items-center rounded-lg bg-rose-500 hover:bg-rose-600 px-2.5 py-1 text-[11px] font-medium text-white"
                      >
                        Cancel
                      </button>
                    )}

                    {app.applicationFeeStatus?.toLowerCase() === "unpaid" && (
                      <button
                        onClick={() => handlePayment(app._id)}
                        className="inline-flex items-center rounded-lg bg-emerald-500 hover:bg-emerald-600 px-2.5 py-1 text-[11px] font-medium text-white"
                      >
                        Pay
                      </button>
                    )}

                    {app.applicationFeeStatus?.toLowerCase() === "paid" && (
                      <button
                        className="inline-flex items-center rounded-lg border border-slate-200 px-2.5 py-1 text-[11px] font-medium text-slate-400"
                        disabled
                      >
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
      </div>

      <div className="grid gap-3 md:hidden">
        {apps.map((app) => (
          <div
            key={app._id}
            className="bg-white rounded-xl border border-slate-100 shadow-sm p-3 flex flex-col gap-2"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[11px] text-slate-400">
                  ID: {app._id.slice(-6)}
                </p>
                <p className="text-sm font-semibold text-slate-900">
                  {app.loanTitle}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {app.reason} • {app.incomeSource}
                </p>
              </div>
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${
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
            </div>

            <div className="flex items-center justify-between text-xs">
              <div>
                <p className="text-[11px] text-slate-500">Amount</p>
                <p className="font-semibold text-slate-900">
                  ৳{app.loanAmount}
                </p>
                <p className="text-[11px] text-slate-500">
                  Interest {app.interestRate}%
                </p>
              </div>
              <div className="text-right space-x-1">
                <button
                  onClick={() => setSelected(app)}
                  className="btn btn-xs btn-outline"
                >
                  View
                </button>

                {app.status === "Pending" && (
                  <button
                    onClick={() => deleteItems(app._id)}
                    className="btn btn-xs btn-error bg-red-500 text-white"
                  >
                    Cancel
                  </button>
                )}

                {app.applicationFeeStatus?.toLowerCase() === "unpaid" && (
                  <button
                    onClick={() => handlePayment(app._id)}
                    className="btn btn-xs btn-success bg-green-500 text-white mt-1"
                  >
                    Pay
                  </button>
                )}

                {app.applicationFeeStatus?.toLowerCase() === "paid" && (
                  <button
                    className="btn btn-xs btn-outline mt-1"
                    disabled
                  >
                    Paid
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {apps.length === 0 && (
          <div className="bg-white rounded-xl border border-dashed border-slate-200 p-4 text-center text-xs text-slate-400">
            You have no loan applications yet.
          </div>
        )}
      </div>

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
                  <p className="text-slate-800">
                    {selected.extraNotes}
                  </p>
                </div>
              )}
            </div>

            <div className="px-4 py-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sticky bottom-0 bg-white rounded-b-xl text-xs">
              <div className="space-x-1">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 font-medium ${
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
                  }`}
                >
                  Fee:{" "}
                  {selected.applicationFeeStatus
                    ? selected.applicationFeeStatus
                    : "Unknown"}
                </span>
              </div>

              <div className="space-x-2 text-right">
                {selected.status === "Pending" && (
                  <button
                    onClick={() => deleteItems(selected._id)}
                    className="btn btn-xs bg-rose-500 hover:bg-rose-600 text-white"
                  >
                    Cancel
                  </button>
                )}
                {selected.applicationFeeStatus?.toLowerCase() === "unpaid" && (
                  <button
                    onClick={() => handlePayment(selected._id)}
                    className="btn btn-xs bg-emerald-500 hover:bg-emerald-600 text-white"
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
