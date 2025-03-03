
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import ProfileTab from "@/components/profile/ProfileTab";
import GamificationTab from "@/components/profile/GamificationTab";

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
            <TabsTrigger value="gamification">Gamification</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <ProfileTab />
          </TabsContent>
          
          <TabsContent value="gamification">
            <GamificationTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Profile;
