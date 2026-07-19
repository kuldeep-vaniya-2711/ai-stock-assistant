import { removeFromWatchlist } from "../services/watchlist";

function Watchlist({ stocks, email, refresh }) {
  const handleRemove = async (symbol) => {
    try {
      const response = await removeFromWatchlist(email, symbol);

      alert(response.message);

      refresh();

    } catch (error) {
      console.error(error);
      alert("Unable to remove stock.");
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">

      <h2 className="text-2xl font-bold mb-5 text-yellow-400">
        ⭐ My Watchlist
      </h2>

      {stocks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-slate-400 text-lg">
            No Stocks Added
          </p>

          <p className="text-slate-500 text-sm mt-2">
            Search a stock and click "Add to Watchlist"
          </p>
        </div>
      ) : (
        <div className="space-y-3">

          {stocks.map((stock) => (
            <div
              key={stock.symbol}
              className="flex justify-between items-center bg-slate-800 hover:bg-slate-700 transition rounded-lg px-5 py-4"
            >

              <div>
                <h3 className="text-lg font-bold">
                  {stock.symbol}
                </h3>

                <p className="text-sm text-slate-400">
                  Saved in Watchlist
                </p>
              </div>

              <button
                onClick={() => handleRemove(stock.symbol)}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold transition"
              >
                ❌ Remove
              </button>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Watchlist;