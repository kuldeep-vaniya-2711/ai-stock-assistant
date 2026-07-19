import { useEffect, useState } from "react";
import { createAlert, getAlerts, deleteAlert } from "../services/priceAlert";
import { getCurrentUser } from "../utils/auth";

function PriceAlertCard() {
  const user = getCurrentUser();
  const email = user?.email;

  const [symbol, setSymbol] = useState("");
  const [targetPrice, setTargetPrice] = useState("");
  const [condition, setCondition] = useState("ABOVE");
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const loadAlerts = async () => {
    if (!email) return;

    try {
      const data = await getAlerts(email);
      setAlerts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!email) return;

    const fetchAlerts = async () => {
      try {
        const data = await getAlerts(email);
        setAlerts(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAlerts();
  }, [email]);

  const handleCreateAlert = async () => {
    if (!symbol.trim()) {
      alert("Please enter a stock symbol.");
      return;
    }

    if (!targetPrice) {
      alert("Please enter target price.");
      return;
    }

    try {
      setLoading(true);
      const response = await createAlert(
        email,
        symbol.trim().toUpperCase(),
        Number(targetPrice),
        condition
      );

      if (!response.success) {
        alert(response.message);
        return;
      }

      alert("✅ Price Alert Created");
      setSymbol("");
      setTargetPrice("");
      setCondition("ABOVE");
      await loadAlerts();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Unable to create alert.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (item) => {
    try {
      await deleteAlert(email, item.symbol, item.target_price);
      await loadAlerts();
    } catch (err) {
      console.error(err);
      alert("Unable to delete alert.");
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-cyan-400">
            🔔 Smart Price Alerts
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Get notified automatically when your stock reaches your target price.
          </p>
        </div>
        <button
          onClick={() => setShowHelp((prev) => !prev)}
          className="text-cyan-400 text-sm hover:text-cyan-300"
        >
          {showHelp ? "Hide Help ▲" : "How it Works ▼"}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block mb-2 font-semibold">Stock Symbol</label>
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            placeholder="Example : TCS.NS"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 focus:border-cyan-400 outline-none"
          />
          <p className="text-xs text-slate-400 mt-2">
            Example: TCS.NS, RELIANCE.NS, INFY.NS
          </p>
        </div>

        <div>
          <label className="block mb-2 font-semibold">Target Price (₹)</label>
          <input
            type="number"
            value={targetPrice}
            onChange={(e) => setTargetPrice(e.target.value)}
            placeholder="Example : 2500"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 focus:border-cyan-400 outline-none"
          />
          <p className="text-xs text-slate-400 mt-2">
            You'll receive an alert when this price is reached.
          </p>
        </div>

        <div>
          <label className="block mb-2 font-semibold">Alert Type</label>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3"
          >
            <option value="ABOVE">📈 Above Target Price</option>
            <option value="BELOW">📉 Below Target Price</option>
          </select>
          <p className="text-xs text-slate-400 mt-2">
            Above = notify when price goes up.
            <br />
            Below = notify when price goes down.
          </p>
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={handleCreateAlert}
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-700 py-3 rounded-lg font-bold transition"
          >
            {loading ? "Creating..." : "➕ Create Alert"}
          </button>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-cyan-400">📋 Active Alerts</h3>
          <span className="bg-slate-800 px-3 py-1 rounded-full text-sm">
            {alerts.length} Alert{alerts.length !== 1 ? "s" : ""}
          </span>
        </div>

        {alerts.length === 0 ? (
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 text-center">
            <div className="text-5xl mb-3">🔔</div>
            <h4 className="text-lg font-bold">No Active Alerts</h4>
            <p className="text-slate-400 mt-2">
              Create your first price alert above.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {alerts.map((item, index) => (
              <div
                key={index}
                className="bg-slate-800 border border-slate-700 rounded-xl p-5 flex justify-between items-center flex-wrap gap-4"
              >
                <div>
                  <h4 className="text-xl font-bold">{item.symbol}</h4>
                  <p className="mt-2">
                    🎯 Target :
                    <span className="text-yellow-400 font-bold">
                      {" "}₹{item.target_price}
                    </span>
                  </p>
                  <p
                    className={`mt-2 font-semibold ${
                      item.condition === "ABOVE"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {item.condition === "ABOVE"
                      ? "📈 Notify Above Target"
                      : "📉 Notify Below Target"}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(item)}
                  className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-lg font-bold"
                >
                  ❌ Delete
                </button>
              </div>
            ))}
          </div>
        )}

        {showHelp && (
          <div className="mt-8 bg-slate-800 border border-slate-700 rounded-xl p-5">
            <h3 className="text-lg font-bold text-cyan-400 mb-4">
              💡 How Smart Price Alerts Work
            </h3>
            <div className="space-y-3 text-slate-300 text-sm">
              <div>
                <span className="font-bold text-white">1.</span> Enter a valid NSE stock symbol like <b>TCS.NS</b>, <b>RELIANCE.NS</b>, <b>INFY.NS</b>.
              </div>
              <div>
                <span className="font-bold text-white">2.</span> Enter the price at which you want to receive a notification.
              </div>
              <div>
                <span className="font-bold text-white">3.</span> Select the alert type.
              </div>
              <div className="ml-5">
                <p>
                  📈 <b>Above</b> → Alert when market price becomes greater than or equal to your target.
                </p>
                <p className="mt-2">
                  📉 <b>Below</b> → Alert when market price becomes less than or equal to your target.
                </p>
              </div>
              <div>
                <span className="font-bold text-white">Example:</span>
              </div>
              <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                <p>
                  Current Price = <span className="text-yellow-400">₹2200</span>
                </p>
                <p className="mt-2">
                  Target = <span className="text-green-400">₹2250</span>
                  <span className="text-green-400"> Above</span>
                </p>
                <p className="text-slate-400 mt-1">
                  You'll receive an alert when price reaches ₹2250 or higher.
                </p>
              </div>
              <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                <h4 className="font-bold mb-2">📲 Notification Status</h4>
                <div className="space-y-1">
                  <p>✅ Telegram : Ready</p>
                  <p>📧 Email : Coming Soon</p>
                  <p>💬 WhatsApp : Coming Soon</p>
                  <p>📱 SMS : Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PriceAlertCard;
