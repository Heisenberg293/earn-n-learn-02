
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, Send, Phone, MoreVertical, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Chat, Message } from "../types/communication-types";
import { MOCK_CHATS, MOCK_MESSAGES } from "../data/mock-data";

const DirectMessages = () => {
  const [activeChatId, setActiveChatId] = useState<string | null>("1");
  const [chats, setChats] = useState<Chat[]>(MOCK_CHATS);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  // Active chat
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
  
  // Filter chats based on search term
  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
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
                    <h3 className="text-base font-semibold">{activeChat?.name}</h3>
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
};

export default DirectMessages;
