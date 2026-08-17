import { useNavigate } from "react-router-dom";

import { getCurrentUser } from "../utils/auth";

import {
  Bell,
  Moon,
  Search,
  UserCircle,
  LogOut,
} from "lucide-react";


function Navbar() {

  const navigate = useNavigate();

  const user = getCurrentUser();

  const userName =
    user?.name ||
    user?.email?.split("@")[0] ||
    "User";


  const logout = () => {

    // Remove authentication data
    localStorage.removeItem("token");

    // Remove stored user data
    localStorage.removeItem("user");

    // Optional: clear any other auth-related data
    localStorage.removeItem("currentUser");

    alert("Logged Out Successfully");

    // Replace history so dashboard is not kept as the
    // immediate previous navigation entry.
    navigate("/login", {
      replace: true,
    });

  };


  return (

    <header
      className="
        hidden lg:block
        sticky top-0 z-30
        bg-slate-900/80
        backdrop-blur-lg
        border-b border-slate-800
      "
    >

      <div
        className="
          flex items-center justify-between
          px-8 py-4
        "
      >

        {/* ================= LEFT ================= */}

        <div>

          <h1 className="text-2xl font-bold text-cyan-400">
            📈 AI Stock Assistant
          </h1>

          <p className="text-sm text-slate-400">
            Smart Investment Dashboard
          </p>

        </div>


        {/* ================= CENTER ================= */}

        <div
          className="
            flex items-center
            bg-slate-800
            rounded-xl
            px-4 py-2
            w-[380px]
            border border-transparent
            focus-within:border-cyan-500
          "
        >

          <Search
            size={18}
            className="text-slate-400 shrink-0"
          />

          <input
            type="text"
            placeholder="Search Stocks..."
            aria-label="Search stocks"
            className="
              bg-transparent
              outline-none
              ml-3
              w-full
              text-sm
              text-white
              placeholder:text-slate-500
            "
          />

        </div>


        {/* ================= RIGHT ================= */}

        <div className="flex items-center gap-4">

          {/* Notifications */}

          <button
            type="button"
            aria-label="Notifications"
            className="
              p-3
              rounded-xl
              bg-slate-800
              hover:bg-cyan-600
              transition
            "
          >
            <Bell size={18} />
          </button>


          {/* Theme */}

          <button
            type="button"
            aria-label="Toggle theme"
            className="
              p-3
              rounded-xl
              bg-slate-800
              hover:bg-cyan-600
              transition
            "
          >
            <Moon size={18} />
          </button>


          {/* User */}

          <div
            className="
              flex items-center gap-3
              bg-slate-800
              px-4 py-2
              rounded-xl
            "
          >

            <UserCircle
              size={36}
              className="text-cyan-400"
            />

            <div>

              <p className="text-xs text-slate-400">
                Welcome
              </p>

              <h2 className="font-semibold">
                {userName}
              </h2>

            </div>

          </div>


          {/* Logout */}

          <button
            type="button"
            onClick={logout}
            className="
              flex items-center gap-2
              bg-red-500
              hover:bg-red-600
              px-4 py-2
              rounded-xl
              transition
            "
          >

            <LogOut size={18} />

            Logout

          </button>

        </div>

      </div>

    </header>

  );

}

export default Navbar;