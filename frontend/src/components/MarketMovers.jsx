import { useEffect, useState } from "react";
import api from "../services/api";

function MarketMovers() {

  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);

  useEffect(() => {

    loadData();

  }, []);

  const loadData = async () => {

    try {

      const gainersRes = await api.get("/market/top-gainers");
      const losersRes = await api.get("/market/top-losers");

      setGainers(gainersRes.data.slice(0,5));
      setLosers(losersRes.data.slice(0,5));

    }

    catch(err){

      console.log(err);

    }

  }

  return (

    <div className="grid lg:grid-cols-2 gap-6">

      <div className="bg-slate-900 rounded-xl p-6">

        <h2 className="text-2xl font-bold text-green-400 mb-6">

          📈 Top Gainers

        </h2>

        {

          gainers.map((stock,index)=>(

            <div

              key={index}

              className="flex justify-between py-3 border-b border-slate-700"

            >

              <div>

                <h3 className="font-bold">

                  {stock.symbol}

                </h3>

                <p className="text-slate-400">

                  ₹ {stock.price}

                </p>

              </div>

              <div className="text-green-400 font-bold">

                +{stock.change_percent}%

              </div>

            </div>

          ))

        }

      </div>

      <div className="bg-slate-900 rounded-xl p-6">

        <h2 className="text-2xl font-bold text-red-400 mb-6">

          📉 Top Losers

        </h2>

        {

          losers.map((stock,index)=>(

            <div

              key={index}

              className="flex justify-between py-3 border-b border-slate-700"

            >

              <div>

                <h3 className="font-bold">

                  {stock.symbol}

                </h3>

                <p className="text-slate-400">

                  ₹ {stock.price}

                </p>

              </div>

              <div className="text-red-400 font-bold">

                {stock.change_percent}%

              </div>

            </div>

          ))

        }

      </div>

    </div>

  );

}

export default MarketMovers;