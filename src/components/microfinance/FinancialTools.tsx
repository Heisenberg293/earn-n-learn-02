
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Budgeting from "./financial/Budgeting";
import SavingsGoals from "./financial/SavingsGoals";
import MicroInvesting from "./financial/MicroInvesting";

const FinancialTools = () => {
  const [activeTab, setActiveTab] = useState("budgeting");

  return (
    <div>
      <Tabs defaultValue="budgeting" onValueChange={setActiveTab} value={activeTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="budgeting">Budgeting</TabsTrigger>
          <TabsTrigger value="savings">Savings Goals</TabsTrigger>
          <TabsTrigger value="investing">Micro-Investing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="budgeting">
          <Budgeting />
        </TabsContent>
        
        <TabsContent value="savings">
          <SavingsGoals />
        </TabsContent>
        
        <TabsContent value="investing">
          <MicroInvesting />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialTools;
