function IndicatorsCard({ data }) {
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
      label: "SMA50",
      value: data.sma50,
      color: "text-purple-400",
    },
    {
      label: "EMA20",
      value: data.ema20,
      color: "text-indigo-400",
    },
    {
      label: "MACD",
      value: data.macd,
      color: "text-yellow-400",
    },
    {
      label: "Signal",
      value: data.macd_signal,
      color: "text-orange-400",
    },
    {
      label: "BB Upper",
      value: data.bb_upper,
      color: "text-green-400",
    },
    {
      label: "BB Lower",
      value: data.bb_lower,
      color: "text-red-400",
    },
  ];

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 sm:p-6 shadow-lg">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">

        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Technical Indicators
          </h2>

          <p className="text-slate-400 text-sm mt-1">
            Key technical analysis values
          </p>
        </div>

        {data.symbol && (
          <span className="text-cyan-400 font-semibold">
            {data.symbol}
          </span>
        )}

      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {indicators.map((indicator) => (

          <div
            key={indicator.label}
            className="bg-slate-800 rounded-xl p-4 border border-slate-700 hover:border-cyan-500/50 transition"
          >

            <p className="text-slate-400 text-sm mb-2">
              {indicator.label}
            </p>

            <p
              className={`text-lg sm:text-xl font-bold ${indicator.color}`}
            >
              {formatValue(indicator.value)}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default IndicatorsCard;