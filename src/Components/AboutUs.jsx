import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import ScaleLoader from "react-spinners/ScaleLoader";

const AboutUs = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);

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
      className="bg-slate-950 text-slate-50"
    >
      {/* Hero / intro */}
      <section className="relative overflow-hidden pt-24 pb-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-10 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-lime-400/15 blur-3xl" />
          <div className="absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
        </div>

        <div className="container mx-auto px-4 grid gap-12 md:grid-cols-[1.3fr,1fr] md:items-center">
          <div>
            <p className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-emerald-300">
              About Us
            </p>

            <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
              Making everyday finance{" "}
              <span className="bg-gradient-to-r from-emerald-300 via-lime-300 to-emerald-300 bg-clip-text text-transparent">
                simple, fair & digital-first
              </span>
            </h1>

            <p className="mt-4 text-sm md:text-base text-slate-300 max-w-xl">
              This platform helps students, small business owners, and families
              access transparent microloans and core banking services in just a
              few taps — no jargon, no hidden fees, no long queues.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-[11px] text-slate-300">
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                RBI-compliant partner banks / NBFCs
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1">
                🔐 Bank-grade security
              </span>
            </div>
          </div>

        
          <div className="relative">
            <div className="pointer-events-none absolute -top-10 -right-6 h-32 w-32 rounded-full bg-emerald-400/30 blur-3xl" />
            <div className="relative rounded-3xl border border-white/10 bg-white/5 shadow-[0_0_40px_rgba(0,0,0,0.6)] backdrop-blur-xl p-6">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-200">
                  Our impact so far
                </p>
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-200">
                  Live data
                </span>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xl md:text-2xl font-semibold text-white">
                    25K+
                  </p>
                  <p className="mt-1 text-[11px] text-slate-300">
                    Customers served
                  </p>
                </div>
                <div>
                  <p className="text-xl md:text-2xl font-semibold text-white">
                    ৳50Cr+
                  </p>
                  <p className="mt-1 text-[11px] text-slate-300">
                    Loans disbursed
                  </p>
                </div>
                <div>
                  <p className="text-xl md:text-2xl font-semibold text-white">
                    95%
                  </p>
                  <p className="mt-1 text-[11px] text-slate-300">
                    On-time repayment
                  </p>
                </div>
              </div>

              <div className="mt-5 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />

              <p className="mt-4 text-[11px] text-slate-300">
                Designed for Bangladesh first, with support for local languages,
                mobile wallets, and real-world cash-flow patterns.
              </p>
            </div>
          </div>
        </div>
      </section>


      <section className="border-t border-white/5 py-14">
        <div className="container mx-auto px-4 grid gap-10 md:grid-cols-[1.2fr,1fr]">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Our mission & vision
            </h2>
            <p className="mt-3 text-sm text-slate-300 max-w-xl">
              The mission is to make everyday finance human, affordable, and
              accessible for people who are often ignored by traditional banks.
              Every flow is designed to be clear, quick, and mobile-first.
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-lg">
              <h3 className="text-sm font-semibold text-white">
                Vision for the next decade
              </h3>
              <p className="mt-3 text-sm text-slate-300">
                A world where anyone with a smartphone can safely save, borrow,
                and grow — with products they actually understand and control.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white">
              What makes this platform different
            </h3>
            <div className="space-y-2 text-xs text-slate-300">
              {[
                "Transparent pricing with no hidden fees or surprise charges.",
                "Simple digital journeys that work on low-bandwidth connections.",
                "Local-first support and real people available when help is needed.",
                "Responsible lending decisions guided by data and repayment capacity.",
              ].map((text, idx) => (
                <div key={idx} className="flex gap-2">
                  <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

   
      <section className="border-t border-white/5 py-14">
        <div className="container mx-auto px-4">
          <h2 className="text-lg font-semibold text-white">Our story</h2>
          <p className="mt-3 max-w-2xl text-sm text-slate-300">
            This journey started after seeing how many students, gig workers,
            and small merchants were rejected for small, critical loans.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3 text-xs text-slate-200">
            {[
              {
                year: "2022 · Launch",
                text: "Launched first education and emergency microloan pilots.",
              },
              {
                year: "2023 · Scale",
                text: "Expanded to SME and personal loans with digital payments.",
              },
              {
                year: "2024+ · Today",
                text: "Serving thousands with instant onboarding & 24/7 support.",
              },
            ].map((item) => (
              <div
                key={item.year}
                className="relative rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
              >
                <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-emerald-400/0 via-emerald-400/80 to-emerald-400/0" />
                <p className="text-[11px] font-semibold text-emerald-300">
                  {item.year}
                </p>
                <p className="mt-2">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="border-t border-white/5 py-14">
        <div className="container mx-auto px-4">
          <h2 className="text-lg font-semibold text-white">
            The values behind the product
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 text-xs text-slate-200">
            {[
              {
                label: "Transparency",
                desc: "Clear terms, upfront pricing, and simple language.",
              },
              {
                label: "Responsibility",
                desc: "Designed to support long-term financial health.",
              },
              {
                label: "Accessibility",
                desc: "Mobile-first and optimized for low-spec devices.",
              },
              {
                label: "Security",
                desc: "Bank-grade encryption & continuous monitoring.",
              },
            ].map((v) => (
              <div
                key={v.label}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-emerald-400 via-lime-300 to-emerald-400 opacity-80" />
                <p className="text-[11px] font-semibold text-emerald-200 uppercase tracking-[0.18em]">
                  {v.label}
                </p>
                <p className="mt-2">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

  
      <section className="border-t border-white/5 py-14">
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Built by a team that cares
            </h2>
            <p className="mt-3 max-w-xl text-sm text-slate-300">
              The team combines experience in banking, tech, and data science.
            </p>
          </div>
          <button className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-2 text-xs font-medium text-slate-950 shadow-lg shadow-emerald-500/30 transition-transform hover:-translate-y-0.5 hover:bg-emerald-400">
            Join our mission
          </button>
        </div>
      </section>
    </motion.main>
  );
};

export default AboutUs;
