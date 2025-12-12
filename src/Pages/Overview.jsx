// src/pages/Dashboard/Overview.jsx
import React from "react";

const Overview = () => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">
          Dashboard overview
        </h2>
        <p className="mt-1 text-sm text-slate-500 max-w-xl">
          This page will summarize key metrics for your role, such as total
          loans, pending applications, and approved loans, once real data is
          connected to the system.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-white rounded-xl border border-dashed border-slate-200 p-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Total Loans
          </p>
          <p className="mt-2 text-xs text-slate-400">
            After integrating the backend, this card will show how many loan
            products are currently active in the system.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-dashed border-slate-200 p-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Pending Applications
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Here you will see the count of loan applications waiting for review
            and approval.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-dashed border-slate-200 p-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Approved Applications
          </p>
          <p className="mt-2 text-xs text-slate-400">
            This card will display how many applications have been approved and
            disbursed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
