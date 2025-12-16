import React from "react";
import ScrollReveal from "./ScrollReveal";

const CoreBankingServices = () => (
  <ScrollReveal>
    <section className="mt-4">
      <div className="relative container mx-auto px-4 py-8 md:py-16">
  
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-16 -left-10 h-48 w-48 rounded-full bg-emerald-100/60 blur-3xl" />
          <div className="absolute -bottom-16 right-0 h-56 w-56 rounded-full bg-lime-100/60 blur-3xl" />
        </div>

        <div className="rounded-3xl border border-emerald-50 bg-white/90 px-5 py-8 md:px-8 md:py-9 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
       
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-emerald-600">
              Core Banking Services
            </p>

            <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
              Everything you need to manage your money
            </h2>

            <p className="mt-3 text-sm text-slate-500">
              From everyday payments to long‑term savings, manage all your
              accounts, transfers, and loans from one secure, mobile‑first app.
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
       
            <div className="group relative rounded-2xl border border-slate-200/60 bg-gradient-to-br from-white to-slate-50/50 p-6 shadow-md backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-[0_20px_40px_rgba(5,150,105,0.15)]">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/0 to-emerald-500/0 opacity-0 transition-opacity duration-500 group-hover:from-emerald-500/5 group-hover:to-teal-500/5 group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 text-xl shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:shadow-md">
                  💰
                </div>
                <h3 className="text-base font-bold text-slate-900 transition-colors group-hover:text-emerald-700">
                  Savings Account
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                  Secure your future with flexible, interest‑earning savings plans
                  and goal‑based pockets.
                </p>
              </div>
            </div>

     
            <div className="group relative rounded-2xl border border-slate-200/60 bg-gradient-to-br from-white to-slate-50/50 p-6 shadow-md backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-[0_20px_40px_rgba(5,150,105,0.15)]">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/0 to-emerald-500/0 opacity-0 transition-opacity duration-500 group-hover:from-emerald-500/5 group-hover:to-teal-500/5 group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 text-xl shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:shadow-md">
                  💳
                </div>
                <h3 className="text-base font-bold text-slate-900 transition-colors group-hover:text-emerald-700">
                  Digital Payments
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                  Make fast, secure payments online and in‑store with instant
                  notifications on every transaction.
                </p>
              </div>
            </div>
            <div className="group relative rounded-2xl border border-slate-200/60 bg-gradient-to-br from-white to-slate-50/50 p-6 shadow-md backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-[0_20px_40px_rgba(5,150,105,0.15)]">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/0 to-emerald-500/0 opacity-0 transition-opacity duration-500 group-hover:from-emerald-500/5 group-hover:to-teal-500/5 group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 text-xl shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:shadow-md">
                  📱
                </div>
                <h3 className="text-base font-bold text-slate-900 transition-colors group-hover:text-emerald-700">
                  Mobile Banking
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                  Track balances, EMIs, and bills from your phone with real‑time
                  insights and alerts.
                </p>
              </div>
            </div>

             <div className="group relative rounded-2xl border border-slate-200/60 bg-gradient-to-br from-white to-slate-50/50 p-6 shadow-md backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-[0_20px_40px_rgba(5,150,105,0.15)]">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/0 to-emerald-500/0 opacity-0 transition-opacity duration-500 group-hover:from-emerald-500/5 group-hover:to-teal-500/5 group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 text-xl shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:shadow-md">
                  🔐
                </div>
                <h3 className="text-base font-bold text-slate-900 transition-colors group-hover:text-emerald-700">
                  Secure Transactions
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                  Bank‑grade encryption, multi‑factor auth, and fraud monitoring
                  on every transaction.
                </p>
              </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  </ScrollReveal>
);

export default CoreBankingServices;
