function NewsCard({ news }) {
  if (!news || news.length === 0) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4">
        📰 Latest News
      </h2>

      <div className="space-y-4">
        {news.map((item, index) => (
          <div
            key={index}
            className="border-b border-slate-800 pb-3"
          >
            <h3 className="font-semibold">
              {item.title}
            </h3>

            <p className="text-sm text-slate-400 mt-1">
              {item.publisher}
            </p>

            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 text-sm hover:underline"
              >
                Read More →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsCard;