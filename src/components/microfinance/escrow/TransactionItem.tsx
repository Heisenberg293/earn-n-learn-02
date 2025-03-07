
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, X, Clock, MessageSquare } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { EscrowTransaction } from "./types";

interface TransactionItemProps {
  transaction: EscrowTransaction;
  onUpdateStatus: (id: string, newStatus: EscrowTransaction["status"]) => void;
  onSendMessage: (id: string, message: string) => void;
}

const TransactionItem = ({ transaction, onUpdateStatus, onSendMessage }: TransactionItemProps) => {
  const [message, setMessage] = useState("");

  const handleMessageSend = () => {
    onSendMessage(transaction.id, message);
    setMessage("");
  };

  return (
    <Card key={transaction.id}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{transaction.title}</CardTitle>
            <CardDescription className="mt-1">
              {transaction.buyer === "You" ? `To: ${transaction.seller}` : `From: ${transaction.buyer}`}
            </CardDescription>
          </div>
          <div className="text-right">
            <span className="font-semibold">${transaction.amount}</span>
            <div className="mt-1"><StatusBadge status={transaction.status} /></div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2 space-y-3">
        <p className="text-sm">{transaction.description}</p>
        
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" /> Created on {transaction.createdAt}
        </div>
        
        {transaction.status !== "completed" && transaction.status !== "refunded" && (
          <div className="pt-2 space-y-2">
            <Label htmlFor={`message-${transaction.id}`} className="text-sm">Send a message</Label>
            <div className="flex gap-2">
              <Input
                id={`message-${transaction.id}`}
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
              />
              <Button 
                size="sm" 
                onClick={handleMessageSend}
                className="flex-shrink-0"
              >
                <MessageSquare className="h-4 w-4 mr-1" /> Send
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        {transaction.buyer === "You" && transaction.status === "in-progress" && (
          <>
            <Button 
              onClick={() => onUpdateStatus(transaction.id, "completed")}
              className="flex-1"
            >
              <Check className="h-4 w-4 mr-1" /> Release Payment
            </Button>
            <Button 
              variant="outline" 
              onClick={() => onUpdateStatus(transaction.id, "disputed")}
              className="flex-1"
            >
              <X className="h-4 w-4 mr-1" /> Dispute
            </Button>
          </>
        )}
        
        {transaction.seller === "You" && transaction.status === "pending" && (
          <>
            <Button 
              onClick={() => onUpdateStatus(transaction.id, "in-progress")}
              className="flex-1"
            >
              <Check className="h-4 w-4 mr-1" /> Accept
            </Button>
            <Button 
              variant="outline" 
              onClick={() => onUpdateStatus(transaction.id, "refunded")}
              className="flex-1"
            >
              <X className="h-4 w-4 mr-1" /> Decline
            </Button>
          </>
        )}
        
        {(transaction.status === "completed" || transaction.status === "refunded") && (
          <Button variant="outline" disabled className="w-full">Transaction Finalized</Button>
        )}
        
        {transaction.status === "disputed" && (
          <Button variant="outline" disabled className="w-full">Pending Resolution</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default TransactionItem;
