
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import EscrowForm from "./escrow/EscrowForm";
import TransactionsList from "./escrow/TransactionsList";
import { EscrowTransaction } from "./escrow/types";
import { MOCK_TRANSACTIONS } from "./escrow/mock-data";

const EscrowSystem = () => {
  const [transactions, setTransactions] = useState<EscrowTransaction[]>(MOCK_TRANSACTIONS);
  const { toast } = useToast();

  const handleCreateEscrow = (newTransaction: EscrowTransaction) => {
    setTransactions([newTransaction, ...transactions]);
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

  const handleSendMessage = (id: string, message: string) => {
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
  };

  return (
    <div className="space-y-8">
      <EscrowForm onCreateEscrow={handleCreateEscrow} />
      <TransactionsList 
        transactions={transactions}
        onUpdateStatus={handleUpdateStatus}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default EscrowSystem;
