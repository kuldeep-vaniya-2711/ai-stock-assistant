function StockCard({ data }) {
  if (!data) return null;

  const formatValue = (value) => {
    if (value === null || value === undefined || value === "") {
      return "-";
    }

    const number = Number(value);

    if (!Number.isFinite(number)) {
      return "-";
    }

    return number.toFixed(2);
  };

  const formatPrice = (value) => {
    if (value === null || value === undefined || value === "") {
      return "-";
    }

    const number = Number(value);

    if (!Number.isFinite(number)) {
      return "-";
    }

    return number.toFixed(2);
  };

  const indicators = [
    {
      label: "RSI",
      value: data.rsi,
      color: "text-cyan-400",
    },
    {
      label: "SMA20",
      value: data.sma20,
      color: "text-blue-400",
    },
    {
      label: "EMA20",
      value: data.ema20,
      color: "text-purple-400",
    },
    {
      label: "MACD",
      value: data.macd,
      color: "text-yellow-400",
    },
  ];

  const recommendation = data.recommendation;

  const recommendationStyle = {
    BUY: "bg-green-500/20 text-green-400 border-green-500/30",
    HOLD: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    SELL: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-6 shadow-lg">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            {data.symbol || "-"}
          </h2>

          <p className="text-slate-400 text-sm mt-1">
            Stock Analysis
          </p>
        </div>

        {recommendation && (
          <span
            className={`
              px-4
              py-2
              rounded-full
              border
              font-bold
              text-sm
              w-fit
              ${
                recommendationStyle[recommendation] ||
                "bg-slate-800 text-slate-300 border-slate-700"
              }
            `}
          >
            {recommendation}
          </span>
        )}

      </div>

      {/* Price */}
      <div className="mt-5">

        <p className="text-slate-400 text-sm">
          Current Price
        </p>

        <p className="text-3xl sm:text-4xl font-bold text-cyan-400 mt-1">
          ₹{formatPrice(data.price)}
        </p>

      </div>

      {/* Indicators */}
      <div className="grid grid-cols-2 gap-4 mt-8">

        {indicators.map((indicator) => (

          <div
            key={indicator.label}
            className="bg-slate-800 rounded-xl p-4 border border-slate-700 hover:border-cyan-500/40 transition"
          >

            <p className="text-slate-400 text-sm">
              {indicator.label}
            </p>

            <h3
              className={`text-xl font-bold mt-1 ${indicator.color}`}
            >
              {formatValue(indicator.value)}
            </h3>

          </div>

        ))}

      </div>

    </div>
  );
}

export default StockCard;