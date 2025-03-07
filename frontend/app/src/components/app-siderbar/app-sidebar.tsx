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
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAuth } from "@/context/AuthContext"
import { cn } from "@/lib/utils"
import logo from "@/assets/cesizen-logo.png"
import { DialogTitle } from "@radix-ui/react-dialog"

const menuItems = [
  { title: "Dashboard", url: "/admin", icon: Home },
  {
    title: "Utilisateurs",
    icon: Users,
    submenu: [
      { title: "Liste des Utilisateurs", url: "/admin/users", icon: User },
      { title: "Rôles", url: "/admin/users/roles", icon: Settings },
    ],
  },
  {
    title: "Contenus",
    icon: FileText,
    submenu: [
      { title: "Informations", url: "/admin/content/informations", icon: Info },
      { title: "Exercices", url: "/admin/content/exercices", icon: Activity },
    ],
  },
  {
    title: "Types",
    icon: Info,
    submenu: [
      { title: "Type d'information", url: "/admin/types/informations", icon: Info },
      { title: "Type d'interaction", url: "/admin/types/interactions", icon: Activity },
      { title: "Type d'historique", url: "/admin/types/historiques", icon: Clock },
    ],
  },
  { title: "Interactions", url: "/admin/interactions", icon: Activity },
  { title: "Historique", url: "/admin/historiques", icon: Clock },
  { title: "Validation", url: "/admin/validation", icon: CheckSquare },
]

