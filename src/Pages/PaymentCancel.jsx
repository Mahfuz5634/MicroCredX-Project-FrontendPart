import React from "react";
import { Link } from "react-router";

const PaymentCancel = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-6 text-center">
        <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-rose-50 flex items-center justify-center">
          <span className="text-rose-500 text-2xl">!</span>
        </div>

        <h1 className="text-lg font-semibold text-slate-900">
          Payment cancelled
        </h1>
        <p className="mt-2 text-xs text-slate-500">
          You cancelled the payment process. Your application fee is still
          unpaid.
        </p>

        <p className="mt-2 text-[11px] text-slate-500">
          You can try again from the My Loans page whenever you are ready.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row sm:justify-center gap-2 text-xs">
          <Link
            to="/dashboard/my-loans"
            className="btn btn-xs sm:btn-sm bg-emerald-500 hover:bg-emerald-600 text-white border-0"
          >
            Back to My Loans
          </Link>
          <Link
            to="/"
            className="btn btn-xs sm:btn-sm btn-outline border-slate-200 text-slate-700"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default PaymentCancel;
