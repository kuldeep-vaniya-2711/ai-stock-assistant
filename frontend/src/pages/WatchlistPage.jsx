import { useDashboardContext } from "../context/DashboardContext";
import Watchlist from "../components/Watchlist";

function WatchlistPage() {

  const {

    watchlist,

    userEmail,

    loadWatchlist,

  } = useDashboardContext();

  return (

    <section className="space-y-8">

      {/* Header */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

        <div>

          <h1 className="text-3xl sm:text-4xl font-bold">

            ⭐ My Watchlist

          </h1>

          <p className="text-slate-400 mt-2">

            Track your favourite stocks in one place.

          </p>

        </div>

        <div className="bg-slate-800 rounded-xl px-5 py-3">

          <span className="text-slate-400">

            Stocks :

          </span>

          <span className="ml-2 font-bold text-cyan-400">

            {watchlist?.length || 0}

          </span>

        </div>

      </div>

      {/* Watchlist */}

      <Watchlist

        stocks={watchlist}

        email={userEmail}

        refresh={loadWatchlist}

      />

    </section>

  );

}

export default WatchlistPage;