import { useDashboardContext } from "../context/DashboardContext";

function Card({

  title,

  value,

  color,

}) {

  return (

    <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 sm:p-5 hover:border-cyan-500 transition">

      <p className="text-slate-400 text-xs sm:text-sm">

        {title}

      </p>

      <h2 className={`mt-3 text-xl sm:text-2xl lg:text-3xl font-bold break-words ${color}`}>

        {value}

      </h2>

    </div>

  );

}

export default function PortfolioHealthCard() {

  const { analytics } = useDashboardContext();

  if (!analytics) {

    return (

      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 text-center">

        Loading Portfolio Health...

      </div>

    );

  }

  return (

    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-6 shadow-lg">

      <h2 className="text-xl sm:text-2xl font-bold mb-6">

        ❤️ Portfolio Health

      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">

        <Card

          title="Health Score"

          value={`${analytics.health_score}%`}

          color="text-green-400"

        />

        <Card

          title="Risk"

          value={analytics.risk || "--"}

          color="text-red-400"

        />

        <Card

          title="Diversification"

          value={`${analytics.diversification}%`}

          color="text-cyan-400"

        />

        <Card

          title="Recommendation"

          value={analytics.recommendation || "Hold"}

          color="text-yellow-400"

        />

      </div>

    </div>

  );

}