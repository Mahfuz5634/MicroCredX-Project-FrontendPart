// src/layouts/DashboardLayout.jsx
import React, { useContext, useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router";
import { Authcontext } from "../ContextApi/AuthContext";
import logo from '../assets/logo2.jpg'

const DashboardLayout = () => {
  const { user } = useContext(Authcontext);
  const [role,setrole]=useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
      fetch(`http://localhost:3000/user-role/${user.email}`)
        .then((res) => res.json())
        .then((data) => setrole(data.role));
    }, [user.email]);

  const linkBase =
    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors";
  const linkActive = "bg-emerald-50 text-emerald-700 font-semibold";
  const linkInactive = "text-slate-600 hover:bg-slate-50";

  const commonLinks = (
    <>
      <li>
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          <span className="text-xs">👤</span>
          My Profile
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          <span className="text-xs">🏠</span>
          Back to Home
        </NavLink>
      </li>
    </>
  );

  const managerLinks = (
    <>
      <li className="px-1 text-[11px] uppercase tracking-wide text-slate-400">
        Manager
      </li>
      <li>
        <NavLink
          to="/dashboard/add-loan"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          <span className="text-xs">➕</span>
          Add Loan
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/manage-loans"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          <span className="text-xs">📋</span>
          Manage Loans
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/pending-loans"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          <span className="text-xs">⏳</span>
          Pending Applications
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/approved-loans"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          <span className="text-xs">✅</span>
          Approved Applications
        </NavLink>
      </li>
    </>
  );

  const adminLinks = (
    <>
      <li className="px-1 text-[11px] uppercase tracking-wide text-slate-400">
        Admin
      </li>
      <li>
        <NavLink
          to="/dashboard/all-loan"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          <span className="text-xs">📊</span>
          All Loans
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/users"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          <span className="text-xs">👥</span>
          User Management
        </NavLink>
      </li>
    </>
  );

  const borrowerLinks = (
    <>
      <li className="px-1 text-[11px] uppercase tracking-wide text-slate-400">
        Borrower
      </li>
      <li>
        <NavLink
          to="/dashboard/my-loans"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          <span className="text-xs">💳</span>
          My Loans
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-emerald-50/20 flex">
      <aside className="w-64 bg-white/95 border-r border-slate-200 hidden md:flex flex-col backdrop-blur-sm">
        <div className="px-5 py-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-sm font-bold text-emerald-600">
               <img src={logo} alt="" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">MicroCredX</h2>
              <p className="text-[11px] text-slate-500">Loan Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3">
          <ul className="space-y-1">
            {role === "admin" && adminLinks}
            {role === "manager" && managerLinks}
            {role === "borrower" && borrowerLinks}
            <div className="mt-4 border-t border-slate-200 pt-2">
              {commonLinks}
            </div>
          </ul>
        </nav>

        <div className="px-4 py-3 border-t border-slate-200 text-[11px] text-slate-400">
          Microloan management made simple.
        </div>
      </aside>

      {open && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="w-64 bg-white border-r border-slate-200 flex flex-col">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900">MicroCredX</h2>
                <p className="text-[11px] text-slate-500">Loan Dashboard</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-slate-500 text-xl leading-none"
              >
                ×
              </button>
            </div>
            <nav className="flex-1 p-3 overflow-y-auto">
              <ul className="space-y-1">
                {role === "admin" && adminLinks}
                {role === "manager" && managerLinks}
                {role === "borrower" && borrowerLinks}
                <div className="mt-4 border-t border-slate-200 pt-2">
                  {commonLinks}
                </div>
              </ul>
            </nav>
          </div>
          <div className="flex-1 bg-black/30" onClick={() => setOpen(false)} />
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <header className="h-14 bg-white/90 border-b border-slate-200 flex items-center justify-between px-4 md:px-6 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-1 rounded-md border border-slate-200 text-slate-600"
              onClick={() => setOpen(true)}
            >
              ☰
            </button>
            <div>
              <h1 className="text-sm md:text-base font-semibold text-slate-800">
                Dashboard
              </h1>
              <p className="hidden md:block text-[11px] text-slate-400">
                Overview of your microloan activity
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="hidden sm:inline">
              Role: <span className="font-semibold capitalize">{role}</span>
            </span>
            <div className="avatar">
              <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden">
                {user?.photoURL && (
                  <img
                    src={user.photoURL}
                    alt={user?.name || "User avatar"}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 px-4 md:px-6 py-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
