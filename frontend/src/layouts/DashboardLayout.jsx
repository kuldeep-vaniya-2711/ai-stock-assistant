import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function DashboardLayout() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();

  // Close mobile sidebar whenever route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (

    <div className="min-h-screen bg-slate-950 text-white flex">

      {/* =========================================
          Mobile Sidebar Overlay
      ========================================== */}

      {sidebarOpen && (

        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />

      )}

      {/* =========================================
          Sidebar
      ========================================== */}

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* =========================================
          Main Content
      ========================================== */}

      <div className="flex-1 lg:ml-64 min-w-0">

        {/* =========================================
            Mobile Header
        ========================================== */}

        <div className="lg:hidden sticky top-0 z-30 bg-slate-900 border-b border-slate-800 px-4 py-3">

          <div className="flex items-center justify-between">

            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
              aria-label="Open navigation menu"
              aria-expanded={sidebarOpen}
            >
              <Menu size={22} />
            </button>

            <h1 className="text-lg font-bold text-cyan-400">
              AI Stock Assistant
            </h1>

            {/* Right-side spacing */}
            <div className="w-10" />

          </div>

        </div>

        {/* =========================================
            Desktop / Main Navbar
        ========================================== */}

        <Navbar />

        {/* =========================================
            Page Content
        ========================================== */}

        <main className="p-4 sm:p-6 lg:p-8">

          <Outlet />

        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;