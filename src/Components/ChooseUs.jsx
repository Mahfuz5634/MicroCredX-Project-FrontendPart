// src/sections/WhyChoose.jsx
import React from "react";
import ScrollReveal from "./ScrollReveal";

const WhyChoose = () => (
  <ScrollReveal>
    <section className="mt-16">
    <div className="container mx-auto">
      <div className="grid gap-10 md:grid-cols-2 items-center">
        {/* left content */}
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Why MicroCredX
          </p>
          <h2 className="mt-2 text-2xl md:text-3xl font-bold text-slate-900">
            Built for real people and real needs
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            MicroCredX keeps microloans simple with clear steps, live statuses,
            and transparent EMI schedules for every borrower and manager.
          </p>

          <div className="mt-5 space-y-3 text-sm text-slate-600">
            <div className="flex gap-3">
              <span className="mt-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-green-100 text-green-700 text-xs font-bold">
                1
              </span>
              <p>
                Clear loan details page with interest rate, max limit, and EMI
                plans visible before you apply.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="mt-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-green-100 text-green-700 text-xs font-bold">
                2
              </span>
              <p>
                Secure email login and role‑based dashboards for admin,
                manager, and borrower accounts.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="mt-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-green-100 text-green-700 text-xs font-bold">
                3
              </span>
              <p>
                Powerful search, filter, and pagination to handle many loan
                applications without getting lost.
              </p>
            </div>
          </div>
        </div>

        {/* right stats card */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-tr from-green-200 via-yellow-100 to-slate-100 blur-2xl opacity-60" />
          <div className="relative bg-white rounded-2xl border border-slate-100 shadow-sm px-6 py-7 space-y-4">
            <h3 className="text-sm font-semibold text-slate-900">
              At a glance
            </h3>

            <div className="flex items-center justify-between text-sm">
              <div className="space-y-0.5">
                <p className="text-slate-500">Average approval time</p>
                <p className="font-semibold text-slate-900">24–48 hours</p>
              </div>
              <span className="px-2 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium">
                Fast processing
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="space-y-0.5">
                <p className="text-slate-500">Active microloan plans</p>
                <p className="font-semibold text-slate-900">10+ products</p>
              </div>
              <span className="px-2 py-1 rounded-full bg-slate-50 text-slate-700 text-xs font-medium">
                Multiple categories
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="space-y-0.5">
                <p className="text-slate-500">On‑time repayment rate</p>
                <p className="font-semibold text-slate-900">95% customers</p>
              </div>
              <span className="px-2 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium">
                Trusted borrowers
              </span>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Microloan journeys in one simple dashboard.</span>
              <span className="font-semibold text-green-700">
                MicroCredX
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </ScrollReveal>
);

export default WhyChoose;
