import React from "react";
import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    id: 1,
    title: "Submit your loan request",
    desc: "Choose a loan plan, fill in your basic details, and submit your microloan application in a few clicks.",
  },
  {
    id: 2,
    title: "Manager verifies & approves",
    desc: "A loan manager reviews your information, checks eligibility, and approves or rejects the request from the dashboard.",
  },
  {
    id: 3,
    title: "Get funds & repay in EMIs",
    desc: "Once approved, the loan amount is disbursed and you can track status, payments, and EMI schedule from your account.",
  },
];

const HowItWorks = () => {
  return (
   <ScrollReveal>
     <section className="mt-16 container mx-auto px-4">
      <div className="text-center mb-8">
        <p className="text-xs uppercase tracking-[0.25em] text-emerald-600">
          How It Works
        </p>
        <h2 className="mt-2 text-2xl md:text-3xl font-bold text-slate-900">
          Simple 3‑step microloan process
        </h2>
        <p className="mt-2 text-sm text-slate-500 max-w-xl mx-auto">
          MicroCredX keeps the loan journey clear for both borrowers and managers
          with a transparent, step‑by‑step workflow.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.id}
            className="relative hover:bg-green-200 bg-white rounded-2xl border border-slate-100 shadow-sm px-5 py-6 flex flex-col gap-2"
          >
            {/* step number */}
            <div className="flex items-center gap-3 mb-1 ">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center text-sm font-bold">
                {step.id}
              </div>
              <h3 className="text-base md:text-lg font-semibold text-slate-900">
                {step.title}
              </h3>
            </div>
            <p className="text-sm text-slate-500">{step.desc}</p>

    
            <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500 opacity-70" />
          </div>
        ))}
      </div>
    </section>
   </ScrollReveal>
  );
};

export default HowItWorks;
