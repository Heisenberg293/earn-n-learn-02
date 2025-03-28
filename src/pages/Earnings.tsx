import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, ArrowDownRight, DollarSign, CreditCard, Calendar, Filter, Clock, ChevronRight, Download, ArrowLeft, Package, Coins } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import FinancialTools from "@/components/microfinance/FinancialTools";

const data = [
  {
    name: "Jan",
    amount: 400
  },
  {
    name: "Feb",
    amount: 300
  },
  {
    name: "Mar",
    amount: 500
  },
  {
    name: "Apr",
    amount: 200
  },
  {
    name: "May",
    amount: 700
  },
  {
    name: "Jun",
    amount: 400
  },
  {
    name: "Jul",
    amount: 500
  },
  {
    name: "Aug",
    amount: 600
  },
  {
    name: "Sep",
    amount: 800
  },
  {
    name: "Oct",
    amount: 0
  },
  {
    name: "Nov",
    amount: 0
  },
  {
    name: "Dec",
    amount: 0
  }
];

const transactions = [
  {
    id: "t1",
    title: "Website Development",
    date: "Oct 20, 2023",
    amount: 750,
    status: "completed",
    type: "income"
  },
  {
    id: "t2",
    title: "Logo Design Project",
    date: "Oct 15, 2023",
    amount: 250,
    status: "completed",
    type: "income"
  },
  {
    id: "t3",
    title: "Content Writing",
    date: "Oct 10, 2023",
    amount: 180,
    status: "processing",
    type: "income"
  },
  {
    id: "t4",
    title: "Withdrawal to Bank Account",
    date: "Oct 5, 2023",
    amount: 500,
    status: "completed",
    type: "withdrawal"
  },
  {
    id: "t5",
    title: "Mobile App UI Design",
    date: "Sep 28, 2023",
    amount: 400,
    status: "completed",
    type: "income"
  },
  {
    id: "t6",
    title: "Withdrawal to PayPal",
    date: "Sep 20, 2023",
    amount: 350,
    status: "completed",
    type: "withdrawal"
  }
];

