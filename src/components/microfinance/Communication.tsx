
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Users, Bell } from "lucide-react";
import DirectMessages from "./communication/DirectMessages";
import GroupChats from "./communication/GroupChats";
import Notifications from "./communication/Notifications";
import { MOCK_NOTIFICATIONS } from "./data/mock-data";
import { useLocation, useNavigate } from "react-router-dom";

const Communication = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("messages");
  
  // Count unread notifications
  const unreadNotifications = MOCK_NOTIFICATIONS.filter(notification => !notification.isRead).length;
  
  // Check if we're being navigated to with an initialChatType state parameter
  useEffect(() => {
    if (location.state?.activeTab === "communication") {
      setActiveTab("messages");
      
      // Could use initialChatType here for further customization
      // const chatType = location.state.initialChatType; // "accepted" or "declined"
    }
    
    // Extract tab from search params
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    if (tab === 'groups') {
      setActiveTab('groups');
    } else if (tab === 'notifications') {
      setActiveTab('notifications');
    } else if (location.pathname === '/communications') {
      setActiveTab('messages');
    }
  }, [location]);
  
  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/communications${value !== "messages" ? `?tab=${value}` : ""}`, { replace: true });
  };
  
  return (
    <div className="space-y-6">
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
  );
};

export default Communication;
