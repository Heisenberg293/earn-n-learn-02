
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import {
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton
} from '@/components/ui/sidebar';

interface SubMenuItemProps {
  title: string;
  path: string;
  isActive: (path: string) => boolean;
  hasChildren?: boolean;
}

const subMenuVariants = {
  hidden: { 
    height: 0, 
    opacity: 0,
    transition: { 
      duration: 0.2,
      ease: "easeInOut"
    }
  },
  visible: { 
    height: "auto", 
    opacity: 1,
    transition: { 
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

const SidebarSubMenu = ({ subItems }: { subItems: SubMenuItemProps[] }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={subMenuVariants}
    >
      <SidebarMenuSub>
        {subItems.map((item) => (
          <SidebarMenuSubItem key={item.title}>
            <SidebarMenuSubButton 
              asChild 
              isActive={item.isActive(item.path)}
            >
              <Link to={item.path} className="flex justify-between">
                <span>{item.title}</span>
                {item.hasChildren && <ChevronRight className="h-3.5 w-3.5" />}
              </Link>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
        ))}
      </SidebarMenuSub>
    </motion.div>
  );
};

export default SidebarSubMenu;
