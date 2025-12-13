// src/pages/Dashboard/ManageLoans.jsx
import React, { useContext, useEffect, useState } from "react";
import { Authcontext } from "../ContextApi/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const ManageLoans = () => {
  const [loans, setLoans] = useState([]);
  const [editing, setEditing] = useState(null); 
  const { user } = useContext(Authcontext);
  const [load,setload]=useState(false);

  useEffect(() => {
    if (!user?.email) return;
    fetch('http://localhost:3000/all-loan')
      .then((res) => res.json())
      .then((data) => setLoans(data))
      .catch(console.error);
  }, [user?.email,load]);

  //handle delete button
  const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/delete-loan/${id}`);
    toast.success("Deleted successfully");
    setload(!load);
  } catch (error) {
    toast.error("Delete failed");
  }
};

  



  //update-button
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
      await fetch(`http://localhost:3000/update-loan/${editing._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      setLoans((prev) =>
        prev.map((loan) => (loan._id === editing._id ? updated : loan))
      );
      setEditing(null);
      toast.success("Loan updated successfully")
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Manage Loans
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            View, edit, or remove loan products you have created.
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
              <th>Loan</th>
              <th>Interest</th>
              <th>Category</th>
              <th className="hidden md:table-cell">Created</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan._id} className="text-xs hover:bg-slate-50/60">
                <td>
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

                <td>
                  <p className="font-semibold text-slate-900">
                    {loan.interestRate}%
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Max: ৳{loan.maxLimit}
                  </p>
                </td>

                <td>
                  <span className="inline-flex items-center rounded-full bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                    {loan.category}
                  </span>
                </td>

                <td className="hidden md:table-cell text-[11px] text-slate-500">
                  {loan.createdAt
                    ? new Date(loan.createdAt).toLocaleDateString()
                    : "-"}
                </td>

                <td className="text-right space-x-1">
                  <button
                    onClick={() => setEditing(loan)}
                    className="btn btn-xs btn-outline"
                  >
                    Edit
                  </button>
                  <button onClick={()=>handleDelete(loan._id)} className="btn btn-xs btn-error text-white">
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {loans.length === 0 && (
              <tr>
                <td
                  colSpan="5"
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
