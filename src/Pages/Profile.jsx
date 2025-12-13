import React, { useContext, useEffect, useState } from "react";
import { Authcontext } from "../ContextApi/AuthContext";

const Profile = () => {
  const { user, LogOutFunc } = useContext(Authcontext);
  const [activeTab, setActiveTab] = useState("overview");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (!user?.email) return;
    fetch(`http://localhost:3000/user-role/${user.email}`)
      .then((res) => res.json())
      .then((data) => setRole(data.role || "borrower"))
      .catch(() => setRole("borrower"));
  }, [user?.email]);

  const currentUser = {
    name: user?.displayName || "Unknown User",
    email: user?.email || "No email",
    role: role,
    photoURL: user?.photoURL,
    joinedAt: "Dec 2025",
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
            My Profile
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your personal information, security, and account preferences.
          </p>
        </div>
        <button className="btn btn-outline btn-sm">Edit profile</button>
      </div>

      <div className="grid lg:grid-cols-[260px,1fr] gap-4">
        {/* left column */}
        <section className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-200 ring-2 ring-emerald-100">
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl font-semibold text-slate-500">
                  {currentUser.name.charAt(0)}
                </div>
              )}
            </div>
            <span className="absolute -bottom-1 right-0 rounded-full bg-emerald-50 text-emerald-700 text-[10px] px-2 py-0.5 border border-emerald-100 capitalize">
              {currentUser.role}
            </span>
          </div>

          <div className="text-center space-y-1">
            <p className="text-base font-semibold text-slate-900">
              {currentUser.name}
            </p>
            <p className="text-sm text-slate-500">{currentUser.email}</p>
            <p className="text-[11px] text-slate-400">
              Member since {currentUser.joinedAt}
            </p>
          </div>

          <div className="w-full grid grid-cols-3 gap-2 text-center text-xs">
            <div className="rounded-xl border border-slate-100 bg-slate-50/70 px-2 py-2">
              <p className="text-[11px] text-slate-500">Total Loans</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">0</p>
            </div>
            <div className="rounded-xl border border-slate-100 px-2 py-2">
              <p className="text-[11px] text-slate-500">Pending</p>
              <p className="mt-1 text-sm font-semibold text-amber-600">0</p>
            </div>
            <div className="rounded-xl border border-slate-100 px-2 py-2">
              <p className="text-[11px] text-slate-500">Approved</p>
              <p className="mt-1 text-sm font-semibold text-emerald-600">0</p>
            </div>
          </div>
        </section>

        {/* right column */}
        <section className="space-y-3">
          <div className="bg-white rounded-2xl border border-slate-100 p-1 flex text-xs">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex-1 px-3 py-2 rounded-xl transition ${
                activeTab === "overview"
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`flex-1 px-3 py-2 rounded-xl transition ${
                activeTab === "security"
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Security
            </button>
            <button
              onClick={() => setActiveTab("preferences")}
              className={`flex-1 px-3 py-2 rounded-xl transition ${
                activeTab === "preferences"
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Preferences
            </button>
          </div>

          {activeTab === "overview" && (
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4 text-xs">
              <h3 className="text-sm font-semibold text-slate-900">
                Personal information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <p className="text-[11px] text-slate-500">Full name</p>
                  <p className="font-medium text-slate-900">
                    {currentUser.name}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500">Email</p>
                  <p className="font-medium text-slate-900 break-all">
                    {currentUser.email}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500">Role</p>
                  <p className="font-medium text-slate-900 capitalize">
                    {currentUser.role}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500">
                    Default language
                  </p>
                  <p className="font-medium text-slate-900">
                    English (US)
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4 text-xs">
              <h3 className="text-sm font-semibold text-slate-900">
                Security
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between border rounded-lg px-3 py-2 border-slate-100 bg-slate-50/70">
                  <div>
                    <p className="font-medium text-slate-800 text-xs">
                      Password
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Last changed: not set
                    </p>
                  </div>
                  <button className="btn btn-outline btn-xs">
                    Update
                  </button>
                </div>
                <div className="flex items-center justify-between border rounded-lg px-3 py-2 border-slate-100">
                  <div>
                    <p className="font-medium text-slate-800 text-xs">
                      Two-factor authentication
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Add extra protection to your account.
                    </p>
                  </div>
                  <button className="btn btn-outline btn-xs">
                    Enable
                  </button>
                </div>
                <div className="flex items-center justify-between border rounded-lg px-3 py-2 border-slate-100">
                  <div>
                    <p className="font-medium text-slate-800 text-xs">
                      Active sessions
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Signed in on 1 device.
                    </p>
                  </div>
                  <button className="btn btn-outline btn-xs">
                    Sign out others
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "preferences" && (
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4 text-xs">
              <h3 className="text-sm font-semibold text-slate-900">
                Preferences
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between border rounded-lg px-3 py-2 border-slate-100">
                  <div>
                    <p className="font-medium text-slate-800 text-xs">
                      Email notifications
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Receive updates about loan status changes.
                    </p>
                  </div>
                  <input type="checkbox" className="toggle toggle-sm" />
                </div>
                <div className="flex items-center justify-between border rounded-lg px-3 py-2 border-slate-100">
                  <div>
                    <p className="font-medium text-slate-800 text-xs">
                      Dark mode
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Use dark theme for the dashboard.
                    </p>
                  </div>
                  <input type="checkbox" className="toggle toggle-sm" />
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-rose-100 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
            <div>
              <p className="font-semibold text-rose-600">
                Logout from this device
              </p>
              <p className="text-[11px] text-slate-500">
                For security, always logout when using a shared computer.
              </p>
            </div>
            <button
              onClick={() => LogOutFunc()}
              className="btn btn-error btn-sm text-white"
            >
              Logout
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
