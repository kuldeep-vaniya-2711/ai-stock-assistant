import { useDashboardContext } from "../context/DashboardContext";

import SearchBar from "../components/SearchBar";
import MarketOverview from "../components/MarketOverview";
import StockCard from "../components/StockCard";
import RecommendationCard from "../components/RecommendationCard";
import IndicatorsCard from "../components/IndicatorsCard";
import AIScoreCard from "../components/AIScoreCard";

function MarketPage() {

  const {

    analysis,

    loading,

    handleSearch,

    handleAddWatchlist,

    handleBuyStock,

  } = useDashboardContext();

  return (

    <section
      id="search"
      className="space-y-6"
    >

      <div>

        <h2 className="text-2xl font-bold">
          Stock Analysis
        </h2>

        <p className="text-slate-400">
          Search any NSE stock and view AI insights.
        </p>

      </div>

      <SearchBar
        onSearch={handleSearch}
        loading={loading}
      />

      <MarketOverview />

      <div className="grid xl:grid-cols-2 gap-6">

        <StockCard data={analysis} />

        <RecommendationCard data={analysis} />

      </div>

      <AIScoreCard data={analysis} />

      <IndicatorsCard data={analysis} />

      {analysis && (

        <div className="flex gap-4 flex-wrap">

          <button
            onClick={handleAddWatchlist}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-5 py-3 rounded-lg"
          >
            ⭐ Add to Watchlist
          </button>

          <button
            onClick={handleBuyStock}
            className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-lg font-bold"
          >
            💰 Buy Stock
          </button>

        </div>

      )}

    </section>

  );

}

export default MarketPage;