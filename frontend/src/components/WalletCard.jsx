function Card({ title, value, icon, color, subtitle }) {

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1 transition duration-300">

            <div className="flex justify-between items-start">

                <div>

                    <p className="text-slate-400 text-sm">

                        {title}

                    </p>

                    <h2 className={`text-3xl font-bold mt-3 ${color}`}>

                        {value}

                    </h2>

                    <p className="text-slate-500 text-sm mt-2">

                        {subtitle}

                    </p>

                </div>

                <div className="text-5xl">

                    {icon}

                </div>

            </div>

        </div>

    );

}

function WalletCard({ user }) {

    return (

        <div className="grid lg:grid-cols-3 gap-6">

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