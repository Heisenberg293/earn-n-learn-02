
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Shield } from "lucide-react";
import { EscrowTransaction } from "./types";

interface EscrowFormProps {
  onCreateEscrow: (transaction: EscrowTransaction) => void;
}

const EscrowForm = ({ onCreateEscrow }: EscrowFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
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

    onCreateEscrow(newTransaction);
    
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

  return (
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
  );
};

export default EscrowForm;
