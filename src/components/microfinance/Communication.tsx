
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { 
  MessageCircle, Users, Bell, Send, Search, 
  Phone, Plus, UserPlus, MoreVertical
} from "lucide-react";

// Types
interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  avatar: string;
}

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar: string;
}

interface Group {
  id: string;
  name: string;
  description: string;
  members: number;
  lastActive: string;
  avatar: string;
}

interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  type: "message" | "payment" | "deadline" | "system";
}

// Mock data
const MOCK_CHATS: Chat[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    lastMessage: "Can we talk about the project deadline?",
    timestamp: "10:32 AM",
    unread: 2,
    avatar: "SJ"
  },
  {
    id: "2",
    name: "Mike Thompson",
    lastMessage: "I've sent the payment for the textbooks",
    timestamp: "Yesterday",
    unread: 0,
    avatar: "MT"
  },
  {
    id: "3",
    name: "Alex Rodriguez",
    lastMessage: "Thanks for helping with the math assignment!",
    timestamp: "Monday",
    unread: 0,
    avatar: "AR"
  }
];

const MOCK_MESSAGES: Message[] = [
  {
    id: "1",
    sender: "Sarah Johnson",
    content: "Hey, do you have time to discuss the group project today?",
    timestamp: "10:15 AM",
    isRead: true,
    avatar: "SJ"
  },
  {
    id: "2",
    sender: "You",
    content: "Sure, I'm free after 3 PM. What specifically did you want to go over?",
    timestamp: "10:20 AM",
    isRead: true,
    avatar: "YO"
  },
  {
    id: "3",
    sender: "Sarah Johnson",
    content: "I'm struggling with the research section and wanted to see if we could divide the work differently.",
    timestamp: "10:25 AM",
    isRead: true,
    avatar: "SJ"
  },
  {
    id: "4",
    sender: "Sarah Johnson",
    content: "Also, do you know if the deadline is still next Friday or did Professor Wilson extend it?",
    timestamp: "10:32 AM",
    isRead: false,
    avatar: "SJ"
  }
];

const MOCK_GROUPS: Group[] = [
  {
    id: "1",
    name: "Business Finance Study Group",
    description: "Group for discussing business finance assignments and exam prep",
    members: 18,
    lastActive: "Today",
    avatar: "BF"
  },
  {
    id: "2",
    name: "Campus Entrepreneurship Club",
    description: "For students interested in startups and business ideas",
    members: 42,
    lastActive: "Yesterday",
    avatar: "CE"
  },
  {
    id: "3",
    name: "Peer Tutoring Network",
    description: "Connect with other students for academic help",
    members: 27,
    lastActive: "3 days ago",
    avatar: "PT"
  }
];

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "New Message",
    description: "Sarah Johnson sent you a message",
    timestamp: "10:32 AM",
    isRead: false,
    type: "message"
  },
  {
    id: "2",
    title: "Payment Received",
    description: "You received $50 from Mike Thompson for textbooks",
    timestamp: "Yesterday",
    isRead: false,
    type: "payment"
  },
  {
    id: "3",
    title: "Deadline Reminder",
    description: "Your loan repayment is due in 3 days",
    timestamp: "Yesterday",
    isRead: true,
    type: "deadline"
  },
  {
    id: "4",
    title: "System Update",
    description: "New features have been added to the platform",
    timestamp: "Monday",
    isRead: true,
    type: "system"
  }
];

