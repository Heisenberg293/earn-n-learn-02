
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Handshake, CreditCard, Coins, DollarSign, Shield } from "lucide-react";

interface PaymentMethod {
  id: string;
  name: string;
  last4?: string;
  type: "card" | "bank" | "escrow";
  isDefault: boolean;
}

const SkillPaymentConnection = () => {
  const [activeTab, setActiveTab] = useState("direct");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: "pm1", name: "Visa", last4: "4242", type: "card", isDefault: true },
    { id: "pm2", name: "Bank Account", last4: "1234", type: "bank", isDefault: false },
    { id: "pm3", name: "Escrow Service", type: "escrow", isDefault: false },
  ]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>(paymentMethods[0].id);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAcceptJob = () => {
    if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid payment amount",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Job accepted",
        description: `Payment of $${paymentAmount} has been processed using ${paymentMethods.find(pm => pm.id === selectedPaymentMethod)?.name}`,
      });
      setPaymentAmount("");
    }, 1500);
  };

  const handleConnectEscrow = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Connected to escrow",
        description: "Your job has been connected to the escrow system",
      });
    }, 1500);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Handshake className="h-5 w-5 text-primary" />
          Job Payment Connection
        </CardTitle>
        <CardDescription>
          Connect accepted jobs with your preferred payment method
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="direct" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="direct">Direct Payment</TabsTrigger>
            <TabsTrigger value="escrow">Escrow Service</TabsTrigger>
          </TabsList>
          
          <TabsContent value="direct" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="payment-amount">Payment Amount ($)</Label>
              <Input
                id="payment-amount"
                type="number"
                placeholder="100.00"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <div className="grid gap-2">
                {paymentMethods
                  .filter(pm => pm.type !== "escrow")
                  .map((method) => (
                    <div 
                      key={method.id}
                      className={`flex items-center justify-between p-3 border rounded-md cursor-pointer ${
                        selectedPaymentMethod === method.id ? "border-primary bg-primary/5" : "border-input"
                      }`}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                    >
                      <div className="flex items-center gap-3">
                        {method.type === "card" ? (
                          <CreditCard className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <Coins className="h-5 w-5 text-muted-foreground" />
                        )}
                        <div>
                          <p className="font-medium">{method.name}</p>
                          {method.last4 && <p className="text-xs text-muted-foreground">****{method.last4}</p>}
                        </div>
                      </div>
                      {method.isDefault && (
                        <span className="text-xs bg-secondary px-2 py-1 rounded">Default</span>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="escrow" className="pt-4">
            <div className="rounded-md border border-amber-200 bg-amber-50 p-4 mb-4">
              <div className="flex gap-3">
                <Shield className="h-6 w-6 text-amber-600 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-amber-800">Payment Protection</h4>
                  <p className="text-sm text-amber-700 mt-1">
                    Using the escrow service protects both parties. Funds are only released when the job is completed
                    and both parties are satisfied.
                  </p>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              When you connect a job to the escrow system, the payment will be held safely until the work is completed.
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        {activeTab === "direct" ? (
          <Button 
            className="w-full" 
            onClick={handleAcceptJob}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Accept Job & Process Payment"}
          </Button>
        ) : (
          <Button 
            className="w-full" 
            onClick={handleConnectEscrow}
            disabled={isLoading}
          >
            {isLoading ? "Connecting..." : "Connect to Escrow System"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default SkillPaymentConnection;
