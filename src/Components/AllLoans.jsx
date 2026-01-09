import React, { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import ScaleLoader from "react-spinners/ScaleLoader";

const getLoanImage = (loan) =>
  loan.image ||
  loan.imageUrl ||
  loan.photo ||
  loan.thumbnail ||
  "/assets/default-loan.png";

const AllLoans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("recent"); // "amount-asc" | "amount-desc" | "rate-asc" | "rate-desc"
  const [quickFilter, setQuickFilter] = useState("none"); // "high-amount" | "low-rate" | "none"

  useEffect(() => {
    fetch("https://microcred-server.vercel.app/home-allloans")
      .then((res) => res.json())
      .then((result) => {
        setTimeout(() => {
          setLoans(result.data || result);
          setLoading(false);
        }, 600);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredAndSortedLoans = useMemo(() => {
    const term = search.trim().toLowerCase();

    let filtered = loans.filter((loan) => {
      if (!term) return true;
      const title = (loan.title || "").toLowerCase();
      const category = (loan.category || "").toLowerCase();
      const desc = (loan.shortDesc || loan.description || "").toLowerCase();
      return (
        title.includes(term) || category.includes(term) || desc.includes(term)
      );
    });

    if (quickFilter === "high-amount") {
      filtered = filtered.filter((loan) => {
        const amount = Number(loan.maxLimit || loan.maxAmount || 0);
        return amount >= 50000;
      });
    } else if (quickFilter === "low-rate") {
      filtered = filtered.filter((loan) => {
        const rate = Number(loan.interestRate || 0);
        return rate > 0 && rate <= 10;
      });
    }

    if (sortBy === "amount-asc") {
      filtered = filtered.slice().sort((a, b) => {
        const av = Number(a.maxLimit || a.maxAmount || 0);
        const bv = Number(b.maxLimit || b.maxAmount || 0);
        return av - bv;
      });
    } else if (sortBy === "amount-desc") {
      filtered = filtered.slice().sort((a, b) => {
        const av = Number(a.maxLimit || a.maxAmount || 0);
        const bv = Number(b.maxLimit || b.maxAmount || 0);
        return bv - av;
      });
    } else if (sortBy === "rate-asc") {
      filtered = filtered.slice().sort((a, b) => {
        const av = Number(a.interestRate || 0);
        const bv = Number(b.interestRate || 0);
        return av - bv;
      });
    } else if (sortBy === "rate-desc") {
      filtered = filtered.slice().sort((a, b) => {
        const av = Number(a.interestRate || 0);
        const bv = Number(b.interestRate || 0);
        return bv - av;
      });
    }

    return filtered;
  }, [loans, search, sortBy, quickFilter]);

  const totalPages = Math.ceil(filteredAndSortedLoans.length / pageSize);

  const paginatedLoans = filteredAndSortedLoans.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const toggleQuickFilter = (value) => {
    setQuickFilter((prev) => (prev === value ? "none" : value));
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <ScaleLoader color="#2cc786" />
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }}
      className="mt-2 min-h-screen "
    >
      <div className="container mx-auto px-4 py-10 sm:py-12 lg:py-14">
        <title>MicroCredX-All Loans</title>

        <div className="text-left">
          <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-600">
            All Loan Products
          </p>
          <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
            Explore all available loan options
          </h2>
          <p className="mt-2 max-w-2xl text-xs sm:text-sm text-slate-500">
            Compare limits, interest rates, and tenures to find the right
            microloan for your needs.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:gap-3">
            <div className="flex flex-wrap gap-2 text-[11px]">
              <button
                type="button"
                onClick={() => toggleQuickFilter("high-amount")}
                className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 ${
                  quickFilter === "high-amount"
                    ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                    : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                High amount (৳50k+)
              </button>
              <button
                type="button"
                onClick={() => toggleQuickFilter("low-rate")}
                className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 ${
                  quickFilter === "low-rate"
                    ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                    : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Low interest (≤10% p.a.)
              </button>
            </div>
            <span className="text-[11px] text-slate-500">
              Showing {filteredAndSortedLoans.length} loan
              {filteredAndSortedLoans.length !== 1 && "s"} after filters.
            </span>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-3 w-full sm:w-auto">
            <div className="relative inline-flex items-center">
              <span className="mr-2 hidden text-[11px] text-slate-500 sm:inline">
                Sort
              </span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="appearance-none rounded-full border border-slate-200 bg-white pr-8 pl-3 py-2 text-[11px] sm:text-xs text-slate-800 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                >
                  <option value="recent">Recently added</option>
                  <option value="amount-desc">Amount · high to low</option>
                  <option value="amount-asc">Amount · low to high</option>
                  <option value="rate-asc">Rate · low to high</option>
                  <option value="rate-desc">Rate · high to low</option>
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-slate-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.25a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z" />
                  </svg>
                </span>
              </div>
            </div>

            <div className="relative w-full sm:max-w-xs">
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search by name, category, or description..."
                className="w-full rounded-full border border-slate-200 bg-white px-3 py-2 pl-9 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-4.35-4.35M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14z"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {filteredAndSortedLoans.length === 0 ? (
          <div className="mt-10 flex items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/60 px-4 py-10 text-xs sm:text-sm text-slate-500">
            No loans match your search and filters. Try a different keyword or
            reset sorting.
          </div>
        ) : (
          <>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedLoans.map((loan) => {
                const imgSrc = getLoanImage(loan);

                return (
                  <article
                    key={loan.id || loan._id}
                    className="group flex flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-200 hover:shadow-lg"
                  >
                    {imgSrc && (
                      <div className="mb-4 overflow-hidden rounded-xl border border-emerald-50 bg-emerald-50/60">
                        <img
                          src={imgSrc}
                          alt={loan.name || loan.title || "Loan image"}
                          className="h-32 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    )}

                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                        {loan.category || "Microloan"}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        #{loan.code || loan.id || String(loan._id).slice(-6)}
                      </span>
                    </div>

                    <h3 className="text-sm font-semibold text-slate-900 line-clamp-1">
                      {loan.title || "Loan Plan"}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-500 line-clamp-2">
                      {loan.shortDesc ||
                        loan.description ||
                        "Flexible microloan designed to support your daily and long‑term needs."}
                    </p>

                    <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
                      <div>
                        <p className="text-[11px] text-slate-400">Max amount</p>
                        <p className="mt-1 font-semibold text-slate-900">
                          {loan.maxLimit || loan.maxAmount
                            ? `৳${loan.maxLimit || loan.maxAmount}`
                            : "On request"}
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

                    {loan.emiPlans && loan.emiPlans.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {loan.emiPlans.slice(0, 3).map((emi, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center rounded-full bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-600"
                          >
                            {emi}
                          </span>
                        ))}
                        {loan.emiPlans.length > 3 && (
                          <span className="text-[10px] text-slate-400">
                            +{loan.emiPlans.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    <div className="mt-5 flex items-center justify-between gap-3">
                      <Link
                        to={`/loan-details/${loan._id}`}
                        className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-700"
                      >
                        View details
                        <span className="text-xs transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-8 flex justify-center">
              <div className="join">
                {Array.from({ length: totalPages }, (_, idx) => {
                  const page = idx + 1;
                  return (
                    <button
                      key={page}
                      className={`join-item btn btn-xs sm:btn-sm ${
                        currentPage === page ? "btn-active" : ""
                      }`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </motion.section>
  );
};

export default AllLoans;
