import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/auth";


function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    navigate("/dashboard");
  }
}, [navigate]);

  const handleLogin = async () => {
    try {
      const data = await login(email, password);

      localStorage.setItem("token", data.access_token);

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {
      alert("Invalid Email or Password");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">

      <div className="bg-slate-900 p-8 rounded-xl w-96">

        <h1 className="text-3xl font-bold text-white mb-6">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded mb-4 bg-slate-800 text-white"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded mb-4 bg-slate-800 text-white"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-cyan-500 p-3 rounded font-bold"
        >
          Login
        </button>

        <p className="text-center text-gray-400 mt-5">
          Don't have an account?

          <Link
            to="/register"
            className="text-cyan-400 ml-2"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;