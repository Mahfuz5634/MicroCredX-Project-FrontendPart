// src/pages/Dashboard/ManageLoans.jsx
import React, { useEffect, useState } from "react";

const ManageLoans = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/manager/loans")
      .then((res) => res.json())
      .then((data) => setLoans(data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-900 mb-4">
        Manage My Loans
      </h2>

      <div className="overflow-x-auto bg-white rounded-xl border border-slate-100">
        <table className="table table-sm">
          <thead>
            <tr className="text-xs text-slate-500">
              <th>Image</th>
              <th>Title</th>
              <th>Interest</th>
              <th>Category</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan._id} className="text-xs">
                <td>
                  <div className="w-12 h-8 rounded overflow-hidden">
                    <img
                      src={loan.image}
                      alt={loan.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td>{loan.title}</td>
                <td>{loan.interestRate}%</td>
                <td>{loan.category}</td>
                <td className="text-right space-x-2">
                  <button className="btn btn-xs btn-outline">
                    Edit
                  </button>
                  <button className="btn btn-xs btn-error text-white">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {loans.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-xs text-slate-400">
                  No loans found. Add a new loan first.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageLoans;
