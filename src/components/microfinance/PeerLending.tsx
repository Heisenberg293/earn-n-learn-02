
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { PiggyBank, DollarSign, Clock, Shield } from "lucide-react";

interface LoanRequest {
  id: string;
  borrower: string;
  amount: number;
  purpose: string;
  term: string;
  interest: number;
  status: "pending" | "funded" | "repaid";
}

const MOCK_LOAN_REQUESTS: LoanRequest[] = [
  {
    id: "1",
    borrower: "Alex Johnson",
    amount: 200,
    purpose: "Textbooks for Computer Science course",
    term: "3 months",
    interest: 5,
    status: "pending"
  },
  {
    id: "2",
    borrower: "Jamie Smith",
    amount: 150,
    purpose: "Art supplies for final project",
    term: "2 months",
    interest: 3,
    status: "pending"
  },
  {
    id: "3",
    borrower: "Casey Williams",
    amount: 300,
    purpose: "Laptop repair",
    term: "4 months",
    interest: 6,
    status: "funded"
  }
];

const PeerLending = () => {
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [term, setTerm] = useState("3 months");
  const [interest, setInterest] = useState("5");
  const [loanRequests, setLoanRequests] = useState<LoanRequest[]>(MOCK_LOAN_REQUESTS);
  const { toast } = useToast();

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !purpose || !term) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newRequest: LoanRequest = {
      id: Date.now().toString(),
      borrower: "You",
      amount: parseFloat(amount),
      purpose,
      term,
      interest: parseFloat(interest),
      status: "pending"
    };

    setLoanRequests([newRequest, ...loanRequests]);
    
    toast({
      title: "Loan request submitted",
      description: `Your request for $${amount} has been posted`
    });
    
    // Reset form
    setAmount("");
    setPurpose("");
  };

  const handleFundLoan = (id: string) => {
    setLoanRequests(loanRequests.map(loan => 
      loan.id === id ? { ...loan, status: "funded" } : loan
    ));
    
    toast({
      title: "Loan funded",
      description: "You have successfully funded this loan request"
    });
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-accent" />
            Request a Loan
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmitRequest}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount ($)</Label>
                <Input 
                  id="amount" 
                  placeholder="e.g. 200" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                  min="10"
                  max="1000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="term">Repayment Term</Label>
                <Select value={term} onValueChange={setTerm}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2 weeks">2 weeks</SelectItem>
                    <SelectItem value="1 month">1 month</SelectItem>
                    <SelectItem value="2 months">2 months</SelectItem>
                    <SelectItem value="3 months">3 months</SelectItem>
                    <SelectItem value="6 months">6 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="interest">Interest Rate (%)</Label>
                <Select value={interest} onValueChange={setInterest}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select interest rate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0% (interest-free)</SelectItem>
                    <SelectItem value="2">2%</SelectItem>
                    <SelectItem value="3">3%</SelectItem>
                    <SelectItem value="5">5%</SelectItem>
                    <SelectItem value="7">7%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose</Label>
              <Textarea 
                id="purpose" 
                placeholder="What do you need this loan for?" 
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Submit Loan Request</Button>
          </CardFooter>
        </form>
      </Card>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <PiggyBank className="h-5 w-5 text-accent" />
          Current Loan Requests
        </h3>
        
        {loanRequests.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No loan requests available at the moment</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {loanRequests.map((loan) => (
              <Card key={loan.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">${loan.amount}</CardTitle>
                    <div className={`px-2 py-1 rounded-full text-xs 
                      ${loan.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        loan.status === 'funded' ? 'bg-green-100 text-green-800' : 
                        'bg-blue-100 text-blue-800'}
                    `}>
                      {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="font-medium">{loan.borrower}</p>
                  <p className="text-sm text-muted-foreground mb-2">{loan.purpose}</p>
                  <div className="flex items-center gap-6 text-sm">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {loan.term}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" /> {loan.interest}% interest
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  {loan.status === "pending" && loan.borrower !== "You" ? (
                    <Button 
                      onClick={() => handleFundLoan(loan.id)} 
                      className="w-full"
                    >
                      Fund This Loan
                    </Button>
                  ) : loan.borrower === "You" ? (
                    <Button variant="outline" className="w-full" disabled>Your Request</Button>
                  ) : (
                    <Button variant="outline" className="w-full" disabled>Already Funded</Button>
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

export default PeerLending;
