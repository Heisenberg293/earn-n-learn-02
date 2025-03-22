
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserPlus } from "lucide-react";
import { Chat } from "../types/communication-types";

interface ChatListProps {
  chats: Chat[];
  activeChatId: string | null;
  setActiveChatId: (id: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const ChatList = ({
  chats,
  activeChatId,
  setActiveChatId,
  searchTerm,
  setSearchTerm,
}: ChatListProps) => {
  // Filter chats based on search term
  const filteredChats = chats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
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
                  activeChatId === chat.id ? "bg-accent text-accent-foreground" : ""
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
  );
};

export default ChatList;
