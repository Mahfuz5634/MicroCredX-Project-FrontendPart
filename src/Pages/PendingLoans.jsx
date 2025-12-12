// src/pages/Dashboard/PendingLoans.jsx
import React, { useEffect, useState } from "react";

const PendingLoans = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/manager/pending-applications")
      .then((res) => res.json())
      .then((data) => setApps(data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-900 mb-4">
        Pending Applications
      </h2>

      <div className="overflow-x-auto bg-white rounded-xl border border-slate-100">
        <table className="table table-sm">
          <thead>
            <tr className="text-xs text-slate-500">
              <th>Loan ID</th>
              <th>Borrower</th>
              <th>Amount</th>
              <th>Date</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((app) => (
              <tr key={app._id} className="text-xs">
                <td>{app.loanId}</td>
                <td>
                  {app.borrowerName}
                  <br />
                  <span className="text-[11px] text-slate-400">
                    {app.borrowerEmail}
                  </span>
                </td>
                <td>{app.amount}</td>
                <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                <td className="text-right space-x-2">
                  <button className="btn btn-xs btn-success text-white">
                    Approve
                  </button>
                  <button className="btn btn-xs btn-error text-white">
                    Reject
                  </button>
                  <button className="btn btn-xs btn-outline">
                    View
                  </button>
                </td>
              </tr>
            ))}
            {apps.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-xs text-slate-400">
                  No pending applications.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingLoans;
