import React, { useContext } from "react";
import { Authcontext } from "../ContextApi/AuthContext";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css"; 

const AddLoan = () => {
  const { user, token } = useContext(Authcontext);
  const today = new Date().toLocaleDateString();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const payload = {
      title: form.title.value,
      image: form.image.value,
      shortDesc: form.shortDesc.value,
      description: form.description.value,
      category: form.category.value,
      interestRate: Number(form.interestRate.value),
      maxLimit: Number(form.maxLimit.value),
      emiPlans: form.emiPlans.value
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean),
      showOnHome: form.showOnHome.checked,
      createdBy: user?.email,
      createdByName: user?.displayName,
      createdByRole: "manager",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("https://microcred-server.vercel.app/add-loan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to save");
      }

      const data = await res.json();
      console.log("Saved loan:", data);

      await Swal.fire({
        icon: "success",
        title: "Loan created",
        text: "The new loan product has been added successfully.",
        buttonsStyling: false,
        confirmButtonText: "OK",
        customClass: {
          popup: "rounded-2xl shadow-xl",
          title: "text-slate-900 text-base font-semibold",
          htmlContainer: "text-slate-600 text-sm",
          confirmButton:
            "inline-flex justify-center items-center px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-300",
        },
      }); 

      form.reset();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Could not save the loan. Please try again.",
        buttonsStyling: false,
        confirmButtonText: "Close",
        customClass: {
          popup: "rounded-2xl shadow-xl",
          title: "text-slate-900 text-base font-semibold",
          htmlContainer: "text-slate-600 text-sm",
          confirmButton:
            "inline-flex justify-center items-center px-4 py-2 rounded-lg bg-rose-500 text-white text-sm font-medium hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-300",
        },
      });
    }
  };

  const handleCancel = () => {
    Swal.fire({
      title: "Discard changes?",
      text: "All entered loan details will be cleared.",
      icon: "warning",
      showCancelButton: true,
      buttonsStyling: false,
      confirmButtonText: "Yes, discard",
      cancelButtonText: "Keep editing",
      customClass: {
        popup: "rounded-2xl shadow-xl",
        title: "text-slate-900 text-base font-semibold",
        htmlContainer: "text-slate-600 text-sm",
        confirmButton:
          "inline-flex justify-center items-center px-4 py-2 rounded-lg bg-rose-500 text-white text-sm font-medium hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-300 mr-2",
        cancelButton:
          "inline-flex justify-center items-center px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const form = document.getElementById("add-loan-form");
        if (form) form.reset();
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 px-3 py-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <title>MicroCredX-AddLoan</title>

        <div className="mb-4 flex items-center justify-between gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
              Add New Loan Product
            </h2>
            <p className="text-xs sm:text-[13px] text-slate-500 mt-1">
              Configure loan details, limits, and visibility for borrowers.
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center rounded-full bg-slate-50 px-3 py-1 text-[11px] text-slate-500 border border-slate-100">
            Today:
            <span className="ml-1 font-medium text-slate-700">{today}</span>
          </span>
        </div>

        <form
          id="add-loan-form"
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-5"
        >
          <div className="grid md:grid-cols-[1.6fr,1.4fr] gap-4">
            <div>
              <label className="block text-sm text-slate-600 mb-1">
                Loan Title
              </label>
              <input
                type="text"
                name="title"
                required
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400"
                placeholder="Smart Education Loan"
              />
              <p className="mt-1 text-[11px] text-slate-400">
                A clear name that appears in listings and on the home page.
              </p>
            </div>

            <div>
              <label className="block text-sm text-slate-600 mb-1">
                Short Description
              </label>
              <input
                type="text"
                name="shortDesc"
                required
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400"
                placeholder="Flexible microloan for tuition and exam fees."
              />
              <p className="mt-1 text-[11px] text-slate-400">
                Shown as a brief summary on cards.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Detailed Description
            </label>
            <textarea
              name="description"
              rows={4}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400"
              placeholder="Explain eligibility, repayment terms, and any special conditions."
            />
          </div>

          <div className="grid md:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm text-slate-600 mb-1">
                Category
              </label>
              <select
                name="category"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400"
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
                required
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400"
                placeholder="9.5"
              />
              <p className="mt-1 text-[11px] text-slate-400">
                Annual interest rate applied to this product.
              </p>
            </div>

            <div>
              <label className="block text-sm text-slate-600 mb-1">
                Max Loan Limit (৳)
              </label>
              <input
                type="number"
                name="maxLimit"
                required
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400"
                placeholder="150000"
              />
              <p className="mt-1 text-[11px] text-slate-400">
                Maximum amount a borrower can request.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">
              EMI Plans (comma separated)
            </label>
            <input
              type="text"
              name="emiPlans"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400"
              placeholder="3 months, 6 months, 12 months"
            />
            <p className="mt-1 text-[11px] text-slate-400">
              Example: 3 months, 6 months, 12 months.
            </p>
          </div>

          <div className="grid md:grid-cols-[1.6fr,1.4fr] gap-3 items-start">
            <div>
              <label className="block text-sm text-slate-600 mb-1">
                Loan Image URL
              </label>
              <input
                type="text"
                name="image"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400"
                placeholder="https://i.ibb.co.com/..."
              />
              <p className="mt-1 text-[11px] text-slate-400">
                Used on the home page and loan details card.
              </p>
            </div>

            <div className="space-y-2 text-xs border border-slate-100 rounded-xl p-3 bg-slate-50/60">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">System Date</span>
                <span className="text-slate-800 font-medium">{today}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Created by</span>
                <span className="text-slate-700 font-medium truncate max-w-[140px] text-right">
                  {user?.displayName || user?.email}
                </span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-dashed border-slate-100">
                <span className="text-slate-500">Show on Home</span>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    id="showOnHome"
                    name="showOnHome"
                    type="checkbox"
                    className="toggle toggle-sm"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-dashed border-slate-100">
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-ghost btn-sm text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn bg-emerald-500 text-white hover:bg-emerald-600 text-sm"
            >
              Save Loan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLoan;
