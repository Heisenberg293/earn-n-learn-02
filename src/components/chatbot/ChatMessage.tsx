
import { ThumbsUp, ThumbsDown, Briefcase, BookOpen, ShoppingCart, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Message } from "./ChatBot";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface ChatMessageProps {
  message: Message;
  onFeedback: (messageId: string, feedbackType: "positive" | "negative") => void;
}

// Helper function to get the appropriate icon for each source type
const getSourceIcon = (sourceType: string | undefined) => {
  switch (sourceType) {
    case "job":
      return <Briefcase className="h-3 w-3" />;
    case "skill":
      return <BookOpen className="h-3 w-3" />;
    case "marketplace":
      return <ShoppingCart className="h-3 w-3" />;
    case "general":
    default:
      return <Info className="h-3 w-3" />;
  }
};

// Helper function to get the appropriate color for each source type
const getSourceColor = (sourceType: string | undefined): string => {
  switch (sourceType) {
    case "job":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    case "skill":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case "marketplace":
      return "bg-purple-100 text-purple-800 hover:bg-purple-200";
    case "general":
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
};

// Helper function to get the label for each source type
const getSourceLabel = (sourceType: string | undefined): string => {
  switch (sourceType) {
    case "job":
      return "Job";
    case "skill":
      return "Skill";
    case "marketplace":
      return "Market";
    case "general":
    default:
      return "General";
  }
};

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
        {/* Source tag for the message */}
        {message.source && !message.isLoading && (
          <div className="mb-1 flex justify-start">
            <Badge 
              variant="outline" 
              className={cn(
                "text-xs px-2 py-0.5 h-5 rounded-full flex items-center gap-1 font-normal", 
                getSourceColor(message.source?.type)
              )}
              asChild={message.source.id ? true : false}
            >
              {message.source.id ? (
                <Link to={`/task-hub?id=${message.source.id}`}>
                  {getSourceIcon(message.source?.type)}
                  <span>{message.source.title || getSourceLabel(message.source?.type)}</span>
                </Link>
              ) : (
                <>
                  {getSourceIcon(message.source?.type)}
                  <span>{message.source.title || getSourceLabel(message.source?.type)}</span>
                </>
              )}
            </Badge>
          </div>
        )}
      
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
