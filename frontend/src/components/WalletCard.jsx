function Card({ title, value, icon, color, subtitle }) {

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 lg:p-6 shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1 transition duration-300">

            <div className="flex items-center justify-between gap-4">

                <div className="min-w-0">

                    <p className="text-slate-400 text-xs sm:text-sm">

                        {title}

                    </p>

                    <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold mt-2 break-words ${color}`}>

                        {value}

                    </h2>

                    <p className="text-slate-500 text-xs sm:text-sm mt-2">

                        {subtitle}

                    </p>

                </div>

                <div className="text-4xl sm:text-5xl flex-shrink-0">

                    {icon}

                </div>

            </div>

        </div>

    );

}

function WalletCard({ user }) {

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">

            <Card

                title="Wallet Balance"

                value={`₹${Number(user?.wallet || 5000).toLocaleString()}`}

                icon="💰"

                color="text-green-400"

                subtitle="Available Cash"

            />

            <Card

                title="Current Level"

                value={user?.level || "Beginner"}

                icon="🏆"

                color="text-yellow-400"

                subtitle="Investor Rank"

            />

            <Card

                title="Experience"

                value={`${user?.experience || 0} XP`}

                icon="⭐"

                color="text-cyan-400"

                subtitle="Keep Investing to Level Up"

            />

        </div>

    );

}

export default WalletCard;