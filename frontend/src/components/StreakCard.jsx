function Day({ active }) {

    return (

        <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold
            ${
                active
                    ? "bg-orange-500 text-white"
                    : "bg-slate-800 text-slate-500"
            }`}
        >

            {active ? "🔥" : "•"}

        </div>

    );

}

function StreakCard({ profile }) {

    const streak = profile?.streak || 0;

    const days = [1,2,3,4,5,6,7];

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <div className="flex justify-between items-center">

                <div>

                    <h2 className="text-2xl font-bold">

                        🔥 Investment Streak

                    </h2>

                    <p className="text-slate-400 mt-2">

                        Invest daily to maintain your streak.

                    </p>

                </div>

                <div className="text-6xl">

                    🔥

                </div>

            </div>

            <div className="mt-8 grid grid-cols-7 gap-3">

                {

                    days.map(day => (

                        <Day

                            key={day}

                            active={day <= streak}

                        />

                    ))

                }

            </div>

            <div className="mt-8">

                <h1 className="text-4xl font-bold text-orange-400">

                    {streak} Day Streak

                </h1>

            </div>

        </div>

    );

}

export default StreakCard;