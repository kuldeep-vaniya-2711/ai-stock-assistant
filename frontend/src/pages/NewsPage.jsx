function NewsCard({ news = [] }) {

  if (news.length === 0) {

    return (

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center">

        <div className="text-6xl mb-4">

          📰

        </div>

        <h2 className="text-2xl font-bold">

          No News Available

        </h2>

        <p className="text-slate-400 mt-3">

          Latest market news will appear here.

        </p>

      </div>

    );

  }

  return (

    <div className="space-y-5">

      <div>

        <h2 className="text-2xl font-bold">

          📰 Latest Market News

        </h2>

        <p className="text-slate-400 mt-1">

          Stay updated with the latest financial news.

        </p>

      </div>

      <div className="grid gap-5">

        {news.map((item, index) => (

          <article

            key={index}

            className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500 hover:shadow-xl hover:shadow-cyan-500/10 transition duration-300"

          >

            <div className="flex flex-col lg:flex-row">

              {/* Image */}

              {item.image && (

                <img

                  src={item.image}

                  alt={item.title}

                  className="w-full lg:w-72 h-52 object-cover"

                />

              )}

              {/* Content */}

              <div className="flex-1 p-6">

                <div className="flex flex-wrap items-center gap-3 mb-4">

                  {item.source && (

                    <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-xs font-semibold">

                      {item.source}

                    </span>

                  )}

                  {item.published && (

                    <span className="bg-slate-800 text-slate-400 px-3 py-1 rounded-full text-xs">

                      {item.published}

                    </span>

                  )}

                </div>

                <h3 className="text-xl font-bold leading-8">

                  {item.title}

                </h3>

                {item.summary && (

                  <p className="text-slate-400 mt-4 leading-7">

                    {item.summary}

                  </p>

                )}

                <div className="mt-6">

                  <a

                    href={item.link}

                    target="_blank"

                    rel="noreferrer"

                    className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 px-5 py-3 rounded-xl font-semibold transition"

                  >

                    Read Full Article →

                  </a>

                </div>

              </div>

            </div>

          </article>

        ))}

      </div>

    </div>

  );

}

export default NewsCard;