const Earnings = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeCategory, setActiveCategory] = useState("all");
  const navigate = useNavigate();

  const jobTransactions = transactions.filter(t => 
    t.title.includes("Website") || 
    t.title.includes("Logo") || 
    t.title.includes("Mobile App")
  );

  const skillTransactions = transactions.filter(t => 
    t.title.includes("Content Writing")
  );

  const materialTransactions = [{
    id: "m1",
    title: "Calculus Textbook Sale",
    date: "Oct 24, 2023",
    amount: 30,
    status: "completed",
    type: "income"
  }, {
    id: "m2",
    title: "Programming Books Bundle",
    date: "Sep 15, 2023",
    amount: 75,
    status: "completed",
    type: "income"
  }];

  const getFilteredTransactions = () => {
    switch (activeCategory) {
      case "jobs":
        return jobTransactions;
      case "skills":
        return skillTransactions;
      case "materials":
        return materialTransactions;
      default:
        return [...jobTransactions, ...skillTransactions, ...materialTransactions];
    }
  };

  return <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-24 pb-16 py-[35px]">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Earnings Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Track your income, withdrawals, and pending payments
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Total Balance
              </CardTitle>
              <DollarSign className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,250.00</div>
              <p className="text-xs text-gray-500">
                +2.5% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Pending
              </CardTitle>
              <Clock className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$350.00</div>
              <p className="text-xs text-gray-500">
                3 pending payments
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                This Month
              </CardTitle>
              <Calendar className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$430.00</div>
              <p className="text-xs text-gray-500">
                +5.2% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Total Withdrawn
              </CardTitle>
              <CreditCard className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$900.00</div>
              <p className="text-xs text-gray-500">
                Last: Oct 5, 2023
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
              <TabsTrigger value="tools">Financial Tools</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8">
                    <Filter className="h-3.5 w-3.5 mr-2" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      Date Range
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Status
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Amount
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button variant="outline" size="sm" className="h-8">
                <Download className="h-3.5 w-3.5 mr-2" />
                Export
              </Button>
            </div>
          </div>
          
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Earnings Overview</CardTitle>
                <CardDescription>
                  Your earnings over the last 12 months
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={value => `$${value}`} />
                    <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
                    <Tooltip formatter={value => [`$${value}`, "Amount"]} />
                    <Area type="monotone" dataKey="amount" stroke="#16a34a" fillOpacity={1} fill="url(#colorAmount)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">Earnings by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md border">
                      <div className="flex items-center">
                        <div className="bg-blue-100 rounded-full p-3 mr-4">
                          <DollarSign className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Jobs</h4>
                          <p className="text-sm text-gray-500">Web development, design, etc.</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-xl">$980</p>
                        <p className="text-sm text-gray-500">78% of earnings</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md border">
                      <div className="flex items-center">
                        <div className="bg-purple-100 rounded-full p-3 mr-4">
                          <Coins className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Skills</h4>
                          <p className="text-sm text-gray-500">Tutoring, writing, etc.</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-xl">$180</p>
                        <p className="text-sm text-gray-500">14% of earnings</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md border">
                      <div className="flex items-center">
                        <div className="bg-amber-100 rounded-full p-3 mr-4">
                          <Package className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Materials</h4>
                          <p className="text-sm text-gray-500">Books, equipment, etc.</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-xl">$105</p>
                        <p className="text-sm text-gray-500">8% of earnings</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Pending Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {transactions.filter(t => t.status === 'processing').map(transaction => <div className="flex items-center" key={transaction.id}>
                          <div className="mr-4 rounded-full p-2 bg-yellow-100">
                            <Clock className="h-4 w-4 text-yellow-600" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">
                              {transaction.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              {transaction.date}
                            </p>
                          </div>
                          <div className="font-medium text-yellow-600">
                            +${transaction.amount}
                          </div>
                        </div>)}
                    {transactions.filter(t => t.status === 'processing').length === 0 && <div className="text-center py-4">
                        <p className="text-gray-500 text-sm">No pending payments</p>
                      </div>}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>All Transactions</CardTitle>
                  <CardDescription>
                    View your complete transaction history
                  </CardDescription>
                </div>
                <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-auto">
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="jobs">Jobs</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                    <TabsTrigger value="materials">Materials</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {getFilteredTransactions().map(transaction => <div key={transaction.id}>
                      <div className="flex items-center">
                        <div className={`mr-4 rounded-full p-2 ${transaction.type === 'income' ? 'bg-green-100' : 'bg-gray-100'}`}>
                          {transaction.type === 'income' ? <ArrowUpRight className="h-4 w-4 text-green-600" /> : <ArrowDownRight className="h-4 w-4 text-gray-600" />}
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {transaction.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {transaction.date} • {transaction.status}
                          </p>
                        </div>
                        <div className={`font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-gray-600'}`}>
                          {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                        </div>
                        <Button variant="ghost" size="sm" className="ml-2">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                      <Separator className="my-4" />
                    </div>)}
                  
                  {getFilteredTransactions().length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No transactions found in this category</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="withdrawals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Withdrawal Methods</CardTitle>
                <CardDescription>
                  Manage your withdrawal options
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-4" />
                      <div>
                        <p className="font-medium">Bank Account</p>
                        <p className="text-sm text-gray-500">**** 1234</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Withdraw</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-4" />
                      <div>
                        <p className="font-medium">PayPal</p>
                        <p className="text-sm text-gray-500">user@example.com</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Withdraw</Button>
                  </div>
                  
                  <div className="text-center mt-6">
                    <Link to="/profile/payment-methods" className="text-green-600 hover:text-green-700 text-sm font-medium">
                      + Add Payment Method
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Withdrawal History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {transactions.filter(t => t.type === 'withdrawal').map(transaction => <div key={transaction.id}>
                        <div className="flex items-center">
                          <div className="mr-4 rounded-full p-2 bg-gray-100">
                            <ArrowDownRight className="h-4 w-4 text-gray-600" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">
                              {transaction.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              {transaction.date} • {transaction.status}
                            </p>
                          </div>
                          <div className="font-medium text-gray-600">
                            -${transaction.amount}
                          </div>
                        </div>
                        <Separator className="my-4" />
                      </div>)}
                  {transactions.filter(t => t.type === 'withdrawal').length === 0 && <div className="text-center py-4">
                      <p className="text-gray-500 text-sm">No withdrawal history</p>
                    </div>}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tools" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Financial Tools</CardTitle>
                <CardDescription>
                  Tools to help you manage your finances and plan for the future
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FinancialTools />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>;
};

export default Earnings;
