import { Link } from "react-router";
import logo from "../assets/logo2.jpg";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-100 ">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
        {/* Logo + name + description */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="MicroCredX logo"
              className="w-10 h-10 object-contain rounded"
            />
            <div>
              <h2 className="text-xl font-bold text-green-700">MicroCredX</h2>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Microloan Request & Approval
              </p>
            </div>
          </div>
          <p className="text-sm text-slate-300 text-justify">
            MicroCredX helps borrowers and managers track microloan
            applications, approvals, and repayments in one simple, transparent
            dashboard.
          </p>
        </div>

        {/* Useful links */}
        <div>
          <h3 className="text-sm font-semibold text-slate-200 mb-3">
            Useful Links
          </h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>
              <Link to="/" className="hover:text-green-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/all-loans" className="hover:text-green-400">
                All Loans
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-green-400">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-green-400">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-green-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact / extra info */}
        <div>
          <h3 className="text-sm font-semibold text-slate-200 mb-3">
            Contact & Info
          </h3>
          <p className="text-sm text-slate-300 text-justify">
            MicroCredX is a secure microloan management platform that helps
            borrowers apply for loans and managers review, approve, and track
            applications in one place.
          </p>
          <p className="mt-3 text-sm text-slate-400">
            Email: support@microcredx.app
          </p>
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-slate-200 mb-2">
              Follow Us
            </h3>
            <div className="flex items-center gap-3 text-slate-300">
             
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-400 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M13 22v-7h3l1-4h-4V8a1 1 0 0 1 1-1h3V3h-3a5 5 0 0 0-5 5v3H7v4h3v7h3z" />
                </svg>
              </a>

             
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-400 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.3 3H20l-6 7.1L20.8 21H16.1L12 15.4 7.2 21H4.5l6.4-7.5L4 3h4.8l3.6 5 4.9-5z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-400 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4.98 3.5C4.98 4.6 4.1 5.5 3 5.5S1 4.6 1 3.5 1.9 1.5 3 1.5s1.98.9 1.98 2zM2 7h2v14H2V7zm6 0h3.8v2h.1c.5-.9 1.8-2.1 3.8-2.1 4.1 0 4.9 2.7 4.9 6.1V21h-2.1v-6.7c0-1.6 0-3.7-2.3-3.7-2.3 0-2.7 1.8-2.7 3.6V21H8V7z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-slate-700">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} MicroCredX. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            Designed for LoanLink – Microloan Request & Approval Tracker System
            assignment.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
