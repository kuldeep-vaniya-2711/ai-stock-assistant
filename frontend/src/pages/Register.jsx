import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendOTP } from "../services/auth";

function Register() {

  const navigate = useNavigate();

useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    navigate("/dashboard");
  }
}, [navigate]);


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {

    try {

        const data = await sendOTP(
            name,
            email,
            password
        );

        alert(data.message);

        if (data.success) {

    localStorage.setItem(
        "otpName",
        name
    );

    localStorage.setItem(
        "otpEmail",
        email
    );

    localStorage.setItem(
        "otpPassword",
        password
    );

    navigate("/verify-otp");

}

    }

    catch (error) {

        alert("Failed to send OTP");

        console.log(error);

    }

};

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-950">

      <div className="bg-slate-900 p-8 rounded-xl w-96">

        <h1 className="text-3xl font-bold text-white mb-6">
          Register
        </h1>

        <input
          className="w-full p-3 mb-4 rounded bg-slate-800 text-white"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full p-3 mb-4 rounded bg-slate-800 text-white"
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-3 mb-4 rounded bg-slate-800 text-white"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-cyan-500 p-3 rounded font-bold"
        >
          Register
        </button>

        <p className="text-center text-gray-400 mt-5">

          Already have an account?

          <Link
            to="/login"
            className="text-cyan-400 ml-2"
          >
            Login
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Register;