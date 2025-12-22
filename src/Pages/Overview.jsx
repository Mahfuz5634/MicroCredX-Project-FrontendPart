import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const APPLICATION_DATA = [
  { name: "Approved", value: 35, color: "#22c55e" },
  { name: "Pending", value: 15, color: "#facc15" },
  { name: "Other", value: 5, color: "#e5e7eb" },
];

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
          <p className="mt-3 text-2xl font-semibold text-slate-900">11</p>
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
          <p className="mt-3 text-2xl font-semibold text-slate-900">15</p>
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
          <p className="mt-3 text-2xl font-semibold text-slate-900">35</p>
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
          <p className="mt-3 text-2xl font-semibold text-slate-900">৳25000</p>
          <p className="mt-1 text-[11px] text-slate-400">
            Will summarize collected application fees across all loans.
          </p>
        </div>
      </div>

    
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-xs font-semibold text-slate-700">
                Recent activity (demo)
              </p>
              <p className="mt-0.5 text-[11px] text-slate-400">
                Latest updates across applications, approvals, and payments.
              </p>
            </div>
            <span className="inline-flex items-center rounded-full bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-500">
              Last 24 hours
            </span>
          </div>

          <div className="mt-4 space-y-3">
    
            <div className="flex items-start gap-3">
              <div className="relative mt-0.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 block" />
                <span className="absolute left-[3px] top-2 h-6 w-px bg-slate-200" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-semibold text-slate-700">
                    Loan approved
                  </p>
                  <span className="text-[10px] text-slate-400">2 min ago</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  BDT 35,000 disbursed to borrower ID #A1023.
                </p>
              </div>
            </div>

    
            <div className="flex items-start gap-3">
              <div className="relative mt-0.5">
                <span className="h-2 w-2 rounded-full bg-amber-400 block" />
                <span className="absolute left-[3px] top-2 h-6 w-px bg-slate-200" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-semibold text-slate-700">
                    New application
                  </p>
                  <span className="text-[10px] text-slate-400">15 min ago</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Borrower ID #A1047 requested BDT 20,000 working capital loan.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="relative mt-0.5">
                <span className="h-2 w-2 rounded-full bg-sky-500 block" />
                <span className="absolute left-[3px] top-2 h-6 w-px bg-slate-200" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-semibold text-slate-700">
                    Fee payment received
                  </p>
                  <span className="text-[10px] text-slate-400">32 min ago</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Application fee of BDT 500 collected for loan #LN-2031.
                </p>
              </div>
            </div>

    
            <div className="flex items-start gap-3">
              <div className="relative mt-0.5">
                <span className="h-2 w-2 rounded-full bg-slate-400 block" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-semibold text-slate-700">
                    Overdue reminder sent
                  </p>
                  <span className="text-[10px] text-slate-400">1 hr ago</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  SMS reminder sent for installment due on 20 Dec 2025.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <button className="text-[11px] font-medium text-sky-600 hover:text-sky-700">
              View full activity
            </button>
            <p className="text-[10px] text-slate-400">
              Demo events shown. Live data will sync from your backend.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="border-b border-slate-100 px-4 py-3 flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-700">
                Next steps for you
              </p>
              <span className="inline-flex items-center rounded-full bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-500">
                Getting started
              </span>
            </div>
            <div className="px-4 py-3 text-[11px] text-slate-500">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>Configure loan products and interest rates.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-amber-400" />
                  <span>Review pending applications from borrowers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-sky-500" />
                  <span>Monitor approved loans and application fee payments.</span>
                </li>
              </ul>
            </div>
          </div>

       
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="border-b border-slate-100 px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-700">
                  Application status (demo)
                </p>
                <p className="mt-0.5 text-[10px] text-slate-400">
                  Distribution of applications by status.
                </p>
              </div>
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-600">
                Live soon
              </span>
            </div>

            <div className="px-4 py-3">
              <div className="flex items-center justify-between gap-3">
            
                <div className="w-32 h-32 sm:w-36 sm:h-36">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={APPLICATION_DATA}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={30}
                        outerRadius={50}
                        stroke="#ffffff"
                        strokeWidth={2}
                        paddingAngle={3}
                      >
                        {APPLICATION_DATA.map((entry) => (
                          <Cell
                            key={entry.name}
                            fill={entry.color}
                            className="transition-all duration-200 hover:opacity-80"
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        cursor={{ fill: "rgba(15,23,42,0.03)" }}
                        contentStyle={{
                          borderRadius: "12px",
                          border: "1px solid #e2e8f0",
                          fontSize: "11px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <p className="text-[11px] font-medium text-slate-500">
                      Total applications
                    </p>
                    <p className="text-lg font-semibold text-slate-900">55</p>
                  </div>

                  <div className="space-y-1.5">
                    {APPLICATION_DATA.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between rounded-xl bg-slate-50 px-2 py-1"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-[11px] text-slate-600">
                            {item.name}
                          </span>
                        </div>
                        <span className="text-[11px] font-medium text-slate-700">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <p className="mt-3 text-[10px] text-slate-400">
                This chart uses demo data. Connect your backend to show real
                application status distribution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
