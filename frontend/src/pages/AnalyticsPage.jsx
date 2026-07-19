import AnalyticsCard from "../components/AnalyticsCard";
import PortfolioGrowthChart from "../components/PortfolioGrowthChart";
import PortfolioAllocationChart from "../components/PortfolioAllocationChart";
import AIAdvisor from "../components/AIAdvisor";


function AnalyticsPage() {

  return (

    <section className="space-y-8">

      <h2 className="text-3xl font-bold">
        Portfolio Analytics
      </h2>

      {/* AI Analytics */}

      <AnalyticsCard />

      {/* Charts */}

      <div className="grid lg:grid-cols-2 gap-6">

        <PortfolioGrowthChart />

        <PortfolioAllocationChart />

<AIAdvisor />

      </div>

    </section>

  );

}

export default AnalyticsPage;