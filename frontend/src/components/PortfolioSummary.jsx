function PortfolioSummary({

  profile,

  portfolio,

}) {

  let investment = 0;
  let current = 0;

  portfolio?.forEach((item) => {

    investment += item.investment || 0;

    current += item.current_value || 0;

  });

  const pnl = current - investment;

  return (

    <div className="bg-slate-900 rounded-xl p-6">

      <h2 className="text-2xl font-bold mb-6">

        Portfolio Summary

      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        <div>

          <p className="text-slate-400">

            Total Investment

          </p>

          <h2 className="text-2xl font-bold">

            ₹ {investment.toFixed(2)}

          </h2>

        </div>

        <div>

          <p className="text-slate-400">

            Current Value

          </p>

          <h2 className="text-2xl font-bold">

            ₹ {current.toFixed(2)}

          </h2>

        </div>

        <div>

          <p className="text-slate-400">

            Net Profit

          </p>

          <h2
            className={`text-2xl font-bold ${
              pnl >= 0
                ? "text-green-400"
                : "text-red-400"
            }`}
          >

            ₹ {pnl.toFixed(2)}

          </h2>

        </div>

      </div>

    </div>

  );

}

export default PortfolioSummary;