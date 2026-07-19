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

    <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-1 transition-all duration-300">

      <div className="flex justify-between items-start">

        <div>

          <p className="text-slate-400 text-sm">

            {title}

          </p>

          <h2 className={`text-3xl font-bold mt-3 ${color}`}>

            {value}

          </h2>

          {

            subtitle && (

              <p className="text-slate-500 mt-2 text-sm">

                {subtitle}

              </p>

            )

          }

        </div>

        <div className="bg-slate-800 rounded-xl p-3">

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

  const wallet = profile?.wallet || 0;

  const level = profile?.level || "Beginner";

  const xp = profile?.experience || 0;

  const holdings = portfolio?.length || 0;

  let investment = 0;

  let currentValue = 0;

  portfolio?.forEach(stock => {

    investment += stock.investment || 0;

    currentValue += stock.current_value || 0;

  });

  const profit = currentValue - investment;

  return (

    <div className="grid lg:grid-cols-4 gap-6">

      <StatCard

        title="Wallet"

        value={`₹${wallet.toFixed(2)}`}

        subtitle="Available Balance"

        color="text-green-400"

        icon={

          <Wallet

            size={30}

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

            size={30}

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

            size={30}

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

            size={30}

            className="text-yellow-400"

          />

        }

      />

    </div>

  );

}