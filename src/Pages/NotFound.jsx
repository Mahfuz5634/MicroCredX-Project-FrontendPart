import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-300 border border-emerald-500/30">
          404 • Page not found
        </div>

        <div>
          <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">
            Lost in{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
              MicroCredX
            </span>
            .
          </h1>
          <p className="mt-3 text-xs md:text-sm text-slate-400">
            The page you’re looking for doesn’t exist, was moved, or is
            temporarily unavailable. Use the links below to get back on track.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-xs">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-2.5 font-medium text-white shadow-sm hover:bg-emerald-600 transition-colors"
          >
            Go to Home
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center rounded-full border border-slate-700 px-5 py-2.5 font-medium text-slate-100 hover:bg-slate-800/60 transition-colors"
          >
            Open Dashboard
          </Link>
        </div>

        <div className="border-t border-slate-800/60 pt-4 text-[11px] text-slate-500">
          <p>
            If you typed the URL manually, double‑check the address. Otherwise,
            you can return to the home page or dashboard.
          </p>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
