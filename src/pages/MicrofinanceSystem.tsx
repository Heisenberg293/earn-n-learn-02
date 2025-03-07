
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import PeerLending from "@/components/microfinance/PeerLending";
import Crowdfunding from "@/components/microfinance/Crowdfunding";
import EscrowSystem from "@/components/microfinance/EscrowSystem";
import Communication from "@/components/microfinance/Communication";
import FinancialTools from "@/components/microfinance/FinancialTools";
import BiddingSystem from "@/components/microfinance/BiddingSystem";

const MicrofinanceSystem = () => {
  const [activeTab, setActiveTab] = useState("peer-lending");
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container pt-24 pb-16 mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Microfinance System</h1>
          <p className="text-muted-foreground mb-8">Financial tools to help students support each other</p>
          
          <Tabs defaultValue="peer-lending" onValueChange={setActiveTab} value={activeTab} className="w-full">
            <TabsList className="grid grid-cols-6 mb-8">
              <TabsTrigger value="peer-lending">Peer-to-Peer Lending</TabsTrigger>
              <TabsTrigger value="crowdfunding">Crowdfunding</TabsTrigger>
              <TabsTrigger value="escrow">Escrow System</TabsTrigger>
              <TabsTrigger value="bidding">Bidding System</TabsTrigger>
              <TabsTrigger value="communication">Communication</TabsTrigger>
              <TabsTrigger value="financial-tools">Financial Tools</TabsTrigger>
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
            
            <TabsContent value="communication">
              <Communication />
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

export default MicrofinanceSystem;
