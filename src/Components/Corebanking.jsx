import React from "react";
import ScrollReveal from "./ScrollReveal";

const CoreBankingServices = () => (
  <ScrollReveal>
    <section className="mt-8 ">
      <div className="relative container mx-auto px-4 py-12 md:py-16">
        {/* soft background accents */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-16 -left-10 h-48 w-48 rounded-full bg-emerald-100/60 blur-3xl" />
          <div className="absolute -bottom-16 right-0 h-56 w-56 rounded-full bg-lime-100/60 blur-3xl" />
        </div>

        <div className="rounded-3xl border border-emerald-50 bg-white px-5 py-8 md:px-8 md:py-9 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
          {/* header */}
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

          {/* cards */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Savings */}
            <div className="group rounded-2xl border border-slate-100 bg-slate-50/60 p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-200 hover:bg-white hover:shadow-lg">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-lg">
                💰
              </div>
              <h3 className="text-sm font-semibold text-slate-900">
                Savings Account
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">
                Secure your future with flexible, interest‑earning savings plans
                and goal‑based pockets.
              </p>
            </div>

            {/* Digital payments */}
            <div className="group rounded-2xl border border-slate-100 bg-slate-50/60 p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-200 hover:bg-white hover:shadow-lg">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-lg">
                💳
              </div>
              <h3 className="text-sm font-semibold text-slate-900">
                Digital Payments
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">
                Make fast, secure payments online and in‑store with instant
                notifications on every transaction.
              </p>
            </div>

            {/* Mobile banking */}
            <div className="group rounded-2xl border border-slate-100 bg-slate-50/60 p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-200 hover:bg-white hover:shadow-lg">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-lg">
                📱
              </div>
              <h3 className="text-sm font-semibold text-slate-900">
                Mobile Banking
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">
                Track balances, EMIs, and bills from your phone with real‑time
                insights and alerts.
              </p>
            </div>

            {/* Secure transactions */}
            <div className="group rounded-2xl border border-slate-100 bg-slate-50/60 p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-200 hover:bg-white hover:shadow-lg">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-lg">
                🔐
              </div>
              <h3 className="text-sm font-semibold text-slate-900">
                Secure Transactions
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">
                Bank‑grade encryption, multi‑factor auth, and fraud monitoring
                on every transaction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </ScrollReveal>
);

export default CoreBankingServices;
