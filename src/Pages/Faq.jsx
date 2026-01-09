import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router";

const faqs = [
  {
    question: "What is MicroCredX?",
    answer:
      "MicroCredX is a digital microloan platform where you can explore loan products, check eligibility, and apply online with minimal documentation.",
  },
  {
    question: "How do I apply for a loan?",
    answer:
      "Go to the All Loans page, choose a loan, open its details, and click on Start application. Then complete the form with your personal and financial information.",
  },
  {
    question: "Will checking eligibility affect my credit score?",
    answer:
      "No, the initial eligibility check is soft and does not impact your credit score.",
  },
  {
    question: "What documents do I need?",
    answer:
      "Typically you need a valid national ID, a recent photograph, proof of income or business cash flow, and an active bank or mobile wallet account.",
  },
  {
    question: "How long does approval take?",
    answer:
      "Approval time depends on your profile and documents, but most microloan requests are reviewed within a few business days.",
  },
  {
    question: "Can I repay early?",
    answer:
      "Many plans allow early or extra repayments; check the Key features and terms in the specific loan details before applying.",
  },
];

const FAQ = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }}
      className="mt-2 min-h-screen bg-slate-50"
    >
      <div className="container mx-auto px-4 py-10 sm:py-12 lg:py-14">
        
        <div className="text-left max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-600">
            Help & Support
          </p>
          <h1 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
            Frequently asked questions
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-500">
            Find quick answers about accounts, eligibility, applications, and repayments on MicroCredX.
          </p>
        </div>

      
        <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-3">
            {faqs.map((item, idx) => (
              <div
                key={idx}
                className="collapse collapse-plus rounded-2xl border border-slate-100 bg-white shadow-sm"
              >
                <input type="checkbox" className="peer" />
                <div className="collapse-title text-sm font-semibold text-slate-900">
                  {item.question}
                </div>
                <div className="collapse-content text-xs sm:text-sm text-slate-600">
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
          <aside className="space-y-5">
            <div className="rounded-3xl border border-emerald-100 bg-emerald-50/70 p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">
                Still need help?
              </h2>
              <p className="mt-2 text-xs text-slate-600">
                If you did not find your answer here, you can reach out to our support team or explore loan products to understand their terms better.
              </p>

              <div className="mt-4 flex flex-col gap-2 text-[11px] text-slate-700">
                <p>• 100% digital support experience</p>
                <p>• Help with choosing the right loan</p>
                <p>• Guidance on eligibility and documents</p>
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-[11px] font-medium text-white hover:bg-emerald-700 shadow-sm"
                >
                  Contact support
                </Link>
                <Link
                  to="/all-loans"
                  className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-white px-4 py-2 text-[11px] font-medium text-emerald-700 hover:bg-emerald-50"
                >
                  Browse all loans
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-4 text-[11px] text-slate-600">
              <p className="font-semibold text-slate-900">
                Tips for faster approval
              </p>
              <p className="mt-1">
                Keep your documents ready, provide accurate information in the loan application, and choose a loan amount aligned with your income and repayment capacity.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </motion.section>
  );
};

export default FAQ;
