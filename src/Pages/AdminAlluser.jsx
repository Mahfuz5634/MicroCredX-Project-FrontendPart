// src/pages/Dashboard/Users.jsx
import React, { useContext, useEffect, useState } from "react";
import { Authcontext } from "../ContextApi/AuthContext";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const Users = () => {
  const { user, token } = useContext(Authcontext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [roleModalUser, setRoleModalUser] = useState(null);
  const [roleValue, setRoleValue] = useState("borrower");

  const [actionType, setActionType] = useState("approve");
  const [suspendReason, setSuspendReason] = useState("");
  const [suspendFeedback, setSuspendFeedback] = useState("");

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
    const result = await Swal.fire({
      title: "Delete user?",
      text: "This action cannot be undone.",
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
        icon: "border-4 border-amber-100",
      },
    });

    if (!result.isConfirmed) return;

    try {
      await fetch(`https://microcred-server.vercel.app/delete-user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers((prev) => prev.filter((u) => u._id !== id));

      await Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "The user has been removed from the system.",
        timer: 1800,
        showConfirmButton: false,
        buttonsStyling: false,
        customClass: {
          popup: "rounded-2xl shadow-xl",
          title: "text-slate-900 text-base font-semibold",
          htmlContainer: "text-slate-500 text-sm",
        },
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while deleting this user.",
        buttonsStyling: false,
        customClass: {
          popup: "rounded-2xl shadow-xl",
          title: "text-slate-900 text-base font-semibold",
          htmlContainer: "text-slate-500 text-sm",
          confirmButton:
            "inline-flex justify-center items-center px-4 py-2 rounded-lg bg-rose-500 text-white text-sm font-medium hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-300",
        },
      });
    }
  };

  const openRoleModal = (u) => {
    setRoleModalUser(u);
    setRoleValue(u.role || "borrower");
    setActionType("approve");
    setSuspendReason("");
    setSuspendFeedback("");
  };

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
    <div className="min-h-screen bg-slate-50 px-3 py-4 sm:px-6 lg:px-8">
      <title>MicroCredX-AllUser</title>

      <div className="mb-4 sm:mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
            User Management
          </h2>
          <p className="text-xs sm:text-[13px] text-slate-500 mt-1">
            Search users, filter by role or status, and manage account access.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:items-center text-xs">
          <div className="text-[11px] text-slate-500">
            Total users:{" "}
            <span className="font-semibold text-slate-800">{users.length}</span>
          </div>

          <div className="flex flex-wrap gap-2 justify-end">
            <input
              type="text"
              placeholder="Search name or email..."
              className="w-full xs:w-40 sm:w-52 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400"
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

      <div className="space-y-2 md:hidden">
        {loading && (
          <div className="text-center py-6 text-xs text-slate-400 bg-white rounded-xl border border-slate-100 shadow-sm">
            Loading users...
          </div>
        )}

        {!loading &&
          filteredUsers.map((u) => (
            <div
              key={u._id}
              className="bg-white rounded-xl border border-slate-100 shadow-sm p-3 flex gap-3"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 flex-shrink-0">
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

              <div className="flex-1 space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-slate-900 text-sm">
                      {u.name || "Unnamed User"}
                    </p>
                    <p className="text-[11px] text-slate-500 break-all">
                      {u.email}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteUser(u._id)}
                    className="text-[11px] text-rose-500 hover:text-rose-600 font-medium"
                  >
                    Delete
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${
                      u.role === "admin"
                        ? "bg-rose-50 text-rose-700"
                        : u.role === "manager"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-50 text-slate-700"
                    }`}
                  >
                    {u.role || "borrower"}
                  </span>

                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${
                      (u.status || "active") === "suspended"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    {u.status || "active"}
                  </span>

                  {u.createdAt && (
                    <span className="text-[10px] text-slate-400 ml-auto">
                      Joined {new Date(u.createdAt).toLocaleDateString()}
                    </span>
                  )}
                </div>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => openRoleModal(u)}
                    className="flex-1 inline-flex justify-center items-center rounded-lg border border-slate-200 text-[11px] font-medium py-1.5 text-slate-700 hover:bg-slate-50"
                  >
                    Update Role
                  </button>
                  <button
                    onClick={() => {
                      setActionType(
                        (u.status || "active") === "suspended"
                          ? "approve"
                          : "suspend"
                      );
                      openRoleModal(u);
                    }}
                    className={`flex-1 inline-flex justify-center items-center rounded-lg text-[11px] font-medium py-1.5 ${
                      (u.status || "active") === "suspended"
                        ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                        : "bg-amber-500 hover:bg-amber-600 text-white"
                    }`}
                  >
                    {(u.status || "active") === "suspended"
                      ? "Activate"
                      : "Suspend"}
                  </button>
                </div>
              </div>
            </div>
          ))}

        {!loading && filteredUsers.length === 0 && (
          <div className="text-center py-6 text-xs text-slate-400 bg-white rounded-xl border border-slate-100 shadow-sm">
            No users match your filters.
          </div>
        )}
      </div>

      <div className="hidden md:block overflow-x-auto bg-white rounded-xl border border-slate-100 shadow-sm">
        <table className="min-w-full text-xs">
          <thead>
            <tr className="text-[11px] text-slate-500 bg-slate-50/80 border-b border-slate-100">
              <th className="px-4 py-2 text-left font-medium">User</th>
              <th className="px-4 py-2 text-left font-medium">Email</th>
              <th className="px-4 py-2 text-left font-medium">Role</th>
              <th className="px-4 py-2 text-left font-medium">Status</th>
              <th className="px-4 py-2 text-left font-medium">Joined</th>
              <th className="px-4 py-2 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
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
                <tr key={u._id} className="hover:bg-slate-50/60">
                  <td className="px-4 py-3">
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
                        <p className="text-[11px] text-slate-500 md:hidden">
                          {u.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-[11px] text-slate-600">
                    {u.email}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium capitalize ${
                        u.role === "admin"
                          ? "bg-rose-50 text-rose-700"
                          : u.role === "manager"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-50 text-slate-700"
                      }`}
                    >
                      {u.role || "borrower"}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium capitalize ${
                        (u.status || "active") === "suspended"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      {u.status || "active"}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-[11px] text-slate-500">
                    {u.createdAt
                      ? new Date(u.createdAt).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="px-4 py-3 text-right space-x-1">
                    <button
                      onClick={() => openRoleModal(u)}
                      className="inline-flex items-center rounded-lg border border-slate-200 px-2.5 py-1 text-[11px] text-slate-700 hover:bg-slate-50"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteUser(u._id)}
                      className="inline-flex items-center rounded-lg bg-rose-500 hover:bg-rose-600 px-2.5 py-1 text-[11px] text-white"
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

      {roleModalUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-3">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm">
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
