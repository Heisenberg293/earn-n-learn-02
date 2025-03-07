
import { Shield } from "lucide-react";
import TransactionItem from "./TransactionItem";
import { EscrowTransaction } from "./types";

interface TransactionsListProps {
  transactions: EscrowTransaction[];
  onUpdateStatus: (id: string, newStatus: EscrowTransaction["status"]) => void;
  onSendMessage: (id: string, message: string) => void;
}

const TransactionsList = ({ transactions, onUpdateStatus, onSendMessage }: TransactionsListProps) => {
  return (
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
            <TransactionItem 
              key={transaction.id}
              transaction={transaction}
              onUpdateStatus={onUpdateStatus}
              onSendMessage={onSendMessage}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionsList;
