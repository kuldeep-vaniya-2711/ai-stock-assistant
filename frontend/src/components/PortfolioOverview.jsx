export default function PortfolioOverview({ portfolio }) {

    return (

        <div className="bg-slate-900 rounded-2xl p-4 sm:p-6 shadow-lg border border-slate-800">

            <h2 className="text-xl sm:text-2xl font-bold mb-6">

                📈 Portfolio Overview

            </h2>

            <div className="overflow-x-auto rounded-xl">

                <table className="min-w-[900px] w-full">

                    <thead>

                        <tr className="border-b border-slate-700 text-slate-300">

                            <th className="text-left py-4 px-3">

                                Stock

                            </th>

                            <th className="text-center py-4 px-3">

                                Qty

                            </th>

                            <th className="text-center py-4 px-3">

                                Buy

                            </th>

                            <th className="text-center py-4 px-3">

                                Current

                            </th>

                            <th className="text-center py-4 px-3">

                                Investment

                            </th>

                            <th className="text-center py-4 px-3">

                                Current Value

                            </th>

                            <th className="text-center py-4 px-3">

                                Profit

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            portfolio?.length === 0 ? (

                                <tr>

                                    <td

                                        colSpan="7"

                                        className="text-center py-12 text-slate-400"

                                    >

                                        No Stocks Found

                                    </td>

                                </tr>

                            ) : (

                                portfolio.map((stock) => (

                                    <tr

                                        key={stock.symbol}

                                        className="border-b border-slate-800 hover:bg-slate-800/60 transition"

                                    >

                                        <td className="py-4 px-3 font-semibold whitespace-nowrap">

                                            {stock.symbol}

                                        </td>

                                        <td className="text-center px-3">

                                            {stock.quantity}

                                        </td>

                                        <td className="text-center px-3 whitespace-nowrap">

                                            ₹{Number(stock.buy_price).toFixed(2)}

                                        </td>

                                        <td className="text-center px-3 whitespace-nowrap">

                                            ₹{Number(stock.current_price).toFixed(2)}

                                        </td>

                                        <td className="text-center px-3 whitespace-nowrap">

                                            ₹{Number(stock.investment).toFixed(2)}

                                        </td>

                                        <td className="text-center px-3 whitespace-nowrap font-semibold text-cyan-400">

                                            ₹{Number(stock.current_value).toFixed(2)}

                                        </td>

                                        <td className="text-center px-3 whitespace-nowrap">

                                            <div

                                                className={`font-bold ${

                                                    stock.profit >= 0

                                                        ? "text-green-400"

                                                        : "text-red-400"

                                                }`}

                                            >

                                                ₹{Number(stock.profit).toFixed(2)}

                                            </div>

                                            <div

                                                className={`text-sm ${

                                                    stock.profit_percent >= 0

                                                        ? "text-green-300"

                                                        : "text-red-300"

                                                }`}

                                            >

                                                ({Number(stock.profit_percent).toFixed(2)}%)

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