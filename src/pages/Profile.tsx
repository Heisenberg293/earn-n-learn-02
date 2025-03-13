
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import ProfileTab from "@/components/profile/ProfileTab";
import GamificationTab from "@/components/profile/GamificationTab";
import TaskDashboard from "@/components/microfinance/financial/TaskDashboard";
import SettingsTab from "@/components/profile/SettingsTab";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Your Profile</h1>
        
        {/* Profile Tabs */}
        <Tabs defaultValue="profile" className="mb-8">
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
