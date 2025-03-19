
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppSidebar from "./AppSidebar";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden fixed bottom-4 right-4 z-50 rounded-full shadow-lg bg-green-600 text-white hover:bg-green-700">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-64">
        <div className="h-screen">
          <AppSidebar />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
