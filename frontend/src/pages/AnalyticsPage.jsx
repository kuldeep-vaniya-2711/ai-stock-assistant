import AnalyticsCard from "../components/AnalyticsCard";
import PortfolioGrowthChart from "../components/PortfolioGrowthChart";
import PortfolioAllocationChart from "../components/PortfolioAllocationChart";
import AIAdvisor from "../components/AIAdvisor";
import PortfolioRebalancer from "../components/PortfolioRebalancer";


function AnalyticsPage() {

  return (

    <section className="space-y-8">

      {/* Header */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

        <div>

          <h1 className="text-3xl sm:text-4xl font-bold">

            📊 Portfolio Analytics

          </h1>

          <p className="text-slate-400 mt-2">

            Analyze your portfolio performance with AI insights.

          </p>

        </div>

      </div>

      {/* Analytics */}

      <AnalyticsCard />

      {/* Charts */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <PortfolioGrowthChart />

        <PortfolioAllocationChart />

      </div>

      {/* AI Advisor */}

      <AIAdvisor />

<PortfolioRebalancer />

    </section>

  );

}

export default AnalyticsPage;