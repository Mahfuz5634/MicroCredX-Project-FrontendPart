import axios from "axios";
import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      axios
        .patch(`http://localhost:3000/payment-success?session_id=${sessionId}`)

        .then((res) => {
          console.log(res);
        });
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <main className="w-full flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-6 text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center">
            <span className="text-emerald-600 text-2xl">✓</span>
          </div>

          <h1 className="text-lg font-semibold text-slate-900">
            Payment successful
          </h1>
          <p className="mt-2 text-xs text-slate-500">
            Your application fee has been received. Your loan application will be
            processed shortly.
          </p>

          {sessionId && (
            <p className="mt-3 text-[11px] text-slate-400 break-all">
              Session ID: <span className="font-mono">{sessionId}</span>
            </p>
          )}

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
    </div>
  );
};

export default PaymentSuccess;
