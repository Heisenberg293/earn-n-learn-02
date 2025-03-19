
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  SidebarMenuItem as SidebarMenuItemUI,
  SidebarMenuButton
} from '@/components/ui/sidebar';
import SidebarSubMenu from './SidebarSubMenu';

interface SubMenuItemProps {
  title: string;
  path: string;
  isActive: (path: string) => boolean;
}

export interface MenuItemProps {
  title: string;
  icon: React.ReactNode;
  path?: string;
  tooltip?: string;
  subItems?: SubMenuItemProps[];
  isActive: (path: string) => boolean;
  isOpen?: boolean;
  onToggle?: () => void;
}

const SidebarMenuItem = ({ item }: { item: MenuItemProps }) => {
  if (item.subItems && item.subItems.length > 0) {
    return (
      <SidebarMenuItemUI key={item.title}>
        <SidebarMenuButton 
          tooltip={item.tooltip}
          onClick={item.onToggle}
          className="flex justify-between w-full"
        >
          <div className="flex items-center">
            {item.icon}
            <span>{item.title}</span>
          </div>
          <motion.div
            initial={false}
            animate={{ rotate: item.isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </SidebarMenuButton>
        
        {item.isOpen && <SidebarSubMenu subItems={item.subItems} />}
      </SidebarMenuItemUI>
    );
  } else {
    return (
      <SidebarMenuItemUI key={item.title}>
        <SidebarMenuButton 
          asChild 
          isActive={item.path ? item.isActive(item.path) : false}
          tooltip={item.tooltip}
        >
          <Link to={item.path || "#"}>
            {item.icon}
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItemUI>
    );
  }
};

export default SidebarMenuItem;
