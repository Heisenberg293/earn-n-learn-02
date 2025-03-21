
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, PlusCircle, Smile } from "lucide-react";
import { Project } from "./types";

interface ProjectChatProps {
  project: Project;
}

interface ChatMessage {
  id: string;
  content: string;
  senderId: string;
  timestamp: Date;
}

const ProjectChat = ({ project }: ProjectChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'Hey team! I just uploaded the latest wireframes. Could you take a look?',
      senderId: project.members[0].id,
      timestamp: new Date(Date.now() - 3600000 * 2) // 2 hours ago
    },
    {
      id: '2',
      content: 'Sure, I'll check them out and provide feedback this afternoon.',
      senderId: project.members.length > 1 ? project.members[1].id : project.members[0].id,
      timestamp: new Date(Date.now() - 3600000) // 1 hour ago
    },
    {
      id: '3',
      content: 'Great! Also, we need to discuss the project timeline in our next meeting.',
      senderId: project.members[0].id,
      timestamp: new Date(Date.now() - 1800000) // 30 minutes ago
    }
  ]);
  
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    
    const message: ChatMessage = {
      id: String(Date.now()),
      content: newMessage,
      senderId: project.members[0].id, // Assume first member is current user
      timestamp: new Date()
    };
    
    setMessages([...messages, message]);
    setNewMessage("");
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="flex flex-col h-[600px] bg-muted/30 rounded-lg">
      <div className="p-4 border-b">
        <h2 className="font-medium">Team Chat</h2>
        <p className="text-sm text-muted-foreground">
          {project.members.length} members
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const sender = project.members.find(m => m.id === message.senderId);
          
          return (
            <div key={message.id} className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={sender?.avatar} alt={sender?.name} />
                <AvatarFallback>{sender?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-medium">{sender?.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-sm mt-1">{message.content}</p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t bg-card">
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="h-10 w-10">
            <PlusCircle className="h-5 w-5" />
          </Button>
          <div className="relative flex-1">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pr-10"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
            >
              <Smile className="h-5 w-5" />
            </Button>
          </div>
          <Button onClick={handleSendMessage} disabled={newMessage.trim() === ""}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectChat;
