import { useEffect, useState } from "react";

import {
  getTopGainers,
  getTopLosers,
  getTrendingStocks,
  getMostActiveStocks,
} from "../services/marketOverview";

function MarketCard({

  title,

  color,

  data,

  loading,

}) {

  return (

    <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-5 shadow-lg">

      <h2 className={`text-xl font-bold mb-5 ${color}`}>

        {title}

      </h2>

      {

        loading ? (

          <p className="text-slate-400">

            Loading...

          </p>

        ) : data.length === 0 ? (

          <p className="text-slate-500">

            No Data Available

          </p>

        ) : (

          <div className="space-y-3">

            {

              data.map((item, index) => (

                <div

                  key={index}

                  className="flex justify-between items-center bg-slate-800 rounded-xl px-4 py-3 hover:bg-slate-700 transition"

                >

                  <div>

                    <h3 className="font-bold">

                      {item.symbol}

                    </h3>

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

              ))

            }

          </div>

        )

      }

    </div>

  );

}

export default function MarketOverview() {

  const [gainers, setGainers] = useState([]);

  const [losers, setLosers] = useState([]);

  const [trending, setTrending] = useState([]);

  const [active, setActive] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function load() {

      try {

        const [

          g,

          l,

          t,

          a,

        ] = await Promise.all([

          getTopGainers(),

          getTopLosers(),

          getTrendingStocks(),

          getMostActiveStocks(),

        ]);

        setGainers(g);

        setLosers(l);

        setTrending(t);

        setActive(a);

      }

      catch (err) {

        console.log(err);

      }

      finally {

        setLoading(false);

      }

    }

    load();

  }, []);

  return (

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      <MarketCard

        title="🚀 Top Gainers"

        color="text-green-400"

        data={gainers}

        loading={loading}

      />

      <MarketCard

        title="📉 Top Losers"

        color="text-red-400"

        data={losers}

        loading={loading}

      />

      <MarketCard

        title="🔥 Trending Stocks"

        color="text-orange-400"

        data={trending}

        loading={loading}

      />

      <MarketCard

        title="⭐ Most Active"

        color="text-yellow-400"

        data={active}

        loading={loading}

      />

    </div>

  );

}