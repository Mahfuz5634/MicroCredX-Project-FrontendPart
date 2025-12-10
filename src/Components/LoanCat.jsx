import React from "react";

const categories = [
  {
    id: 1,
    name: "Education",
    desc: "Support for tuition fees, exam costs, and study materials.",
    icon: "🎓",
  },
  {
    id: 2,
    name: "Business",
    desc: "Working capital for small shops and micro‑entrepreneurs.",
    icon: "🏪",
  },
  {
    id: 3,
    name: "Personal",
    desc: "Manage weddings, emergencies, or personal expenses smoothly.",
    icon: "👨‍👩‍👧",
  },
  {
    id: 4,
    name: "Home & Appliances",
    desc: "Upgrade your home or buy essential appliances with easy EMIs.",
    icon: "🏠",
  },
];

const LoanCategories = () => (
  <section className="relative mt-20">
    {/* soft background accents */}
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-24 -left-10 h-64 w-64 rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-lime-200/40 blur-3xl" />
    </div>

    <div className="container mx-auto px-4">
      {/* heading + image */}
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* left: label + title */}
        <div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-600">
          Loan Categories
          </p>
          </div>

          <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
            Available Microloan Plans
          </h2>

          <p className="mt-2 max-w-xl text-sm text-slate-500">
            Choose from flexible microloan options tailored to education, business,
            and personal needs.
          </p>
        </div>

      </div>

      {/* cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-white/70 bg-white/70 px-5 py-7 text-center shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-200 hover:bg-white/90 hover:shadow-lg"
          >
            {/* top gradient accent */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-lime-300 to-emerald-400 opacity-80" />

            {/* hover radial highlight */}
            <div className="pointer-events-none absolute inset-0 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-70 bg-radial-at-t from-emerald-100/60 via-transparent to-transparent" />

            {/* icon */}
            <div className="relative mb-4 mt-1 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-2xl text-emerald-600 shadow-inner ring-1 ring-emerald-100/60 transition-all duration-300 group-hover:bg-emerald-500 group-hover:text-white group-hover:ring-emerald-400">
              <span className="transform transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5">
                {cat.icon}
              </span>
            </div>

            {/* text */}
            <h3 className="text-sm font-semibold text-slate-900">
              {cat.name}
            </h3>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              {cat.desc}
            </p>

            {/* CTA */}
            <button className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 transition-colors group-hover:text-emerald-700">
              <span>View related microloan plans</span>
              <span className="transform text-xs transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>

            {/* bottom glow */}
            <div className="pointer-events-none absolute inset-x-6 bottom-0 h-px origin-center scale-x-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/70 to-emerald-400/0 transition-transform duration-300 group-hover:scale-x-100" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default LoanCategories;
