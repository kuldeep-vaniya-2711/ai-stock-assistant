import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendOTP } from "../services/auth";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // Redirect already logged-in users
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleRegister = async () => {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    // Validation
    if (!cleanName) {
      alert("Please enter your name.");
      return;
    }

    if (!cleanEmail) {
      alert("Please enter your email.");
      return;
    }

    if (!cleanEmail.includes("@")) {
      alert("Please enter a valid email.");
      return;
    }

    if (!password) {
      alert("Please enter your password.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const data = await sendOTP(
        cleanName,
        cleanEmail,
        password
      );

      alert(data.message);

      if (data.success) {
        /*
          Only store the information needed by VerifyOTP.
          Password is intentionally NOT stored in localStorage.
        */
        localStorage.setItem("otpName", cleanName);
        localStorage.setItem("otpEmail", cleanEmail);

        navigate("/verify-otp");
      }
    } catch (error) {
      console.error("Registration Error:", error);

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.detail ||
        "Failed to send OTP.";

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">

      <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl w-full max-w-md shadow-xl">

        <h1 className="text-3xl font-bold text-white mb-6">
          Create Account
        </h1>

        {/* Name */}
        <input
          className="w-full p-3 mb-4 rounded bg-slate-800 border border-slate-700 text-white outline-none focus:border-cyan-400"
          placeholder="Full Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />

        {/* Email */}
        <input
          className="w-full p-3 mb-4 rounded bg-slate-800 border border-slate-700 text-white outline-none focus:border-cyan-400"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />

        {/* Password */}
        <input
          className="w-full p-3 mb-4 rounded bg-slate-800 border border-slate-700 text-white outline-none focus:border-cyan-400"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        <p className="text-xs text-slate-500 mb-5">
          Password must contain at least 6 characters.
        </p>

        {/* Register */}
        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed p-3 rounded font-bold transition"
        >
          {loading ? "Sending OTP..." : "Register"}
        </button>

        {/* Login */}
        <p className="text-center text-gray-400 mt-5">

          Already have an account?

          <Link
            to="/login"
            className="text-cyan-400 ml-2 hover:text-cyan-300"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;