export function AppSidebar() {
  const location = useLocation()
  const { state, isMobile } = useSidebar()
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null)
  const { user, logout } = useAuth()

  const toggleGroup = (title: string) => {
    setExpandedGroup(expandedGroup === title ? null : title)
  }

  const isCollapsed = state === "collapsed" && !isMobile

  return (
    <Sidebar
      collapsible="icon"
      className="bg-gradient-to-b from-leather-50 to-leather-100 border-r border-leather-200/70 font-sans text-leather-800 shadow-sm"
    >
      {/* Injection du titre accessible en mode mobile */}
      {isMobile && (
        <DialogTitle>
        </DialogTitle>
      )}

      {!isCollapsed && (
        <SidebarHeader className="px-4 py-6">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link to="/" className="flex items-center justify-center gap-3 group">
                  <div className="flex flex-col gap-0.5 leading-none">
                    <img
                      src={logo || "/placeholder.svg"}
                      alt="Logo"
                      className={cn("transition-all", isCollapsed ? "" : "w-28 h-28")}
                    />
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
      )}

      <ScrollArea className="flex-grow">
        <SidebarContent className="py-6">
          {menuItems.map((item) => (
            <SidebarGroup key={item.title} className="mb-1">
              <SidebarGroupLabel
                onClick={() => item.submenu && toggleGroup(item.title)}
                className={cn(
                  "text-leather-600 font-medium text-sm mb-2 cursor-pointer transition-all hover:text-leather-800",
                  item.submenu && "flex items-center justify-between",
                  expandedGroup === item.title && "text-leather-800 font-semibold",
                  isCollapsed && "justify-center px-0"
                )}
              >
                {!isCollapsed && (
                  <span className="flex items-center gap-2">
                    {item.submenu ? (
                      <motion.div
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="h-1.5 w-1.5 rounded-full bg-leather-400"
                      />
                    ) : (
                      <motion.div
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="h-1 w-1 rounded-full bg-leather-400"
                      />
                    )}
                    {item.title}
                  </span>
                )}

                {isCollapsed ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center justify-center">
                          <item.icon className="w-4 h-4 text-leather-600" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="right">{item.title}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  item.submenu && (
                    <motion.div
                      animate={{ rotate: expandedGroup === item.title ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-leather-100 rounded-full p-1"
                    >
                      <ChevronDown className="w-3 h-3 text-leather-600" />
                    </motion.div>
                  )
                )}
              </SidebarGroupLabel>

              <AnimatePresence initial={false}>
                {(!item.submenu || expandedGroup === item.title) && !isCollapsed && (
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
                                  "flex items-center gap-3 text-leather-700 p-2.5 rounded-xl transition-all",
                                  "hover:bg-gradient-to-r hover:from-leather-200/70 hover:to-leather-100/70 hover:text-leather-900",
                                  location.pathname === subItem.url &&
                                  "bg-gradient-to-r from-leather-300/70 to-leather-200/70 text-leather-900 font-medium shadow-sm"
                                )}
                              >
                                <div
                                  className={cn(
                                    "p-1.5 rounded-lg bg-white/80 shadow-sm",
                                    location.pathname === subItem.url && "bg-white shadow-md"
                                  )}
                                >
                                  <subItem.icon className="w-4 h-4" />
                                </div>
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
                                "flex items-center gap-3 text-leather-700 p-2.5 rounded-xl transition-all",
                                "hover:bg-gradient-to-r hover:from-leather-200/70 hover:to-leather-100/70 hover:text-leather-900",
                                location.pathname === item.url &&
                                "bg-gradient-to-r from-leather-300/70 to-leather-200/70 text-leather-900 font-medium shadow-sm"
                              )}
                            >
                              <div
                                className={cn(
                                  "p-1.5 rounded-lg bg-white/80 shadow-sm",
                                  location.pathname === item.url && "bg-white shadow-md"
                                )}
                              >
                                <item.icon className="w-4 h-4" />
                              </div>
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      )}
                    </SidebarMenu>
                  </motion.div>
                )}
              </AnimatePresence>

              {isCollapsed && (
                <SidebarMenu>
                  {!item.submenu ? (
                    <SidebarMenuItem>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <SidebarMenuButton asChild>
                              <Link
                                to={item.url}
                                className={cn(
                                  "flex items-center justify-center p-2 rounded-xl transition-all",
                                  "hover:bg-leather-200/70 hover:text-leather-900",
                                  location.pathname === item.url &&
                                  "bg-leather-300/70 text-leather-900 font-medium shadow-sm"
                                )}
                              >
                                <div
                                  className={cn(
                                    "p-1.5 rounded-lg bg-white/80 shadow-sm",
                                    location.pathname === item.url && "bg-white shadow-md"
                                  )}
                                >
                                  <item.icon className="w-4 h-4" />
                                </div>
                              </Link>
                            </SidebarMenuButton>
                          </TooltipTrigger>
                          <TooltipContent side="right">{item.title}</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </SidebarMenuItem>
                  ) : (
                    item.submenu.map((subItem) => (
                      <SidebarMenuItem key={subItem.title}>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <SidebarMenuButton asChild>
                                <Link
                                  to={subItem.url}
                                  className={cn(
                                    "flex items-center justify-center p-2 rounded-xl transition-all",
                                    "hover:bg-leather-200/70 hover:text-leather-900",
                                    location.pathname === subItem.url &&
                                    "bg-leather-300/70 text-leather-900 font-medium shadow-sm"
                                  )}
                                >
                                  <div
                                    className={cn(
                                      "p-1.5 rounded-lg bg-white/80 shadow-sm",
                                      location.pathname === subItem.url && "bg-white shadow-md"
                                    )}
                                  >
                                    <subItem.icon className="w-4 h-4" />
                                  </div>
                                </Link>
                              </SidebarMenuButton>
                            </TooltipTrigger>
                            <TooltipContent side="right">{subItem.title}</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </SidebarMenuItem>
                    ))
                  )}
                </SidebarMenu>
              )}
            </SidebarGroup>
          ))}
        </SidebarContent>
      </ScrollArea>

      <SidebarFooter className="border-t border-leather-200/70 pt-4 pb-6 bg-gradient-to-b from-leather-100/50 to-leather-200/50">
        <div className="px-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full text-leather-700 hover:text-leather-900 hover:bg-leather-100/80 rounded-xl transition-all duration-300",
                    isCollapsed ? "justify-center" : "justify-start py-6"
                  )}
                >
                  <div className="relative">
                    <div className={`${isCollapsed && "mr-8"} absolute -inset-1 bg-gradient-to-br from-leather-300 to-leather-500 rounded-full opacity-70 blur-sm`}></div>
                    <Avatar className={`${isCollapsed && "mr-8 w-7 h-7"} w-9 h-9 border-2 border-white bg-leather-200 text-leather-800 shadow-md relative`}>
                      <AvatarFallback className="font-semibold">
                        {user?.firstname?.[0]}
                        {user?.lastname?.[0]}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  {!isCollapsed && (
                    <div className="flex flex-col items-start ml-3">
                      <span className="font-medium text-leather-800">
                        {user?.firstname} {user?.lastname}
                      </span>
                      <span className="text-xs text-leather-500 bg-leather-200/50 px-2 py-0.5 rounded-full mt-1">
                        {user?.roles}
                      </span>
                    </div>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-leather-800 text-white border-leather-700">
                <p>
                  {user?.firstname} {user?.lastname} - {user?.roles}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className={cn(!isCollapsed && "mt-4 px-4")}>
          <Button
            variant="outline"
            className={cn(
              "w-full text-leather-700 hover:text-red-600 hover:bg-red-50 border-leather-300/50 rounded-xl transition-all duration-300 shadow-sm",
              isCollapsed ? "justify-center" : "justify-start"
            )}
            onClick={logout}
          >
            <LogOut className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
            {!isCollapsed && "Déconnexion"}
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail className="bg-leather-200/20 hover:bg-leather-200/40 transition-colors duration-300" />
    </Sidebar>
  )
}