const Communication = () => {
  const [activeTab, setActiveTab] = useState("messages");
  const [activeChatId, setActiveChatId] = useState<string | null>("1");
  const [chats, setChats] = useState<Chat[]>(MOCK_CHATS);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [groups, setGroups] = useState<Group[]>(MOCK_GROUPS);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  // Active chat or group
  const activeChat = chats.find(chat => chat.id === activeChatId);
  
  // Handle sending a new message
  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeChatId) return;
    
    const newMsg: Message = {
      id: Date.now().toString(),
      sender: "You",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true,
      avatar: "YO"
    };
    
    setMessages([...messages, newMsg]);
    
    // Update last message in chat list
    setChats(chats.map(chat => 
      chat.id === activeChatId 
        ? { ...chat, lastMessage: newMessage, timestamp: 'Just now', unread: 0 } 
        : chat
    ));
    
    setNewMessage("");
    
    // Simulate receiving a response after a delay
    setTimeout(() => {
      const responseMsg: Message = {
        id: Date.now().toString(),
        sender: activeChat?.name || "User",
        content: "Thanks for your message! I'll get back to you soon.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: false,
        avatar: activeChat?.avatar || "US"
      };
      
      setMessages(prev => [...prev, responseMsg]);
      
      toast({
        title: "New Message",
        description: `${activeChat?.name} sent you a message`,
      });
    }, 3000);
  };
  
  // Handle creating a new group
  const handleCreateGroup = () => {
    toast({
      title: "Group Created",
      description: "Your new group has been created successfully",
    });
  };
  
  // Handle marking a notification as read
  const handleMarkNotificationRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };
  
  // Filter chats based on search term
  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Filter groups based on search term
  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Count unread notifications
  const unreadNotifications = notifications.filter(notification => !notification.isRead).length;
  
  // Render functions for each tab content
  const renderMessagesTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[60vh]">
      {/* Chat List */}
      <Card className="overflow-hidden md:col-span-1 flex flex-col">
        <CardHeader className="pb-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..." 
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="flex-grow overflow-auto px-2 pt-2 pb-0">
          {filteredChats.length === 0 ? (
            <p className="text-center text-muted-foreground py-6">No conversations found</p>
          ) : (
            <div className="space-y-1">
              {filteredChats.map((chat) => (
                <div 
                  key={chat.id}
                  onClick={() => setActiveChatId(chat.id)}
                  className={`flex items-start gap-3 p-2 rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground ${
                    activeChatId === chat.id ? 'bg-accent text-accent-foreground' : ''
                  }`}
                >
                  <Avatar className="h-10 w-10 flex items-center justify-center bg-primary">
                    <div className="text-sm font-semibold text-primary-foreground">{chat.avatar}</div>
                  </Avatar>
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-medium text-sm truncate">{chat.name}</h4>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{chat.timestamp}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && (
                    <span className="flex-shrink-0 h-5 w-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center">
                      {chat.unread}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="p-2">
          <Button className="w-full flex gap-2" variant="outline" size="sm">
            <UserPlus className="h-4 w-4" />
            <span>New Chat</span>
          </Button>
        </CardFooter>
      </Card>
      
      {/* Chat Messages */}
      <Card className="md:col-span-2 flex flex-col h-full">
        {activeChatId ? (
          <>
            <CardHeader className="pb-2 flex-shrink-0 border-b">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 flex items-center justify-center bg-primary">
                    <div className="text-sm font-semibold text-primary-foreground">
                      {activeChat?.avatar || "?"}
                    </div>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{activeChat?.name}</CardTitle>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow overflow-auto p-3 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-2 ${message.sender === "You" ? "justify-end" : ""}`}
                >
                  {message.sender !== "You" && (
                    <Avatar className="h-8 w-8 flex items-center justify-center bg-muted">
                      <div className="text-xs font-semibold">{message.avatar}</div>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[75%] px-3 py-2 rounded-lg ${
                      message.sender === "You"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs opacity-70 block text-right mt-1">
                      {message.timestamp}
                    </span>
                  </div>
                  {message.sender === "You" && (
                    <Avatar className="h-8 w-8 flex items-center justify-center bg-primary">
                      <div className="text-xs font-semibold text-primary-foreground">{message.avatar}</div>
                    </Avatar>
                  )}
                </div>
              ))}
            </CardContent>
            <CardFooter className="p-2 border-t">
              <div className="flex w-full gap-2">
                <Textarea
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="min-h-[42px] resize-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button 
                  variant="default" 
                  size="icon" 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Select a conversation to start messaging
          </div>
        )}
      </Card>
    </div>
  );
  
  const renderGroupsTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[60vh]">
      {/* Groups List */}
      <Card className="overflow-hidden md:col-span-1 flex flex-col">
        <CardHeader className="pb-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search groups..." 
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="flex-grow overflow-auto px-2 pt-2 pb-0">
          {filteredGroups.length === 0 ? (
            <p className="text-center text-muted-foreground py-6">No groups found</p>
          ) : (
            <div className="space-y-1">
              {filteredGroups.map((group) => (
                <div 
                  key={group.id}
                  className="flex items-start gap-3 p-2 rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground"
                >
                  <Avatar className="h-10 w-10 flex items-center justify-center bg-primary">
                    <div className="text-sm font-semibold text-primary-foreground">{group.avatar}</div>
                  </Avatar>
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-medium text-sm truncate">{group.name}</h4>
                      <span className="text-xs text-muted-foreground">{group.lastActive}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{group.members} members</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="p-2">
          <Button className="w-full flex gap-2" variant="outline" size="sm" onClick={handleCreateGroup}>
            <Plus className="h-4 w-4" />
            <span>New Group</span>
          </Button>
        </CardFooter>
      </Card>
      
      {/* Group Details */}
      <Card className="md:col-span-2 flex flex-col h-full">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-accent" />
            Create a New Group
          </CardTitle>
          <CardDescription>
            Create a group for your project, study session, or student club
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="group-name">Group Name</label>
            <Input id="group-name" placeholder="e.g., Finance Study Group" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="group-description">Description</label>
            <Textarea 
              id="group-description" 
              placeholder="What is this group for?" 
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Privacy</label>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">Public</Button>
              <Button variant="outline" className="flex-1">Private</Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Public groups can be found in search, private groups are invite-only
            </p>
          </div>
        </CardContent>
        <CardFooter className="mt-auto">
          <Button className="w-full" onClick={handleCreateGroup}>Create Group</Button>
        </CardFooter>
      </Card>
    </div>
  );
  
  const renderNotificationsTab = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-accent" />
          Notifications
        </CardTitle>
        <CardDescription>
          Stay updated on messages, payments, and deadlines
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {notifications.length === 0 ? (
          <p className="text-center text-muted-foreground py-6">No notifications</p>
        ) : (
          notifications.map((notification) => (
            <div 
              key={notification.id}
              className={`p-3 rounded-lg border ${!notification.isRead ? 'bg-accent/10' : ''}`}
              onClick={() => handleMarkNotificationRead(notification.id)}
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-3 items-start">
                  <div className={`rounded-full p-2 
                    ${notification.type === 'message' ? 'bg-blue-100 text-blue-700' : 
                      notification.type === 'payment' ? 'bg-green-100 text-green-700' :
                      notification.type === 'deadline' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-purple-100 text-purple-700'}`}
                  >
                    {notification.type === 'message' ? <MessageCircle className="h-4 w-4" /> :
                     notification.type === 'payment' ? <DollarSign className="h-4 w-4" /> :
                     notification.type === 'deadline' ? <Clock className="h-4 w-4" /> :
                     <Bell className="h-4 w-4" />}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{notification.title}</h4>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">{notification.timestamp}</div>
              </div>
              {!notification.isRead && (
                <div className="flex justify-end mt-2">
                  <Button variant="ghost" size="sm" onClick={() => handleMarkNotificationRead(notification.id)}>
                    Mark as read
                  </Button>
                </div>
              )}
            </div>
          ))
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">Mark all as read</Button>
      </CardFooter>
    </Card>
  );
  
  // Main render
  return (
    <div className="space-y-6">
      <Tabs defaultValue="messages" value={activeTab} onValueChange={setActiveTab} className="w-full">
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
          {renderMessagesTab()}
        </TabsContent>
        
        <TabsContent value="groups" className="mt-4">
          {renderGroupsTab()}
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-4">
          {renderNotificationsTab()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Import missing components
import { DollarSign, Clock } from "lucide-react";

export default Communication;
