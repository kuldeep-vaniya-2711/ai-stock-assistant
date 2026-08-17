function InvestmentGoalCard({ portfolio }) {

  const currentValue = portfolio.reduce(

    (sum, stock) => sum + (stock.current_value || 0),

    0

  );

  const goal = 100000;

  const progress = Math.min(

    (currentValue / goal) * 100,

    100

  );

  const remaining = Math.max(

    goal - currentValue,

    0

  );

  return (

    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-lg">

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">

        <div>

          <h2 className="text-xl sm:text-2xl font-bold">

            🎯 Investment Goal

          </h2>

          <p className="text-slate-400 mt-2 text-sm sm:text-base">

            Target Wealth

          </p>

        </div>

        <div className="text-5xl sm:text-6xl">

          🎯

        </div>

      </div>

      <div className="mt-8">

        <div className="flex justify-between text-sm sm:text-base">

          <span className="text-slate-400">

            Progress

          </span>

          <span className="font-bold text-cyan-400">

            {progress.toFixed(1)}%

          </span>

        </div>

        <div className="w-full h-4 bg-slate-700 rounded-full mt-3 overflow-hidden">

          <div

            className="h-4 rounded-full bg-gradient-to-r from-cyan-400 to-green-500 transition-all duration-700"

            style={{

              width: `${progress}%`

            }}

          />

        </div>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">

        <div>

          <p className="text-slate-500 text-sm">

            Current

          </p>

          <h2 className="text-xl font-bold text-cyan-400 break-words">

            ₹{currentValue.toLocaleString()}

          </h2>

        </div>

        <div>

          <p className="text-slate-500 text-sm">

            Target

          </p>

          <h2 className="text-xl font-bold text-green-400 break-words">

            ₹{goal.toLocaleString()}

          </h2>

        </div>

        <div>

          <p className="text-slate-500 text-sm">

            Remaining

          </p>

          <h2 className="text-xl font-bold text-red-400 break-words">

            ₹{remaining.toLocaleString()}

          </h2>

        </div>

      </div>

    </div>

  );

}

export default InvestmentGoalCard;