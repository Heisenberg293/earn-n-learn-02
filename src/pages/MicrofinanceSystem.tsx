import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PeerLending from "@/components/microfinance/PeerLending";
import Crowdfunding from "@/components/microfinance/Crowdfunding";
import EscrowSystem from "@/components/microfinance/EscrowSystem";
import BiddingSystem from "@/components/microfinance/BiddingSystem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Bell, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const MicrofinanceSystem = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get tab from URL search params or default to peer-lending
  const getTabFromUrl = () => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get("tab") || "peer-lending";
  };
  const [activeTab, setActiveTab] = useState(getTabFromUrl());

  // Update tab when URL changes
  useEffect(() => {
    setActiveTab(getTabFromUrl());
  }, [location.search]);

  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "peer-lending") {
      navigate("/microfinance");
    } else {
      navigate(`/microfinance?tab=${value}`);
    }
  };
  return <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white border-b mb-6 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Campus Microfinance System</h1>
            <p className="text-gray-600 text-sm">Financial tools to help students support each other</p>
          </div>
        </div>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Microfinance Dashboard</CardTitle>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search..." className="h-9 w-[200px] md:w-[300px] pl-10 pr-4 rounded-md bg-gray-50 border-gray-200" />
            </div>
            <Button variant="ghost" size="icon" className="h-9 w-9 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">2</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Filter className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={activeTab} onValueChange={handleTabChange} value={activeTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-6 max-w-2xl">
              <TabsTrigger value="peer-lending">Peer-to-Peer Lending</TabsTrigger>
              <TabsTrigger value="crowdfunding">Crowdfunding</TabsTrigger>
              <TabsTrigger value="escrow">Escrow System</TabsTrigger>
              <TabsTrigger value="bidding">Bidding System</TabsTrigger>
            </TabsList>
            
            <TabsContent value="peer-lending">
              <PeerLending />
            </TabsContent>
            
            <TabsContent value="crowdfunding">
              <Crowdfunding />
            </TabsContent>
            
            <TabsContent value="escrow">
              <EscrowSystem />
            </TabsContent>
            
            <TabsContent value="bidding">
              <BiddingSystem />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>;
};
export default MicrofinanceSystem;