function LevelCard({ profile }) {

    const xp = profile?.experience || 0;

    let currentLevel = "Beginner";
    let nextLevel = "Intermediate";

    let maxXP = 100;
    let currentXP = xp;

    if (xp >= 500) {

        currentLevel = "Expert";
        nextLevel = "MAX";
        maxXP = 500;
        currentXP = 500;

    }

    else if (xp >= 250) {

        currentLevel = "Advanced";
        nextLevel = "Expert";
        currentXP = xp - 250;
        maxXP = 250;

    }

    else if (xp >= 100) {

        currentLevel = "Intermediate";
        nextLevel = "Advanced";
        currentXP = xp - 100;
        maxXP = 150;

    }

    const progress = Math.min(

        (currentXP / maxXP) * 100,

        100

    );

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">

            <div className="flex justify-between items-center">

                <div>

                    <p className="text-slate-400">

                        🏆 Investor Level

                    </p>

                    <h2 className="text-3xl font-bold text-yellow-400 mt-2">

                        {currentLevel}

                    </h2>

                </div>

                <div className="text-6xl">

                    🏅

                </div>

            </div>

            <div className="mt-6">

                <div className="flex justify-between text-sm text-slate-400">

                    <span>

                        XP Progress

                    </span>

                    <span>

                        {currentXP} / {maxXP}

                    </span>

                </div>

                <div className="w-full bg-slate-700 rounded-full h-3 mt-2">

                    <div

                        className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-700"

                        style={{

                            width: `${progress}%`

                        }}

                    />

                </div>

            </div>

            <div className="mt-5 flex justify-between">

                <div>

                    <p className="text-slate-500 text-sm">

                        Total XP

                    </p>

                    <h3 className="text-cyan-400 font-bold text-xl">

                        {xp}

                    </h3>

                </div>

                <div className="text-right">

                    <p className="text-slate-500 text-sm">

                        Next Level

                    </p>

                    <h3 className="text-green-400 font-bold text-xl">

                        {nextLevel}

                    </h3>

                </div>

            </div>

        </div>

    );

}

export default LevelCard;