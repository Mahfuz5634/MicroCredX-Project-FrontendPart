import React, { useContext } from "react";
import { Authcontext } from "../../ContextApi/AuthContext";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router";

const Login = () => {
    const navigate = useNavigate();  
   
    const {auth,LogInFunc}=useContext(Authcontext);
    const provider = new GoogleAuthProvider();

    const googlelogin = () => {
    signInWithPopup(auth, provider)
      .then(() => toast.success("Successfully Logged In"))
      .catch((error) => {
        toast.error(error.message);
      });
  };


  const handlelogin=(e)=>{
    e.preventDefault();
    const email=e.target.email.value;
    const password=e.target.password.value;
    
    LogInFunc(email, password)
      .then(() => {
        toast.success("Successfully Logged In");
        navigate('/');
        e.target.reset();
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/user-not-found":
            toast.error("❌ No account found with this email.");
            break;
          case "auth/wrong-password":
            toast.error("❌ Incorrect password. Please try again.");
            break;
          case "auth/invalid-email":
            toast.error("❌ Please enter a valid email address.");
            break;
          default:
            toast.error(`⚠️ ${error.message}`);
        }
      });
  }


  return(<main className="min-h-screen bg-slate-950 relative overflow-hidden">
 
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute -top-24 -left-10 h-72 w-72 rounded-full bg-emerald-400/25 blur-3xl" />
      <div className="absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-lime-400/25 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_60%)]" />
    </div>

    <section className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-300">
            Welcome back
          </p>
          <h1 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight text-white">
            Login to your account
          </h1>
          <p className="mt-2 text-xs text-slate-400">
            Access your microloans, savings, and payments dashboard securely.
          </p>
        </div>

        <div className="rounded-3xl border border-white/15 bg-white/5 px-6 py-6 md:px-7 md:py-7 shadow-[0_18px_45px_rgba(15,23,42,0.85)] backdrop-blur-2xl">
          <form onSubmit={handlelogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-200 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-slate-200">
                  Password
                </label>
                <button
                  type="button"
                  className="text-[11px] text-emerald-300 hover:text-emerald-200"
                >
                  Forgot password?
                </button>
              </div>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="inline-flex items-center gap-2 text-[11px] text-slate-300">
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 rounded border border-white/20 bg-transparent text-emerald-400 focus:ring-0"
                />
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="mt-2 w-full inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-2.5 text-xs font-medium text-slate-950 shadow-lg shadow-emerald-500/40 transition-colors hover:bg-emerald-400"
            >
              Sign in
            </button>
          </form>

          <div className="mt-5 flex items-center gap-2">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[11px] text-slate-400">or continue with</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <button
            onClick={googlelogin}
            type="button"
            className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] font-medium text-slate-100 hover:bg-white/10"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>

          <p className="mt-5 text-center text-[11px] text-slate-400">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-emerald-300 hover:text-emerald-200"
            >
              Create one
            </a>
          </p>
        </div>
      </div>
    </section>
  </main>
)};

export default Login;
