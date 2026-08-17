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
      className="space-y-8"
    >

      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>

          <h1 className="text-3xl sm:text-4xl font-bold">

            📈 AI Stock Analysis

          </h1>

          <p className="text-slate-400 mt-2">

            Search any NSE stock and get AI-powered investment insights.

          </p>

        </div>

      </div>

      {/* Search */}

      <SearchBar
        onSearch={handleSearch}
        loading={loading}
      />

      {/* Market Overview */}

      <MarketOverview />

      {/* Main Cards */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <StockCard data={analysis} />

        <RecommendationCard data={analysis} />

      </div>

      {/* AI Score */}

      <AIScoreCard data={analysis} />

      {/* Indicators */}

      <IndicatorsCard data={analysis} />

      {/* Buttons */}

      {

        analysis && (

          <div className="flex flex-col sm:flex-row gap-4">

            <button

              onClick={handleAddWatchlist}

              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-xl transition"

            >

              ⭐ Add to Watchlist

            </button>

            <button

              onClick={handleBuyStock}

              className="flex-1 bg-green-600 hover:bg-green-700 font-bold py-3 rounded-xl transition"

            >

              💰 Buy Stock

            </button>

          </div>

        )

      }

    </section>

  );

}

export default MarketPage;