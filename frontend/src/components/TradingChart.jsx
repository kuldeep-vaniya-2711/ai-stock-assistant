import { useEffect, useRef } from "react";

function TradingChart({ symbol }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!symbol || !containerRef.current) return;

    const container = containerRef.current;

    // Remove previous TradingView widget
    container.innerHTML = "";

    // Convert Yahoo Finance symbol to TradingView symbol
    const cleanSymbol = symbol.trim().toUpperCase();

    const tradingViewSymbol = cleanSymbol.includes(":")
      ? cleanSymbol
      : `NSE:${cleanSymbol.replace(".NS", "")}`;

    const script = document.createElement("script");

    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";

    script.type = "text/javascript";
    script.async = true;

    script.innerHTML = JSON.stringify({
      autosize: true,

      width: "100%",
      height: "100%",

      symbol: tradingViewSymbol,

      interval: "D",

      timezone: "Asia/Kolkata",

      theme: "dark",

      style: "1",

      locale: "en",

      allow_symbol_change: true,

      hide_top_toolbar: false,

      hide_side_toolbar: false,

      hide_legend: false,

      hide_volume: false,

      save_image: false,

      calendar: false,

      support_host: "https://www.tradingview.com",
    });

    container.appendChild(script);

    // Cleanup when symbol/component changes
    return () => {
      container.innerHTML = "";
    };
  }, [symbol]);

  if (!symbol) {
    return null;
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-6 shadow-lg">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">

        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            📈 Live Chart
          </h2>

          <p className="text-slate-400 text-sm mt-1">
            TradingView market chart
          </p>
        </div>

        <span className="text-cyan-400 font-semibold">
          {symbol}
        </span>

      </div>

      <div
        className="tradingview-widget-container w-full"
        style={{
          height: "500px",
          width: "100%",
        }}
      >
        <div
          ref={containerRef}
          className="tradingview-widget-container__widget"
          style={{
            height: "100%",
            width: "100%",
          }}
        />
      </div>

    </div>
  );
}

export default TradingChart;