
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronLeft, ChevronDown, ChevronRight } from 'lucide-react';
import { SidebarMenuItems } from './SidebarData';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from '@/lib/utils';

const SIDEBAR_COOKIE_KEY = 'sidebar-expanded';

const AppSidebar: React.FC = () => {
  const [expanded, setExpanded] = useState<boolean>(true);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const location = useLocation();
  
  // Initialize expanded state from cookie when component mounts
  useEffect(() => {
    const savedState = localStorage.getItem(SIDEBAR_COOKIE_KEY);
    if (savedState !== null) {
      setExpanded(savedState === 'true');
    }
  }, []);

  // Save expanded state to cookie when it changes
  useEffect(() => {
    localStorage.setItem(SIDEBAR_COOKIE_KEY, expanded.toString());
  }, [expanded]);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const toggleSubMenu = (title: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  // Check if a menu item is active (either direct path or subdirectory)
  const isMenuActive = (path: string) => {
    return location.pathname === path || 
      (path !== '/' && location.pathname.startsWith(path));
  };

  // Calculate active tab for microfinance
  const getActiveTabFromPath = () => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('tab') || 'peer-lending';
  };

  return (
    <TooltipProvider delayDuration={300}>
      <aside 
        className={cn(
          "h-screen fixed top-0 left-0 z-40 pt-16 flex flex-col transition-all duration-300 ease-in-out border-r border-gray-200 bg-white",
          expanded ? "w-64" : "w-16",
        )}
      >
        <div className="flex justify-end p-2">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            {expanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>
        </div>

        <div className="overflow-y-auto py-2 px-3 flex-grow">
          {SidebarMenuItems.map((item) => {
            const isActive = isMenuActive(item.path);
            const hasSubMenu = item.subMenus && item.subMenus.length > 0;
            const isOpen = openMenus[item.title] || false;
            
            // For microfinance, check the active tab
            const activeTab = location.pathname === '/microfinance' ? getActiveTabFromPath() : null;

            return (
              <div key={item.title} className="mb-1">
                {hasSubMenu ? (
                  <Collapsible
                    open={expanded ? isOpen : false}
                    onOpenChange={() => {
                      if (expanded) {
                        toggleSubMenu(item.title);
                      }
                    }}
                  >
                    <div 
                      className={cn(
                        "flex items-center rounded-md px-3 py-2 cursor-pointer transition-all",
                        isActive ? "bg-green-100 text-green-600" : "hover:bg-gray-100"
                      )}
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div 
                            className={cn(
                              "flex items-center w-full",
                              !expanded && "justify-center"
                            )}
                            onClick={() => {
                              if (expanded) {
                                toggleSubMenu(item.title);
                              }
                            }}
                          >
                            <item.icon className={cn("h-5 w-5", isActive ? "text-green-600" : "text-gray-500")} />
                            {expanded && (
                              <>
                                <span className="ml-3 text-sm font-medium flex-grow">{item.title}</span>
                                <CollapsibleTrigger asChild>
                                  <ChevronDown 
                                    className={cn(
                                      "h-4 w-4 transition-transform duration-200",
                                      isOpen ? "rotate-180" : "rotate-0"
                                    )}
                                  />
                                </CollapsibleTrigger>
                              </>
                            )}
                          </div>
                        </TooltipTrigger>
                        {!expanded && (
                          <TooltipContent side="right">
                            {item.title}
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </div>

                    {/* Hover submenu for collapsed state */}
                    {!expanded && (
                      <div className="relative">
                        <div className="group">
                          <div className="invisible absolute left-full top-0 ml-1 w-48 rounded-md bg-white shadow-lg border border-gray-200 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100 z-50">
                            {item.subMenus.map((subItem) => {
                              // Special handling for microfinance tabs
                              const subItemActive = item.path === '/microfinance' 
                                ? (subItem.path.includes(activeTab || '')) 
                                : location.pathname === subItem.path;
                              
                              return (
                                <Link
                                  key={subItem.title}
                                  to={subItem.path}
                                  className={cn(
                                    "block px-4 py-2 text-sm hover:bg-gray-100",
                                    subItemActive ? "bg-green-50 text-green-600" : "text-gray-700"
                                  )}
                                >
                                  {subItem.title}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Expanded submenu */}
                    {expanded && (
                      <CollapsibleContent className="animate-accordion-down ml-6 mt-1 space-y-1">
                        {item.subMenus.map((subItem) => {
                          // Special handling for microfinance tabs
                          const subItemActive = item.path === '/microfinance' 
                            ? (subItem.path.includes(activeTab || '')) 
                            : location.pathname === subItem.path;
                          
                          return (
                            <Link
                              key={subItem.title}
                              to={subItem.path}
                              className={cn(
                                "flex items-center rounded-md px-3 py-2 text-sm transition-colors",
                                subItemActive ? "bg-green-50 text-green-600" : "hover:bg-gray-100 text-gray-700"
                              )}
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2"></div>
                              {subItem.title}
                            </Link>
                          );
                        })}
                      </CollapsibleContent>
                    )}
                  </Collapsible>
                ) : (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.path}
                        className={cn(
                          "flex items-center rounded-md px-3 py-2 transition-colors",
                          isActive ? "bg-green-100 text-green-600" : "hover:bg-gray-100",
                          !expanded && "justify-center"
                        )}
                      >
                        <item.icon className={cn("h-5 w-5", isActive ? "text-green-600" : "text-gray-500")} />
                        {expanded && <span className="ml-3 text-sm font-medium">{item.title}</span>}
                      </Link>
                    </TooltipTrigger>
                    {!expanded && (
                      <TooltipContent side="right">
                        {item.title}
                      </TooltipContent>
                    )}
                  </Tooltip>
                )}
              </div>
            );
          })}
        </div>
      </aside>
    </TooltipProvider>
  );
};

export default AppSidebar;
