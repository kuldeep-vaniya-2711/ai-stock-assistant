import {
  LayoutDashboard,
  TrendingUp,
  Briefcase,
  Star,
  Bell,
  BarChart3,
  Newspaper,
  User,
  X,
  Bot,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menus = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    name: "Market",
    path: "/dashboard/market",
    icon: <TrendingUp size={20} />,
  },
  {
    name: "Portfolio",
    path: "/dashboard/portfolio",
    icon: <Briefcase size={20} />,
  },
  {
    name: "Watchlist",
    path: "/dashboard/watchlist",
    icon: <Star size={20} />,
  },
  {
    name: "Alerts",
    path: "/dashboard/alerts",
    icon: <Bell size={20} />,
  },
  {
    name: "Analytics",
    path: "/dashboard/analytics",
    icon: <BarChart3 size={20} />,
  },
  {
    name: "News",
    path: "/dashboard/news",
    icon: <Newspaper size={20} />,
  },
  {
    name: "Profile",
    path: "/dashboard/profile",
    icon: <User size={20} />,
  },
  {
    name: "AI Assistant",
    path: "/dashboard/ai",
    icon: <Bot size={20} />,
  },
];

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <aside
      className={`
        fixed top-0 left-0 z-50 h-screen w-64
        bg-slate-900 border-r border-slate-800
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-cyan-400">
          AI Stock
        </h1>

        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-1 rounded-lg hover:bg-slate-800"
          aria-label="Close sidebar"
        >
          <X size={22} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-6 flex flex-col gap-2 px-3">
        {menus.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            end={menu.path === "/dashboard"}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-cyan-500 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            {menu.icon}

            <span>{menu.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;