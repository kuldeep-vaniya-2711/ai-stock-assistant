import {
  FaArrowUp,
  FaArrowDown,
  FaMinusCircle,
  FaCheckCircle,
  FaBrain,
} from "react-icons/fa";

function RecommendationCard({ data }) {
  if (!data) {
    return null;
  }

  const recommendation = (
    data.recommendation || "HOLD"
  ).toUpperCase();

  const confidence = Math.max(
    0,
    Math.min(
      100,
      Number(data.confidence ?? 0)
    )
  );

  // Backend me market_trend hai.
  // Old frontend compatibility ke liye trend bhi support kar rahe hain.
  const trend =
    data.market_trend ||
    data.trend ||
    "Neutral";

  const reasons = Array.isArray(data.reasons)
    ? data.reasons
    : Array.isArray(data.suggestions)
      ? data.suggestions
      : [];

  const badgeColor = {
    BUY: "bg-green-500",
    HOLD: "bg-yellow-500",
    SELL: "bg-red-500",
  };

  const trendColor = {
    Bullish: "text-green-400",
    Bearish: "text-red-400",
    Sideways: "text-yellow-400",
    Neutral: "text-slate-400",
  };

  const trendIcon = {
    Bullish: <FaArrowUp />,
    Bearish: <FaArrowDown />,
    Sideways: <FaMinusCircle />,
    Neutral: <FaMinusCircle />,
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-xl p-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

        <h2 className="text-2xl font-bold flex items-center gap-2">

          <FaBrain className="text-cyan-400" />

          AI Recommendation

        </h2>

        <span
          className={`px-4 py-2 rounded-full text-white font-bold ${
            badgeColor[recommendation] ||
            "bg-gray-600"
          }`}
        >
          {recommendation}
        </span>

      </div>


      {/* Confidence */}
      <div className="mt-8">

        <div className="flex justify-between mb-2">

          <span className="text-slate-400">
            Confidence
          </span>

          <span className="font-bold">
            {confidence}%
          </span>

        </div>

        <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">

          <div
            className="bg-cyan-400 h-full rounded-full transition-all duration-700"
            style={{
              width: `${confidence}%`,
            }}
          />

        </div>

      </div>


      {/* Market Trend */}
      <div className="mt-8 flex items-center gap-3">

        <span className="text-slate-400">
          Market Trend
        </span>

        <span
          className={`flex items-center gap-2 font-bold ${
            trendColor[trend] ||
            "text-slate-400"
          }`}
        >

          {trendIcon[trend] || <FaMinusCircle />}

          {trend}

        </span>

      </div>


      {/* Best / Worst Stock */}
      {(data.best_stock || data.worst_stock) && (
        <div className="grid sm:grid-cols-2 gap-4 mt-8">

          <div className="bg-slate-800 rounded-xl p-4">

            <p className="text-slate-400 text-sm">
              Best Stock
            </p>

            <h3 className="text-lg font-bold text-green-400 mt-1">
              {data.best_stock || "-"}
            </h3>

          </div>


          <div className="bg-slate-800 rounded-xl p-4">

            <p className="text-slate-400 text-sm">
              Worst Stock
            </p>

            <h3 className="text-lg font-bold text-red-400 mt-1">
              {data.worst_stock || "-"}
            </h3>

          </div>

        </div>
      )}


      {/* Reasons / Suggestions */}
      <div className="mt-8">

        <h3 className="font-bold text-lg mb-4">
          Why AI Selected This?
        </h3>


        {reasons.length === 0 ? (

          <div className="bg-slate-800 rounded-lg p-4 text-slate-400">
            No additional recommendations available.
          </div>

        ) : (

          <div className="space-y-3">

            {reasons.map((reason, index) => (

              <div
                key={index}
                className="flex gap-3 items-start bg-slate-800 rounded-lg p-3"
              >

                <FaCheckCircle className="text-green-400 mt-1 shrink-0" />

                <span className="text-slate-300">
                  {reason}
                </span>

              </div>

            ))}

          </div>

        )}

      </div>


      {/* Expected Growth */}
      {data.expected_growth !== undefined && (
        <div className="mt-8 bg-slate-800 rounded-xl p-4">

          <div className="flex justify-between">

            <span className="text-slate-400">
              Expected Growth
            </span>

            <span className="font-bold text-cyan-400">
              {data.expected_growth}%
            </span>

          </div>

        </div>
      )}

    </div>
  );
}

export default RecommendationCard;