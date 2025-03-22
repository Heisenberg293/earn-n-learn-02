
import { Avatar } from "@/components/ui/avatar";

export interface MessageItemProps {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  avatar: string;
  isCurrentUser: boolean;
}

const ChatMessage = ({ id, sender, content, timestamp, avatar, isCurrentUser }: MessageItemProps) => {
  return (
    <div
      className={`flex items-start gap-2 ${isCurrentUser ? "justify-end" : ""}`}
    >
      {!isCurrentUser && (
        <Avatar className="h-8 w-8 flex items-center justify-center bg-muted">
          <div className="text-xs font-semibold">{avatar}</div>
        </Avatar>
      )}
      <div
        className={`max-w-[75%] px-3 py-2 rounded-lg ${
          isCurrentUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        }`}
      >
        <p className="text-sm">{content}</p>
        <span className="text-xs opacity-70 block text-right mt-1">
          {timestamp}
        </span>
      </div>
      {isCurrentUser && (
        <Avatar className="h-8 w-8 flex items-center justify-center bg-primary">
          <div className="text-xs font-semibold text-primary-foreground">{avatar}</div>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
