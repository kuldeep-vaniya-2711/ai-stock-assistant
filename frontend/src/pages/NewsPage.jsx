import { useDashboardContext } from "../context/DashboardContext";

import NewsCard from "../components/NewsCard";
import TradingChart from "../components/TradingChart";

function NewsPage() {

  const {

    news,

    analysis,

  } = useDashboardContext();

  return (

    <section className="space-y-6">

      <h2 className="text-2xl font-bold">

        Latest News

      </h2>

      <TradingChart

        symbol={analysis?.symbol}

      />

      <NewsCard

        news={news}

      />

    </section>

  );

}

export default NewsPage;