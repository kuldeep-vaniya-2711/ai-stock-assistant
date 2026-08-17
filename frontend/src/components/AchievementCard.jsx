function Badge({

  title,

  icon,

  unlocked,

}) {

  return (

    <div

      className={`rounded-2xl border p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1

      ${

        unlocked

          ? "bg-slate-900 border-green-500 hover:shadow-green-500/20"

          : "bg-slate-800 border-slate-700 opacity-70"

      }`}

    >

      <div className="text-4xl sm:text-5xl">

        {icon}

      </div>

      <h3 className="mt-4 text-lg font-bold break-words">

        {title}

      </h3>

      <p className="mt-2 text-sm text-slate-400">

        {

          unlocked

            ? "Unlocked ✅"

            : "Locked 🔒"

        }

      </p>

    </div>

  );

}

function AchievementCard({

  profile,

  portfolio,

}) {

  const xp = profile?.experience || 0;

  const holdings = portfolio?.length || 0;

  const wallet = profile?.wallet || 0;

  return (

    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-lg">

      <h2 className="text-xl sm:text-2xl font-bold mb-6">

        🏅 Achievements

      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">

        <Badge

          title="First Investment"

          icon="🎯"

          unlocked={holdings >= 1}

        />

        <Badge

          title="Investor"

          icon="📈"

          unlocked={holdings >= 5}

        />

        <Badge

          title="XP Master"

          icon="⭐"

          unlocked={xp >= 250}

        />

        <Badge

          title="Wealth Builder"

          icon="💰"

          unlocked={wallet >= 10000}

        />

      </div>

    </div>

  );

}

export default AchievementCard;