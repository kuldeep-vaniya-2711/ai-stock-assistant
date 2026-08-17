import { useEffect, useState } from "react";
import api from "../services/api";

function StockTable({ title, data }) {

  return (

    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-5 shadow-lg">

      <h2 className="text-lg sm:text-xl font-bold mb-5">

        {title}

      </h2>

      <div className="overflow-x-auto">

        <table className="w-full min-w-[320px]">

          <thead>

            <tr className="text-slate-400 border-b border-slate-700">

              <th className="text-left py-3 text-sm">

                Stock

              </th>

              <th className="text-right py-3 text-sm">

                Price

              </th>

              <th className="text-right py-3 text-sm">

                %

              </th>

            </tr>

          </thead>

          <tbody>

            {

              data.length === 0 ? (

                <tr>

                  <td

                    colSpan={3}

                    className="text-center py-8 text-slate-500"

                  >

                    No Data

                  </td>

                </tr>

              ) : (

                data.map((stock, index) => (

                  <tr

                    key={index}

                    className="border-b border-slate-800 hover:bg-slate-800 transition"

                  >

                    <td className="py-3 font-medium whitespace-nowrap">

                      {stock.symbol}

                    </td>

                    <td className="text-right whitespace-nowrap">

                      ₹ {stock.price}

                    </td>

                    <td

                      className={`text-right font-semibold whitespace-nowrap ${

                        stock.change_percent >= 0

                          ? "text-green-400"

                          : "text-red-400"

                      }`}

                    >

                      {stock.change_percent}%

                    </td>

                  </tr>

                ))

              )

            }

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default function MarketOverviewCard() {

  const [gainers, setGainers] = useState([]);

  const [losers, setLosers] = useState([]);

  const [trending, setTrending] = useState([]);

  const [active, setActive] = useState([]);

  useEffect(() => {

    async function fetchData() {

      try {

        const [g, l, t, a] = await Promise.all([

          api.get("/market/top-gainers"),

          api.get("/market/top-losers"),

          api.get("/market/trending"),

          api.get("/market/most-active"),

        ]);

        setGainers(g.data);

        setLosers(l.data);

        setTrending(t.data);

        setActive(a.data);

      }

      catch (err) {

        console.log(err);

      }

    }

    Promise.resolve().then(fetchData);

  }, []);

  return (

    <div className="space-y-6">

      <h1 className="text-2xl sm:text-3xl font-bold">

        🌍 Live Market Overview

      </h1>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <StockTable

          title="🚀 Top Gainers"

          data={gainers}

        />

        <StockTable

          title="📉 Top Losers"

          data={losers}

        />

        <StockTable

          title="🔥 Trending"

          data={trending}

        />

        <StockTable

          title="⭐ Most Active"

          data={active}

        />

      </div>

    </div>

  );

}