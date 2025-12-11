import React from "react";
import { motion } from "motion/react";

const Contact = () => (
  <motion.main
   initial={{ scale: 0 }}
      animate={{ scale: 1, transition: { duration: 0.4 } }}
      className="mt-2"
   className="min-h-screen bg-slate-950 relative overflow-hidden">
    {/* background accents */}
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute -top-24 -left-10 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-lime-400/20 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_60%)]" />
    </div>

    <section className="pt-24 pb-20">
      <div className="container mx-auto px-4 grid gap-10 lg:grid-cols-[1.1fr,1fr] lg:items-stretch">
        {/* Left: intro + form (glass card) */}
        <div className="flex flex-col">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.25em] text-emerald-300">
              Contact
            </p>
            <h1 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-white">
              Let’s talk about your
              <span className="text-emerald-300"> financial goals</span>
            </h1>
            <p className="mt-4 text-sm md:text-base text-slate-300 max-w-xl">
              Have questions about microloans, repayments, or opening an
              account? Share a few details and the team will get back within
              one business day.
            </p>
          </div>

          <div className="mt-4 rounded-3xl border border-white/15 bg-white/5 px-6 py-6 md:px-8 md:py-7 shadow-[0_18px_45px_rgba(15,23,42,0.7)] backdrop-blur-xl">
            <form className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-slate-200 mb-1.5">
                    Full name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-200 mb-1.5">
                    Email address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-200 mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Loan inquiry, account issue, feedback..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-200 mb-1.5">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Share a bit more about how we can help you."
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 resize-none"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-2.5 text-xs font-medium text-slate-950 shadow-lg shadow-emerald-500/40 transition-colors hover:bg-emerald-400"
                >
                  Send message
                </button>
                <p className="text-[11px] text-slate-400">
                  By submitting, you agree to our terms and privacy policy.
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Right: contact details card */}
        <aside className="flex">
          <div className="relative mx-auto w-full max-w-md rounded-3xl border border-white/15 bg-white/5 px-6 py-6 md:px-7 md:py-7 shadow-[0_18px_45px_rgba(15,23,42,0.7)] backdrop-blur-xl">
            <div className="pointer-events-none absolute -top-10 right-6 h-24 w-24 rounded-full bg-emerald-400/20 blur-2xl" />
            <h2 className="text-sm font-semibold text-white">
              Reach us directly
            </h2>
            <p className="mt-2 text-xs text-slate-300">
              Prefer to talk to someone? Use any of the channels below.
            </p>

            <div className="mt-5 space-y-4 text-xs text-slate-200">
              <div>
                <p className="font-medium text-white">Customer support</p>
                <p className="mt-1">support@yourbank.com</p>
                <p className="mt-0.5 text-slate-400">
                  Sun–Thu · 9:00 AM – 8:00 PM (BST)
                </p>
              </div>

              <div className="h-px bg-gradient-to-r from-emerald-500/40 via-white/10 to-transparent" />

              <div>
                <p className="font-medium text-white">Phone & WhatsApp</p>
                <p className="mt-1">+880 1XXX‑XXXXXX</p>
                <p className="mt-0.5 text-slate-400">
                  For urgent card, loan or account issues.
                </p>
              </div>

              <div className="h-px bg-white/5" />

              <div>
                <p className="font-medium text-white">Office</p>
                <p className="mt-1">
                  Level 5, Example Tower,
                  <br />
                  Dhaka, Bangladesh
                </p>
              </div>

              <div className="h-px bg-white/5" />

              <div>
                <p className="font-medium text-white">Connect on social</p>
                <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
                  <a
                    href="#"
                    className="rounded-full bg-white/5 px-3 py-1 text-slate-100 hover:bg-white/15"
                  >
                    Facebook
                  </a>
                  <a
                    href="#"
                    className="rounded-full bg-white/5 px-3 py-1 text-slate-100 hover:bg-white/15"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="#"
                    className="rounded-full bg-white/5 px-3 py-1 text-slate-100 hover:bg-white/15"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-[11px] text-emerald-100">
              <p className="font-medium">For partners & media</p>
              <p className="mt-1">
                Email <span className="font-mono">partners@yourbank.com</span>{" "}
                for partnerships, press, or speaking requests.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  </motion.main>
);

export default Contact;
