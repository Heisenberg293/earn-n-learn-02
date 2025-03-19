
import { Menu, PanelLeft, CircleDot } from 'lucide-react';
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
          {!isCollapsed && (
            <motion.h1 
              className="text-xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              earn-n-learn
            </motion.h1>
          )}
          {isCollapsed && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex justify-center w-full"
            >
              <CircleDot className="h-7 w-7" />
            </motion.div>
          )}
        </motion.div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="transition-all duration-300 hover:bg-accent hover:text-accent-foreground z-10"
        >
          {isCollapsed ? <Menu className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
        </Button>
      </div>
    </SidebarHeaderUI>
  );
};

export default SidebarHeader;
