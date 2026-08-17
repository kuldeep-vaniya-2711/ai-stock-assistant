import { useEffect, useState } from "react";
import api from "../services/api";

export default function TopMoversCard() {

  const [gainers, setGainers] = useState([]);

  const [losers, setLosers] = useState([]);

  async function load() {
    try {
      const [gainersRes, losersRes] = await Promise.all([
        api.get("/market/top-gainers"),
        api.get("/market/top-losers"),
      ]);

      setGainers(gainersRes.data);
      setLosers(losersRes.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await load();
    };
    fetchData();
  }, []);

  return (

    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-6 shadow-lg">

      <h2 className="text-xl sm:text-2xl font-bold mb-6">

        📈 Top Movers

      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Top Gainers */}

        <div>

          <h3 className="text-lg font-bold text-green-400 mb-4">

            🚀 Top Gainers

          </h3>

          <div className="space-y-3">

            {gainers.length === 0 ? (

              <p className="text-slate-500">

                No Data

              </p>

            ) : (

              gainers.map((stock) => (

                <div

                  key={stock.symbol}

                  className="flex items-center justify-between bg-slate-800 rounded-xl p-3 hover:bg-slate-700 transition"

                >

                  <span className="font-medium">

                    {stock.symbol}

                  </span>

                  <span className="font-bold text-green-400 whitespace-nowrap">

                    +{stock.change}%

                  </span>

                </div>

              ))

            )}

          </div>

        </div>

        {/* Top Losers */}

        <div>

          <h3 className="text-lg font-bold text-red-400 mb-4">

            📉 Top Losers

          </h3>

          <div className="space-y-3">

            {losers.length === 0 ? (

              <p className="text-slate-500">

                No Data

              </p>

            ) : (

              losers.map((stock) => (

                <div

                  key={stock.symbol}

                  className="flex items-center justify-between bg-slate-800 rounded-xl p-3 hover:bg-slate-700 transition"

                >

                  <span className="font-medium">

                    {stock.symbol}

                  </span>

                  <span className="font-bold text-red-400 whitespace-nowrap">

                    {stock.change}%

                  </span>

                </div>

              ))

            )}

          </div>

        </div>

      </div>

    </div>

  );

}