
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Chat, Message } from "../types/communication-types";
import { MOCK_CHATS, MOCK_MESSAGES } from "../data/mock-data";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";

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
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[60vh]">
      {/* Chat List */}
      <ChatList 
        chats={chats}
        activeChatId={activeChatId}
        setActiveChatId={setActiveChatId}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      
      {/* Chat Messages */}
      <Card className="md:col-span-2 flex flex-col h-full">
        <ChatWindow 
          activeChat={activeChat}
          messages={messages}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
        />
      </Card>
    </div>
  );
};

export default DirectMessages;
