
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileTab from "@/components/profile/ProfileTab";
import GamificationTab from "@/components/profile/GamificationTab";
import TaskDashboard from "@/components/microfinance/financial/TaskDashboard";
import SettingsTab from "@/components/profile/SettingsTab";
import { useLocation, useNavigate } from "react-router-dom";

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  
  // Parse tab from URL if present
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [location]);
  
  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/profile${value !== "profile" ? `?tab=${value}` : ""}`, { replace: true });
  };
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <main className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
        
        {/* Profile Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-8">
          <TabsList className="mb-4 w-full justify-start">
            <TabsTrigger value="profile">Profile Info</TabsTrigger>
            <TabsTrigger value="tasks">My Tasks</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <ProfileTab />
          </TabsContent>
          
          <TabsContent value="tasks">
            <TaskDashboard />
          </TabsContent>
          
          <TabsContent value="leaderboard">
            <GamificationTab />
          </TabsContent>
          
          <TabsContent value="settings">
            <SettingsTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Profile;
