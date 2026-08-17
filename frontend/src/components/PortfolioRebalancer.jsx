import { useEffect, useState } from "react";
import api from "../services/api";
import { getCurrentUser } from "../utils/auth";

export default function PortfolioRebalancer() {

    const [data, setData] = useState(null);

    const user = getCurrentUser();

    useEffect(() => {
        let cancelled = false;

        async function fetchRebalance() {
            try {
                const res = await api.get(`/rebalance/${user?.email}`);
                if (!cancelled) setData(res.data);
            } catch (err) {
                console.log(err);
            }
        }

        if (user?.email) {
            fetchRebalance();
        }

        return () => {
            cancelled = true;
        };
    }, [user?.email]);

    if (!data) {

        return (

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">

                Loading Rebalancer...

            </div>

        );

    }

    return (

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

            <div className="flex justify-between items-center mb-6">

                <div>

                    <h2 className="text-2xl font-bold">

                        ⚖️ AI Portfolio Rebalancer

                    </h2>

                    <p className="text-slate-400 mt-2">

                        AI suggestions to balance your portfolio.

                    </p>

                </div>

                <div className="text-5xl">

                    ⚖️

                </div>

            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">

                <div className="bg-slate-800 rounded-xl p-5">

                    <p className="text-slate-400">

                        Portfolio Value

                    </p>

                    <h2 className="text-3xl font-bold text-cyan-400 mt-2">

                        ₹{data.portfolio_value.toLocaleString()}

                    </h2>

                </div>

                <div className="bg-slate-800 rounded-xl p-5">

                    <p className="text-slate-400">

                        Diversification Score

                    </p>

                    <h2 className="text-3xl font-bold text-green-400 mt-2">

                        {data.diversification_score}%

                    </h2>

                </div>

            </div>

            <h3 className="text-xl font-bold mb-4">

                🤖 AI Suggestions

            </h3>

            {

                data.suggestions.length === 0 && (

                    <div className="bg-green-900 rounded-xl p-5">

                        🎉 Portfolio is already well balanced.

                    </div>

                )

            }

            <div className="space-y-4">

                {

                    data.suggestions.map((item, index) => (

                        <div

                            key={index}

                            className="bg-slate-800 rounded-xl p-5 flex justify-between items-center"

                        >

                            <div>

                                <h3 className="font-bold text-lg">

                                    {item.symbol}

                                </h3>

                                <p className="text-slate-400 mt-2">

                                    {item.reason}

                                </p>

                            </div>

                            <div className="text-right">

                                <span

                                    className={`px-4 py-2 rounded-full font-bold

                                    ${

                                        item.action === "BUY"

                                            ? "bg-green-500 text-white"

                                            : "bg-red-500 text-white"

                                    }

                                    `}

                                >

                                    {item.action}

                                </span>

                                <h3 className="mt-3 text-cyan-400 font-bold">

                                    ₹{item.amount.toLocaleString()}

                                </h3>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}