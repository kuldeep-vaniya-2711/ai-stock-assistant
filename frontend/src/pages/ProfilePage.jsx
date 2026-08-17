import { useDashboardContext } from "../context/DashboardContext";

import WalletCard from "../components/WalletCard";
import AchievementCard from "../components/AchievementCard";
import StreakCard from "../components/StreakCard";
import InvestmentGoalCard from "../components/InvestmentGoalCard";
import LeaderboardCard from "../components/LeaderboardCard";

function ProfilePage() {

  const {

    profile,

    portfolio,

  } = useDashboardContext();

  return (

    <section className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-3xl sm:text-4xl font-bold">

          👤 Investor Profile

        </h1>

        <p className="text-slate-400 mt-2">

          View your wallet, achievements, investment progress, and rankings.

        </p>

      </div>

      {/* Wallet */}

      <WalletCard user={profile} />

      {/* Goal + Streak */}

      <div className="grid xl:grid-cols-2 gap-6">

        <InvestmentGoalCard

          portfolio={portfolio}

        />

        <StreakCard

          profile={profile}

        />

      </div>

      {/* Achievements */}

      <AchievementCard

        profile={profile}

        portfolio={portfolio}

      />

      {/* Leaderboard */}

      <LeaderboardCard />

    </section>

  );

}

export default ProfilePage;