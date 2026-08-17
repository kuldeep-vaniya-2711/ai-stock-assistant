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

      }

      catch (error) {

        console.error(error);

      }

    };

    fetchTransactions();

  }, [userEmail]);

  return (

    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-lg">

      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">

        <div>

          <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400">

            📜 Transaction History

          </h2>

          <p className="text-slate-400 mt-1">

            Complete buy & sell activity

          </p>

        </div>

        <div className="bg-slate-800 px-4 py-2 rounded-xl">

          <span className="text-slate-400">

            Total :

          </span>

          <span className="ml-2 font-bold text-cyan-400">

            {transactions.length}

          </span>

        </div>

      </div>

      {

        transactions.length === 0 ? (

          <div className="text-center py-12">

            <div className="text-6xl mb-4">

              📭

            </div>

            <h3 className="text-xl font-semibold">

              No Transactions Yet

            </h3>

            <p className="text-slate-400 mt-2">

              Your buy & sell history will appear here.

            </p>

          </div>

        ) : (

          <div className="space-y-5">

            {

              transactions.map((item, index) => (

                <div

                  key={index}

                  className="bg-slate-800 rounded-2xl border border-slate-700 p-5 hover:border-cyan-500 transition"

                >

                  <div className="flex flex-col sm:flex-row justify-between gap-4">

                    <div>

                      <h3 className="text-xl font-bold">

                        {item.symbol}

                      </h3>

                      <p className="text-slate-400 text-sm mt-1">

                        {

                          new Date(

                            item.created_at || item.date

                          ).toLocaleString()

                        }

                      </p>

                    </div>

                    <span

                      className={`px-4 py-2 rounded-xl font-bold text-center h-fit ${

                        item.transaction_type === "BUY"

                          ? "bg-green-500/20 text-green-400"

                          : "bg-red-500/20 text-red-400"

                      }`}

                    >

                      {item.transaction_type}

                    </span>

                  </div>

                  <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-5">

                    <div className="bg-slate-900 rounded-xl p-3">

                      <p className="text-slate-400 text-sm">

                        Quantity

                      </p>

                      <h4 className="font-bold">

                        {item.quantity}

                      </h4>

                    </div>

                    <div className="bg-slate-900 rounded-xl p-3">

                      <p className="text-slate-400 text-sm">

                        Price

                      </p>

                      <h4 className="font-bold text-cyan-400">

                        ₹{Number(item.price).toFixed(2)}

                      </h4>

                    </div>

                    <div className="bg-slate-900 rounded-xl p-3">

                      <p className="text-slate-400 text-sm">

                        Total Value

                      </p>

                      <h4 className="font-bold text-green-400">

                        ₹{

                          item.total

                            ? Number(item.total).toFixed(2)

                            : (item.quantity * item.price).toFixed(2)

                        }

                      </h4>

                    </div>

                    <div className="bg-slate-900 rounded-xl p-3">

                      <p className="text-slate-400 text-sm">

                        Type

                      </p>

                      <h4

                        className={`font-bold ${

                          item.transaction_type === "BUY"

                            ? "text-green-400"

                            : "text-red-400"

                        }`}

                      >

                        {item.transaction_type}

                      </h4>

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

export default TransactionHistory;