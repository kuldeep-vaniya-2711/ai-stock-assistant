import { useDashboardContext } from "../context/DashboardContext";

import Portfolio from "../components/Portfolio";
import TransactionHistory from "../components/TransactionHistory";

function PortfolioPage() {

  const {

    portfolio,

    loadProfile,

    loadPortfolio,

  } = useDashboardContext();

  return (

    <section className="space-y-6">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

        <div>

          <h1 className="text-2xl sm:text-3xl font-bold">

            📂 Portfolio

          </h1>

          <p className="text-slate-400 mt-1">

            Manage your investments and transaction history.

          </p>

        </div>

      </div>

      <Portfolio

        items={portfolio}

        refresh={async () => {

          await loadProfile();

          await loadPortfolio();

        }}

      />

      <TransactionHistory />

    </section>

  );

}

export default PortfolioPage;