import { useEffect, useState } from "react";
import api from "../services/api";

export default function TopMoversCard() {

    const [gainers, setGainers] = useState([]);
    const [losers, setLosers] = useState([]);

    useEffect(() => {

        load();

    }, []);

    async function load() {

        try {

            const gainersRes = await api.get("/market/top-gainers");

            const losersRes = await api.get("/market/top-losers");

            setGainers(gainersRes.data);

            setLosers(losersRes.data);

        }

        catch (err) {

            console.log(err);

        }

    }

    return (

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

            <h2 className="text-2xl font-bold mb-6">

                📈 Top Movers

            </h2>

            <div className="grid md:grid-cols-2 gap-8">

                <div>

                    <h3 className="text-green-400 font-bold mb-4">

                        🚀 Top Gainers

                    </h3>

                    {

                        gainers.map(stock => (

                            <div

                                key={stock.symbol}

                                className="flex justify-between py-2 border-b border-slate-800"

                            >

                                <span>

                                    {stock.symbol}

                                </span>

                                <span className="text-green-400">

                                    {stock.change}%

                                </span>

                            </div>

                        ))

                    }

                </div>

                <div>

                    <h3 className="text-red-400 font-bold mb-4">

                        📉 Top Losers

                    </h3>

                    {

                        losers.map(stock => (

                            <div

                                key={stock.symbol}

                                className="flex justify-between py-2 border-b border-slate-800"

                            >

                                <span>

                                    {stock.symbol}

                                </span>

                                <span className="text-red-400">

                                    {stock.change}%

                                </span>

                            </div>

                        ))

                    }

                </div>

            </div>

        </div>

    );

}