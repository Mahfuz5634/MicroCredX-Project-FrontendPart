import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const LoanDetails = () => {
  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => { 
    fetch(`http://localhost:3000/loan-details/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
        setLoan(data.data || data);
        setLoading(false);
        }, 600);
       
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  if (!loan) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-slate-500">
        Loan not found.
      </div>
    );
  }

  const {
    title,
    image,
    category,
    maxAmount,
    interestRate,
    tenureMonths,
    description,
    highlights,
    features,
    eligibility,
  } = loan;

  return (
    <main className="bg-slate-50 min-h-screen">
      <section className="pt-10 pb-16">
        <div className="container mx-auto px-4">
      
          <div className="text-xs text-slate-500 mb-4">
            <span className="cursor-pointer hover:text-emerald-600">
              Home
            </span>{" "}
            /{" "}
            <span className="cursor-pointer hover:text-emerald-600">
              Loans
            </span>{" "}
            / <span className="text-slate-700">{title}</span>
          </div>

         
          <div className="grid gap-8 lg:grid-cols-[1.2fr,0.9fr] lg:items-start">
        
            <section className="rounded-3xl bg-white border border-slate-100 shadow-sm p-5 md:p-7">
           
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700">
                  {category || "Microloan"}
                </span>
                {tenureMonths && (
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-700">
                    Up to {tenureMonths} months
                  </span>
                )}
              </div>

              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
                {title}
              </h1>

              <p className="mt-3 text-sm text-slate-600 max-w-2xl">
                {description ||
                  "A flexible microloan designed to help you manage education, business, and personal needs with transparent terms and quick approval."}
              </p>

            
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-emerald-50 bg-emerald-50/60 p-4">
                  <p className="text-[11px] font-medium text-emerald-700 uppercase tracking-[0.18em]">
                    Max amount
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">
                    {maxAmount ? `৳${maxAmount}` : "On request"}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Based on your eligibility & documents
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-[11px] font-medium text-slate-700 uppercase tracking-[0.18em]">
                    Interest rate
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">
                    {interestRate ? `${interestRate}% p.a.` : "Custom"}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Transparent pricing, no hidden fees
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-[11px] font-medium text-slate-700 uppercase tracking-[0.18em]">
                    Tenure
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">
                    {tenureMonths ? `${tenureMonths} months` : "Flexible"}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Choose EMIs that fit your budget
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    Why this loan is a good fit
                  </h2>
                  <ul className="mt-3 space-y-2 text-xs text-slate-600">
                    {(highlights && highlights.length
                      ? highlights
                      : [
                          "Quick digital application with minimal documentation.",
                          "Get funds directly in your bank or mobile wallet.",
                          "No collateral required for eligible customers.",
                        ]
                    ).map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    Eligibility & documents
                  </h2>
                  <ul className="mt-3 space-y-2 text-xs text-slate-600">
                    {(eligibility && eligibility.length
                      ? eligibility
                      : [
                          "Valid national ID and recent photograph.",
                          "Proof of income or business cash flow.",
                          "Active mobile number and bank / mobile wallet account.",
                        ]
                    ).map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* features */}
              <div className="mt-8">
                <h2 className="text-sm font-semibold text-slate-900">
                  Key features
                </h2>
                <div className="mt-3 grid gap-4 sm:grid-cols-3 text-[11px] text-slate-600">
                  {(features && features.length
                    ? features
                    : [
                        "Flexible repayment with weekly or monthly EMIs.",
                        "No pre‑closure penalty after a minimum lock‑in period.",
                        "24/7 support through app, phone, and WhatsApp.",
                      ]
                  ).map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-100 bg-slate-50 p-3"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </section>

           
            <aside className="space-y-5">
              {/* image */}
              {image && (
                <div className="overflow-hidden rounded-3xl border border-slate-100 bg-slate-100 shadow-sm">
                  <img
                    src={image}
                    alt={title}
                    className="h-64 w-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}

              {/* apply box */}
              <div className="rounded-3xl border border-emerald-100 bg-emerald-50/70 p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-900">
                  Ready to apply?
                </h3>
                <p className="mt-2 text-xs text-slate-600">
                  Share a few details and get a quick eligibility check for this
                  loan. No impact on your credit score.
                </p>

                <div className="mt-4 space-y-2 text-[11px] text-slate-700">
                  <p>• 100% digital application</p>
                  <p>• Instant eligibility decision</p>
                  <p>• Transparent fees & charges</p>
                </div>

                <div className="mt-5 flex flex-col gap-2">
                  <button className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-[11px] font-medium text-white shadow-sm transition-colors hover:bg-emerald-700">
                    Start application
                  </button>
                  <button className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-white px-4 py-2 text-[11px] font-medium text-emerald-700 hover:bg-emerald-50">
                    Talk to an advisor
                  </button>
                </div>
              </div>

             
              <div className="rounded-2xl border border-slate-100 bg-white p-4 text-[11px] text-slate-600">
                <p className="font-semibold text-slate-900">
                  Need help choosing a loan?
                </p>
                <p className="mt-1">
                  Chat with support or explore other loan products from the
                  loans page.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoanDetails;
