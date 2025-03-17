
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  DollarSign, 
  ArrowDownCircle, 
  ArrowUpCircle, 
  Calendar, 
  ChevronRight,
  BarChart3
} from "lucide-react";

const Earnings = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const earningsHistory = [
    {
      id: 1,
      title: "Website Development for E-commerce",
      amount: 750,
      date: "2023-11-25",
      status: "paid",
      client: "TechVentures Inc.",
    },
    {
      id: 2,
      title: "Logo Design",
      amount: 150,
      date: "2023-11-15",
      status: "paid",
      client: "StartupBrands",
    },
    {
      id: 3,
      title: "Content Writing for Blog",
      amount: 200,
      date: "2023-10-30",
      status: "paid",
      client: "BlogMasters",
    },
    {
      id: 4,
      title: "SEO Optimization",
      amount: 300,
      date: "2023-10-10",
      status: "paid",
      client: "GrowthDigital",
    },
  ];
  
  const pendingEarnings = [
    {
      id: 5,
      title: "Mobile App UI Design",
      amount: 500,
      date: "2023-11-20",
      status: "pending",
      client: "AppSolutions",
      estimatedPayment: "2023-12-10",
    },
    {
      id: 6,
      title: "JavaScript Bug Fixes",
      amount: 250,
      date: "2023-11-28",
      status: "pending",
      client: "CodeFix",
      estimatedPayment: "2023-12-15",
    },
  ];
  
  const withdrawalHistory = [
    {
      id: 1,
      amount: 600,
      date: "2023-11-05",
      method: "Bank Transfer",
      status: "completed",
    },
    {
      id: 2,
      amount: 300,
      date: "2023-10-02",
      method: "PayPal",
      status: "completed",
    },
  ];
  
  const totalEarned = earningsHistory.reduce((sum, item) => sum + item.amount, 0);
  const totalPending = pendingEarnings.reduce((sum, item) => sum + item.amount, 0);
  const totalWithdrawn = withdrawalHistory.reduce((sum, item) => sum + item.amount, 0);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex items-center">
            <CreditCard className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <h1 className="text-3xl font-bold">Earnings</h1>
              <p className="text-gray-600 mt-1">Manage your earnings and withdrawal history</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab("history")}>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Total Earnings</h3>
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <p className="text-3xl font-bold text-green-600">${totalEarned.toFixed(2)}</p>
                <p className="text-sm text-gray-500 mt-2">Lifetime earnings</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab("pending")}>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Pending</h3>
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <p className="text-3xl font-bold text-amber-600">${totalPending.toFixed(2)}</p>
                <p className="text-sm text-gray-500 mt-2">Awaiting payment</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab("withdrawals")}>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Withdrawn</h3>
                  <ArrowUpCircle className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-blue-600">${totalWithdrawn.toFixed(2)}</p>
                <p className="text-sm text-gray-500 mt-2">Total withdrawn</p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs 
            defaultValue="overview" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-8 grid grid-cols-4 w-full md:w-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="history">Earnings History</TabsTrigger>
              <TabsTrigger value="pending">Pending Payments</TabsTrigger>
              <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Earnings Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center">
                        <BarChart3 className="h-48 w-48 text-gray-300" />
                      </div>
                      <p className="text-center text-sm text-gray-500">
                        Earnings visualization will be shown here
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[...pendingEarnings, ...earningsHistory].slice(0, 3).map((item) => (
                          <div key={item.id} className="flex justify-between items-start pb-3 border-b">
                            <div>
                              <p className="font-medium text-sm">{item.title}</p>
                              <p className="text-xs text-gray-500">{item.date}</p>
                            </div>
                            <div className="flex items-center">
                              <Badge 
                                className={item.status === "paid" 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-amber-100 text-amber-800"
                                }
                              >
                                {item.status}
                              </Badge>
                              <span className="ml-2 font-semibold">${item.amount}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        variant="link" 
                        className="mt-4 w-full text-center"
                        onClick={() => setActiveTab("history")}
                      >
                        View All Transactions
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Earnings History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {earningsHistory.length === 0 ? (
                      <div className="text-center py-8">
                        <DollarSign className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-gray-700 mb-2">No earnings yet</h3>
                        <p className="text-gray-500">
                          Complete jobs to start earning money
                        </p>
                      </div>
                    ) : (
                      <Accordion type="single" collapsible className="w-full">
                        {earningsHistory.map((item) => (
                          <AccordionItem key={item.id} value={`item-${item.id}`}>
                            <AccordionTrigger className="py-4 px-1">
                              <div className="flex justify-between items-center w-full pr-4">
                                <div className="text-left">
                                  <p className="font-medium">{item.title}</p>
                                  <p className="text-xs text-gray-500">{item.date}</p>
                                </div>
                                <span className="font-bold text-green-600">${item.amount.toFixed(2)}</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-1 pb-4">
                              <div className="bg-gray-50 p-4 rounded-md">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-gray-500">Client</p>
                                    <p className="font-medium">{item.client}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">Payment Date</p>
                                    <p className="font-medium">{item.date}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">Status</p>
                                    <Badge className="bg-green-100 text-green-800">
                                      {item.status}
                                    </Badge>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">Amount</p>
                                    <p className="font-bold text-green-600">${item.amount.toFixed(2)}</p>
                                  </div>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="pending">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingEarnings.length === 0 ? (
                      <div className="text-center py-8">
                        <Clock className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-gray-700 mb-2">No pending payments</h3>
                        <p className="text-gray-500">
                          You don't have any pending payments at the moment
                        </p>
                      </div>
                    ) : (
                      pendingEarnings.map((item) => (
                        <div key={item.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-semibold">{item.title}</h3>
                              <p className="text-sm text-gray-500">Client: {item.client}</p>
                            </div>
                            <Badge className="bg-amber-100 text-amber-800">
                              Pending
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm mb-2">
                            <div>
                              <p className="text-gray-500">Completion Date</p>
                              <p>{item.date}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Expected Payment</p>
                              <p>{item.estimatedPayment}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Amount</p>
                              <p className="font-semibold text-amber-600">${item.amount.toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="withdrawals">
              <Card>
                <CardHeader>
                  <CardTitle>Withdrawal History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {withdrawalHistory.length === 0 ? (
                      <div className="text-center py-8">
                        <ArrowUpCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-gray-700 mb-2">No withdrawals yet</h3>
                        <p className="text-gray-500">
                          You haven't made any withdrawals
                        </p>
                      </div>
                    ) : (
                      withdrawalHistory.map((item) => (
                        <div key={item.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-2">
                              <ArrowUpCircle className="h-5 w-5 text-blue-600" />
                              <h3 className="font-semibold">Withdrawal</h3>
                            </div>
                            <Badge className="bg-green-100 text-green-800">
                              {item.status}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                            <div>
                              <p className="text-gray-500">Date</p>
                              <p>{item.date}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Method</p>
                              <p>{item.method}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Amount</p>
                              <p className="font-semibold text-blue-600">${item.amount.toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                    
                    <div className="mt-6">
                      <Button className="w-full">
                        <ArrowUpCircle className="h-4 w-4 mr-2" />
                        Withdraw Funds
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Earnings;
