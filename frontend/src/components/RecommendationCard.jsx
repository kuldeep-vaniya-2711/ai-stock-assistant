import {
  FaArrowUp,
  FaArrowDown,
  FaMinusCircle,
  FaCheckCircle,
  FaBrain,
} from "react-icons/fa";

function RecommendationCard({ data }) {
  if (!data) return null;

  const badgeColor = {
    BUY: "bg-green-500",
    HOLD: "bg-yellow-500",
    SELL: "bg-red-500",
  };

  const trendColor = {
    Bullish: "text-green-400",
    Bearish: "text-red-400",
    Sideways: "text-yellow-400",
  };

  const trendIcon = {
    Bullish: <FaArrowUp />,
    Bearish: <FaArrowDown />,
    Sideways: <FaMinusCircle />,
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-xl p-6">

      <div className="flex justify-between items-center">

        <h2 className="text-2xl font-bold flex items-center gap-2">

          <FaBrain className="text-cyan-400" />

          AI Recommendation

        </h2>

        <span
          className={`px-4 py-2 rounded-full text-white font-bold ${
            badgeColor[data.recommendation] || "bg-gray-600"
          }`}
        >
          {data.recommendation}
        </span>

      </div>

      {/* Confidence */}

      <div className="mt-8">

        <div className="flex justify-between mb-2">

          <span className="text-slate-400">

            Confidence

          </span>

          <span className="font-bold">

            {data.confidence}%

          </span>

        </div>

        <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">

          <div
            className="bg-cyan-400 h-full rounded-full transition-all duration-700"
            style={{
              width: `${data.confidence}%`,
            }}
          />

        </div>

      </div>

      {/* Trend */}

      <div className="mt-8 flex items-center gap-3">

        <span className="text-slate-400">

          Market Trend

        </span>

        <span
          className={`flex items-center gap-2 font-bold ${trendColor[data.trend]}`}
        >

          {trendIcon[data.trend]}

          {data.trend}

        </span>

      </div>

      {/* Reasons */}

      <div className="mt-8">

        <h3 className="font-bold text-lg mb-4">

          Why AI Selected This?

        </h3>

        <div className="space-y-3">

          {data.reasons.map((reason, index) => (

            <div
              key={index}
              className="flex gap-3 items-start bg-slate-800 rounded-lg p-3"
            >

              <FaCheckCircle className="text-green-400 mt-1" />

              <span>{reason}</span>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default RecommendationCard;