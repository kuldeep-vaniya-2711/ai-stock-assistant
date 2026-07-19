import { useEffect, useState } from "react";
import api from "../services/api";
import { getCurrentUser } from "../utils/auth";

function AIInsights() {

  const [insights, setInsights] = useState(null);

  const user = getCurrentUser();

  const email = user?.email;

  useEffect(() => {

    if (!email) return;

    loadInsights();

  }, [email]);

  const loadInsights = async () => {

    try {

      const res = await api.get(`/analytics/${email}`);

      setInsights(res.data);

    }

    catch (err) {

      console.log(err);

    }

  };

  if (!insights) {

    return (

      <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">

        Loading AI Insights...

      </div>

    );

  }

  return (

    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">

      <h2 className="text-2xl font-bold mb-6">

        🤖 AI Portfolio Insights

      </h2>

      <div className="space-y-5">

        <div className="flex justify-between">

          <span className="text-slate-400">

            Best Performing Stock

          </span>

          <span className="font-bold text-green-400">

            {insights.best_stock}

          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-slate-400">

            Worst Performing Stock

          </span>

          <span className="font-bold text-red-400">

            {insights.worst_stock}

          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-slate-400">

            Portfolio Return

          </span>

          <span className="font-bold text-cyan-400">

            ₹ {insights.portfolio_return}

          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-slate-400">

            Diversification

          </span>

          <span className="font-bold">

            {insights.diversification}%

          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-slate-400">

            Risk Level

          </span>

          <span
            className={`font-bold ${
              insights.risk === "High"
                ? "text-red-400"
                : insights.risk === "Medium"
                ? "text-yellow-400"
                : "text-green-400"
            }`}
          >

            {insights.risk}

          </span>

        </div>

        <div className="pt-5 border-t border-slate-700">

          <h3 className="font-bold mb-2">

            AI Recommendation

          </h3>

          <p className="text-slate-300">

            {insights.recommendation}

          </p>

        </div>

      </div>

    </div>

  );

}

export default AIInsights;