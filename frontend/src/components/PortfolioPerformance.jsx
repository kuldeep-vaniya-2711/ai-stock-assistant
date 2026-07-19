import { useDashboardContext } from "../context/DashboardContext";

function PortfolioPerformance() {

  const { portfolio } = useDashboardContext();

  let totalInvestment = 0;
  let currentValue = 0;

  portfolio?.forEach((stock) => {

    totalInvestment += stock.investment || 0;
    currentValue += stock.current_value || 0;

  });

  const profit = currentValue - totalInvestment;

  const percent =
    totalInvestment > 0
      ? ((profit / totalInvestment) * 100).toFixed(2)
      : 0;

  return (

    <div className="bg-slate-900 rounded-xl p-6">

      <h2 className="text-2xl font-bold mb-6">

        Portfolio Performance

      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        <div>

          <p className="text-slate-400">

            Total Investment

          </p>

          <h1 className="text-3xl font-bold">

            ₹ {totalInvestment.toFixed(2)}

          </h1>

        </div>

        <div>

          <p className="text-slate-400">

            Current Value

          </p>

          <h1 className="text-3xl font-bold text-cyan-400">

            ₹ {currentValue.toFixed(2)}

          </h1>

        </div>

        <div>

          <p className="text-slate-400">

            Overall Return

          </p>

          <h1

            className={`text-3xl font-bold ${
              profit >= 0
                ? "text-green-400"
                : "text-red-400"
            }`}

          >

            {percent}%

          </h1>

        </div>

      </div>

    </div>

  );

}

export default PortfolioPerformance;