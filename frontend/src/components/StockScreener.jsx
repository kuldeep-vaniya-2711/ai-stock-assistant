import { useEffect, useState } from "react";
import api from "../services/api";

export default function StockScreener() {

    const [stocks, setStocks] = useState([]);

    useEffect(() => {

        loadStocks();

    }, []);

    async function loadStocks() {

        try {

            const res = await api.get("/screener");

            setStocks(res.data);

        }

        catch (err) {

            console.log(err);

        }

    }

    return (

        <div className="bg-slate-900 rounded-xl p-6 shadow-lg">

            <h2 className="text-2xl font-bold mb-6">
                🔎 AI Stock Screener
            </h2>

            <div className="overflow-x-auto">

                <table className="w-full table-fixed border-collapse">

                    <thead>

                        <tr className="border-b border-slate-700 text-slate-300">

                            <th className="w-1/4 py-3 text-left">
                                Stock
                            </th>

                            <th className="w-1/4 py-3 text-center">
                                Price
                            </th>

                            <th className="w-1/4 py-3 text-center">
                                RSI
                            </th>

                            <th className="w-1/4 py-3 text-center">
                                Recommendation
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            stocks.map((stock) => (

                                <tr
                                    key={stock.symbol}
                                    className="border-b border-slate-800 hover:bg-slate-800 transition"
                                >

                                    <td className="py-4 font-semibold text-left whitespace-nowrap">

                                        {stock.symbol}

                                    </td>

                                    <td className="py-4 text-center">

                                        ₹{stock.price}

                                    </td>

                                    <td className="py-4 text-center">

                                        {stock.rsi}

                                    </td>

                                    <td className="py-4 text-center">

                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-semibold
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

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}