// src/pages/Dashboard/Profile.jsx
import React from "react";

const Profile = () => {

  const user = {
    name: "Demo User",
    email: "demo@microcredx.app",
    role: "manager",
    photoURL: "",
  };

  return (
    <div className="max-w-md">
      <h2 className="text-xl font-semibold text-slate-900 mb-4">
        My Profile
      </h2>

      <div className="bg-white rounded-2xl border border-slate-100 p-5 flex flex-col items-center gap-3">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-200">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-lg text-slate-500">
              {user.name.charAt(0)}
            </div>
          )}
        </div>

        <div className="text-center">
          <p className="text-base font-semibold text-slate-900">
            {user.name}
          </p>
          <p className="text-sm text-slate-500">{user.email}</p>
          <p className="mt-1 text-xs text-slate-500">
            Role: <span className="font-semibold capitalize">{user.role}</span>
          </p>
        </div>

        <button className="btn btn-outline btn-sm mt-3">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
