function StockCard({ data }) {
  if (!data) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">

      <h2 className="text-2xl font-bold">
        {data.symbol}
      </h2>

      <p className="text-4xl font-bold text-cyan-400 mt-3">
        ₹ {data.price}
      </p>

      <div className="grid grid-cols-2 gap-4 mt-8">

        <div className="bg-slate-800 rounded-lg p-4">
          <p className="text-slate-400">RSI</p>
          <h3 className="text-xl font-bold">{data.rsi}</h3>
        </div>

        <div className="bg-slate-800 rounded-lg p-4">
          <p className="text-slate-400">SMA20</p>
          <h3 className="text-xl font-bold">{data.sma20}</h3>
        </div>

        <div className="bg-slate-800 rounded-lg p-4">
          <p className="text-slate-400">EMA20</p>
          <h3 className="text-xl font-bold">{data.ema20}</h3>
        </div>

        <div className="bg-slate-800 rounded-lg p-4">
          <p className="text-slate-400">MACD</p>
          <h3 className="text-xl font-bold">{data.macd}</h3>
        </div>

      </div>

    </div>
  );
}

export default StockCard;