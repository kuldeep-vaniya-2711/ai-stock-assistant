import { useDashboardContext } from "../context/DashboardContext";

function Card({ title, value, color }) {
  return (
    <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">

      <p className="text-slate-400 text-sm">
        {title}
      </p>

      <h2 className={`text-2xl font-bold mt-2 ${color}`}>
        {value}
      </h2>

    </div>
  );
}

export default function PortfolioHealthCard() {

  const { analytics } = useDashboardContext();

  if (!analytics) {

    return (

      <div className="bg-slate-900 rounded-xl p-6">

        Loading Portfolio Health...

      </div>

    );

  }

  return (

    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">

      <h2 className="text-2xl font-bold mb-6">

        ❤️ Portfolio Health

      </h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">

        <Card

          title="Health Score"

          value={`${analytics.health_score}%`}

          color="text-green-400"

        />

        <Card

          title="Risk"

          value={analytics.risk}

          color="text-red-400"

        />

        <Card

          title="Diversification"

          value={`${analytics.diversification}%`}

          color="text-cyan-400"

        />

        <Card

          title="Recommendation"

          value={analytics.recommendation}

          color="text-yellow-400"

        />

      </div>

    </div>

  );

}