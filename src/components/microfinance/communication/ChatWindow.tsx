
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Message, Chat } from "../types/communication-types";
import { Phone, MoreVertical } from "lucide-react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

interface ChatWindowProps {
  activeChat: Chat | undefined;
  messages: Message[];
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
}

const ChatWindow = ({ 
  activeChat, 
  messages, 
  newMessage, 
  setNewMessage, 
  handleSendMessage 
}: ChatWindowProps) => {
  if (!activeChat) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Select a conversation to start messaging
      </div>
    );
  }

  return (
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
          <ChatMessage
            key={message.id}
            id={message.id}
            sender={message.sender}
            content={message.content}
            timestamp={message.timestamp}
            isRead={message.isRead}
            avatar={message.avatar}
            isCurrentUser={message.sender === "You"}
          />
        ))}
      </CardContent>
      <CardFooter className="p-2 border-t">
        <ChatInput 
          newMessage={newMessage} 
          setNewMessage={setNewMessage} 
          handleSendMessage={handleSendMessage} 
        />
      </CardFooter>
    </>
  );
};

export default ChatWindow;
