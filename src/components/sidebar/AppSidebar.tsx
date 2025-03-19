
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSidebar } from '@/components/ui/sidebar';
import { Sidebar, SidebarContent, SidebarFooter } from '@/components/ui/sidebar';
import SidebarHeader from './SidebarHeader';
import SidebarMenuGroup from './SidebarMenuGroup';
import SidebarFooterSection from './SidebarFooterSection';
import { createSidebarData } from './SidebarData';
import Cookies from 'js-cookie';

const SIDEBAR_STATE_COOKIE = 'sidebar-state';

const AppSidebar = () => {
  const location = useLocation();
  const { toggleSidebar, state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  // Initialize with stored state from cookie if available
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>(() => {
    const storedState = Cookies.get(SIDEBAR_STATE_COOKIE);
    return storedState ? JSON.parse(storedState) : {
      'job-hub': true,
      'browse-job': false,
      'microfinance': false
    };
  });

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const toggleMenu = (menu: string) => {
    const newState = {
      ...openMenus,
      [menu]: !openMenus[menu]
    };
    
    setOpenMenus(newState);
    
    // Store state in cookie for persistence
    Cookies.set(SIDEBAR_STATE_COOKIE, JSON.stringify(newState), { expires: 30 });
  };

  // Close all submenus when sidebar is collapsed
  useEffect(() => {
    if (isCollapsed) {
      const allClosed = Object.keys(openMenus).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {} as Record<string, boolean>);
      
      setOpenMenus(allClosed);
    }
  }, [isCollapsed]);

  const { jobHubItems, browseJobItems, microfinanceItems, socialItems } = createSidebarData(isActive);

  return (
    <Sidebar>
      <SidebarHeader isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

      <SidebarContent>
        <SidebarMenuGroup 
          label="Main" 
          items={[jobHubItems, browseJobItems, microfinanceItems]} 
          openMenus={openMenus}
          toggleMenu={toggleMenu}
          isCollapsed={isCollapsed}
        />

        <SidebarMenuGroup 
          label="Social" 
          items={socialItems} 
          openMenus={openMenus}
          toggleMenu={toggleMenu}
          isCollapsed={isCollapsed}
        />
      </SidebarContent>

      <SidebarFooter>
        <SidebarFooterSection isActive={isActive} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
