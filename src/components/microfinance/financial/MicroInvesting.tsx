
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Coins, TrendingUp, TrendingDown, PlusCircle, Info, BarChart3, DollarSign } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { mockInvestments } from "../data/financial-data";
import { Investment } from "../types/financial-types";

const MicroInvesting = () => {
  const [investments, setInvestments] = useState<Investment[]>(mockInvestments);
  const [newInvestment, setNewInvestment] = useState<Partial<Investment>>({
    name: "",
    type: "etf",
    amount: 0,
    shares: 0,
    purchasePrice: 0,
    currentPrice: 0,
    description: ""
  });
  const [showInfoCard, setShowInfoCard] = useState(true);
  
  // Mock historical data for chart
  const [historicalData] = useState([
    { name: "Jan", value: 100 },
    { name: "Feb", value: 105 },
    { name: "Mar", value: 98 },
    { name: "Apr", value: 110 },
    { name: "May", value: 115 },
    { name: "Jun", value: 120 },
  ]);

  const handleAddInvestment = () => {
    if (!newInvestment.name || !newInvestment.amount || !newInvestment.shares || !newInvestment.purchasePrice) {
      toast({
        title: "Incomplete information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const investment: Investment = {
      id: `i${Date.now()}`,
      name: newInvestment.name || "",
      type: newInvestment.type || "etf",
      amount: Number(newInvestment.amount) || 0,
      shares: Number(newInvestment.shares) || 0,
      purchasePrice: Number(newInvestment.purchasePrice) || 0,
      currentPrice: Number(newInvestment.currentPrice) || Number(newInvestment.purchasePrice) || 0,
      purchaseDate: new Date().toISOString().split('T')[0],
      description: newInvestment.description || ""
    };

    setInvestments([...investments, investment]);
    setNewInvestment({
      name: "",
      type: "etf",
      amount: 0,
      shares: 0,
      purchasePrice: 0,
      currentPrice: 0,
      description: ""
    });
    
    toast({
      title: "Investment added",
      description: `Added investment in ${investment.name}`
    });
  };

  const getTotalInvestment = () => {
    return investments.reduce((total, investment) => total + investment.amount, 0);
  };

  const getCurrentValue = () => {
    return investments.reduce((total, investment) => {
      return total + (investment.shares * investment.currentPrice);
    }, 0);
  };

  const getGainLoss = () => {
    return getCurrentValue() - getTotalInvestment();
  };

  const getGainLossPercentage = () => {
    const totalInvestment = getTotalInvestment();
    if (totalInvestment === 0) return 0;
    return (getGainLoss() / totalInvestment) * 100;
  };

  const getInvestmentTypeIcon = (type: string) => {
    switch (type) {
      case "stock": return "📈";
      case "mutual-fund": return "📊";
      case "etf": return "📉";
      case "crypto": return "🪙";
      default: return "💰";
    }
  };

  const calculateReturn = (investment: Investment) => {
    const currentValue = investment.shares * investment.currentPrice;
    const originalValue = investment.amount;
    const gainLoss = currentValue - originalValue;
    const percentage = originalValue > 0 ? (gainLoss / originalValue) * 100 : 0;
    
    return {
      value: gainLoss,
      percentage
    };
  };

  const getPriceChangeClass = (current: number, purchase: number) => {
    if (current > purchase) return "text-green-500";
    if (current < purchase) return "text-red-500";
    return "";
  };

  return (
    <div className="space-y-8">
      {showInfoCard && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <CardTitle className="text-blue-800 flex items-center gap-2">
                <Info className="h-5 w-5" /> Getting Started with Micro-Investing
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowInfoCard(false)}>
                Dismiss
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-blue-700 mb-2">Micro-investing allows you to invest small amounts of money regularly, even just a few dollars at a time.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-white p-3 rounded-md shadow-sm">
                <h4 className="font-medium text-blue-800">Low Minimums</h4>
                <p className="text-sm text-blue-600">Start with as little as $5-$10</p>
              </div>
              <div className="bg-white p-3 rounded-md shadow-sm">
                <h4 className="font-medium text-blue-800">Diversification</h4>
                <p className="text-sm text-blue-600">Spread risk across many investments</p>
              </div>
              <div className="bg-white p-3 rounded-md shadow-sm">
                <h4 className="font-medium text-blue-800">Educational</h4>
                <p className="text-sm text-blue-600">Learn investing basics with low risk</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Coins className="text-purple-500" /> Total Invested
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${getTotalInvestment().toFixed(2)}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="text-blue-500" /> Current Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${getCurrentValue().toFixed(2)}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              {getGainLoss() >= 0 ? (
                <TrendingUp className="text-green-500" />
              ) : (
                <TrendingDown className="text-red-500" />
              )}
              Gain/Loss
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${getGainLoss() >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {getGainLoss() >= 0 ? '+' : ''}{getGainLoss().toFixed(2)} ({getGainLossPercentage().toFixed(2)}%)
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Performance</CardTitle>
          <CardDescription>Historical value of your investments</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={historicalData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, 'Value']} />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Add New Investment</CardTitle>
          <CardDescription>Track a new stock, ETF, or mutual fund</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="investment-name">Investment Name</Label>
                <Input
                  id="investment-name"
                  placeholder="e.g., Tech Growth ETF"
                  value={newInvestment.name || ""}
                  onChange={(e) => setNewInvestment({ ...newInvestment, name: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="investment-type">Type</Label>
                <select
                  id="investment-type"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={newInvestment.type || "etf"}
                  onChange={(e) => setNewInvestment({ ...newInvestment, type: e.target.value as any })}
                >
                  <option value="stock">Stock</option>
                  <option value="etf">ETF</option>
                  <option value="mutual-fund">Mutual Fund</option>
                  <option value="crypto">Cryptocurrency</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="investment-amount">Amount Invested ($)</Label>
                <Input
                  id="investment-amount"
                  type="number"
                  placeholder="100"
                  value={newInvestment.amount || ""}
                  onChange={(e) => setNewInvestment({ ...newInvestment, amount: parseFloat(e.target.value) })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="shares">Number of Shares</Label>
                <Input
                  id="shares"
                  type="number"
                  placeholder="5"
                  value={newInvestment.shares || ""}
                  onChange={(e) => setNewInvestment({ ...newInvestment, shares: parseFloat(e.target.value) })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="purchase-price">Purchase Price per Share ($)</Label>
                <Input
                  id="purchase-price"
                  type="number"
                  placeholder="20"
                  value={newInvestment.purchasePrice || ""}
                  onChange={(e) => {
                    const price = parseFloat(e.target.value);
                    setNewInvestment({ 
                      ...newInvestment, 
                      purchasePrice: price,
                      // Also set current price to the same as purchase price initially
                      currentPrice: price
                    });
                  }}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="current-price">Current Price per Share ($)</Label>
              <Input
                id="current-price"
                type="number"
                placeholder="21"
                value={newInvestment.currentPrice || ""}
                onChange={(e) => setNewInvestment({ ...newInvestment, currentPrice: parseFloat(e.target.value) })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Input
                id="description"
                placeholder="Notes about this investment"
                value={newInvestment.description || ""}
                onChange={(e) => setNewInvestment({ ...newInvestment, description: e.target.value })}
              />
            </div>
            
            <Button onClick={handleAddInvestment} className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Investment
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Your Portfolio</h3>
        
        {investments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {investments.map((investment) => {
              const returns = calculateReturn(investment);
              
              return (
                <Card key={investment.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <span>{getInvestmentTypeIcon(investment.type)}</span> {investment.name}
                        </CardTitle>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full mt-1 inline-block">
                          {investment.type.toUpperCase()}
                        </span>
                      </div>
                      <div className={`font-bold ${returns.value >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {returns.value >= 0 ? '+' : ''}{returns.value.toFixed(2)} ({returns.percentage.toFixed(2)}%)
                      </div>
                    </div>
                    <CardDescription>{investment.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Shares</div>
                        <div>{investment.shares}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Purchase Date</div>
                        <div>{new Date(investment.purchaseDate).toLocaleDateString()}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Purchase Price</div>
                        <div>${investment.purchasePrice.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Current Price</div>
                        <div className={getPriceChangeClass(investment.currentPrice, investment.purchasePrice)}>
                          ${investment.currentPrice.toFixed(2)}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Amount Invested</div>
                        <div>${investment.amount.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Current Value</div>
                        <div>${(investment.shares * investment.currentPrice).toFixed(2)}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">You don't have any investments yet. Add one to get started!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MicroInvesting;
