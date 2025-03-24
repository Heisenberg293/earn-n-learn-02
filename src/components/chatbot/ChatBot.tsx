import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Minimize2, Maximize2, Send, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { ChatMessage } from "./ChatMessage";
import { generateChatResponse } from "./chatService";
export type MessageSource = "job" | "skill" | "marketplace" | "general";
export type Message = {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  isLoading?: boolean;
  feedback?: "positive" | "negative" | null;
  source?: {
    type: MessageSource;
    id?: string;
    title?: string;
  };
};
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeSourceFilter, setActiveSourceFilter] = useState<MessageSource | "all">("all");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {
    toast
  } = useToast();

  // Add initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: "welcome",
        content: "Hi! How can I help you today? I can assist with job recommendations, answer questions about the platform, or help you find skills that match your needs.",
        sender: "bot",
        timestamp: new Date(),
        feedback: null,
        source: {
          type: "general",
          title: "Welcome"
        }
      }]);
    }
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth"
      });
    }
  }, [messages]);
  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim()) return;
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
      feedback: null,
      source: {
        type: "general",
        title: "User Message"
      }
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Add temporary loading message
    const loadingMsgId = "loading-" + Date.now();
    setMessages(prev => [...prev, {
      id: loadingMsgId,
      content: "",
      sender: "bot",
      timestamp: new Date(),
      isLoading: true,
      feedback: null
    }]);
    try {
      const response = await generateChatResponse(inputMessage, messages);

      // Remove loading message and add response
      setMessages(prev => prev.filter(msg => msg.id !== loadingMsgId).concat({
        id: Date.now().toString(),
        content: response,
        sender: "bot",
        timestamp: new Date(),
        feedback: null,
        source: {
          type: "general",
          title: "Assistant"
        }
      }));
    } catch (error) {
      console.error("Error generating response:", error);

      // Remove loading message and add error message
      setMessages(prev => prev.filter(msg => msg.id !== loadingMsgId).concat({
        id: Date.now().toString(),
        content: "Sorry, I encountered an issue while processing your request. Please try again.",
        sender: "bot",
        timestamp: new Date(),
        feedback: null,
        source: {
          type: "general",
          title: "System"
        }
      }));
      toast({
        title: "Error",
        description: "Failed to generate a response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsTyping(false);
    }
  };
  const handleFeedback = (messageId: string, feedbackType: "positive" | "negative") => {
    setMessages(prev => prev.map(msg => msg.id === messageId ? {
      ...msg,
      feedback: feedbackType
    } : msg));
    toast({
      title: feedbackType === "positive" ? "Thanks for the feedback!" : "Sorry about that",
      description: feedbackType === "positive" ? "We're glad this was helpful." : "We'll work on improving our responses.",
      duration: 3000
    });
  };

  // Filter messages based on the active source filter
  const filteredMessages = messages.filter(message => activeSourceFilter === "all" || message.source?.type === activeSourceFilter);
  return <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Icon Button */}
      {!isOpen && <Button onClick={toggleChat} className="h-14 w-14 rounded-full shadow-lg bg-green-600 hover:bg-green-700 transition-all" size="icon">
          <MessageCircle className="h-6 w-6 text-white" />
          <Badge className="absolute -top-1 -right-1 bg-red-500">1</Badge>
        </Button>}
      
      {/* Chat Window */}
      {isOpen && <Card className={`w-full sm:w-[380px] shadow-lg transition-all overflow-hidden ${isMinimized ? 'h-16' : 'h-[500px]'}`}>
          <CardHeader className="py-3 px-4 flex flex-row items-center justify-between border-b bg-primary text-primary-foreground">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <h3 className="font-medium text-sm">Earn-n-Learn Assistant</h3>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full hover:bg-primary-foreground/20" onClick={toggleMinimize}>
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full hover:bg-primary-foreground/20" onClick={toggleChat}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          {!isMinimized && <>
              {/* Source filter tabs */}
              
          
              <CardContent className="p-4 overflow-y-auto h-[calc(100%-160px)]">
                <div className="space-y-4">
                  {filteredMessages.map(message => <ChatMessage key={message.id} message={message} onFeedback={handleFeedback} />)}
                  {/* This div is used for auto-scrolling */}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              
              <CardFooter className="border-t p-3">
                <form onSubmit={handleSendMessage} className="flex items-center w-full gap-2">
                  <Input type="text" placeholder="Type a message..." value={inputMessage} onChange={e => setInputMessage(e.target.value)} className="flex-grow" />
                  <Button type="submit" size="icon" disabled={!inputMessage.trim() || isTyping} className="h-10 w-10 rounded-full">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </>}
        </Card>}
    </div>;
};
export default ChatBot;