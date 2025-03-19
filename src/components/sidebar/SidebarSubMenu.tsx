
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from '@/components/ui/sidebar';

interface SubMenuItemProps {
  title: string;
  path: string;
  isActive: (path: string) => boolean;
}

const SidebarSubMenu = ({ subItems }: { subItems: SubMenuItemProps[] }) => {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <SidebarMenuSub>
        {subItems.map((item) => (
          <SidebarMenuSubItem key={item.title}>
            <SidebarMenuSubButton 
              asChild 
              isActive={item.isActive(item.path)}
            >
              <Link to={item.path}>
                <span>{item.title}</span>
              </Link>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
        ))}
      </SidebarMenuSub>
    </motion.div>
  );
};

export default SidebarSubMenu;
