import React, { useContext, useState } from "react";
import { Authcontext } from "../../../ContextApi/AuthContext";
import {
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router";


const Register = () => {
   const navigate = useNavigate();  
  const { SignInFunc, auth } = useContext(Authcontext);
  const provider = new GoogleAuthProvider();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    role: "borrower",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    general: "",
  });

  const [passwordValidation, setPasswordValidation] = useState({
    uppercase: false,
    lowercase: false,
    length: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const roles = [
    { value: "borrower", label: "Borrower" },
    { value: "manager", label: "Manager" },
  ];

  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasLength = password.length >= 6;

    setPasswordValidation({
      uppercase: hasUppercase,
      lowercase: hasLowercase,
      length: hasLength,
    });

    return hasUppercase && hasLowercase && hasLength;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));

    if (name === "password") {
      validatePassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email))
      newErrors.email = "Please enter a valid email address";
    if (!formData.password) newErrors.password = "Password is required";
    else if (!validatePassword(formData.password))
      newErrors.password = "Password must meet all requirements below";
    if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Register data:", formData);

    const name = formData.name;
    const UserRole = formData.role;
    const email = formData.email;
    const photo = formData.photoURL;
    const password = formData.password;

    //email,pass signin
    SignInFunc(email, password)
      .then((res) => {
        updateProfile(res.user, {
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            toast.success("Register Account Successfully");
            navigate('/')
            axios.post("http://localhost:3000/save-user", {
              name: name,
              email: email,
              role:UserRole,
            });

            e.target.reset();
          })
          .catch((error) => {
            switch (error.code) {
              case "auth/email-already-in-use":
                toast.error(
                  "This email is already registered. Please login or use another email."
                );
                break;
              case "auth/invalid-email":
                toast.error(
                  "Invalid email format. Please enter a valid email."
                );
                break;
              case "auth/operation-not-allowed":
                toast.error(
                  "Email/password accounts are not enabled. Contact support."
                );
                break;
              case "auth/weak-password":
                toast.error(
                  "Password is too weak. Must be at least 6 characters long and include uppercase & lowercase letters."
                );
                break;
              default:
                toast.error("Something went wrong: " + error.message);
            }
          });
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            toast.error(
              "This email is already registered. Please login or use another email."
            );
            break;
          case "auth/invalid-email":
            toast.error("Invalid email format. Please enter a valid email.");
            break;
          case "auth/operation-not-allowed":
            toast.error(
              "Email/password accounts are not enabled. Contact support."
            );
            break;
          case "auth/weak-password":
            toast.error(
              "Password is too weak. Must be at least 6 characters long and include uppercase & lowercase letters."
            );
            break;
          default:
            toast.error("Something went wrong: " + error.message);
        }
      });
  };
  //googlesignin
  const Googlesignin = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
      const user = result.user;
       await axios.post("http://localhost:3000/save-user", {
        name: user.displayName,
        email: user.email,
        role: "borrower",  
      });
       toast.success("Register Account Successfully");
       navigate('/')

    })
      .catch((error) => {
        toast.error("Something went wrong: " + error.message);
      });
  };

  const isFormValid =
    formData.name.trim() &&
    validateEmail(formData.email) &&
    passwordValidation.uppercase &&
    passwordValidation.lowercase &&
    passwordValidation.length &&
    formData.confirmPassword === formData.password;

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden p-4">
      <title>MicroCredX-Register</title>
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -right-10 h-72 w-72 rounded-full bg-emerald-400/25 blur-3xl" />
        <div className="absolute -bottom-32 left-0 h-80 w-80 rounded-full bg-lime-400/25 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_60%)]" />
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-300">
            Create account
          </p>
          <h1 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight text-white">
            Join our digital banking platform
          </h1>
        </div>

        <div className="rounded-3xl border border-white/15 bg-white/5 px-6 py-8 md:px-8 md:py-10 shadow-[0_18px_45px_rgba(15,23,42,0.85)] backdrop-blur-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-200 mb-1.5">
                  Full name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className={`w-full rounded-xl border px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 ${
                    errors.name
                      ? "border-red-400/50 bg-red-500/5 focus:border-red-400 focus:ring-red-400"
                      : "border-white/15 bg-white/5 focus:border-emerald-400"
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-[11px] text-red-400">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-200 mb-1.5">
                  Role *
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-green-400 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                >
                  {roles.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-200 mb-1.5">
                  Email address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className={`w-full rounded-xl border px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 ${
                    errors.email
                      ? "border-red-400/50 bg-red-500/5 focus:border-red-400 focus:ring-red-400"
                      : "border-white/15 bg-white/5 focus:border-emerald-400"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-[11px] text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-200 mb-1.5">
                  Photo URL
                </label>
                <input
                  type="url"
                  name="photoURL"
                  value={formData.photoURL}
                  onChange={handleInputChange}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-200 mb-1.5">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create password"
                    className={`w-full rounded-xl border px-3 py-2.5 pr-10 text-sm text-slate-100 placeholder:text-slate-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 ${
                      errors.password
                        ? "border-red-400/50 bg-red-500/5 focus:border-red-400 focus:ring-red-400"
                        : "border-white/15 bg-white/5 focus:border-emerald-400"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-400 hover:text-slate-200"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-[11px] text-red-400">
                    {errors.password}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-200 mb-1.5">
                  Confirm password *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Re-enter password"
                    className={`w-full rounded-xl border px-3 py-2.5 pr-10 text-sm text-slate-100 placeholder:text-slate-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 ${
                      errors.confirmPassword
                        ? "border-red-400/50 bg-red-500/5 focus:border-red-400 focus:ring-red-400"
                        : "border-white/15 bg-white/5 focus:border-emerald-400"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-400 hover:text-slate-200"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-[11px] text-red-400">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-2">
              <div className="space-y-1 text-[11px] p-3 bg-white/5 rounded-xl border border-white/10">
                <div
                  className={`flex items-center gap-2 ${
                    passwordValidation.uppercase
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      passwordValidation.uppercase
                        ? "bg-emerald-400"
                        : "bg-red-400"
                    }`}
                  />
                  1 uppercase letter (A-Z)
                </div>
                <div
                  className={`flex items-center gap-2 ${
                    passwordValidation.lowercase
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      passwordValidation.lowercase
                        ? "bg-emerald-400"
                        : "bg-red-400"
                    }`}
                  />
                  1 lowercase letter (a-z)
                </div>
                <div
                  className={`flex items-center gap-2 ${
                    passwordValidation.length
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      passwordValidation.length
                        ? "bg-emerald-400"
                        : "bg-red-400"
                    }`}
                  />
                  At least 6 characters
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                className="mt-0.5 h-3.5 w-3.5 rounded border border-white/20 bg-transparent text-emerald-400 focus:ring-0"
                required
              />
              <p className="text-[11px] text-slate-300 leading-relaxed">
                I agree to the{" "}
                <a href="#" className="text-emerald-300 hover:text-emerald-200">
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="text-emerald-300 hover:text-emerald-200">
                  Privacy Policy
                </a>
                .
              </p>
            </div>

            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full inline-flex items-center justify-center rounded-full px-4 py-2.5 text-xs font-medium text-slate-950 shadow-lg transition-all ${
                isFormValid
                  ? "bg-emerald-500 shadow-emerald-500/40 hover:bg-emerald-400"
                  : "bg-slate-600/50 cursor-not-allowed shadow-slate-500/20"
              }`}
            >
              Create account
            </button>
          </form>
          <button
            onClick={Googlesignin}
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
            Sign with Google
          </button>

          <p className="mt-6 text-center text-[11px] text-slate-400">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-emerald-300 hover:text-emerald-200 font-medium"
            >
              Sign in instead
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Register;
