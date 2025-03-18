
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PeerLending from "@/components/microfinance/PeerLending";
import Crowdfunding from "@/components/microfinance/Crowdfunding";
import EscrowSystem from "@/components/microfinance/EscrowSystem";
import BiddingSystem from "@/components/microfinance/BiddingSystem";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const MicrofinanceSystem = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const tabParam = queryParams.get('tab');
  
  const [activeTab, setActiveTab] = useState(tabParam || "peer-lending");
  
  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/microfinance?tab=${value}`);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="mr-2" 
              onClick={() => navigate(-1)}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">Microfinance System</h1>
          </div>
          <p className="text-muted-foreground mb-8">Financial tools to help students support each other</p>
          
          <Tabs 
            defaultValue="peer-lending" 
            onValueChange={handleTabChange} 
            value={activeTab} 
            className="w-full"
          >
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
