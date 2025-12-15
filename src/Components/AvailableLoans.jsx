import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import ScrollReveal from "./ScrollReveal";

const AvailableLoans = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    fetch("https://microcred-server.vercel.app/home-loans")
      .then((res) => res.json())
      .then((result) => {
        setLoans(result.data || result);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <ScrollReveal>
      <section className="mt-12 container mx-auto">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-600">
              MicroCredX Products
            </p>
            <h2 className="mt-1 text-2xl md:text-3xl font-bold text-slate-900">
              Available Microloan Plans
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Pick a loan that matches your goal: study, home, business, or
              more.
            </p>
          </div>
          <span className="hidden md:inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            {loans.length} plans available
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loans.map((loan) => (
            <article
              key={loan._id}
              className="group relative bg-gradient-to-b from-white to-emerald-50/30 rounded-2xl border border-slate-100/80 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              {/* top image */}
              <div className="h-40 w-full overflow-hidden">
                <img
                  src={loan.image}
                  alt={loan.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* content */}
              <div className="p-4 flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {loan.title}
                  </h3>
                  {loan.interestRate && (
                    <span className="shrink-0 px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold">
                      {loan.interestRate}% APR
                    </span>
                  )}
                </div>

                <p className="text-sm text-slate-500 line-clamp-3">
                  {loan.shortDesc}
                </p>

                <div className="mt-1 flex items-center justify-between text-sm">
                  <p className="font-semibold text-slate-900">
                    Max Limit:{" "}
                    <span className="text-emerald-700">
                      {loan.maxLimit?.toLocaleString()}৳
                    </span>
                  </p>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-medium">
                    {loan.category}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <p className="text-[11px] text-slate-400">
                    EMI options: {loan.emiPlans?.join(" · ")}
                  </p>
                  <Link
                    to={`/loan-details/${loan._id}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                  >
                    View Details
                    <span className="inline-block transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </Link>
                </div>
              </div>

              <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500 opacity-70" />
            </article>
          ))}
        </div>
      </section>
    </ScrollReveal>
  );
};

export default AvailableLoans;
