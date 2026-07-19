export default function PortfolioOverview({ portfolio }) {

    return (

        <div className="bg-slate-900 rounded-xl p-6 shadow-lg">

            <h2 className="text-2xl font-bold mb-6">

                📈 Portfolio Overview

            </h2>

            <div className="overflow-x-auto">

                <table className="w-full table-fixed">

                    <thead>

                        <tr className="border-b border-slate-700 text-slate-300">

                            <th className="w-[18%] text-left py-3">

                                Stock

                            </th>

                            <th className="w-[8%] text-center py-3">

                                Qty

                            </th>

                            <th className="w-[12%] text-center py-3">

                                Buy

                            </th>

                            <th className="w-[12%] text-center py-3">

                                Current

                            </th>

                            <th className="w-[15%] text-center py-3">

                                Investment

                            </th>

                            <th className="w-[15%] text-center py-3">

                                Current Value

                            </th>

                            <th className="w-[20%] text-center py-3">

                                Profit

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            portfolio.length === 0 ?

                            (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="text-center py-8 text-slate-400"
                                    >

                                        No Stocks Found

                                    </td>

                                </tr>

                            )

                            :

                            (

                                portfolio.map((stock) => (

                                    <tr

                                        key={stock.symbol}

                                        className="border-b border-slate-800 hover:bg-slate-800 transition"

                                    >

                                        <td className="py-4 font-semibold">

                                            {stock.symbol}

                                        </td>

                                        <td className="text-center">

                                            {stock.quantity}

                                        </td>

                                        <td className="text-center">

                                            ₹{stock.buy_price}

                                        </td>

                                        <td className="text-center">

                                            ₹{stock.current_price}

                                        </td>

                                        <td className="text-center">

                                            ₹{stock.investment}

                                        </td>

                                        <td className="text-center text-cyan-400 font-semibold">

                                            ₹{stock.current_value}

                                        </td>

                                        <td className="text-center">

                                            <div

                                                className={`font-bold ${
                                                    stock.profit >= 0
                                                    ? "text-green-400"
                                                    : "text-red-400"
                                                }`}

                                            >

                                                ₹{stock.profit}

                                            </div>

                                            <div

                                                className={`text-sm ${
                                                    stock.profit_percent >= 0
                                                    ? "text-green-300"
                                                    : "text-red-300"
                                                }`}

                                            >

                                                ({stock.profit_percent}%)

                                            </div>

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