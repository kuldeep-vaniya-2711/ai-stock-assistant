import { useEffect, useState } from "react";
import api from "../services/api";
import { getCurrentUser } from "../utils/auth";

function AIPortfolioAssistant() {

  const [analytics, setAnalytics] = useState(null);

  const user = getCurrentUser();

  const email = user?.email;

  useEffect(() => {

    if (email) {

      loadAnalytics();

    }

  }, [email]);

  const loadAnalytics = async () => {

    try {

      const res = await api.get(`/analytics/${email}`);

      setAnalytics(res.data);

    }

    catch (err) {

      console.log(err);

    }

  };

  if (!analytics)

    return null;

  const score = Math.min(

    100,

    Math.round(

      analytics.diversification * 0.6 +

      (analytics.risk === "Low"

        ? 40

        : analytics.risk === "Medium"

        ? 25

        : 10)

    )

  );

  return (

    <div className="bg-slate-900 rounded-xl p-6">

      <div className="flex justify-between items-center">

        <h2 className="text-2xl font-bold">

          🤖 AI Portfolio Assistant

        </h2>

        <span className="bg-green-600 px-3 py-1 rounded-full text-sm">

          AI ACTIVE

        </span>

      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-8">

        <div>

          <p className="text-slate-400">

            Portfolio Score

          </p>

          <h1 className="text-6xl font-bold text-cyan-400 mt-3">

            {score}

          </h1>

          <div className="w-full bg-slate-700 h-3 rounded-full mt-6">

            <div

              className="bg-cyan-400 h-3 rounded-full"

              style={{

                width: `${score}%`

              }}

            />

          </div>

        </div>

        <div className="space-y-5">

          <div>

            <p className="text-slate-400">

              Risk

            </p>

            <h2 className="text-2xl font-bold text-yellow-400">

              {analytics.risk}

            </h2>

          </div>

          <div>

            <p className="text-slate-400">

              Diversification

            </p>

            <h2 className="text-2xl font-bold text-green-400">

              {analytics.diversification}%

            </h2>

          </div>

          <div>

            <p className="text-slate-400">

              Confidence

            </p>

            <h2 className="text-2xl font-bold text-cyan-400">

              {Math.min(score + 5, 99)}%

            </h2>

          </div>

        </div>

      </div>

      <div className="mt-8">

        <h2 className="text-xl font-bold mb-3">

          AI Suggestion

        </h2>

        <div className="bg-slate-800 rounded-lg p-5">

          <p className="leading-8 text-slate-300">

            {analytics.recommendation}

          </p>

        </div>

      </div>

    </div>

  );

}

export default AIPortfolioAssistant;