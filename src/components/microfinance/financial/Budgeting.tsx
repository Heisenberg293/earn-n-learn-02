
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, ResponsiveContainer, Cell, Legend, Tooltip } from "recharts";
import { PlusCircle, DollarSign, TrendingUp, TrendingDown, Filter } from "lucide-react";
import { mockBudgetData } from "../data/financial-data";
import { BudgetItem } from "../types/financial-types";
import { toast } from "@/hooks/use-toast";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const Budgeting = () => {
  const [budget, setBudget] = useState(mockBudgetData);
  const [newTransaction, setNewTransaction] = useState<Partial<BudgetItem>>({
    category: "",
    amount: 0,
    type: "expense",
    description: ""
  });
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">("all");

  const handleAddTransaction = () => {
    if (!newTransaction.category || !newTransaction.amount) {
      toast({
        title: "Incomplete information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newItem: BudgetItem = {
      id: `t${Date.now()}`,
      category: newTransaction.category || "",
      amount: Number(newTransaction.amount) || 0,
      type: newTransaction.type || "expense",
      date: new Date().toISOString().split('T')[0],
      description: newTransaction.description || ""
    };

    const updatedBudget = { ...budget };
    
    if (newItem.type === "income") {
      updatedBudget.income += newItem.amount;
    } else {
      updatedBudget.expenses += newItem.amount;
    }
    
    updatedBudget.balance = updatedBudget.income - updatedBudget.expenses;
    updatedBudget.transactions = [newItem, ...updatedBudget.transactions];
    
    setBudget(updatedBudget);
    setNewTransaction({
      category: "",
      amount: 0,
      type: "expense",
      description: ""
    });
    
    toast({
      title: "Transaction added",
      description: `Added ${newItem.type}: $${newItem.amount} for ${newItem.category}`
    });
  };

  const filteredTransactions = budget.transactions.filter(transaction => {
    if (filterType === "all") return true;
    return transaction.type === filterType;
  });
  
  // Prepare data for pie chart
  const expensesByCategory = budget.transactions
    .filter(t => t.type === "expense")
    .reduce((acc, curr) => {
      const existingCategory = acc.find(item => item.name === curr.category);
      if (existingCategory) {
        existingCategory.value += curr.amount;
      } else {
        acc.push({ name: curr.category, value: curr.amount });
      }
      return acc;
    }, [] as { name: string; value: number }[]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="text-green-500" /> Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${budget.income.toFixed(2)}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingDown className="text-red-500" /> Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${budget.expenses.toFixed(2)}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="text-blue-500" /> Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${budget.balance.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Add New Transaction</CardTitle>
          <CardDescription>Record your income or expenses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="transaction-type">Type</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={newTransaction.type === "income" ? "default" : "outline"}
                    onClick={() => setNewTransaction({ ...newTransaction, type: "income" })}
                  >
                    Income
                  </Button>
                  <Button
                    type="button"
                    variant={newTransaction.type === "expense" ? "default" : "outline"}
                    onClick={() => setNewTransaction({ ...newTransaction, type: "expense" })}
                  >
                    Expense
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Amount"
                  value={newTransaction.amount || ""}
                  onChange={(e) => setNewTransaction({ ...newTransaction, amount: parseFloat(e.target.value) })}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                placeholder="e.g., Groceries, Salary, Rent"
                value={newTransaction.category || ""}
                onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Input
                id="description"
                placeholder="Add more details"
                value={newTransaction.description || ""}
                onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
              />
            </div>
            
            <Button onClick={handleAddTransaction} className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Transaction
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
            <CardDescription>Where your money is going</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expensesByCategory}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {expensesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              <div className="flex items-center gap-2 mt-2">
                <span>Filter:</span>
                <Button 
                  variant={filterType === "all" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setFilterType("all")}
                >
                  All
                </Button>
                <Button 
                  variant={filterType === "income" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setFilterType("income")}
                >
                  Income
                </Button>
                <Button 
                  variant={filterType === "expense" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setFilterType("expense")}
                >
                  Expenses
                </Button>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-[250px] overflow-y-auto pr-2">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <p className="font-medium">{transaction.category}</p>
                      <p className="text-sm text-muted-foreground">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">{transaction.date}</p>
                    </div>
                    <div className={`font-bold ${transaction.type === "income" ? "text-green-500" : "text-red-500"}`}>
                      {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4">No transactions found</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Budgeting;
