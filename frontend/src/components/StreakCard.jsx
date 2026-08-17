function Day({ active }) {

  return (

    <div
      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-bold text-lg transition-all
      ${
        active
          ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
          : "bg-slate-800 text-slate-500"
      }`}
    >

      {active ? "🔥" : "•"}

    </div>

  );

}

function StreakCard({ profile }) {

  const streak = profile?.streak || 0;

  const days = [1, 2, 3, 4, 5, 6, 7];

  return (

    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-lg">

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">

        <div>

          <h2 className="text-xl sm:text-2xl font-bold">

            🔥 Investment Streak

          </h2>

          <p className="text-slate-400 mt-2 text-sm sm:text-base">

            Invest daily to maintain your streak.

          </p>

        </div>

        <div className="text-5xl sm:text-6xl">

          🔥

        </div>

      </div>

      <div className="mt-8 flex justify-between gap-2 overflow-x-auto">

        {days.map((day) => (

          <Day

            key={day}

            active={day <= streak}

          />

        ))}

      </div>

      <div className="mt-8 text-center sm:text-left">

        <h1 className="text-3xl sm:text-4xl font-bold text-orange-400">

          {streak} Day Streak

        </h1>

      </div>

    </div>

  );

}

export default StreakCard;