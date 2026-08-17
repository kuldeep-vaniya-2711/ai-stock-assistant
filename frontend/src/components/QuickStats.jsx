import { useDashboardContext } from "../context/DashboardContext";

import {
  Wallet,
  Star,
  TrendingUp,
  Eye,
} from "lucide-react";

function StatCard({
  title,
  value,
  color,
  icon,
}) {
  return (
    <div className="group bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-4 sm:p-5 lg:p-6 shadow-lg hover:shadow-cyan-500/20 hover:border-cyan-500 transition-all duration-300 hover:-translate-y-1">

      <div className="flex items-center justify-between gap-4">

        <div className="min-w-0">

          <p className="text-slate-400 text-xs sm:text-sm">
            {title}
          </p>

          <h2
            className={`text-xl sm:text-2xl lg:text-3xl font-bold mt-2 break-words ${color}`}
          >
            {value}
          </h2>

        </div>

        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-slate-800 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition">

          {icon}

        </div>

      </div>

    </div>
  );
}

export default function QuickStats() {

  const {
    portfolio,
    watchlist,
    profile,
  } = useDashboardContext();

  const invested = portfolio.reduce(
    (sum, stock) =>
      sum + (stock.current_value || 0),
    0
  );

  return (

    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">

      <StatCard
        title="Wallet Balance"
        value={`₹${profile?.wallet?.toFixed(2) || "0.00"}`}
        color="text-green-400"
        icon={
          <Wallet
            className="text-green-400"
            size={26}
          />
        }
      />

      <StatCard
        title="Experience"
        value={`${profile?.experience || 0} XP`}
        color="text-yellow-400"
        icon={
          <Star
            className="text-yellow-400"
            size={26}
          />
        }
      />

      <StatCard
        title="Portfolio Value"
        value={`₹${invested.toFixed(2)}`}
        color="text-cyan-400"
        icon={
          <TrendingUp
            className="text-cyan-400"
            size={26}
          />
        }
      />

      <StatCard
        title="Watchlist"
        value={watchlist?.length || 0}
        color="text-pink-400"
        icon={
          <Eye
            className="text-pink-400"
            size={26}
          />
        }
      />

    </div>

  );
}