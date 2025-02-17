"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Home,
  User,
  FileText,
  Settings,
  Users,
  Info,
  Activity,
  Clock,
  CheckSquare,
  BarChart2,
  ChevronDown,
  LogOut,
} from "lucide-react"
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router-dom"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAuth } from "@/context/AuthContext"
import { cn } from "@/lib/utils"

const menuItems = [
  { title: "Dashboard", url: "/admin", icon: Home },
  {
    title: "Utilisateurs",
    url: "/admin/users",
    icon: Users,
    submenu: [
      { title: "Liste des Utilisateurs", url: "/admin/users", icon: User },
      { title: "Rôles", url: "/admin/users/roles", icon: Settings },
    ],
  },
  {
    title: "Contenus",
    url: "/admin",
    icon: FileText,
    submenu: [
      { title: "Articles", url: "/admin/articles", icon: Info },
      { title: "Exercices", url: "/admin/exercises", icon: Activity },
    ],
  },
  { title: "Interactions", url: "/admin/interactions", icon: Activity, badge: "9+" },
  { title: "Historique", url: "/admin/history", icon: Clock },
  { title: "Validation", url: "/admin/validation", icon: CheckSquare, badge: "3" },
  { title: "Statistiques", url: "/admin/stats", icon: BarChart2 },
]

export function AppSidebar() {
  const location = useLocation()
  const { state, isMobile } = useSidebar()
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null)
  const { user, logout } = useAuth()

  const toggleGroup = (title: string) => {
    setExpandedGroup(expandedGroup === title ? null : title)
  }

  return (
    <Sidebar collapsible="icon" className="bg-leather-50 border-r border-leather-200 font-sans text-leather-800">
      <SidebarHeader className="px-4 py-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/" className="flex items-center gap-3">
                <img src="/logo.png" alt="CESIZen" className="h-10 w-10 rounded-xl" />
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-bold text-leather-800 text-xl">CESIZen</span>
                  <span className="text-xs text-leather-500">Administration</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <ScrollArea className="flex-grow">
        <SidebarContent className="py-6">
          {menuItems.map((item) => (
            <SidebarGroup key={item.title}>
              <SidebarGroupLabel
                onClick={() => item.submenu && toggleGroup(item.title)}
                className={cn(
                  "text-leather-600 font-medium text-sm mb-2 cursor-pointer transition-colors hover:text-leather-800",
                  item.submenu && "flex items-center justify-between",
                )}
              >
                {item.title}
                {item.submenu && (
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform",
                      expandedGroup === item.title && "transform rotate-180",
                    )}
                  />
                )}
              </SidebarGroupLabel>
              <AnimatePresence initial={false}>
                {(!item.submenu || expandedGroup === item.title) && (
                  <motion.div
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: "auto" },
                      collapsed: { opacity: 0, height: 0 },
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <SidebarMenu>
                      {item.submenu ? (
                        item.submenu.map((subItem) => (
                          <SidebarMenuItem key={subItem.title}>
                            <SidebarMenuButton asChild>
                              <Link
                                to={subItem.url}
                                className={cn(
                                  "flex items-center gap-3 text-leather-700 p-2 rounded-lg transition-all",
                                  "hover:bg-leather-100 hover:text-leather-900",
                                  location.pathname === subItem.url &&
                                    "bg-leather-200 text-leather-900 font-medium hover:bg-leather-300",
                                )}
                              >
                                <subItem.icon className="w-5 h-5" />
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))
                      ) : (
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <Link
                              to={item.url}
                              className={cn(
                                "flex items-center gap-3 text-leather-700 p-2 rounded-lg transition-all",
                                "hover:bg-leather-100 hover:text-leather-900",
                                location.pathname === item.url &&
                                  "bg-leather-200 text-leather-900 font-medium hover:bg-leather-300",
                              )}
                            >
                              <item.icon className="w-5 h-5" />
                              <span>{item.title}</span>
                              {item.badge && (
                                <Badge variant="secondary" className="ml-auto bg-leather-300 text-leather-800">
                                  {item.badge}
                                </Badge>
                              )}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      )}
                    </SidebarMenu>
                  </motion.div>
                )}
              </AnimatePresence>
            </SidebarGroup>
          ))}
        </SidebarContent>
      </ScrollArea>

      <SidebarFooter className="border-t border-leather-200 pt-4 pb-6">
        <div className="px-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="py-6 w-full justify-start text-leather-700 hover:text-leather-900 hover:bg-leather-100"
                >
                  <Avatar className="w-8 h-8 mr-3 bg-leather-200 text-leather-800">
                    <AvatarFallback>
                      {user?.firstname[0]}
                      {user?.lastname[0]}
                    </AvatarFallback>
                  </Avatar>
                  {state !== "collapsed" || isMobile ? (
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{user?.firstname}</span>
                      <span className="text-xs text-leather-500">{user?.roles}</span>
                    </div>
                  ) : null}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>
                  {user?.firstname} - {user?.roles}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="mt-4 px-4">
          <Button
            variant="outline"
            className="w-full justify-start text-leather-700 hover:text-leather-900 hover:bg-leather-100"
            onClick={logout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            {state !== "collapsed" || isMobile ? "Déconnexion" : null}
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

