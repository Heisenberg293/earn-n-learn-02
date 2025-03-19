
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PeerLending from "@/components/microfinance/PeerLending";
import Crowdfunding from "@/components/microfinance/Crowdfunding";
import EscrowSystem from "@/components/microfinance/EscrowSystem";
import BiddingSystem from "@/components/microfinance/BiddingSystem";

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
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container pb-16 mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Microfinance System</h1>
          <p className="text-muted-foreground mb-8">Financial tools to help students support each other</p>
          
          <Tabs defaultValue={activeTab} onValueChange={handleTabChange} value={activeTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
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
        </div>
      </div>
    </div>
  );
};

export default MicrofinanceSystem;
