import { useDashboardContext } from "../context/DashboardContext";

import WalletCard from "../components/WalletCard";
import DashboardStats from "../components/DashboardStats";
import PortfolioSummary from "../components/PortfolioSummary";
import PortfolioOverview from "../components/PortfolioOverview";
import AnalyticsCard from "../components/AnalyticsCard";
import PortfolioHealthCard from "../components/PortfolioHealthCard";
import DashboardSummary from "../components/DashboardSummary";
import LevelCard from "../components/LevelCard";
import AchievementCard from "../components/AchievementCard";
import StreakCard from "../components/StreakCard";
import InvestmentGoalCard from "../components/InvestmentGoalCard";
import MarketOverviewCard from "../components/MarketOverviewCard";
import QuickStats from "../components/QuickStats";
import MarketNewsCard from "../components/MarketNewsCard";
import TopMoversCard from "../components/TopMoversCard";
import StockScreener from "../components/StockScreener";
import DownloadReportButton from "../components/DownloadReportButton";
import PortfolioGrowthChart from "../components/PortfolioGrowthChart";
import LeaderboardCard from "../components/LeaderboardCard";
import PortfolioAllocationChart from "../components/PortfolioAllocationChart";
import AIRecommendationCard from "../components/AIRecommendationCard";





function DashboardHome() {

    const {

        profile,

        portfolio,

        analysis,

        analytics

    } = useDashboardContext();

    return (

        <section className="space-y-8">

            {/* ================= HERO SECTION ================= */}

            <div className="bg-gradient-to-r from-indigo-700 via-slate-900 to-cyan-700 rounded-2xl p-8 shadow-xl">

                <div className="flex flex-col lg:flex-row justify-between items-center gap-6">

                    <div>

                        <h1 className="text-4xl font-bold text-white">

                            👋 Welcome Back

                        </h1>

                        <p className="text-slate-200 mt-3 text-lg">

                            Your AI Powered Stock Dashboard

                        </p>

                        <p className="text-slate-300 mt-2">

                            Monitor your investments, analyse portfolio and discover new opportunities.

                        </p>

                    </div>

                    <DownloadReportButton />

                </div>

            </div>

            {/* ================= QUICK STATS ================= */}

            <QuickStats />

            {/* ================= WALLET ================= */}

            <WalletCard user={profile} />

            {/* ================= LEVEL ================= */}

            <LevelCard profile={profile} />

            {/* ================= SUMMARY ================= */}

            <DashboardSummary />

            {/* ================= STATS ================= */}

            <DashboardStats

                profile={profile}

                portfolio={portfolio}

                analysis={analysis}

            />

            {/* ================= PORTFOLIO ================= */}

            <PortfolioOverview

                portfolio={portfolio}

            />

            {/* ================= ANALYTICS ================= */}

            <AnalyticsCard

                analytics={analytics}

            />

            <PortfolioHealthCard

                analytics={analytics}

            />

            {/* ================= PORTFOLIO SUMMARY ================= */}

            <PortfolioSummary

                profile={profile}

                portfolio={portfolio}

            />

            {/* ================= GROWTH CHART ================= */}

            <PortfolioGrowthChart />


<PortfolioAllocationChart />

<AIRecommendationCard />


            {/* ================= ACHIEVEMENTS ================= */}

            <AchievementCard

                profile={profile}

                portfolio={portfolio}

            />

            {/* ================= STREAK + GOAL ================= */}

            <div className="grid xl:grid-cols-2 gap-6">

                <StreakCard

                    profile={profile}

                />

                <InvestmentGoalCard

                    portfolio={portfolio}

                />

            </div>

            {/* ================= MARKET ================= */}

            <MarketOverviewCard />

            <div className="grid xl:grid-cols-2 gap-6">

                <TopMoversCard />

                <MarketNewsCard />

            </div>

            {/* ================= STOCK SCREENER ================= */}

            <StockScreener />

            {/* ================= LEADERBOARD ================= */}

            <LeaderboardCard />

        </section>

    );

}

export default DashboardHome;