
import { Menu, PanelLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { SidebarHeader as SidebarHeaderUI } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

interface SidebarHeaderProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const SidebarHeader = ({ isCollapsed, toggleSidebar }: SidebarHeaderProps) => {
  return (
    <SidebarHeaderUI>
      <div className="flex items-center justify-between p-2">
        <motion.div 
          className="flex items-center"
          animate={{ opacity: isCollapsed ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <h1 className="text-xl font-bold">earn-n-learn</h1>
        </motion.div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="transition-all duration-300 hover:bg-accent hover:text-accent-foreground"
        >
          {isCollapsed ? <Menu className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
        </Button>
      </div>
    </SidebarHeaderUI>
  );
};

export default SidebarHeader;
