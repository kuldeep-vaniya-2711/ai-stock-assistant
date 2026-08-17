import { useEffect, useState } from "react";
import api from "../services/api";
import { getCurrentUser } from "../utils/auth";

export default function AIRecommendationCard() {

  const [data, setData] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchRecommendation() {
      try {
        const email = getCurrentUser()?.email;
        if (!email) return;
        const res = await api.get(`/ai/recommendation/${email}`);
        if (isMounted) {
          setData(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchRecommendation();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!data) {

    return (

      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 text-center">

        Loading AI Recommendation...

      </div>

    );

  }

  const colors = {

    success: "border-green-500",

    warning: "border-yellow-500",

    danger: "border-red-500",

    info: "border-cyan-500",

  };

  return (

    <div

      className={`bg-slate-900 border-2 ${colors[data.status]} rounded-2xl p-4 sm:p-6 shadow-lg`}

    >

      <h2 className="text-xl sm:text-2xl font-bold mb-6">

        🤖 AI Portfolio Advisor

      </h2>

      {/* Summary */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">

        <div className="bg-slate-800 rounded-xl p-5">

          <p className="text-slate-400 text-sm">

            Portfolio Score

          </p>

          <h1 className="text-3xl sm:text-4xl font-bold text-cyan-400 mt-2">

            {data.score}/100

          </h1>

        </div>

        <div className="bg-slate-800 rounded-xl p-5">

          <p className="text-slate-400 text-sm">

            Status

          </p>

          <h2 className="text-xl font-bold mt-2 break-words">

            {data.title}

          </h2>

        </div>

        <div className="bg-slate-800 rounded-xl p-5">

          <p className="text-slate-400 text-sm">

            Total Profit

          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-green-400 mt-2">

            ₹ {data.profit}

          </h2>

        </div>

        <div className="bg-slate-800 rounded-xl p-5">

          <p className="text-slate-400 text-sm">

            Risk

          </p>

          <h2 className="text-xl font-bold text-yellow-400 mt-2">

            {data.risk}

          </h2>

        </div>

      </div>

      {/* Portfolio */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-8">

        <div className="bg-slate-800 rounded-xl p-5">

          <p className="text-slate-400 text-sm">

            Best Stock

          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-green-400 mt-2 break-words">

            {data.best_stock}

          </h2>

        </div>

        <div className="bg-slate-800 rounded-xl p-5">

          <p className="text-slate-400 text-sm">

            Worst Stock

          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-red-400 mt-2 break-words">

            {data.worst_stock}

          </h2>

        </div>

        <div className="bg-slate-800 rounded-xl p-5">

          <p className="text-slate-400 text-sm">

            Diversification

          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-cyan-400 mt-2">

            {data.diversification}

          </h2>

        </div>

      </div>

      {/* AI Metrics */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mt-8">

        <div className="bg-slate-800 rounded-xl p-5">

          <p className="text-slate-400 text-sm">

            Market Trend

          </p>

          <h2 className="text-xl font-bold text-green-400 mt-2">

            {data.market_trend}

          </h2>

        </div>

        <div className="bg-slate-800 rounded-xl p-5">

          <p className="text-slate-400 text-sm">

            Buy Score

          </p>

          <h2 className="text-xl font-bold text-cyan-400 mt-2">

            {data.buy_score}%

          </h2>

        </div>

        <div className="bg-slate-800 rounded-xl p-5">

          <p className="text-slate-400 text-sm">

            AI Confidence

          </p>

          <h2 className="text-xl font-bold text-yellow-400 mt-2">

            {data.confidence}%

          </h2>

        </div>

        <div className="bg-slate-800 rounded-xl p-5">

          <p className="text-slate-400 text-sm">

            Next Week

          </p>

          <h2 className="text-xl font-bold text-pink-400 mt-2 break-words">

            {data.next_week}

          </h2>

        </div>

      </div>

      {/* Growth */}

      <div className="bg-slate-800 rounded-xl p-5 sm:p-6 mt-8">

        <p className="text-slate-400 text-sm">

          Expected Portfolio Growth

        </p>

        <h1 className="text-3xl sm:text-4xl font-bold text-green-400 mt-2">

          +{data.expected_growth}%

        </h1>

      </div>

      {/* Suggestions */}

      <div className="mt-8">

        <h3 className="text-lg sm:text-xl font-bold mb-4">

          💡 AI Suggestions

        </h3>

        <div className="space-y-3">

          {data.suggestions?.map((item, index) => (

            <div

              key={index}

              className="bg-slate-800 rounded-lg p-4 text-sm sm:text-base break-words"

            >

              ✅ {item}

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}