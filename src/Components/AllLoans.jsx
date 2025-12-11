import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

const getLoanImage = (loan) =>
  loan.image ||
  loan.imageUrl ||
  loan.photo ||
  loan.thumbnail ||
  "/assets/default-loan.png";

const AllLoans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/home-allloans")
      .then((res) => res.json())
      .then((result) => {
        setLoans(result.data || result);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <motion.section
      initial={{ scale: 0 }}
      animate={{ scale: 1, transition: { duration: 0.4 } }}
      className="mt-2"
    >
      <div className="container mx-auto px-4 py-12">
        {/* header */}
        <div className="text-left">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-600">
            All Loan Products
          </p>
          <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
            Explore all available loan options
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Compare limits, interest rates, and tenures to find the right
            microloan for your needs.
          </p>
        </div>

        {/* loading / empty */}
        {loading ? (
          <div className="mt-10 text-sm text-slate-500">Loading loans...</div>
        ) : loans.length === 0 ? (
          <div className="mt-10 text-sm text-slate-500">
            No loans available right now. Please check back later.
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loans.map((loan) => {
              const imgSrc = getLoanImage(loan);

              return (
                <article
                  key={loan.id || loan._id}
                  className="group flex flex-col rounded-2xl border border-white/60 bg-white/80 p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-200 hover:shadow-lg"
                >
                  {/* image */}
                  {imgSrc && (
                    <div className="mb-4 overflow-hidden rounded-xl border border-emerald-50 bg-emerald-50/60">
                      <img
                        src={imgSrc}
                        alt={loan.name || "Loan image"}
                        className="h-32 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* top label */}
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                      {loan.category || "Microloan"}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      #{loan.code || loan.id}
                    </span>
                  </div>

                  {/* title & description */}
                  <h3 className="text-sm font-semibold text-slate-900">
                    {loan.name || "Loan Plan"}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500 line-clamp-2">
                    {loan.description ||
                      "Flexible microloan designed to support your daily and long‑term needs."}
                  </p>

                  {/* numbers */}
                  <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
                    <div>
                      <p className="text-[11px] text-slate-400">Max amount</p>
                      <p className="mt-1 font-semibold text-slate-900">
                        {loan.maxAmount ? `৳${loan.maxAmount}` : "On request"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-400">
                        Interest rate
                      </p>
                      <p className="mt-1 font-semibold text-slate-900">
                        {loan.interestRate
                          ? `${loan.interestRate}% p.a.`
                          : "Custom"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-400">Tenure</p>
                      <p className="mt-1 font-semibold text-slate-900">
                        {loan.tenureMonths
                          ? `${loan.tenureMonths} months`
                          : "Flexible"}
                      </p>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-1.5 text-[11px] font-medium text-white shadow-sm transition-colors hover:bg-emerald-700"
                    >
                      Apply now
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-700"
                    >
                      View details
                      <span className="text-xs transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default AllLoans;
