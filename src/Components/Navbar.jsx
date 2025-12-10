import { Link, NavLink } from "react-router";
import { useContext } from "react";
// import { AuthContext } from "../context/AuthProvider";
import logo from "../assets/logo2.jpg";

const Navbar = () => {
  // const { user, logout } = useContext(AuthContext) || {};
  const user = false;

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
            {/* home icon */}
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
            {/* loans icon */}
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
          to="/about"
          className={({ isActive }) =>
            isActive ? "text-green-700 font-semibold" : ""
          }
        >
          <span className="flex items-center gap-1">
            {/* info icon */}
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
            {/* contact icon */}
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
    <div className="bg-white border-b border-b-gray-300">
        <div className="navbar container mx-auto bg-white  sticky top-0 z-50">
      {/* left side */}
      <div className="navbar-start">
        
        {/* mobile dropdown */}
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
                      {/* login icon */}
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
                      {/* user-plus icon */}
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
              Microloan Request &amp; Approval
            </span>
          </div>
        </Link>
      </div>

      {/* center links - desktop */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">{navLinks}</ul>
      </div>

      {/* right side */}
      <div className="navbar-end gap-3">
        {!user && (
          <>
            <Link to="/login" className="btn btn-ghost">
              <span className="flex items-center gap-1 hidden md:flex">
                {/* login icon */}
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
              className="btn bg-green-700 text-white hover:bg-green-600 hidden md:flex"
            >
              <span className="flex items-center gap-1">
                {/* user-plus icon */}
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
        )}

        {user && (
          <div className="flex items-center gap-2">
            <Link to="/dashboard" className="btn btn-ghost hidden md:inline">
              <span className="flex items-center gap-1">
                {/* dashboard icon */}
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
                    d="M4 6h7v7H4zM13 6h7v4h-7zM13 12h7v6h-7zM4 15h7v3H4z"
                  />
                </svg>
                Dashboard
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Navbar;
