
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Message } from "./ChatBot";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: Message;
  onFeedback: (messageId: string, feedbackType: "positive" | "negative") => void;
}

export const ChatMessage = ({ message, onFeedback }: ChatMessageProps) => {
  const isBot = message.sender === "bot";
  
  return (
    <div className={cn(
      "flex",
      isBot ? "justify-start" : "justify-end"
    )}>
      <div className={cn(
        "max-w-[80%] rounded-lg p-3",
        isBot 
          ? "bg-secondary text-secondary-foreground rounded-tl-none" 
          : "bg-primary text-primary-foreground rounded-tr-none"
      )}>
        {/* Loading animation */}
        {message.isLoading ? (
          <div className="flex space-x-1 items-center px-2">
            <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "0s" }} />
            <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "0.2s" }} />
            <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "0.4s" }} />
          </div>
        ) : (
          <>
            <div className="whitespace-pre-line">{message.content}</div>
            
            {/* Time */}
            <div className="text-xs mt-1 opacity-70">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            
            {/* Feedback buttons for bot messages */}
            {isBot && !message.isLoading && (
              <div className="flex justify-end mt-1 space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-6 w-6 rounded-full",
                    message.feedback === "positive" && "text-green-500"
                  )}
                  onClick={() => onFeedback(message.id, "positive")}
                  disabled={message.feedback !== null}
                >
                  <ThumbsUp className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-6 w-6 rounded-full",
                    message.feedback === "negative" && "text-red-500"
                  )}
                  onClick={() => onFeedback(message.id, "negative")}
                  disabled={message.feedback !== null}
                >
                  <ThumbsDown className="h-3 w-3" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
