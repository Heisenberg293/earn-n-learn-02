
import UserBadges from "@/components/microfinance/gamification/UserBadges";
import PointsOverview from "@/components/microfinance/gamification/PointsOverview";
import Leaderboard from "@/components/microfinance/gamification/Leaderboard";

const GamificationTab = () => {
  return (
    <div>
      {/* Points Overview Section */}
      <div className="grid gap-8 mb-8">
        <PointsOverview />
      </div>
      
      {/* Badges Section */}
      <div className="mb-8">
        <UserBadges />
      </div>
      
      {/* Leaderboard Section */}
      <div>
        <Leaderboard />
      </div>
    </div>
  );
};

export default GamificationTab;
