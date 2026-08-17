import {
  Wallet,
  Briefcase,
  TrendingUp,
  Award,
} from "lucide-react";

function StatCard({

  title,

  value,

  subtitle,

  icon,

  color,

}) {

  return (

    <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-4 sm:p-5 lg:p-6 shadow-lg hover:border-cyan-500 hover:shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-1">

      <div className="flex items-start justify-between gap-4">

        <div className="flex-1 min-w-0">

          <p className="text-slate-400 text-xs sm:text-sm">

            {title}

          </p>

          <h2 className={`mt-2 text-xl sm:text-2xl lg:text-3xl font-bold break-words ${color}`}>

            {value}

          </h2>

          {subtitle && (

            <p className="mt-2 text-xs sm:text-sm text-slate-500">

              {subtitle}

            </p>

          )}

        </div>

        <div className="bg-slate-800 rounded-xl p-3 shrink-0">

          {icon}

        </div>

      </div>

    </div>

  );

}

export default function DashboardStats({

  profile,

  portfolio,

}) {

  const wallet = Number(profile?.wallet || 0);

  const level = profile?.level || "Beginner";

  const xp = profile?.experience || 0;

  const holdings = portfolio?.length || 0;

  let investment = 0;

  let currentValue = 0;

  portfolio?.forEach((stock) => {

    investment += Number(stock.investment || 0);

    currentValue += Number(stock.current_value || 0);

  });

  const profit = currentValue - investment;

  return (

    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">

      <StatCard

        title="Wallet"

        value={`₹${wallet.toFixed(2)}`}

        subtitle="Available Balance"

        color="text-green-400"

        icon={

          <Wallet

            size={28}

            className="text-green-400"

          />

        }

      />

      <StatCard

        title="Holdings"

        value={holdings}

        subtitle="Stocks Owned"

        color="text-cyan-400"

        icon={

          <Briefcase

            size={28}

            className="text-cyan-400"

          />

        }

      />

      <StatCard

        title="Profit / Loss"

        value={`₹${profit.toFixed(2)}`}

        subtitle={

          profit >= 0

            ? "Portfolio is Growing"

            : "Needs Improvement"

        }

        color={

          profit >= 0

            ? "text-green-400"

            : "text-red-400"

        }

        icon={

          <TrendingUp

            size={28}

            className={

              profit >= 0

                ? "text-green-400"

                : "text-red-400"

            }

          />

        }

      />

      <StatCard

        title="AI Investor Level"

        value={level}

        subtitle={`${xp} XP Earned`}

        color="text-yellow-400"

        icon={

          <Award

            size={28}

            className="text-yellow-400"

          />

        }

      />

    </div>

  );

}