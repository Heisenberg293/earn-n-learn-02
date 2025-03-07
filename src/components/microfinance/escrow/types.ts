
export interface EscrowTransaction {
  id: string;
  title: string;
  description: string;
  amount: number;
  buyer: string;
  seller: string;
  status: "pending" | "in-progress" | "completed" | "disputed" | "refunded";
  createdAt: string;
}
