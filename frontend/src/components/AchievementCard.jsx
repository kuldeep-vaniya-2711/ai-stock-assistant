function Badge({

    title,

    icon,

    unlocked,

}) {

    return (

        <div

            className={`rounded-xl p-5 border transition duration-300

            ${

                unlocked

                    ? "bg-slate-900 border-green-500 hover:scale-105"

                    : "bg-slate-800 border-slate-700 opacity-60"

            }`}

        >

            <div className="text-5xl">

                {icon}

            </div>

            <h3 className="mt-4 font-bold text-lg">

                {title}

            </h3>

            <p className="mt-2 text-sm">

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

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <h2 className="text-2xl font-bold mb-6">

                🏅 Achievements

            </h2>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">

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