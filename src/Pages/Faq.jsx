import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import ScaleLoader from "react-spinners/ScaleLoader";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <ScaleLoader color="#2cc786" />
      </div>
    );
  }

  return (
    <motion.main
      initial={{ scale: 0 }}
      animate={{ scale: 1, transition: { duration: 0.4 } }}
      className="min-h-screen bg-slate-950 relative overflow-hidden"
    >
      <title>MicroCredX-FAQ</title>

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-10 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-lime-400/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_60%)]" />
      </div>

      <section className="pt-15 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex flex-wrap gap-2 text-[11px]">
              <Link
                to="/all-loans"
                className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-emerald-200 hover:bg-emerald-500/20 transition-colors"
              >
                View all loans
              </Link>
              <Link
                to="/contact"
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-200 hover:bg-white/10 transition-colors"
              >
                Contact support
              </Link>
            </div>
          </div>

          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-emerald-300">
              Help & Support
            </p>
            <h1 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-white">
              Frequently asked{" "}
              <span className="text-emerald-300">questions</span>
            </h1>
            <p className="mt-4 text-sm md:text-base text-slate-300">
              Get instant clarity on how MicroCredX microloans work so you can
              apply with confidence.
            </p>
          </div>

          <div className="mt-6 md:mt-8 rounded-3xl border border-white/15 bg-white/5 px-5 py-5 md:px-7 md:py-7 shadow-[0_18px_45px_rgba(15,23,42,0.7)] backdrop-blur-xl">
            <div className="space-y-3">
              {faqs.map((item, idx) => (
                <div
                  key={idx}
                  className="collapse collapse-plus rounded-2xl border border-white/10 bg-slate-900/40"
                >
                  <input type="checkbox" className="peer" />
                  <div className="collapse-title text-sm md:text-base font-semibold text-slate-50">
                    {item.question}
                  </div>
                  <div className="collapse-content text-xs sm:text-sm text-slate-300">
                    <p>{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between text-[11px] text-slate-400">
              <p>
                Still have a question?{" "}
                <Link
                  to="/contact"
                  className="text-emerald-300 hover:text-emerald-200 underline underline-offset-4"
                >
                  Talk to the support team
                </Link>
                .
              </p>
              <p className="md:text-right">
                We keep this FAQ updated as new features are added.
              </p>
            </div>
          </div>
        </div>
      </section>
    </motion.main>
  );
};

export default FAQ;
