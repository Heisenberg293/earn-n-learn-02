
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import PeerLending from "@/components/microfinance/PeerLending";
import Crowdfunding from "@/components/microfinance/Crowdfunding";
import EscrowSystem from "@/components/microfinance/EscrowSystem";

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
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="peer-lending">Peer-to-Peer Lending</TabsTrigger>
              <TabsTrigger value="crowdfunding">Crowdfunding</TabsTrigger>
              <TabsTrigger value="escrow">Escrow System</TabsTrigger>
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
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MicrofinanceSystem;
