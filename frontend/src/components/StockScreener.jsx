import { useEffect, useState } from "react";
import api from "../services/api";

export default function StockScreener() {

  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const res = await api.get("/screener");
        setStocks(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStocks();
  }, []);

  return (

    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-6 shadow-lg">

      <h2 className="text-xl sm:text-2xl font-bold mb-6">

        🔎 AI Stock Screener

      </h2>

      <div className="overflow-x-auto">

        <table className="w-full min-w-[650px]">

          <thead>

            <tr className="border-b border-slate-700 text-slate-300">

              <th className="py-3 text-left">

                Stock

              </th>

              <th className="py-3 text-center">

                Price

              </th>

              <th className="py-3 text-center">

                RSI

              </th>

              <th className="py-3 text-center">

                Recommendation

              </th>

            </tr>

          </thead>

          <tbody>

            {

              stocks.length === 0 ? (

                <tr>

                  <td

                    colSpan={4}

                    className="py-8 text-center text-slate-500"

                  >

                    No Stocks Found

                  </td>

                </tr>

              ) : (

                stocks.map((stock) => (

                  <tr

                    key={stock.symbol}

                    className="border-b border-slate-800 hover:bg-slate-800 transition"

                  >

                    <td className="py-4 font-semibold whitespace-nowrap">

                      {stock.symbol}

                    </td>

                    <td className="py-4 text-center whitespace-nowrap">

                      ₹{stock.price}

                    </td>

                    <td className="py-4 text-center">

                      {stock.rsi}

                    </td>

                    <td className="py-4 text-center">

                      <span

                        className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap

                        ${

                          stock.recommendation === "BUY"

                            ? "bg-green-500/20 text-green-400"

                            : stock.recommendation === "SELL"

                            ? "bg-red-500/20 text-red-400"

                            : "bg-yellow-500/20 text-yellow-400"

                        }`}

                      >

                        {stock.recommendation}

                      </span>

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