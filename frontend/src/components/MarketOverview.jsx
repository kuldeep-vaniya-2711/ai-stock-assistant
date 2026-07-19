import { useEffect, useState } from "react";

import {
  getTopGainers,
  getTopLosers,
  getTrendingStocks,
  getMostActiveStocks,
} from "../services/marketOverview";

function MarketOverview() {

  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);
  const [trending, setTrending] = useState([]);
  const [active, setActive] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    let isMounted = true;

    const loadMarketData = async () => {
      try {
        setLoading(true);

        const [
          gainersData,
          losersData,
          trendingData,
          activeData,
        ] = await Promise.all([
          getTopGainers(),
          getTopLosers(),
          getTrendingStocks(),
          getMostActiveStocks(),
        ]);

        if (!isMounted) return;

        setGainers(gainersData);
        setLosers(losersData);
        setTrending(trendingData);
        setActive(activeData);
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadMarketData();

    return () => {
      isMounted = false;
    };

  }, []);

  const renderList = (list, color) => {

    if (loading) {

      return (
        <p className="text-slate-400">
          Loading...
        </p>
      );

    }

    if (!list || list.length === 0) {

      return (
        <p className="text-slate-400">
          No Data Available
        </p>
      );

    }

    return list.map((item, index) => (

      <div
        key={index}
        className="flex justify-between items-center py-2 border-b border-slate-700 last:border-none"
      >

        <div>

          <p className="font-semibold">
            {item.symbol}
          </p>

          <p className="text-xs text-slate-400">
            ₹{item.price}
          </p>

        </div>

        <span
          className={`font-bold ${color}`}
        >
          {item.change > 0 ? "+" : ""}
          {item.change}%
        </span>

      </div>

    ));

  };

  return (

    <div className="grid md:grid-cols-2 gap-6">

      <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">

        <h2 className="text-xl font-bold text-green-400 mb-4">
          📈 Top Gainers
        </h2>

        {renderList(
          gainers,
          "text-green-400"
        )}

      </div>

      <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">

        <h2 className="text-xl font-bold text-red-400 mb-4">
          📉 Top Losers
        </h2>

        {renderList(
          losers,
          "text-red-400"
        )}

      </div>

      <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">

        <h2 className="text-xl font-bold text-orange-400 mb-4">
          🔥 Trending Stocks
        </h2>

        {renderList(
          trending,
          "text-orange-400"
        )}

      </div>

      <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">

        <h2 className="text-xl font-bold text-yellow-400 mb-4">
          ⭐ Most Active Stocks
        </h2>

        {renderList(
          active,
          "text-yellow-400"
        )}

      </div>

    </div>

  );

}

export default MarketOverview;