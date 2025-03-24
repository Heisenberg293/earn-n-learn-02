import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, ChevronRight, Menu, LogOut } from 'lucide-react';
import { SidebarMenuItems, MenuItem, SubMenuItem } from './SidebarData';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AuthContext } from '@/context/AuthContext';
const AppSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const {
    logout
  } = useContext(AuthContext);

  // Initialize expanded state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('sidebar-expanded');
    if (savedState !== null) {
      setExpanded(savedState === 'true');
    }
  }, []);

  // Save expanded state to localStorage and dispatch event
  const toggleSidebar = () => {
    const newExpandedState = !expanded;
    setExpanded(newExpandedState);
    localStorage.setItem('sidebar-expanded', String(newExpandedState));

    // Dispatch event for other components to listen to
    window.dispatchEvent(new CustomEvent('sidebarStateChange', {
      detail: {
        expanded: newExpandedState
      }
    }));
  };
  const toggleSubmenu = (title: string) => {
    if (openSubmenu === title) {
      setOpenSubmenu(null);
    } else {
      setOpenSubmenu(title);
    }
  };
  const isActiveRoute = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };
  const isActiveParent = (item: MenuItem) => {
    if (isActiveRoute(item.path)) return true;
    if (item.subMenus) {
      return item.subMenus.some(subMenu => isActiveRoute(subMenu.path));
    }
    return false;
  };
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return <div className={`fixed top-0 left-0 h-screen bg-primary text-primary-foreground transition-all duration-300 z-50 ${expanded ? 'w-64' : 'w-16'}`}>
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="p-4 flex items-center justify-between border-b border-white/10 h-16">
          {expanded ? <Link to="/" className="text-xl font-bold tracking-tight">Earn-n-Learn</Link> : <span className="w-full text-center text-xl font-bold">e</span>}
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="hover:bg-white/10 text-right text-green-600">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Sidebar Content - Menu Items */}
        <div className="flex-1 overflow-y-auto py-4 px-2 bg-inherit">
          <ul className="space-y-1">
            {SidebarMenuItems.map(item => <li key={item.title} className="bg-accent-DEFAULT">
                {item.subMenus ? (/* Parent item with submenu */
            <div className="relative">
                    <button onClick={() => toggleSubmenu(item.title)} className={`flex items-center w-full p-3 rounded-md transition-colors ${isActiveParent(item) ? 'bg-white/20 text-primary-foreground' : 'hover:bg-white/10'} ${expanded ? 'justify-between' : 'justify-center'}`}>
                      <div className="flex items-center">
                        <item.icon className={`h-5 w-5 ${expanded ? 'mr-3' : ''}`} />
                        {expanded && <span className="text-green-600">{item.title}</span>}
                      </div>
                      {expanded && <>
                          {openSubmenu === item.title ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </>}
                    </button>
                    
                    {/* Submenu items for expanded state */}
                    {expanded && openSubmenu === item.title && <ul className="pl-7 mt-1 space-y-1 animate-accordion-down">
                        {item.subMenus.map(subItem => <li key={subItem.title}>
                            <Link to={subItem.path} className={`flex items-center p-2 rounded-md transition-colors ${isActiveRoute(subItem.path) ? 'bg-white/20 text-primary-foreground' : 'hover:bg-white/10 text-white/80'}`}>
                              {subItem.icon && <subItem.icon className="h-4 w-4 mr-3" />}
                              <span className="text-green-600">{subItem.title}</span>
                            </Link>
                          </li>)}
                      </ul>}
                    
                    {/* Tooltip submenu for collapsed state */}
                    {!expanded && item.subMenus && <TooltipProvider>
                        <Tooltip delayDuration={0}>
                          <TooltipTrigger asChild>
                            <div className="absolute inset-0"></div>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="ml-2 p-0 border-none bg-primary rounded-md shadow-lg">
                            <div className="py-2 px-1 min-w-[180px]">
                              <div className="px-3 py-2 text-sm font-medium border-b border-white/10">{item.title}</div>
                              <ul className="mt-1">
                                {item.subMenus.map(subItem => <li key={subItem.title}>
                                    <Link to={subItem.path} className={`flex items-center p-2 px-3 rounded-sm text-sm transition-colors ${isActiveRoute(subItem.path) ? 'bg-white/20 text-primary-foreground' : 'hover:bg-white/10 text-white/80'}`}>
                                      {subItem.icon && <subItem.icon className="h-4 w-4 mr-2" />}
                                      <span>{subItem.title}</span>
                                    </Link>
                                  </li>)}
                              </ul>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>}
                  </div>) : (/* Single menu item without submenu */
            <TooltipProvider>
                    <Tooltip delayDuration={300}>
                      <TooltipTrigger asChild>
                        <Link to={item.path} className={`flex items-center p-3 rounded-md transition-colors ${isActiveRoute(item.path) ? 'bg-white/20 text-primary-foreground' : 'hover:bg-white/10'} ${expanded ? '' : 'justify-center'}`}>
                          <item.icon className={`h-5 w-5 ${expanded ? 'mr-3' : ''}`} />
                          {expanded && <span className="text-green-600">{item.title}</span>}
                        </Link>
                      </TooltipTrigger>
                      {!expanded && <TooltipContent side="right" className="ml-2">
                          {item.title}
                        </TooltipContent>}
                    </Tooltip>
                  </TooltipProvider>)}
              </li>)}
          </ul>
        </div>
        
        {/* Sidebar Footer with Logout Button */}
        <div className="p-4 border-t border-white/10">
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Button variant="ghost" onClick={handleLogout} className={`w-full flex items-center p-2 rounded-md transition-colors text-white/80 hover:bg-white/10 hover:text-white ${expanded ? 'justify-start' : 'justify-center'}`}>
                  <LogOut className={`h-5 w-5 ${expanded ? 'mr-3' : ''}`} />
                  {expanded && <span className="text-green-600">Logout</span>}
                </Button>
              </TooltipTrigger>
              {!expanded && <TooltipContent side="right" className="ml-2">Logout</TooltipContent>}
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>;
};
export default AppSidebar;