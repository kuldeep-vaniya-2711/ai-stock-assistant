import { removeFromWatchlist } from "../services/watchlist";

function Watchlist({ stocks, email, refresh }) {

  const handleRemove = async (symbol) => {

    try {

      const response = await removeFromWatchlist(email, symbol);

      alert(response.message);

      refresh();

    }

    catch (error) {

      console.error(error);

      alert("Unable to remove stock.");

    }

  };

  return (

    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-lg">

      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">

        <div>

          <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400">

            ⭐ My Watchlist

          </h2>

          <p className="text-slate-400 mt-1">

            Monitor your favourite stocks.

          </p>

        </div>

        <div className="bg-slate-800 px-4 py-2 rounded-xl">

          <span className="text-slate-400">

            Total :

          </span>

          <span className="ml-2 font-bold text-cyan-400">

            {stocks.length}

          </span>

        </div>

      </div>

      {

        stocks.length === 0 ? (

          <div className="text-center py-12">

            <div className="text-6xl mb-4">

              ⭐

            </div>

            <h3 className="text-xl font-bold">

              Watchlist Empty

            </h3>

            <p className="text-slate-400 mt-2">

              Search stocks and add them to your watchlist.

            </p>

          </div>

        ) : (

          <div className="space-y-5">

            {

              stocks.map((stock) => (

                <div

                  key={stock.symbol}

                  className="bg-slate-800 border border-slate-700 rounded-2xl p-5 hover:border-cyan-500 transition"

                >

                  <div className="flex flex-col md:flex-row justify-between gap-5">

                    <div>

                      <h3 className="text-2xl font-bold">

                        {stock.symbol}

                      </h3>

                      <p className="text-slate-400 mt-2">

                        Added to your watchlist

                      </p>

                    </div>

                    <div className="flex items-center">

                      <button

                        onClick={() => handleRemove(stock.symbol)}

                        className="w-full md:w-auto bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl font-bold transition"

                      >

                        ❌ Remove

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

export default Watchlist;