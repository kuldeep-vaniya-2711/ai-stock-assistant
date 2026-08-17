import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  verifyOTP,
  resendOTP,
} from "../services/auth";

function VerifyOTP() {
  const navigate = useNavigate();

  const name = localStorage.getItem("otpName");
  const email = localStorage.getItem("otpEmail");
  const password = localStorage.getItem("otpPassword");

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  // ----------------------------------
  // Check registration data
  // ----------------------------------

  useEffect(() => {
    if (!email) {
      navigate("/register", { replace: true });
    }
  }, [email, navigate]);

  // ----------------------------------
  // OTP Timer
  // ----------------------------------

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // ----------------------------------
  // OTP Input
  // ----------------------------------

  const handleOTPChange = (event) => {
    const value = event.target.value
      .replace(/\D/g, "")
      .slice(0, 6);

    setOtp(value);
  };

  // ----------------------------------
  // Verify OTP
  // ----------------------------------

  const handleVerify = async () => {
    if (!email) {
      alert("Registration session expired. Please register again.");
      navigate("/register", { replace: true });
      return;
    }

    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);

      const data = await verifyOTP(email, otp);

      alert(data.message);

      if (data.success) {
        // Clear temporary registration data
        localStorage.removeItem("otpName");
        localStorage.removeItem("otpEmail");
        localStorage.removeItem("otpPassword");

        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.error("OTP Verification Error:", error);

      const message =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "OTP Verification Failed";

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------
  // Resend OTP
  // ----------------------------------

  const handleResend = async () => {
    if (timer > 0 || resendLoading) return;

    if (!name || !email || !password) {
      alert("Registration session expired. Please register again.");

      localStorage.removeItem("otpName");
      localStorage.removeItem("otpEmail");
      localStorage.removeItem("otpPassword");

      navigate("/register", { replace: true });

      return;
    }

    try {
      setResendLoading(true);

      const data = await resendOTP(
        name,
        email,
        password
      );

      alert(data.message);

      if (data.success) {
        setOtp("");
        setTimer(60);
      }
    } catch (error) {
      console.error("Resend OTP Error:", error);

      const message =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Failed to resend OTP";

      alert(message);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-950 px-4">

      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl w-full max-w-md shadow-xl">

        <h1 className="text-3xl font-bold text-white mb-6">
          Verify OTP
        </h1>

        <p className="text-gray-400 mb-6">
          OTP sent to
          <br />

          <span className="text-cyan-400 font-semibold">
            {email}
          </span>
        </p>

        <input
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          placeholder="Enter 6 Digit OTP"
          value={otp}
          onChange={handleOTPChange}
          maxLength={6}
          className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white mb-5 outline-none focus:border-cyan-400"
        />

        <button
          onClick={handleVerify}
          disabled={loading || otp.length !== 6}
          className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed p-3 rounded-lg font-bold transition"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <button
          onClick={handleResend}
          disabled={timer > 0 || resendLoading}
          className={`w-full mt-4 p-3 rounded-lg font-bold transition ${
            timer > 0 || resendLoading
              ? "bg-gray-600 text-gray-300 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          {resendLoading
            ? "Sending..."
            : timer > 0
            ? `Resend OTP in ${timer}s`
            : "Resend OTP"}
        </button>

      </div>

    </div>
  );
}

export default VerifyOTP;