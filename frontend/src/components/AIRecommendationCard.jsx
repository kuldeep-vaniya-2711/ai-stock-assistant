import { useEffect, useState } from "react";
import api from "../services/api";
import { getCurrentUser } from "../utils/auth";

export default function AIRecommendationCard() {

    const [data, setData] = useState(null);

    useEffect(() => {

        load();

    }, []);

    async function load() {

        try {

            const email = getCurrentUser()?.email;

            if (!email) return;

            const res = await api.get(`/ai/recommendation/${email}`);

            setData(res.data);

        }

        catch (err) {

            console.log(err);

        }

    }

    if (!data) {

        return (

            <div className="bg-slate-900 rounded-xl p-6">

                Loading...

            </div>

        );

    }

    const colors = {

        success: "border-green-500",

        warning: "border-yellow-500",

        danger: "border-red-500",

        info: "border-cyan-500"

    };

    return (

        <div

            className={`bg-slate-900 border-2 ${colors[data.status]} rounded-2xl p-6 shadow-lg`}

        >

            <h2 className="text-2xl font-bold mb-6">

                🤖 AI Portfolio Advisor

            </h2>

            {/* Top Summary */}

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">

                <div className="bg-slate-800 rounded-xl p-5">

                    <p className="text-slate-400">

                        Portfolio Score

                    </p>

                    <h1 className="text-4xl font-bold text-cyan-400 mt-2">

                        {data.score}/100

                    </h1>

                </div>

                <div className="bg-slate-800 rounded-xl p-5">

                    <p className="text-slate-400">

                        Status

                    </p>

                    <h2 className="text-xl font-bold mt-2">

                        {data.title}

                    </h2>

                </div>

                <div className="bg-slate-800 rounded-xl p-5">

                    <p className="text-slate-400">

                        Total Profit

                    </p>

                    <h2 className="text-xl font-bold text-green-400 mt-2">

                        ₹ {data.profit}

                    </h2>

                </div>

                <div className="bg-slate-800 rounded-xl p-5">

                    <p className="text-slate-400">

                        Risk

                    </p>

                    <h2 className="text-xl font-bold text-yellow-400 mt-2">

                        {data.risk}

                    </h2>

                </div>

            </div>

            {/* Portfolio Details */}

            <div className="grid md:grid-cols-3 gap-6 mt-8">

                <div className="bg-slate-800 rounded-xl p-5">

                    <p className="text-slate-400">

                        Best Stock

                    </p>

                    <h2 className="text-2xl font-bold text-green-400 mt-2">

                        {data.best_stock}

                    </h2>

                </div>

                <div className="bg-slate-800 rounded-xl p-5">

                    <p className="text-slate-400">

                        Worst Stock

                    </p>

                    <h2 className="text-2xl font-bold text-red-400 mt-2">

                        {data.worst_stock}

                    </h2>

                </div>

                <div className="bg-slate-800 rounded-xl p-5">

                    <p className="text-slate-400">

                        Diversification

                    </p>

                    <h2 className="text-2xl font-bold text-cyan-400 mt-2">

                        {data.diversification}

                    </h2>

                </div>

            </div>

            {/* AI Metrics */}

            <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">

                <div className="bg-slate-800 rounded-xl p-5">

                    <p className="text-slate-400">

                        Market Trend

                    </p>

                    <h2 className="text-xl font-bold text-green-400 mt-2">

                        {data.market_trend}

                    </h2>

                </div>

                <div className="bg-slate-800 rounded-xl p-5">

                    <p className="text-slate-400">

                        Buy Score

                    </p>

                    <h2 className="text-xl font-bold text-cyan-400 mt-2">

                        {data.buy_score}%

                    </h2>

                </div>

                <div className="bg-slate-800 rounded-xl p-5">

                    <p className="text-slate-400">

                        AI Confidence

                    </p>

                    <h2 className="text-xl font-bold text-yellow-400 mt-2">

                        {data.confidence}%

                    </h2>

                </div>

                <div className="bg-slate-800 rounded-xl p-5">

                    <p className="text-slate-400">

                        Next Week

                    </p>

                    <h2 className="text-xl font-bold text-pink-400 mt-2">

                        {data.next_week}

                    </h2>

                </div>

            </div>

            {/* Expected Growth */}

            <div className="bg-slate-800 rounded-xl p-6 mt-8">

                <p className="text-slate-400">

                    Expected Portfolio Growth

                </p>

                <h1 className="text-4xl font-bold text-green-400 mt-2">

                    +{data.expected_growth}%

                </h1>

            </div>

            {/* Suggestions */}

            <div className="mt-8">

                <h3 className="text-xl font-bold mb-4">

                    💡 AI Suggestions

                </h3>

                <div className="space-y-3">

                    {

                        data.suggestions.map((item, index) => (

                            <div

                                key={index}

                                className="bg-slate-800 rounded-lg p-4"

                            >

                                ✅ {item}

                            </div>

                        ))

                    }

                </div>

            </div>

        </div>

    );

}