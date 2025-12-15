import { Link, NavLink } from "react-router";
import { useContext, useEffect, useState } from "react";
import logo from "../assets/logo2.jpg";
import { Authcontext } from "../ContextApi/AuthContext";
import toast from "react-hot-toast";
import { RiArrowDropDownLine } from "react-icons/ri";

const Navbar = () => {
  const { user, LogOutFunc, loading } = useContext(Authcontext) || {};

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  if (loading) {
    return (
      <div className="min-h-[60px] flex items-center justify-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  const logout = () => {
    LogOutFunc();
    toast.success("Log out succesfully");
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-green-700 font-semibold" : ""
          }
        >
          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l9-9 9 9M4 10v10h6V14h4v6h6V10"
              />
            </svg>
            Home
          </span>
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/all-loans"
          className={({ isActive }) =>
            isActive ? "text-green-700 font-semibold" : ""
          }
        >
          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 7h14M5 12h14M5 17h7"
              />
            </svg>
            All Loans
          </span>
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/about-us"
          className={({ isActive }) =>
            isActive ? "text-green-700 font-semibold" : ""
          }
        >
          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M12 3a9 9 0 110 18 9 9 0 010-18z"
              />
            </svg>
            About Us
          </span>
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "text-green-700 font-semibold" : ""
          }
        >
          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5h18M5 8h14v11H5z"
              />
            </svg>
            Contact
          </span>
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-white  border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="navbar container mx-auto  max-w-7xl">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52"
            >
              {navLinks}
              {!user && (
                <>
                  <li>
                    <NavLink to="/login">
                      <span className="flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12H3m6-6l-6 6 6 6m6-12h3a2 2 0 012 2v8a2 2 0 01-2 2h-3"
                          />
                        </svg>
                        Login
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/register">
                      <span className="flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM5 21a7 7 0 0114 0M19 8h3m-1.5-1.5v3"
                          />
                        </svg>
                        Register
                      </span>
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* logo / brand */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="MicroCredX logo"
              className="w-12 h-12 object-contain"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-xl md:text-2xl font-extrabold text-green-700">
                MicroCredX
              </span>
              <span className="hidden md:inline text-[11px] text-gray-500">
                Microloan Request & Approval
              </span>
            </div>
          </Link>
        </div>

        {/* center links - desktop */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">{navLinks}</ul>
        </div>

        {/* right side */}
        <div className="navbar-end gap-2">
          <label className="toggle text-base-content">
            <input
              onChange={(e) => handleTheme(e.target.checked)}
              defaultChecked={localStorage.getItem("theme") === "dark"}
              type="checkbox"
              value="synthwave"
              className="theme-controller"
            />

            <svg
              aria-label="sun"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </g>
            </svg>

            <svg
              aria-label="moon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </g>
            </svg>
          </label>
          {!user ? (
            <>
              <Link to="/login" className="btn btn-ghost hidden md:inline-flex">
                <span className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12H3m6-6l-6 6 6 6m6-12h3a2 2 0 012 2v8a2 2 0 01-2 2h-3"
                    />
                  </svg>
                  Login
                </span>
              </Link>
              <Link
                to="/register"
                className="btn bg-green-700 text-white hover:bg-green-600 hidden md:inline-flex"
              >
                <span className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM5 21a7 7 0 0114 0M19 8h3m-1.5-1.5v3"
                    />
                  </svg>
                  Register
                </span>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <span className="md:text-2xl">
                <RiArrowDropDownLine />
              </span>

              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full ring ring-green-500 ring-offset-2 ring-offset-slate-950">
                    {user?.photoURL ? (
                      <>
                        {" "}
                        <div className="flex">
                          <img
                            src={user.photoURL}
                            alt={user.displayName}
                            className="w-10 h-10 object-cover rounded-full"
                          />
                        </div>
                      </>
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center rounded-full text-white font-semibold text-sm">
                        {user?.displayName?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                    )}
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow-lg bg-white rounded-box w-52 menu dropdown-content border border-gray-200"
                >
                  <li className="menu-title text-sm font-semibold text-gray-700 px-4 py-2 border-b border-gray-100">
                    {user?.displayName || "User"}
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) =>
                        `flex items-center gap-2 ${
                          isActive
                            ? "text-green-700 bg-green-50 font-semibold"
                            : ""
                        }`
                      }
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h7v7H4zM13 6h7v4h-7zM13 12h7v6h-7zM4 15h7v3H4z"
                        />
                      </svg>
                      Dashboard
                    </NavLink>
                  </li>
                  <li className="mt-2 pt-2 border-t border-gray-100">
                    <button
                      onClick={logout}
                      className="flex items-center gap-2 w-full text-left text-red-600 hover:bg-red-50 font-medium"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7"
                        />
                      </svg>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
