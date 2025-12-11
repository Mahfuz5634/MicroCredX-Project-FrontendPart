import React from "react";
import img1 from "../assets/Hero-Transforming-Education-11.avif"
import img2 from "../assets/busienssss.png"
// import img1 from "../assets/Hero-Transforming-Education-11.avif"
const categories = [
  {
    id: 1,
    name: "Education",
    desc: "Support for tuition fees, exam costs, and study materials.",
    image: img1,
    imageAlt: "Student taking education loan illustration",
  },
  {
    id: 2,
    name: "Business",
    desc: "Working capital for small shops and micro‑entrepreneurs.",
    image: img2,
    imageAlt: "Small shop and business owner illustration",
  },
  {
    id: 3,
    name: "Personal",
    desc: "Manage weddings, emergencies, or personal expenses smoothly.",
    image: "../assets/personall.jfif",
    imageAlt: "Family with personal loan illustration",
  },
  {
    id: 4,
    name: "Home & Appliances",
    desc: "Upgrade your home or buy essential appliances with easy EMIs.",
    image: "../assets/home-app.jpg",
    imageAlt: "Home and appliances illustration",
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
      {/* heading */}
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-600">
            Loan Categories
          </p>

          <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
            Available Microloan Plans
          </h2>

          <p className="mt-2 max-w-xl text-sm text-slate-500">
            Choose from flexible microloan options tailored to education,
            business, and personal needs.
          </p>
        </div>
      </div>

      {/* cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat) => (
          <article
            key={cat.id}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/60 bg-white/70 px-5 pb-6 pt-4 text-left shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-200 hover:bg-white/90 hover:shadow-xl"
          >
            {/* top gradient accent */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-lime-300 to-emerald-400 opacity-80" />

            {/* hover radial highlight */}
            <div className="pointer-events-none absolute inset-0 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-70 bg-radial-at-t from-emerald-100/60 via-transparent to-transparent" />

            {/* image */}
            <div className="relative mb-4 mt-2">
              <div className="overflow-hidden rounded-xl border border-emerald-100/60 bg-emerald-50/60 shadow-inner">
                <img
                  src={cat.image}
                  alt={cat.imageAlt}
                  className="h-24 w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-0.5"
                  loading="lazy"
                />
              </div>
            </div>

            {/* text */}
            <h3 className="text-sm font-semibold text-slate-900">
              {cat.name}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">
              {cat.desc}
            </p>

            {/* CTA */}
            <button
              type="button"
              className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 transition-colors group-hover:text-emerald-700"
            >
              <span>View related microloan plans</span>
              <span className="transform text-xs transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>

            {/* bottom glow */}
            <div className="pointer-events-none absolute inset-x-6 bottom-0 h-px origin-center scale-x-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/70 to-emerald-400/0 transition-transform duration-300 group-hover:scale-x-100" />
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default LoanCategories;
