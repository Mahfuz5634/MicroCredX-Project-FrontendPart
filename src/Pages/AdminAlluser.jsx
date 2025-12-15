// src/pages/Dashboard/Users.jsx
import React, { useContext, useEffect, useState } from "react";
import { Authcontext } from "../ContextApi/AuthContext";

const Users = () => {
  const { user, token } = useContext(Authcontext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [roleModalUser, setRoleModalUser] = useState(null);
  const [roleValue, setRoleValue] = useState("borrower");

  const [actionType, setActionType] = useState("approve");
  const [suspendReason, setSuspendReason] = useState("");
  const [suspendFeedback, setSuspendFeedback] = useState("");

  // search + filters
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const idToken = await user.getIdToken();

        const res = await fetch(
          "https://microcred-server.vercel.app/all-user",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
            },
          }
        );

        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user]);
  const handleChangeRole = async () => {
    if (!roleModalUser) return;
    const id = roleModalUser._id;

    try {
      if (actionType === "approve") {
        await fetch(`https://microcred-server.vercel.app/update-role/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ role: roleValue, status: "active" }),
        });

        setUsers((prev) =>
          prev.map((u) =>
            u._id === id ? { ...u, role: roleValue, status: "active" } : u
          )
        );
      } else {
        await fetch(`https://microcred-server.vercel.app/update-role/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            role: roleValue,
            status: "suspended",
            suspendReason,
            suspendFeedback,
          }),
        });

        setUsers((prev) =>
          prev.map((u) =>
            u._id === id
              ? {
                  ...u,
                  role: roleValue,
                  status: "suspended",
                  suspendReason,
                  suspendFeedback,
                }
              : u
          )
        );
      }

      setRoleModalUser(null);
      setSuspendReason("");
      setSuspendFeedback("");
      setActionType("approve");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteUser = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this user?");
    if (!ok) return;

    try {
      await fetch(`https://microcred-server.vercel.app/users/${id}`, {
        method: "DELETE",
      });
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const openRoleModal = (u) => {
    setRoleModalUser(u);
    setRoleValue(u.role || "borrower");
    setActionType("approve");
    setSuspendReason("");
    setSuspendFeedback("");
  };

  // search + filter logic
  const filteredUsers = users.filter((u) => {
    const q = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !q ||
      u.name?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q);

    const matchesRole =
      roleFilter === "All" || (u.role || "borrower") === roleFilter;

    const currentStatus = u.status || "active";
    const matchesStatus =
      statusFilter === "All" || currentStatus === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <title>MicroCredX-AllUser</title>
      {/* header + search/filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            User Management
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Search users, filter by role/status, approve or suspend accounts.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:items-center text-xs">
          <div className="text-[11px] text-slate-500">
            Total users:{" "}
            <span className="font-semibold text-slate-800">{users.length}</span>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search name or email..."
              className="w-40 sm:w-52 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="border border-slate-200 rounded-lg px-2 py-1.5 text-[11px] bg-white focus:outline-none focus:ring-1 focus:ring-emerald-100"
            >
              <option value="All">All roles</option>
              <option value="borrower">Borrower</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-slate-200 rounded-lg px-2 py-1.5 text-[11px] bg-white focus:outline-none focus:ring-1 focus:ring-emerald-100"
            >
              <option value="All">All status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* table */}
      <div className="overflow-x-auto bg-white rounded-xl border border-slate-100 shadow-sm">
        <table className="table table-sm">
          <thead>
            <tr className="text-xs text-slate-500 bg-slate-50/80">
              <th>User</th>
              <th className="hidden md:table-cell">Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="hidden md:table-cell">Joined</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-xs text-slate-400"
                >
                  Loading users...
                </td>
              </tr>
            )}

            {!loading &&
              filteredUsers.map((u) => (
                <tr key={u._id} className="text-xs hover:bg-slate-50/60">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200">
                        {u.photoURL ? (
                          <img
                            src={u.photoURL}
                            alt={u.name || u.email}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[11px] font-semibold text-slate-600">
                            {(u.name || u.email || "?").charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">
                          {u.name || "Unnamed User"}
                        </p>
                        <p className="md:hidden text-[11px] text-slate-500">
                          {u.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="hidden md:table-cell text-[11px] text-slate-600">
                    {u.email}
                  </td>

                  <td>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${
                        u.role === "admin"
                          ? "bg-rose-50 text-rose-700"
                          : u.role === "manager"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-50 text-slate-700"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${
                        (u.status || "active") === "suspended"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      {u.status || "active"}
                    </span>
                  </td>

                  <td className="hidden md:table-cell text-[11px] text-slate-500">
                    {u.createdAt
                      ? new Date(u.createdAt).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="text-right space-x-1">
                    <button
                      onClick={() => openRoleModal(u)}
                      className="btn btn-xs btn-outline"
                    >
                      Update Role
                    </button>
                    <button
                      onClick={() => handleDeleteUser(u._id)}
                      className="btn btn-xs btn-error text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

            {!loading && filteredUsers.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-xs text-slate-400"
                >
                  No users match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Approve / Suspend modal */}
      {roleModalUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-sm">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Update User Role
                </h3>
                <p className="text-[11px] text-slate-500">
                  {roleModalUser.email}
                </p>
              </div>
              <button
                onClick={() => setRoleModalUser(null)}
                className="text-slate-400 hover:text-slate-600 text-lg leading-none"
              >
                ×
              </button>
            </div>

            <div className="px-4 py-3 space-y-3 text-xs">
              <div>
                <p className="text-[11px] text-slate-500 mb-1">Current role</p>
                <p className="font-medium text-slate-800 capitalize">
                  {roleModalUser.role}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-600 mb-1">
                    New role
                  </label>
                  <select
                    value={roleValue}
                    onChange={(e) => setRoleValue(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400"
                  >
                    <option value="borrower">Borrower</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-600 mb-1">
                    Action type
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setActionType("approve")}
                      className={`flex-1 border rounded-lg px-2 py-1.5 text-[11px] ${
                        actionType === "approve"
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                          : "border-slate-200 text-slate-600"
                      }`}
                    >
                      Approve / Activate
                    </button>
                    <button
                      type="button"
                      onClick={() => setActionType("suspend")}
                      className={`flex-1 border rounded-lg px-2 py-1.5 text-[11px] ${
                        actionType === "suspend"
                          ? "border-amber-500 bg-amber-50 text-amber-700"
                          : "border-slate-200 text-slate-600"
                      }`}
                    >
                      Suspend
                    </button>
                  </div>
                </div>
              </div>

              {actionType === "suspend" && (
                <div className="space-y-2 pt-2 border-t border-dashed border-slate-100">
                  <div>
                    <label className="block text-[11px] text-slate-600 mb-1">
                      Suspend reason
                    </label>
                    <input
                      type="text"
                      value={suspendReason}
                      onChange={(e) => setSuspendReason(e.target.value)}
                      placeholder="e.g. suspicious activity, policy violation"
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-100 focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-600 mb-1">
                      Admin feedback (optional)
                    </label>
                    <textarea
                      rows={3}
                      value={suspendFeedback}
                      onChange={(e) => setSuspendFeedback(e.target.value)}
                      placeholder="Details about why this account was suspended."
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-100 focus:border-amber-400 resize-none"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-end gap-2 text-xs">
              <button
                onClick={() => setRoleModalUser(null)}
                className="btn btn-ghost btn-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleChangeRole}
                className="btn btn-xs bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                {actionType === "suspend" ? "Suspend User" : "Save Role"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
