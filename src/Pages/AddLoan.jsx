// src/pages/Dashboard/AddLoan.jsx
import React from "react";

const AddLoan = () => {
  return (
    <div className="max-w-xl">
      <h2 className="text-xl font-semibold text-slate-900 mb-4">
        Add New Loan
      </h2>

      <form className="space-y-4">
        <div>
          <label className="block text-sm text-slate-600 mb-1">
            Loan Title
          </label>
          <input
            type="text"
            name="title"
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
            placeholder="Smart Education Loan"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-600 mb-1">
            Description
          </label>
          <textarea
            name="description"
            rows={3}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
            placeholder="Write a short loan description"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Category
            </label>
            <select
              name="category"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
            >
              <option value="Education">Education</option>
              <option value="Business">Business</option>
              <option value="Home">Home</option>
              <option value="Medical">Medical</option>
              <option value="Personal">Personal</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Interest Rate (%)
            </label>
            <input
              type="number"
              step="0.1"
              name="interestRate"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
              placeholder="9.5"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Max Loan Limit
            </label>
            <input
              type="number"
              name="maxLimit"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
              placeholder="150000"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Required Documents
            </label>
            <input
              type="text"
              name="requiredDocs"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
              placeholder="NID, salary slip, photo"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-slate-600 mb-1">
            EMI Plans (comma separated)
          </label>
          <input
            type="text"
            name="emiPlans"
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
            placeholder="3 months, 6 months, 12 months"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-600 mb-1">
            Loan Image URL
          </label>
          <input
            type="text"
            name="image"
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
            placeholder="https://..."
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="showOnHome"
            type="checkbox"
            className="checkbox checkbox-sm"
          />
          <label htmlFor="showOnHome" className="text-sm text-slate-600">
            Show on Home Page
          </label>
        </div>

        <button
          type="submit"
          className="btn bg-emerald-500 text-white hover:bg-emerald-600 text-sm"
        >
          Save Loan
        </button>
      </form>
    </div>
  );
};

export default AddLoan;
