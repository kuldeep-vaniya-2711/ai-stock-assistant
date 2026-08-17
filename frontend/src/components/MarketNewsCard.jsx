import { useEffect, useState } from "react";
import api from "../services/api";

export default function MarketNewsCard() {

  const [news, setNews] = useState([]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await api.get("/market/news");
        if (mounted) setNews(res.data);
      } catch (err) {
        console.log(err);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (

    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-6 shadow-lg">

      <h2 className="text-xl sm:text-2xl font-bold mb-6">

        📰 Market News

      </h2>

      <div className="space-y-4">

        {

          news.length === 0 ? (

            <p className="text-slate-500">

              No News Available

            </p>

          ) : (

            news.map((item, index) => (

              <a

                key={index}

                href={item.link}

                target="_blank"

                rel="noreferrer"

                className="block bg-slate-800 rounded-xl p-4 hover:bg-slate-700 hover:border-cyan-500 border border-transparent transition"

              >

                <h3 className="font-semibold text-sm sm:text-base leading-6">

                  {item.title}

                </h3>

                <p className="text-xs text-slate-400 mt-3">

                  {item.published}

                </p>

              </a>

            ))

          )

        }

      </div>

    </div>

  );

}