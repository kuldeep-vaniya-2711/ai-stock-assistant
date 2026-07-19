import { useDashboardContext } from "../context/DashboardContext";

function DashboardSummary() {

    const { analytics } = useDashboardContext();

    if (!analytics) {

        return (

            <div className="bg-slate-900 rounded-xl p-6">

                Loading Dashboard...

            </div>

        );

    }

    return (

        <div className="grid lg:grid-cols-3 gap-6">

            <div className="bg-slate-900 p-6 rounded-xl">

                <h3>Total Investment</h3>

                <h1 className="text-3xl font-bold">

                    ₹ {analytics.investment}

                </h1>

            </div>

            <div className="bg-slate-900 p-6 rounded-xl">

                <h3>Current Value</h3>

                <h1 className="text-3xl font-bold text-cyan-400">

                    ₹ {analytics.current_value}

                </h1>

            </div>

            <div className="bg-slate-900 p-6 rounded-xl">

                <h3>Overall Profit</h3>

                <h1 className="text-3xl font-bold text-green-400">

                    ₹ {analytics.overall_profit}

                </h1>

            </div>

            <div className="bg-slate-900 p-6 rounded-xl">

                <h3>Overall Return</h3>

                <h1 className="text-3xl font-bold text-yellow-400">

                    {analytics.overall_return}%

                </h1>

            </div>

            <div className="bg-slate-900 p-6 rounded-xl">

                <h3>Top Gainer</h3>

                <h1 className="text-3xl font-bold">

                    {analytics.top_gainer}

                </h1>

            </div>

            <div className="bg-slate-900 p-6 rounded-xl">

                <h3>Top Loser</h3>

                <h1 className="text-3xl font-bold">

                    {analytics.top_loser}

                </h1>

            </div>

        </div>

    );

}

export default DashboardSummary;