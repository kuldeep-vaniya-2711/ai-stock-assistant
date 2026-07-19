function AnalyticsCard({ analytics }) {

  if (!analytics) {

    return (

      <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">

        <h2 className="text-xl font-bold mb-4">
          📊 Portfolio Analytics
        </h2>

        <p className="text-slate-400">
          Loading...
        </p>

      </div>

    );

  }

  return (

    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">

      <h2 className="text-xl font-bold mb-6">

        📊 Portfolio Analytics

      </h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

        <div className="bg-slate-800 rounded-lg p-5">

          <p className="text-slate-400 text-sm">

            📈 Portfolio Return

          </p>

          <h2 className="text-3xl font-bold text-green-400 mt-2">

            ₹ {analytics.portfolio_return}

          </h2>

        </div>

        <div className="bg-slate-800 rounded-lg p-5">

          <p className="text-slate-400 text-sm">

            🟢 Best Stock

          </p>

          <h2 className="text-2xl font-bold text-green-400 mt-2">

            {analytics.best_stock}

          </h2>

        </div>

        <div className="bg-slate-800 rounded-lg p-5">

          <p className="text-slate-400 text-sm">

            🔴 Worst Stock

          </p>

          <h2 className="text-2xl font-bold text-red-400 mt-2">

            {analytics.worst_stock}

          </h2>

        </div>

        <div className="bg-slate-800 rounded-lg p-5">

          <p className="text-slate-400 text-sm">

            ⚠ Risk Level

          </p>

          <h2 className="text-2xl font-bold text-yellow-400 mt-2">

            {analytics.risk}

          </h2>

        </div>

        <div className="bg-slate-800 rounded-lg p-5">

          <p className="text-slate-400 text-sm">

            📊 Diversification

          </p>

          <h2 className="text-3xl font-bold text-cyan-400 mt-2">

            {analytics.diversification}%

          </h2>

        </div>

        <div className="bg-slate-800 rounded-lg p-5">

          <p className="text-slate-400 text-sm">

            🤖 AI Recommendation

          </p>

          <p className="mt-3 text-white">

            {analytics.recommendation}

          </p>

        </div>

      </div>

    </div>

  );

}

export default AnalyticsCard;