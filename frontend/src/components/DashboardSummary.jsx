import { useDashboardContext } from "../context/DashboardContext";

function SummaryCard({ title, value, color }) {

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 lg:p-6 shadow-lg hover:border-cyan-500 transition">

            <h3 className="text-slate-400 text-sm">

                {title}

            </h3>

            <h1 className={`mt-3 text-xl sm:text-2xl lg:text-3xl font-bold break-words ${color}`}>

                {value}

            </h1>

        </div>

    );

}

function DashboardSummary() {

    const { analytics } = useDashboardContext();

    if (!analytics) {

        return (

            <div className="bg-slate-900 rounded-2xl p-6 text-center">

                Loading Dashboard...

            </div>

        );

    }

    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">

            <SummaryCard

                title="Total Investment"

                value={`₹ ${analytics.investment}`}

                color="text-white"

            />

            <SummaryCard

                title="Current Value"

                value={`₹ ${analytics.current_value}`}

                color="text-cyan-400"

            />

            <SummaryCard

                title="Overall Profit"

                value={`₹ ${analytics.overall_profit}`}

                color="text-green-400"

            />

            <SummaryCard

                title="Overall Return"

                value={`${analytics.overall_return}%`}

                color="text-yellow-400"

            />

            <SummaryCard

                title="Top Gainer"

                value={analytics.top_gainer || "--"}

                color="text-green-400"

            />

            <SummaryCard

                title="Top Loser"

                value={analytics.top_loser || "--"}

                color="text-red-400"

            />

        </div>

    );

}

export default DashboardSummary;