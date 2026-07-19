import { useDashboardContext } from "../context/DashboardContext";

import Watchlist from "../components/Watchlist";

function WatchlistPage() {

  const {

    watchlist,

    userEmail,

    loadWatchlist,

  } = useDashboardContext();

  return (

    <section className="space-y-6">

      <h2 className="text-2xl font-bold">

        Watchlist

      </h2>

      <Watchlist

        stocks={watchlist}

        email={userEmail}

        refresh={loadWatchlist}

      />

    </section>

  );

}

export default WatchlistPage;