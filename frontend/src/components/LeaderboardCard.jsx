import { useDashboardContext } from "../context/DashboardContext";

function RankBadge({ rank }) {

  if (rank === 1) {

    return <span className="text-3xl">🥇</span>;

  }

  if (rank === 2) {

    return <span className="text-3xl">🥈</span>;

  }

  if (rank === 3) {

    return <span className="text-3xl">🥉</span>;

  }

  return (

    <span className="text-slate-400 font-bold text-lg">

      #{rank}

    </span>

  );

}

export default function LeaderboardCard() {

  const { profile } = useDashboardContext();

  const currentXP = profile?.experience || 0;

  const leaderboard = [

    {

      name: "Rohit",

      xp: 620,

    },

    {

      name: "Aman",

      xp: 510,

    },

    {

      name: "Priya",

      xp: 390,

    },

    {

      name: "You",

      xp: currentXP,

    },

  ];

  leaderboard.sort(

    (a, b) => b.xp - a.xp

  );

  return (

    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-lg">

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">

        <div>

          <h2 className="text-xl sm:text-2xl font-bold">

            🏆 XP Leaderboard

          </h2>

          <p className="text-slate-400 mt-2 text-sm sm:text-base">

            Top Investors by Experience

          </p>

        </div>

        <div className="text-5xl sm:text-6xl">

          🏅

        </div>

      </div>

      <div className="space-y-4">

        {

          leaderboard.map((user, index) => (

            <div

              key={user.name}

              className={`

              flex

              items-center

              justify-between

              rounded-xl

              p-4

              transition-all

              hover:scale-[1.02]

              ${

                user.name === "You"

                  ? "bg-cyan-900 border border-cyan-500"

                  : "bg-slate-800"

              }

              `}

            >

              <div className="flex items-center gap-4 min-w-0">

                <RankBadge

                  rank={index + 1}

                />

                <div className="min-w-0">

                  <h3 className="font-bold truncate">

                    {user.name}

                  </h3>

                  <p className="text-slate-400 text-sm">

                    Investor

                  </p>

                </div>

              </div>

              <div className="text-cyan-400 font-bold text-base sm:text-xl whitespace-nowrap">

                {user.xp} XP

              </div>

            </div>

          ))

        }

      </div>

    </div>

  );

}