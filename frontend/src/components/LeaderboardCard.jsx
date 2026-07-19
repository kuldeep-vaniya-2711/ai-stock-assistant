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

        <span className="text-slate-400 font-bold">

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

            xp: 620

        },

        {

            name: "Aman",

            xp: 510

        },

        {

            name: "Priya",

            xp: 390

        },

        {

            name: "You",

            xp: currentXP

        }

    ];

    leaderboard.sort(

        (a, b) => b.xp - a.xp

    );

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">

            <div className="flex justify-between items-center mb-6">

                <div>

                    <h2 className="text-2xl font-bold">

                        🏆 XP Leaderboard

                    </h2>

                    <p className="text-slate-400 mt-2">

                        Top Investors by Experience

                    </p>

                </div>

                <div className="text-5xl">

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

                            justify-between

                            items-center

                            rounded-xl

                            px-5

                            py-4

                            transition

                            hover:scale-[1.02]

                            ${

                                user.name === "You"

                                ?

                                "bg-cyan-900 border border-cyan-500"

                                :

                                "bg-slate-800"

                            }

                            `}

                        >

                            <div className="flex items-center gap-4">

                                <RankBadge

                                    rank={index + 1}

                                />

                                <div>

                                    <h3 className="font-bold">

                                        {user.name}

                                    </h3>

                                    <p className="text-slate-400 text-sm">

                                        Investor

                                    </p>

                                </div>

                            </div>

                            <div className="text-cyan-400 font-bold text-xl">

                                {user.xp} XP

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}