
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, BarChart2, Clock, DollarSign, LineChart, PieChart, TrendingUp } from "lucide-react";
import FinancialTools from "@/components/microfinance/FinancialTools";

const Earnings = () => {
  const [activeTab, setActiveTab] = useState("summary");

  // Sample data
  const recentEarnings = [
    {
      job: "Website Development",
      amount: "$450",
      date: "Oct 15, 2023",
      status: "Paid"
    },
    {
      job: "Logo Design",
      amount: "$120",
      date: "Oct 10, 2023",
      status: "Paid"
    },
    {
      job: "Content Writing",
      amount: "$85",
      date: "Oct 5, 2023",
      status: "Paid"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 px-4 mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold">Earnings & Financial Tools</h1>
                <p className="text-gray-600 mt-1">Track your income and manage your finances</p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="summary" onValueChange={setActiveTab} value={activeTab} className="w-full">
            <TabsList className="mb-8 grid grid-cols-3 w-full max-w-lg">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="financial-tools">Financial Tools</TabsTrigger>
            </TabsList>
            
            <TabsContent value="summary">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total Earnings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <DollarSign className="h-6 w-6 text-green-600" />
                      <div className="text-2xl font-bold">$1,250.00</div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      +12% from last month
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Pending Payments
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <Clock className="h-6 w-6 text-amber-600" />
                      <div className="text-2xl font-bold">$320.00</div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      From 3 ongoing jobs
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Jobs Completed
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <BarChart className="h-6 w-6 text-blue-600" />
                      <div className="text-2xl font-bold">15</div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      5 in the last 30 days
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle>Recent Earnings</CardTitle>
                    <CardDescription>Your most recent completed jobs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentEarnings.map((earning, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                          <div>
                            <div className="font-medium">{earning.job}</div>
                            <div className="text-sm text-muted-foreground">{earning.date}</div>
                          </div>
                          <div className="font-semibold text-green-600">{earning.amount}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle>Earnings Breakdown</CardTitle>
                    <CardDescription>By category</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center h-[250px]">
                    <PieChart className="h-16 w-16 text-gray-300 mb-4" />
                    <p className="text-sm text-muted-foreground text-center">
                      Visualization of your earnings by job category will appear here
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Earnings History</CardTitle>
                  <CardDescription>Complete record of your earnings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex flex-col items-center justify-center">
                    <LineChart className="h-16 w-16 text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Earnings Over Time</h3>
                    <p className="text-sm text-muted-foreground text-center max-w-md">
                      Visualizations and detailed history of your earnings will appear here as you complete more jobs.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="financial-tools">
              <FinancialTools />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
