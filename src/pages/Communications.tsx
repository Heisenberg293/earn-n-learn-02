
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Users, Bell } from "lucide-react";
import DirectMessages from "@/components/microfinance/communication/DirectMessages";
import GroupChats from "@/components/microfinance/communication/GroupChats";
import Notifications from "@/components/microfinance/communication/Notifications";
import { MOCK_NOTIFICATIONS } from "@/components/microfinance/data/mock-data";
import { useLocation, useNavigate } from "react-router-dom";

const Communications = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("messages");
  
  // Count unread notifications
  const unreadNotifications = MOCK_NOTIFICATIONS.filter(notification => !notification.isRead).length;
  
  // Parse tab from URL if present
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    if (tab === 'groups') {
      setActiveTab('groups');
    } else if (tab === 'notifications') {
      setActiveTab('notifications');
    } else {
      setActiveTab('messages');
    }
  }, [location]);
  
  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/communications${value !== "messages" ? `?tab=${value}` : ""}`, { replace: true });
  };
  
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Communication Center</h1>
          <p className="text-muted-foreground mb-8">
            Connect with other users, job posters, and groups
          </p>
          
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid grid-cols-3 w-full md:w-auto">
              <TabsTrigger value="messages" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" /> 
                <span className="hidden md:inline">Direct Messages</span>
                <span className="md:hidden">Messages</span>
              </TabsTrigger>
              <TabsTrigger value="groups" className="flex items-center gap-2">
                <Users className="h-4 w-4" /> 
                <span className="hidden md:inline">Group Chats</span>
                <span className="md:hidden">Groups</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2 relative">
                <Bell className="h-4 w-4" /> 
                <span className="hidden md:inline">Notifications</span>
                <span className="md:hidden">Alerts</span>
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="messages" className="mt-4">
              <DirectMessages />
            </TabsContent>
            
            <TabsContent value="groups" className="mt-4">
              <GroupChats />
            </TabsContent>
            
            <TabsContent value="notifications" className="mt-4">
              <Notifications />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Communications;
