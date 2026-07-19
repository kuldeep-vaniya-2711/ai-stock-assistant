import { useEffect } from "react";

function TradingChart({ symbol }) {
  useEffect(() => {
    if (!symbol) return;

    const container = document.getElementById("tradingview_chart");
    container.innerHTML = "";

    const script = document.createElement("script");

    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;

    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: symbol.replace(".NS", "").includes(":")
        ? symbol
        : `NSE:${symbol.replace(".NS", "")}`,
      interval: "D",
      timezone: "Asia/Kolkata",
      theme: "dark",
      style: "1",
      locale: "en",
      allow_symbol_change: true,
      hide_top_toolbar: false,
      save_image: false,
    });

    container.appendChild(script);
  }, [symbol]);

  if (!symbol) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4">
        Live Chart
      </h2>

      <div
        className="tradingview-widget-container"
        style={{ height: "500px" }}
      >
        <div
          id="tradingview_chart"
          style={{ height: "100%" }}
        ></div>
      </div>
    </div>
  );
}

export default TradingChart;