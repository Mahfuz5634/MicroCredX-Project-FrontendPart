import React, { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roleModalUser, setRoleModalUser] = useState(null);
  const [roleValue, setRoleValue] = useState("borrower");

 
  useEffect(() => {
    fetch("http://localhost:3000/all-user")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleChangeRole = async () => {
    if (!roleModalUser) return;
    const id = roleModalUser._id;

    try {
      await fetch(`http://localhost:3000/users/${id}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: roleValue }),
      });

      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, role: roleValue } : u))
      );
      setRoleModalUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteUser = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this user?");
    if (!ok) return;

    try {
      await fetch(`http://localhost:3000/users/${id}`, {
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
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            User Management
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            View all users, update their roles, or remove accounts.
          </p>
        </div>
        <div className="text-[11px] text-slate-500">
          Total users:{" "}
          <span className="font-semibold text-slate-800">
            {users.length}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl border border-slate-100 shadow-sm">
        <table className="table table-sm">
          <thead>
            <tr className="text-xs text-slate-500 bg-slate-50/80">
              <th>User</th>
              <th className="hidden md:table-cell">Email</th>
              <th>Role</th>
              <th className="hidden md:table-cell">Joined</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-xs text-slate-400"
                >
                  Loading users...
                </td>
              </tr>
            )}

            {!loading &&
              users.map((u) => (
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
                            {(u.name || u.email || "?")
                              .charAt(0)
                              .toUpperCase()}
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

            {!loading && users.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-xs text-slate-400"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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
                <p className="text-[11px] text-slate-500 mb-1">
                  Current role
                </p>
                <p className="font-medium text-slate-800 capitalize">
                  {roleModalUser.role}
                </p>
              </div>
              <div>
                <label className="block text-[11px] text-slate-600 mb-1">
                  Select new role
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
                Save Role
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
