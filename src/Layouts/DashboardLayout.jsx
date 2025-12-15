import React, { useContext, useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router";
import { Authcontext } from "../ContextApi/AuthContext";
import logo from "../assets/logo2.jpg";
import { IoIosTime, IoMdAddCircleOutline, IoMdHome } from "react-icons/io";
import { FcApproval } from "react-icons/fc";
import { CgProfile } from "react-icons/cg";
import { MdManageHistory } from "react-icons/md";
import { BsFileEarmarkBarGraphFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";

const DashboardLayout = () => {
  const { user } = useContext(Authcontext);
  const [role, setRole] = useState("");
  const [open, setOpen] = useState(false);
  const [pending, setpending] = useState(0);

  useEffect(() => {
    fetch("https://microcred-server.vercel.app/pending-loans-count")
      .then((res) => res.json())
      .then((data) => setpending(data.count));
  }, []);

  useEffect(() => {
    if (!user?.email) return;
    fetch(`https://microcred-server.vercel.app/user-role/${user.email}`)
      .then((res) => res.json())
      .then((data) => setRole(data.role || "borrower"))
      .catch(() => setRole("borrower"));
  }, [user?.email]);

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
          <span className="md:text-xl">
            <CgProfile />
          </span>
          <span className="text-slate-700 font-medium">My Profile</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          <span className="md:text-xl">
            <IoMdHome />
          </span>
          <span className="text-slate-700 font-medium">Back to Home</span>
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
          <span className="md:text-xl">
            <IoMdAddCircleOutline />
          </span>
          <span className="text-slate-700 font-medium">Add Loan</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/manage-loans"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          <span className="md:text-xl">
            <MdManageHistory />
          </span>
          <span className="text-slate-700 font-medium">Manage Loans</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/pending-loans"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          <span className="md:text-xl">
            <IoIosTime />
          </span>
          <div className="flex items-center gap-2">
            <span className="text-slate-700 font-medium">
              Pending Applications
            </span>

            <span
              className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 
                   rounded-full bg-red-500 text-white text-[11px] font-semibold"
            >
              {pending}
            </span>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/approved-loans"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          <span className="md:text-xl">
            <FaCheckCircle />
          </span>
          <span className="text-slate-700 font-medium">
            Approved Applications
          </span>
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
          <span className="md:text-xl">
            <BsFileEarmarkBarGraphFill />
          </span>
          <span className="text-slate-700 font-medium">All Loans</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/pending-adminloans"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          <span className="md:text-xl">
            <IoIosTime />
          </span>
          <div className="flex items-center gap-2">
            <span className="text-slate-700 font-medium">
              Loan Applications
            </span>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/all-users"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          <span className="md:text-xl">
            <FaUsers />
          </span>
          <span className="text-slate-700 font-medium">User Management</span>
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
          <span className="text-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-credit-card-icon lucide-credit-card"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <line x1="2" x2="22" y1="10" y2="10" />
            </svg>
          </span>
          <di className="font-semibold"> My Loans</di>
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <title>MicroCredX-Dashboard</title>
      <aside className="hidden md:flex w-64 bg-white border-r border-slate-200 flex-col">
        <div className="px-5 py-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl overflow-hidden ring-1 ring-emerald-100 bg-emerald-50 flex items-center justify-center">
              <img
                src={logo}
                alt="MicroCredX logo"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 tracking-tight">
                MicroCredX
              </h2>
              <p className="text-[11px] text-slate-500">Loan Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3">
          <ul className="space-y-1 text-sm">
            {role === "admin" && adminLinks}
            {role === "manager" && managerLinks}
            {role === "borrower" && borrowerLinks}
            <div className="mt-4 border-t border-slate-200 pt-2">
              {commonLinks}
            </div>
          </ul>
        </nav>

        <div className="px-4 py-3 border-t border-slate-300 text-[11px] text-slate-600">
          Microloan management made simple.
        </div>
      </aside>

      {open && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="w-64 bg-white border-r border-slate-200 flex flex-col">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg overflow-hidden bg-emerald-50">
                  <img
                    src={logo}
                    alt="MicroCredX"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    MicroCredX
                  </h2>
                  <p className="text-[11px] text-slate-500">Loan Dashboard</p>
                </div>
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
        <header className="h-17 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6">
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
            <div className="hidden sm:flex flex-col items-end leading-tight">
              <span className="font-medium text-slate-700 truncate max-w-[140px]">
                {user?.displayName || user?.email}
              </span>
              <span className="text-[11px] capitalize">
                Role: {role || "loading"}
              </span>
            </div>
            <div className="avatar">
              <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden ring-1 ring-slate-200">
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

        <main className="flex-1 px-3 sm:px-4 md:px-6 py-4 md:py-5">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
