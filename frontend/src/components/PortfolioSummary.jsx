function SummaryCard({

  title,

  value,

  color = "text-white",

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

function PortfolioSummary({

  portfolio,

}) {

  let investment = 0;

  let current = 0;

  portfolio?.forEach((item) => {

    investment += Number(item.investment || 0);

    current += Number(item.current_value || 0);

  });

  const pnl = current - investment;

  return (

    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-6 shadow-lg">

      <h2 className="text-xl sm:text-2xl font-bold mb-6">

        📋 Portfolio Summary

      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

        <SummaryCard

          title="Total Investment"

          value={`₹ ${investment.toFixed(2)}`}

        />

        <SummaryCard

          title="Current Value"

          value={`₹ ${current.toFixed(2)}`}

          color="text-cyan-400"

        />

        <SummaryCard

          title="Net Profit"

          value={`₹ ${pnl.toFixed(2)}`}

          color={

            pnl >= 0

              ? "text-green-400"

              : "text-red-400"

          }

        />

      </div>

    </div>

  );

}

export default PortfolioSummary;