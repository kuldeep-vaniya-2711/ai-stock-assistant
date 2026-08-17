import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../services/auth";
import { getCurrentUser } from "../utils/auth";


function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");


  // ----------------------------------
  // Check Existing Login
  // ----------------------------------

  useEffect(() => {

    const user = getCurrentUser();

    if (user) {

      navigate("/dashboard", {
        replace: true,
      });

    }

  }, [navigate]);


  // ----------------------------------
  // Login
  // ----------------------------------

  const handleLogin = async (event) => {

    event.preventDefault();

    setError("");


    // Validation

    const cleanEmail = email.trim();

    if (!cleanEmail) {

      setError("Please enter your email.");

      return;

    }

    if (!password) {

      setError("Please enter your password.");

      return;

    }


    try {

      setLoading(true);

      const data = await login(
        cleanEmail,
        password
      );


      // Make sure backend returned JWT

      if (!data?.success || !data?.access_token) {

        setError(
          data?.message ||
          "Login failed."
        );

        return;

      }


      // Save JWT

      localStorage.setItem(
        "token",
        data.access_token
      );


      alert("Login Successful");


      navigate("/dashboard", {
        replace: true,
      });

    }

    catch (error) {

      console.error(
        "Login Error:",
        error
      );


      const message =
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        "Invalid Email or Password";


      setError(message);

    }

    finally {

      setLoading(false);

    }

  };


  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">

      <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl w-full max-w-md shadow-xl">

        <h1 className="text-3xl font-bold text-white mb-2">
          Login
        </h1>

        <p className="text-slate-400 mb-6">
          Login to your AI Stock Assistant
        </p>


        <form
          onSubmit={handleLogin}
          className="space-y-4"
        >

          {/* Email */}

          <div>

            <label
              htmlFor="email"
              className="block text-sm text-slate-400 mb-2"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              placeholder="Enter your email"
              autoComplete="email"
              disabled={loading}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
                w-full
                p-3
                rounded-lg
                bg-slate-800
                border border-slate-700
                text-white
                outline-none
                focus:border-cyan-400
                disabled:opacity-50
              "
            />

          </div>


          {/* Password */}

          <div>

            <label
              htmlFor="password"
              className="block text-sm text-slate-400 mb-2"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              placeholder="Enter your password"
              autoComplete="current-password"
              disabled={loading}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="
                w-full
                p-3
                rounded-lg
                bg-slate-800
                border border-slate-700
                text-white
                outline-none
                focus:border-cyan-400
                disabled:opacity-50
              "
            />

          </div>


          {/* Error */}

          {error && (

            <div
              className="
                bg-red-500/10
                border border-red-500/30
                text-red-400
                rounded-lg
                p-3
                text-sm
              "
              role="alert"
            >
              {error}
            </div>

          )}


          {/* Login Button */}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-cyan-500
              hover:bg-cyan-600
              disabled:opacity-50
              disabled:cursor-not-allowed
              text-white
              p-3
              rounded-lg
              font-bold
              transition
            "
          >

            {loading
              ? "Logging in..."
              : "Login"
            }

          </button>

        </form>


        {/* Register */}

        <p className="text-center text-gray-400 mt-6">

          Don't have an account?

          <Link
            to="/register"
            className="text-cyan-400 ml-2 hover:text-cyan-300"
          >
            Register
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Login;