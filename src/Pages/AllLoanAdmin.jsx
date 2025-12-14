// src/pages/Dashboard/ManageLoans.jsx
import React, { useContext, useEffect, useState } from "react";
import { Authcontext } from "../ContextApi/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";
import Swal from "sweetalert2";

const ManageLoans = () => {
  const [loans, setLoans] = useState([]);
  const [editing, setEditing] = useState(null);
  const [load, setLoad] = useState(false);
  const { user ,token} = useContext(Authcontext);

  // load all loans (admin)
  useEffect(() => {
    if (!user?.email) return;
    fetch("http://localhost:3000/all-loan")
      .then((res) => res.json())
      .then((data) => setLoans(data))
      .catch(console.error);
  }, [user?.email, load]);

  // SweetAlert delete
  const deleteItems = (id) => {
    Swal.fire({
      title: "Delete this loan?",
      text: "This action cannot be undone once deleted.",
      icon: "warning",
      iconColor: "#f97316",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "No, keep it",
      buttonsStyling: false,
      customClass: {
        popup: "rounded-2xl shadow-lg",
        title: "text-slate-900 text-base font-semibold",
        htmlContainer: "text-slate-500 text-sm",
        confirmButton:
          "btn btn-sm bg-rose-600 hover:bg-rose-700 text-white border-0 px-4",
        cancelButton:
          "btn btn-sm bg-slate-100 hover:bg-slate-200 text-slate-700 border-0 px-4 ml-2",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/delete-loan/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            setLoad((prev) => !prev);
            Swal.fire({
              title: "Deleted",
              text: "The loan has been removed.",
              icon: "success",
              iconColor: "#22c55e",
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
              customClass: {
                popup: "rounded-2xl shadow-md",
                title: "text-slate-900 text-sm font-semibold",
                htmlContainer: "text-slate-500 text-xs",
              },
            });
          })
          .catch(() => {
            toast.error("Delete failed");
          });
      }
    });
  };

  // update full loan (including showOnHome from modal)
  const handleUpdateLoan = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updated = {
      ...editing,
      title: form.title.value,
      shortDesc: form.shortDesc.value,
      description: form.description.value,
      interestRate: Number(form.interestRate.value),
      maxLimit: Number(form.maxLimit.value),
      category: form.category.value,
      image: form.image.value,
      emiPlans: form.emiPlans.value
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean),
      showOnHome: form.showOnHome.checked,
      updatedAt: new Date().toISOString(),
    };

    try {
      await fetch(`http://localhost:3000/update-adminloan/${editing._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json","Authorization": `Bearer ${token}`, },
        body: JSON.stringify(updated),
      });

      setLoans((prev) =>
        prev.map((loan) => (loan._id === editing._id ? updated : loan))
      );
      setEditing(null);
      toast.success("Loan updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  return (
    <div className="space-y-4">
      {/* header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Manage All Loans
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Admin can manage all loan products.
          </p>
        </div>
        <div className="text-[11px] text-slate-500">
          Total Loans:{" "}
          <span className="font-semibold text-slate-800">
            {loans.length}
          </span>
        </div>
      </div>

      {/* table */}
      <div className="overflow-x-auto bg-white rounded-xl border border-slate-100 shadow-sm">
        <table className="table table-sm">
          <thead>
            <tr className="text-xs text-slate-500 bg-slate-50/80">
              <th>Image</th>
              <th>Title</th>
              <th>Interest</th>
              <th>Category</th>
              <th>Created By</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan._id} className="text-xs hover:bg-slate-50/60">
                {/* Image */}
                <td>
                  <div className="w-12 h-8 rounded-lg overflow-hidden bg-slate-100 ring-1 ring-slate-100">
                    {loan.image && (
                      <img
                        src={loan.image}
                        alt={loan.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </td>

                {/* Title + shortDesc */}
                <td>
                  <p className="font-medium text-slate-900 line-clamp-1">
                    {loan.title}
                  </p>
                  <p className="text-[11px] text-slate-500 line-clamp-1">
                    {loan.shortDesc}
                  </p>
                </td>

                {/* Interest */}
                <td>
                  <p className="font-semibold text-slate-900">
                    {loan.interestRate}%
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Max: ৳{loan.maxLimit}
                  </p>
                </td>

                {/* Category */}
                <td>
                  <span className="inline-flex items-center rounded-full bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                    {loan.category}
                  </span>
                </td>

                {/* Created By */}
                <td>
                  <p className="font-medium text-slate-800">
                    {loan.createdByName || "Unknown"}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {loan.createdBy || "-"}
                  </p>
                </td>

                {/* Actions */}
                <td className="text-right space-x-1">
                  <button
                    onClick={() => setEditing(loan)}
                    className="btn btn-xs btn-outline"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteItems(loan._id)}
                    className="btn btn-xs btn-error text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {loans.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-xs text-slate-400"
                >
                  No loans found. Add a new loan first.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Update Loan
                </h3>
                <p className="text-[11px] text-slate-500">
                  ID: {editing._id.slice(-6)}
                </p>
              </div>
              <button
                onClick={() => setEditing(null)}
                className="text-slate-400 hover:text-slate-600 text-lg leading-none"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleUpdateLoan}
              className="px-4 py-4 space-y-3 text-xs"
            >
              <div>
                <label className="block text-[11px] text-slate-600 mb-1">
                  Loan Title
                </label>
                <input
                  name="title"
                  defaultValue={editing.title}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-600 mb-1">
                  Short Description
                </label>
                <input
                  name="shortDesc"
                  defaultValue={editing.shortDesc}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-600 mb-1">
                  Full Description
                </label>
                <textarea
                  name="description"
                  rows={3}
                  defaultValue={editing.description}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-600 mb-1">
                    Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="interestRate"
                    defaultValue={editing.interestRate}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-600 mb-1">
                    Max Loan Limit (৳)
                  </label>
                  <input
                    type="number"
                    name="maxLimit"
                    defaultValue={editing.maxLimit}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-600 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    defaultValue={editing.category}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400"
                  >
                    <option value="Education">Education</option>
                    <option value="Business">Business</option>
                    <option value="Home">Home</option>
                    <option value="Medical">Medical</option>
                    <option value="Personal">Personal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] text-slate-600 mb-1">
                    Image URL
                  </label>
                  <input
                    name="image"
                    defaultValue={editing.image}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-600 mb-1">
                  EMI Plans (comma separated)
                </label>
                <input
                  name="emiPlans"
                  defaultValue={editing.emiPlans?.join(", ") || ""}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400"
                  placeholder="3 months, 6 months, 12 months"
                />
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-dashed border-slate-100">
                <input
                  id="showOnHome"
                  name="showOnHome"
                  type="checkbox"
                  defaultChecked={editing.showOnHome}
                  className="toggle toggle-xs"
                />
                <label
                  htmlFor="showOnHome"
                  className="text-[11px] text-slate-600"
                >
                  Show this loan on Home Page (Available Loans)
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-dashed border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="btn btn-ghost btn-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-xs bg-emerald-500 hover:bg-emerald-600 text-white"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageLoans;
