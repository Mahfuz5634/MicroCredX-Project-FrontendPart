import React, { useContext, useEffect, useState } from "react";
import { Authcontext } from "../ContextApi/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css"; 

const ManageLoans = () => {
  const [loans, setLoans] = useState([]);
  const [editing, setEditing] = useState(null);
  const [load, setLoad] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { user, token } = useContext(Authcontext);

  useEffect(() => {
    if (!user?.email) return;
    fetch(
      `https://microcred-server.vercel.app/create-loan?email=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => setLoans(data))
      .catch(console.error);
  }, [user?.email, load]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete this loan?",
      text: "This loan product will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      buttonsStyling: false,
      showCloseButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "rounded-2xl shadow-xl",
        title: "text-slate-900 text-base font-semibold",
        htmlContainer: "text-slate-500 text-sm",
        confirmButton:
          "inline-flex justify-center items-center px-4 py-2 rounded-lg bg-rose-500 text-white text-sm font-medium hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-300 mr-2",
        cancelButton:
          "inline-flex justify-center items-center px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200",
      },
    }); 

    if (!result.isConfirmed) return;

    try {
      await axios.delete(
        `https://microcred-server.vercel.app/delete-loan/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Deleted successfully");
      setLoad((p) => !p);
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleUpdateLoan = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updated = {
      ...editing,
      title: form.title.value,
      shortDesc: form.shortDesc.value,
      interestRate: Number(form.interestRate.value),
      maxLimit: Number(form.maxLimit.value),
      category: form.category.value,
      image: form.image.value,
      updatedAt: new Date().toISOString(),
    };

    try {
      await fetch(
        `https://microcred-server.vercel.app/update-loan/${editing._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updated),
        }
      );

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

  const filteredLoans = loans.filter((loan) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      loan.title?.toLowerCase().includes(q) ||
      loan.category?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 px-3 py-4 sm:px-6 lg:px-8 space-y-4">
      <title>MicroCredX-ManageLoans</title>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
            Manage Loans
          </h2>
          <p className="text-xs sm:text-[13px] text-slate-500 mt-1">
            View, edit, or remove loan products you have created.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <div className="text-[11px] text-slate-500">
            Total Loans:{" "}
            <span className="font-semibold text-slate-800">
              {loans.length}
            </span>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by title or category..."
              className="w-full sm:w-64 border border-slate-300 rounded-lg px-3 py-1.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-2 text-slate-400 text-xs"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-2 md:hidden">
        {filteredLoans.map((loan) => (
          <div
            key={loan._id}
            className="bg-white rounded-xl border border-slate-100 shadow-sm p-3 space-y-2"
          >
            <div className="flex items-start gap-3">
              <div className="w-14 h-10 rounded-lg overflow-hidden bg-slate-100 ring-1 ring-slate-100 flex-shrink-0">
                {loan.image && (
                  <img
                    src={loan.image}
                    alt={loan.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1 space-y-1">
                <p className="font-medium text-slate-900 text-sm line-clamp-1">
                  {loan.title}
                </p>
                <p className="text-[11px] text-slate-500 line-clamp-2">
                  {loan.shortDesc}
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="inline-flex items-center rounded-full bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                    {loan.category}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {loan.interestRate}% interest • Max ৳{loan.maxLimit}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] text-slate-400">
                {loan.createdAt
                  ? new Date(loan.createdAt).toLocaleDateString()
                  : "No date"}
              </span>
              <div className="flex gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={() => setEditing(loan)}
                  className="flex-1 inline-flex justify-center items-center rounded-lg border border-slate-200 px-3 py-1.5 text-[11px] font-medium text-slate-700 hover:bg-slate-50"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(loan._id)}
                  className="flex-1 inline-flex justify-center items-center rounded-lg bg-rose-500 hover:bg-rose-600 px-3 py-1.5 text-[11px] font-medium text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredLoans.length === 0 && (
          <div className="text-center py-6 text-xs text-slate-400 bg-white rounded-xl border border-slate-100 shadow-sm">
            {loans.length === 0
              ? "No loans found. Add a new loan first."
              : "No loans match your search."}
          </div>
        )}
      </div>

      <div className="hidden md:block overflow-x-auto bg-white rounded-xl border border-slate-100 shadow-sm">
        <table className="min-w-full text-xs">
          <thead>
            <tr className="text-[11px] text-slate-500 bg-slate-50/80 border-b border-slate-100">
              <th className="px-4 py-2 text-left font-medium">Loan</th>
              <th className="px-4 py-2 text-left font-medium">Interest</th>
              <th className="px-4 py-2 text-left font-medium">Category</th>
              <th className="px-4 py-2 text-left font-medium hidden md:table-cell">
                Created
              </th>
              <th className="px-4 py-2 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredLoans.map((loan) => (
              <tr key={loan._id} className="hover:bg-slate-50/60">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-8 rounded-lg overflow-hidden bg-slate-100 ring-1 ring-slate-100">
                      {loan.image && (
                        <img
                          src={loan.image}
                          alt={loan.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 line-clamp-1">
                        {loan.title}
                      </p>
                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        {loan.shortDesc}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3">
                  <p className="font-semibold text-slate-900">
                    {loan.interestRate}%
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Max: ৳{loan.maxLimit}
                  </p>
                </td>

                <td className="px-4 py-3">
                  <span className="inline-flex items-center rounded-full bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                    {loan.category}
                  </span>
                </td>

                <td className="px-4 py-3 hidden md:table-cell text-[11px] text-slate-500">
                  {loan.createdAt
                    ? new Date(loan.createdAt).toLocaleDateString()
                    : "-"}
                </td>

                <td className="px-4 py-3 text-right space-x-1">
                  <button
                    onClick={() => setEditing(loan)}
                    className="inline-flex items-center rounded-lg border border-slate-200 px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(loan._id)}
                    className="inline-flex items-center rounded-lg bg-rose-500 hover:bg-rose-600 px-2.5 py-1 text-[11px] font-medium text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredLoans.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-xs text-slate-400"
                >
                  {loans.length === 0
                    ? "No loans found. Add a new loan first."
                    : "No loans match your search."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Edit Loan
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
