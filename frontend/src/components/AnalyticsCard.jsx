function AnalyticsItem({

  title,

  value,

  color = "text-white",

}) {

  return (

    <div className="bg-slate-800 rounded-xl p-4 sm:p-5 border border-slate-700 hover:border-cyan-500 transition">

      <p className="text-slate-400 text-xs sm:text-sm">

        {title}

      </p>

      <h2 className={`mt-3 text-lg sm:text-2xl lg:text-3xl font-bold break-words ${color}`}>

        {value}

      </h2>

    </div>

  );

}

function AnalyticsCard({ analytics }) {

  if (!analytics) {

    return (

      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

        <h2 className="text-xl sm:text-2xl font-bold mb-4">

          📊 Portfolio Analytics

        </h2>

        <p className="text-slate-400">

          Loading...

        </p>

      </div>

    );

  }

  return (

    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-6 shadow-lg">

      <h2 className="text-xl sm:text-2xl font-bold mb-6">

        📊 Portfolio Analytics

      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">

        <AnalyticsItem

          title="📈 Portfolio Return"

          value={`₹ ${analytics.portfolio_return}`}

          color="text-green-400"

        />

        <AnalyticsItem

          title="🟢 Best Stock"

          value={analytics.best_stock || "--"}

          color="text-green-400"

        />

        <AnalyticsItem

          title="🔴 Worst Stock"

          value={analytics.worst_stock || "--"}

          color="text-red-400"

        />

        <AnalyticsItem

          title="⚠ Risk Level"

          value={analytics.risk || "--"}

          color="text-yellow-400"

        />

        <AnalyticsItem

          title="📊 Diversification"

          value={`${analytics.diversification}%`}

          color="text-cyan-400"

        />

        <AnalyticsItem

          title="🤖 AI Recommendation"

          value={analytics.recommendation || "No Recommendation"}

          color="text-white"

        />

      </div>

    </div>

  );

}

export default AnalyticsCard;