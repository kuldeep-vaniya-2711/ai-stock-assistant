import { useEffect, useState } from "react";

import api from "../services/api";

export default function MarketNewsCard() {

    const [news, setNews] = useState([]);

    useEffect(() => {

        load();

    }, []);

    async function load() {

        try {

            const res = await api.get("/market/news");

            setNews(res.data);

        }

        catch (err) {

            console.log(err);

        }

    }

    return (

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

            <h2 className="text-2xl font-bold mb-6">

                📰 Market News

            </h2>

            <div className="space-y-5">

                {

                    news.map((item, index) => (

                        <a

                            key={index}

                            href={item.link}

                            target="_blank"

                            rel="noreferrer"

                            className="block border-b border-slate-800 pb-4 hover:text-cyan-400"

                        >

                            <h3 className="font-semibold">

                                {item.title}

                            </h3>

                            <p className="text-xs text-slate-400 mt-2">

                                {item.published}

                            </p>

                        </a>

                    ))

                }

            </div>

        </div>

    );

}