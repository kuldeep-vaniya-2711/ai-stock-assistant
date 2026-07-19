import { useEffect, useState } from "react";
import api from "../services/api";

function StockTable({ title, data }) {

  return (

    <div className="bg-slate-900 rounded-xl p-5 border border-slate-800">

      <h2 className="text-xl font-bold mb-5">

        {title}

      </h2>

      <table className="w-full">

        <thead>

          <tr className="text-slate-400">

            <th className="text-left">Stock</th>

            <th className="text-right">Price</th>

            <th className="text-right">%</th>

          </tr>

        </thead>

        <tbody>

          {

            data.map((stock, index)=>(

              <tr
                key={index}
                className="border-t border-slate-800"
              >

                <td className="py-3">

                  {stock.symbol}

                </td>

                <td className="text-right">

                  ₹ {stock.price}

                </td>

                <td
                  className={`text-right ${
                    stock.change_percent >=0
                    ? "text-green-400"
                    : "text-red-400"
                  }`}
                >

                  {stock.change_percent}%

                </td>

              </tr>

            ))

          }

        </tbody>

      </table>

    </div>

  );

}

export default function MarketOverviewCard(){

  const [gainers,setGainers]=useState([]);
  const [losers,setLosers]=useState([]);
  const [trending,setTrending]=useState([]);
  const [active,setActive]=useState([]);

  useEffect(()=>{

    loadData();

  },[]);

  const loadData=async()=>{

    try{

      const [

        g,
        l,
        t,
        a

      ]=await Promise.all([

        api.get("/market/top-gainers"),
        api.get("/market/top-losers"),
        api.get("/market/trending"),
        api.get("/market/most-active")

      ]);

      setGainers(g.data);
      setLosers(l.data);
      setTrending(t.data);
      setActive(a.data);

    }

    catch(err){

      console.log(err);

    }

  }

  return(

    <div className="space-y-6">

      <h1 className="text-3xl font-bold">

        🌍 Live Market Overview

      </h1>

      <div className="grid lg:grid-cols-2 gap-6">

        <StockTable

          title="🚀 Top Gainers"

          data={gainers}

        />

        <StockTable

          title="📉 Top Losers"

          data={losers}

        />

        <StockTable

          title="🔥 Trending"

          data={trending}

        />

        <StockTable

          title="⭐ Most Active"

          data={active}

        />

      </div>

    </div>

  );

}