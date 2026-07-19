function IndicatorsCard({ data }) {
  if (!data) return null;

  const indicators = [
    ["RSI", data.rsi],
    ["SMA20", data.sma20],
    ["SMA50", data.sma50],
    ["EMA20", data.ema20],
    ["MACD", data.macd],
    ["Signal", data.macd_signal],
    ["BB Upper", data.bb_upper],
    ["BB Lower", data.bb_lower],
  ];

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
      <h2 className="text-xl font-bold mb-6">
        Technical Indicators
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {indicators.map(([label, value]) => (
          <div
            key={label}
            className="bg-slate-800 rounded-lg p-4"
          >
            <p className="text-slate-400 text-sm">{label}</p>
            <p className="text-lg font-bold">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IndicatorsCard;