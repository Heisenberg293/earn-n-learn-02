
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Shield, Check, X, Clock, MessageSquare } from "lucide-react";

interface EscrowTransaction {
  id: string;
  title: string;
  description: string;
  amount: number;
  buyer: string;
  seller: string;
  status: "pending" | "in-progress" | "completed" | "disputed" | "refunded";
  createdAt: string;
}

const MOCK_TRANSACTIONS: EscrowTransaction[] = [
  {
    id: "1",
    title: "Website Design Project",
    description: "Creating a personal portfolio website with responsive design",
    amount: 350,
    buyer: "You",
    seller: "Michael Chen",
    status: "in-progress",
    createdAt: "2023-03-15"
  },
  {
    id: "2",
    title: "Math Tutoring Sessions",
    description: "5 hours of calculus tutoring",
    amount: 125,
    buyer: "Sarah Park",
    seller: "You",
    status: "pending",
    createdAt: "2023-03-20"
  },
  {
    id: "3",
    title: "Custom Illustration",
    description: "Digital illustration for student magazine cover",
    amount: 200,
    buyer: "Alex Rodriguez",
    seller: "Taylor Kim",
    status: "completed",
    createdAt: "2023-03-10"
  }
];

const EscrowSystem = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [transactions, setTransactions] = useState<EscrowTransaction[]>(MOCK_TRANSACTIONS);
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleCreateEscrow = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !amount || !recipient) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newTransaction: EscrowTransaction = {
      id: Date.now().toString(),
      title,
      description,
      amount: parseFloat(amount),
      buyer: "You",
      seller: recipient,
      status: "pending",
      createdAt: new Date().toISOString().split('T')[0]
    };

    setTransactions([newTransaction, ...transactions]);
    
    toast({
      title: "Escrow created",
      description: `Your escrow transaction for $${amount} has been created`
    });
    
    // Reset form
    setTitle("");
    setDescription("");
    setAmount("");
    setRecipient("");
  };

  const handleUpdateStatus = (id: string, newStatus: EscrowTransaction["status"]) => {
    setTransactions(transactions.map(transaction => 
      transaction.id === id ? { ...transaction, status: newStatus } : transaction
    ));
    
    const statusMessages = {
      "in-progress": "You have accepted this transaction",
      "completed": "Transaction has been marked as completed",
      "disputed": "You have disputed this transaction",
      "refunded": "Amount has been refunded to the buyer"
    };
    
    toast({
      title: "Status updated",
      description: statusMessages[newStatus]
    });
  };

  const handleSendMessage = (id: string) => {
    if (!message) {
      toast({
        title: "Empty message",
        description: "Please enter a message to send",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Message sent",
      description: "Your message has been sent to the other party"
    });
    
    setMessage("");
  };

  const getStatusBadge = (status: EscrowTransaction["status"]) => {
    const statusStyles = {
      "pending": "bg-yellow-100 text-yellow-800",
      "in-progress": "bg-blue-100 text-blue-800",
      "completed": "bg-green-100 text-green-800",
      "disputed": "bg-red-100 text-red-800",
      "refunded": "bg-gray-100 text-gray-800"
    };
    
    const statusLabels = {
      "pending": "Pending Acceptance",
      "in-progress": "In Progress",
      "completed": "Completed",
      "disputed": "Disputed",
      "refunded": "Refunded"
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs ${statusStyles[status]}`}>
        {statusLabels[status]}
      </span>
    );
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-accent" />
            Create Escrow Transaction
          </CardTitle>
          <CardDescription>
            An escrow holds payment until work is completed and both parties are satisfied
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleCreateEscrow}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Transaction Title</Label>
              <Input 
                id="title" 
                placeholder="e.g. Logo Design Project" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount ($)</Label>
                <Input 
                  id="amount" 
                  placeholder="e.g. 150" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                  min="5"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient</Label>
                <Input 
                  id="recipient" 
                  placeholder="Name of service provider" 
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Describe what services or goods are being exchanged..." 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Create Escrow</Button>
          </CardFooter>
        </form>
      </Card>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Shield className="h-5 w-5 text-accent" />
          Your Escrow Transactions
        </h3>
        
        {transactions.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No escrow transactions at the moment</p>
        ) : (
          <div className="grid gap-6">
            {transactions.map((transaction) => (
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
                      <div className="mt-1">{getStatusBadge(transaction.status)}</div>
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
                          onClick={() => handleSendMessage(transaction.id)}
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
                        onClick={() => handleUpdateStatus(transaction.id, "completed")}
                        className="flex-1"
                      >
                        <Check className="h-4 w-4 mr-1" /> Release Payment
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => handleUpdateStatus(transaction.id, "disputed")}
                        className="flex-1"
                      >
                        <X className="h-4 w-4 mr-1" /> Dispute
                      </Button>
                    </>
                  )}
                  
                  {transaction.seller === "You" && transaction.status === "pending" && (
                    <>
                      <Button 
                        onClick={() => handleUpdateStatus(transaction.id, "in-progress")}
                        className="flex-1"
                      >
                        <Check className="h-4 w-4 mr-1" /> Accept
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => handleUpdateStatus(transaction.id, "refunded")}
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EscrowSystem;
