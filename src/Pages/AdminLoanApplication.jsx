import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Authcontext } from "../ContextApi/AuthContext";

const AdminLoanApplications = () => {
  const { user } = useContext(Authcontext);
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        if (!user) return;
        const idToken = await user.getIdToken();

        const res = await axios.get(
          "https://microcred-server.vercel.app/all-adminloan",
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );

        setApps(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load applications");
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, [user]);

  const filteredApps =
    statusFilter === "All"
      ? apps
      : apps.filter((a) => a.status === statusFilter);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Approved":
        return "bg-emerald-50 text-emerald-700";
      case "Rejected":
        return "bg-rose-50 text-rose-700";
      default:
        return "bg-amber-50 text-amber-700";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-3 py-4 sm:px-6 lg:px-8 space-y-4">
      <title>MicroCredX-LoanApplication</title>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
            Loan Applications
          </h2>
          <p className="text-xs sm:text-[13px] text-slate-500 mt-1">
            Admin can review all loan applications and manage their status.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="hidden sm:block text-slate-500">
            Total:{" "}
            <span className="font-semibold text-slate-800">
              {apps.length}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-slate-500 mr-1">Filter:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-slate-200 rounded-lg px-2 py-1 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400"
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* mobile cards */}
      <div className="space-y-2 md:hidden">
        {loading && (
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm text-center py-6 text-xs text-slate-400">
            Loading applications...
          </div>
        )}

        {!loading &&
          filteredApps.map((app) => (
            <div
              key={app._id}
              className="bg-white rounded-xl border border-slate-100 shadow-sm p-3 space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[11px] text-slate-400">
                    ID: {app._id.slice(-6)}
                  </p>
                  <p className="text-sm font-semibold text-slate-900">
                    {app.loanTitle}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {app.firstName} {app.lastName} • {app.email}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {app.reason}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${getStatusBadgeClass(
                    app.status
                  )}`}
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
                    Income ৳{app.monthlyIncome}
                  </p>
                </div>
                <button
                  onClick={() => setSelected(app)}
                  className="inline-flex items-center rounded-lg border border-slate-200 px-3 py-1.5 text-[11px] font-medium text-slate-700 hover:bg-slate-50"
                >
                  View
                </button>
              </div>
            </div>
          ))}

        {!loading && filteredApps.length === 0 && (
          <div className="bg-white rounded-xl border border-dashed border-slate-200 p-4 text-center text-xs text-slate-400">
            No applications for this filter.
          </div>
        )}
      </div>

      {/* table desktop */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-xl border border-slate-100 shadow-sm">
        <table className="min-w-full text-xs">
          <thead>
            <tr className="text-[11px] text-slate-500 bg-slate-50/80 border-b border-slate-100">
              <th className="px-4 py-2 text-left font-medium">Loan ID</th>
              <th className="px-4 py-2 text-left font-medium">User</th>
              <th className="px-4 py-2 text-left font-medium">
                Loan Category
              </th>
              <th className="px-4 py-2 text-left font-medium">Amount</th>
              <th className="px-4 py-2 text-left font-medium">Status</th>
              <th className="px-4 py-2 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-xs text-slate-400"
                >
                  Loading applications...
                </td>
              </tr>
            )}

            {!loading &&
              filteredApps.map((app) => (
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
                  </td>

                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-800">
                      {app.loanTitle}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {app.reason}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="font-semibold text-slate-800">
                      ৳{app.loanAmount}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Income: ৳{app.monthlyIncome}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${getStatusBadgeClass(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setSelected(app)}
                      className="inline-flex items-center rounded-lg border border-slate-200 px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-50"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}

            {!loading && filteredApps.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-xs text-slate-400"
                >
                  No applications for this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
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

            <div className="px-4 py-4 space-y-4 text-xs">
              <section className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <p className="text-[11px] text-slate-500">Full Name</p>
                  <p className="font-medium text-slate-900">
                    {selected.firstName} {selected.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500">Email</p>
                  <p className="font-medium text-slate-900">
                    {selected.email}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500">Contact</p>
                  <p className="font-medium text-slate-900">
                    {selected.contactNumber}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500">
                    National ID / Passport
                  </p>
                  <p className="font-medium text-slate-900">
                    {selected.nationalId}
                  </p>
                </div>
              </section>

              <section className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-dashed border-slate-100">
                <div>
                  <p className="text-[11px] text-slate-500">Income Source</p>
                  <p className="font-medium text-slate-900">
                    {selected.incomeSource}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500">Monthly Income</p>
                  <p className="font-medium text-slate-900">
                    ৳{selected.monthlyIncome}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500">Loan Title</p>
                  <p className="font-medium text-slate-900">
                    {selected.loanTitle}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500">
                    Requested Amount
                  </p>
                  <p className="font-medium text-slate-900">
                    ৳{selected.loanAmount}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500">Interest Rate</p>
                  <p className="font-medium text-slate-900">
                    {selected.interestRate}%
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500">Reason</p>
                  <p className="font-medium text-slate-900 capitalize">
                    {selected.reason}
                  </p>
                </div>
              </section>

              <section className="pt-3 border-t border-dashed border-slate-100 space-y-2">
                <div>
                  <p className="text-[11px] text-slate-500">Address</p>
                  <p className="font-medium text-slate-900">
                    {selected.address}
                  </p>
                </div>
                {selected.extraNotes && (
                  <div>
                    <p className="text-[11px] text-slate-500">Extra Notes</p>
                    <p className="text-slate-900">{selected.extraNotes}</p>
                  </div>
                )}
              </section>
            </div>

            <div className="px-4 py-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
              <div className="space-x-1">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 font-medium ${getStatusBadgeClass(
                    selected.status
                  )}`}
                >
                  Status: {selected.status}
                </span>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 font-medium ${
                    selected.applicationFeeStatus === "paid"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-50 text-slate-700"
                  }`}
                >
                  Fee: {selected.applicationFeeStatus || "Unknown"}
                </span>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="btn btn-ghost btn-xs"
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

export default AdminLoanApplications;
