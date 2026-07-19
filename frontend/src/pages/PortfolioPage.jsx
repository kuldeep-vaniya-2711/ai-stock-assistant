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

      <h2 className="text-2xl font-bold">

        Portfolio

      </h2>

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