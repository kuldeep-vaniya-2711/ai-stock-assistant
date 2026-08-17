import { sellStock } from "../services/portfolio";
import { getCurrentUser } from "../utils/auth";

function Portfolio({ items, refresh }) {

  const user = getCurrentUser();

  const userEmail = user?.email;

  const handleSell = async (item) => {

    try {

      const response = await sellStock(
        userEmail,
        item.symbol,
        1,
        item.buy_price
      );

      alert(response.message);

      await refresh();

    }

    catch (error) {

      console.error(error);

      alert("Sell Failed");

    }

  };

  return (

    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-lg">

      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">

        <div>

          <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400">

            💼 My Portfolio

          </h2>

          <p className="text-slate-400 mt-1">

            Your current investments

          </p>

        </div>

        <div className="bg-slate-800 px-4 py-2 rounded-xl">

          <span className="text-slate-400">

            Holdings :

          </span>

          <span className="ml-2 font-bold text-cyan-400">

            {items.length}

          </span>

        </div>

      </div>

      {

        items.length === 0 ? (

          <div className="text-center py-12">

            <div className="text-6xl mb-4">

              📭

            </div>

            <h3 className="text-xl font-semibold">

              No Stocks Purchased

            </h3>

            <p className="text-slate-400 mt-2">

              Buy your first stock to build your portfolio.

            </p>

          </div>

        ) : (

          <div className="grid gap-6">

            {

              items.map((item, index) => (

                <div

                  key={index}

                  className="bg-slate-800 rounded-2xl border border-slate-700 p-5 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/10 transition-all"

                >

                  <div className="flex flex-col lg:flex-row justify-between gap-6">

                    <div className="flex-1">

                      <div className="flex items-center justify-between mb-5">

                        <h3 className="text-2xl font-bold">

                          {item.symbol}

                        </h3>

                        <span

                          className={`px-3 py-1 rounded-full text-sm font-semibold ${

                            item.profit >= 0

                              ? "bg-green-500/20 text-green-400"

                              : "bg-red-500/20 text-red-400"

                          }`}

                        >

                          {item.profit >= 0 ? "Profit" : "Loss"}

                        </span>

                      </div>

                      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">

                        <div className="bg-slate-900 rounded-xl p-3">

                          <p className="text-slate-400 text-sm">

                            Quantity

                          </p>

                          <h4 className="font-bold text-lg">

                            {item.quantity}

                          </h4>

                        </div>

                        <div className="bg-slate-900 rounded-xl p-3">

                          <p className="text-slate-400 text-sm">

                            Buy Price

                          </p>

                          <h4 className="font-bold text-green-400">

                            ₹{item.buy_price}

                          </h4>

                        </div>

                        <div className="bg-slate-900 rounded-xl p-3">

                          <p className="text-slate-400 text-sm">

                            Current Price

                          </p>

                          <h4 className="font-bold text-cyan-400">

                            ₹{item.current_price}

                          </h4>

                        </div>

                        <div className="bg-slate-900 rounded-xl p-3">

                          <p className="text-slate-400 text-sm">

                            Investment

                          </p>

                          <h4 className="font-bold text-yellow-400">

                            ₹{item.investment}

                          </h4>

                        </div>

                        <div className="bg-slate-900 rounded-xl p-3">

                          <p className="text-slate-400 text-sm">

                            Current Value

                          </p>

                          <h4 className="font-bold text-indigo-400">

                            ₹{item.current_value}

                          </h4>

                        </div>

                        <div className="bg-slate-900 rounded-xl p-3">

                          <p className="text-slate-400 text-sm">

                            P/L

                          </p>

                          <h4

                            className={`font-bold ${

                              item.profit >= 0

                                ? "text-green-400"

                                : "text-red-400"

                            }`}

                          >

                            ₹{item.profit}

                          </h4>

                          <p

                            className={`text-sm ${

                              item.profit >= 0

                                ? "text-green-300"

                                : "text-red-300"

                            }`}

                          >

                            {item.profit_percent}%

                          </p>

                        </div>

                      </div>

                    </div>

                    <div className="flex lg:flex-col justify-end">

                      <button

                        onClick={() => handleSell(item)}

                        className="w-full lg:w-36 bg-red-500 hover:bg-red-600 rounded-xl px-5 py-3 font-bold transition-all hover:scale-105"

                      >

                        💵 Sell

                      </button>

                    </div>

                  </div>

                </div>

              ))

            }

          </div>

        )

      }

    </div>

  );

}

export default Portfolio;