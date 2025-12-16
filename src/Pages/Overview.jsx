import React from "react";

const Overview = () => {
  return (
    <div className="min-h-screen bg-slate-50 px-3 py-4 sm:px-6 lg:px-8 space-y-5">
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
          Dashboard overview
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-xl">
          High-level snapshot of your loans, applications, and portfolio
          performance. These cards will show live data once everything is
          connected.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
              Total Loans
            </p>
            <span className="inline-flex items-center justify-center rounded-full bg-emerald-50 text-emerald-600 text-[10px] px-2 py-0.5">
              Coming soon
            </span>
          </div>
          <p className="mt-3 text-2xl font-semibold text-slate-900">0</p>
          <p className="mt-1 text-[11px] text-slate-400">
            Will display how many loan products are active in the system.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
              Pending Applications
            </p>
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-50 text-amber-500 text-xs">
              ⏳
            </span>
          </div>
          <p className="mt-3 text-2xl font-semibold text-slate-900">0</p>
          <p className="mt-1 text-[11px] text-slate-400">
            Will show how many applications are waiting for review and approval.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
              Approved Applications
            </p>
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 text-xs">
              ✓
            </span>
          </div>
          <p className="mt-3 text-2xl font-semibold text-slate-900">0</p>
          <p className="mt-1 text-[11px] text-slate-400">
            Will display how many applications have been approved and disbursed.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
              Application Fee Revenue
            </p>
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-50 text-sky-500 text-xs">
              ৳
            </span>
          </div>
          <p className="mt-3 text-2xl font-semibold text-slate-900">৳0</p>
          <p className="mt-1 text-[11px] text-slate-400">
            Will summarize collected application fees across all loans.
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm lg:col-span-2">
          <p className="text-xs font-semibold text-slate-600">
            Activity timeline (placeholder)
          </p>
          <p className="mt-1 text-[11px] text-slate-400">
            This section can show recent approvals, new applications, and other
            important actions to help you monitor what is happening in real
            time.
          </p>
          <div className="mt-3 border border-dashed border-slate-200 rounded-xl h-28 flex items-center justify-center text-[11px] text-slate-300">
            Connect analytics or logs to visualize activity here.
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
          <p className="text-xs font-semibold text-slate-600">
            Next steps for you
          </p>
          <ul className="mt-2 space-y-2 text-[11px] text-slate-500">
            <li>Configure loan products and interest rates.</li>
            <li>Review pending applications from borrowers.</li>
            <li>Monitor approved loans and application fee payments.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Overview;
