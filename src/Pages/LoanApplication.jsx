import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router";

const LoanApplicationForm = () => {
  const location = useLocation();

  const { email, loanTitle, interestRate } = location.state || {};

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const data = {
      email: form.email.value,
      loanTitle: form.loanTitle.value,
      interestRate: form.interestRate.value,
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      contactNumber: form.contactNumber.value,
      nationalId: form.nationalId.value,
      incomeSource: form.incomeSource.value,
      monthlyIncome: form.monthlyIncome.value,
      loanAmount: form.loanAmount.value,
      reason: form.reason.value,
      address: form.address.value,
      extraNotes: form.extraNotes.value,
      status: "Pending",
      applicationFeeStatus: "unpaid",
    };
    axios.post("https://microcred-server.vercel.app/save-loan", data);
    toast.success("Application submitted");
    e.target.reset();
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <title>MicroCredX-LoanApplication</title>
      <div className="w-full max-w-4xl">
        <div className="mb-6 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-600">
            Loan Application
          </p>
          <h1 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
            Apply for this loan
          </h1>
          <p className="mt-2 text-xs md:text-sm text-slate-500">
            Review the auto‑filled details and complete the form to submit your
            loan request.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white px-5 py-6 md:px-8 md:py-8 shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  User Email
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={email}
                  readOnly
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Loan Title
                </label>
                <input
                  type="text"
                  name="loanTitle"
                  defaultValue={loanTitle}
                  readOnly
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Interest Rate
                </label>
                <input
                  type="text"
                  name="interestRate"
                  defaultValue={interestRate}
                  readOnly
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 cursor-not-allowed"
                />
              </div>
            </div>

            <hr className="border-slate-100" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  placeholder="Enter your first name"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  placeholder="Enter your last name"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Contact Number
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  required
                  placeholder="+8801XXXXXXXXX"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  National ID / Passport Number
                </label>
                <input
                  type="text"
                  name="nationalId"
                  required
                  placeholder="Enter NID or Passport No."
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Income Source
                </label>
                <input
                  type="text"
                  name="incomeSource"
                  required
                  placeholder="Job, Business, Freelance, etc."
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Monthly Income
                </label>
                <input
                  type="number"
                  name="monthlyIncome"
                  required
                  min="0"
                  placeholder="Enter amount in BDT"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Loan Amount
                </label>
                <input
                  type="number"
                  name="loanAmount"
                  required
                  min="0"
                  placeholder="Requested loan amount"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Reason for Loan
                </label>
                <input
                  type="text"
                  name="reason"
                  required
                  placeholder="Education, business, medical, etc."
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Address
              </label>
              <textarea
                name="address"
                required
                rows={3}
                placeholder="House, Road, Area, City, District"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Extra Notes (Optional)
              </label>
              <textarea
                name="extraNotes"
                rows={3}
                placeholder="Any additional information you want to share"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 resize-none"
              />
            </div>

            <input type="hidden" name="status" value="Pending" />
            <input type="hidden" name="applicationFeeStatus" value="unpaid" />

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-2.5 text-xs font-medium text-white shadow-sm transition-colors hover:bg-emerald-700"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LoanApplicationForm;
