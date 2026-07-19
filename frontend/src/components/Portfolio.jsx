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

    } catch (error) {

      console.error(error);

      alert("Sell Failed");

    }

  };

  return (

    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        💼 My Portfolio
      </h2>

      {items.length === 0 ? (

        <div className="text-center py-10">

          <p className="text-slate-400 text-lg">
            No Stocks Purchased
          </p>

        </div>

      ) : (

        <div className="space-y-5">

          {items.map((item, index) => (

            <div
              key={index}
              className="bg-slate-800 rounded-xl p-6"
            >

              <div className="flex justify-between items-start">

                <div className="space-y-2">

                  <h3 className="text-2xl font-bold text-white">
                    {item.symbol}
                  </h3>

                  <p className="text-slate-300">
                    📦 Quantity :
                    <span className="font-bold">
                      {" "}
                      {item.quantity}
                    </span>
                  </p>

                  <p className="text-slate-300">
                    💵 Buy Price :
                    <span className="font-bold text-green-400">
                      {" "}
                      ₹{item.buy_price}
                    </span>
                  </p>

                  <p className="text-slate-300">
                    📈 Current Price :
                    <span className="font-bold text-cyan-400">
                      {" "}
                      ₹{item.current_price}
                    </span>
                  </p>

                  <p className="text-slate-300">
                    💰 Investment :
                    <span className="font-bold text-yellow-400">
                      {" "}
                      ₹{item.investment}
                    </span>
                  </p>

                  <p className="text-slate-300">
                    💼 Current Value :
                    <span className="font-bold text-indigo-400">
                      {" "}
                      ₹{item.current_value}
                    </span>
                  </p>

                  <p
                    className={`font-bold text-lg ${
                      item.profit >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {item.profit >= 0 ? "📈 Profit" : "📉 Loss"} :

                    {" "}
                    ₹{item.profit}

                    {" "}

                    ({item.profit_percent}%)
                  </p>

                </div>

                <button
                  onClick={() => handleSell(item)}
                  className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-lg font-bold"
                >
                  💵 Sell
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default Portfolio;