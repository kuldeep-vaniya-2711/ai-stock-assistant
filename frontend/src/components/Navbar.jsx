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
    localStorage.removeItem("token");

    alert("Logged Out Successfully");

    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-slate-800">

      <div className="flex items-center justify-between px-8 py-4">

        {/* Left */}

        <div>

          <h1 className="text-2xl font-bold text-cyan-400">

            📈 AI Stock Assistant

          </h1>

          <p className="text-sm text-slate-400">

            Smart Investment Dashboard

          </p>

        </div>

        {/* Center */}

        <div className="hidden lg:flex items-center bg-slate-800 rounded-xl px-4 py-2 w-[380px]">

          <Search
            size={18}
            className="text-slate-400"
          />

          <input
            type="text"
            placeholder="Search Stocks..."
            className="bg-transparent outline-none ml-3 w-full text-sm"
          />

        </div>

        {/* Right */}

        <div className="flex items-center gap-4">

          <button className="p-3 rounded-xl bg-slate-800 hover:bg-cyan-600 transition">

            <Bell size={18} />

          </button>

          <button className="p-3 rounded-xl bg-slate-800 hover:bg-cyan-600 transition">

            <Moon size={18} />

          </button>

          <div className="flex items-center gap-3 bg-slate-800 px-4 py-2 rounded-xl">

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

          <button
            onClick={logout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl transition"
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