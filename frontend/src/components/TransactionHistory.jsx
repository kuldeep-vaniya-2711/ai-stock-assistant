import { useEffect, useState } from "react";

import { getCurrentUser } from "../utils/auth";

import {
  getTransactions,
} from "../services/transaction";

function TransactionHistory() {

  const [transactions, setTransactions] = useState([]);

  const user = getCurrentUser();

  const userEmail = user?.email;

  useEffect(() => {
    if (!userEmail) return;

    const fetchTransactions = async () => {
      try {
        const data = await getTransactions(userEmail);
        setTransactions(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTransactions();
  }, [userEmail]);

  return (

    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">

        📜 Transaction History

      </h2>

      {transactions.length === 0 ? (

        <div className="text-center py-8">

          <p className="text-slate-400">

            No Transactions Yet

          </p>

        </div>

      ) : (

        <div className="space-y-4">
          {transactions.map((item, index) => (

            <div
              key={index}
              className="bg-slate-800 rounded-xl p-4"
            >

              <div className="flex justify-between items-center">

                <div>

                  <h3 className="font-bold text-lg">
                    {item.symbol}
                  </h3>

                  <p className="text-slate-400 text-sm">
                    {new Date(item.date).toLocaleString()}
                  </p>

                </div>

                <div>

                  {item.transaction_type === "BUY" ? (

                    <span className="bg-green-500 px-3 py-1 rounded-lg font-bold">
                      BUY
                    </span>

                  ) : (

                    <span className="bg-red-500 px-3 py-1 rounded-lg font-bold">
                      SELL
                    </span>

                  )}

                </div>

              </div>

              <div className="mt-3 grid grid-cols-3 gap-4">

                <div>
                  <p className="text-slate-400 text-sm">
                    Quantity
                  </p>

                  <p className="font-bold">
                    {item.quantity}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400 text-sm">
                    Price
                  </p>

                  <p className="font-bold">
                    ₹{item.price}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400 text-sm">
                    Value
                  </p>

                  <p className="font-bold text-cyan-400">
                    ₹{(item.quantity * item.price).toFixed(2)}
                  </p>
                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );
}

export default TransactionHistory;