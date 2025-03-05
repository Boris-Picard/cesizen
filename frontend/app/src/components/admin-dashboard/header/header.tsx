"use client"

import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Bell, Search, Menu } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
import { Icons } from "@/components/ui/icons"
import { motion } from "framer-motion"
import { useAuth } from "@/context/AuthContext"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function AdminHeader({ h1 }: { h1: string }) {
  const { isAdmin, logout, user } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-leather-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      {/* Gradient line at the top */}
      <div className="h-0.5 w-full bg-gradient-to-r from-leather-600 to-leather-400"></div>

      {/* Toggle for desktop: hidden on mobile, visible on desktop */}
      <SidebarTrigger className="hidden md:flex md:absolute md:left-6 md:top-1/2 md:transform md:-translate-y-1/2 p-2.5 rounded-full bg-leather-50 text-leather-600 hover:bg-leather-100 hover:text-leather-700 transition-all duration-300 shadow-sm hover:shadow-md" />

      {/* Centered content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between">
          {/* On mobile, show the toggle inline */}
          <div className="flex items-center gap-3">
            <SidebarTrigger className="md:hidden flex p-2.5 rounded-full bg-leather-50 text-leather-600 hover:bg-leather-100 hover:text-leather-700 transition-all duration-300 shadow-sm hover:shadow-md">
              <Menu className="h-5 w-5" />
            </SidebarTrigger>

            <div className="flex items-center">
              <motion.h1
                className="text-xl sm:text-2xl font-bold text-leather-800 bg-gradient-to-r from-leather-800 to-leather-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {h1}
              </motion.h1>

              <Badge
                variant="outline"
                className="ml-3 hidden sm:flex bg-leather-50 text-leather-600 border-leather-200 px-2.5 py-0.5 rounded-full text-xs font-medium"
              >
                Administration
              </Badge>
            </div>
          </div>

          {/* Right side: Search, notifications, and profile */}
          <div className="flex items-center space-x-3">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-leather-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Rechercher..."
                className="w-[180px] md:w-[220px] pl-9 pr-4 py-2 h-9 border-leather-200 focus:border-leather-500 focus:ring-leather-500 rounded-full bg-leather-50/50 text-leather-700 placeholder:text-leather-400 shadow-sm hover:border-leather-300 transition-colors"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-leather-600 hover:text-leather-700 hover:bg-leather-50 rounded-full transition-all duration-300"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-leather-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-leather-500"></span>
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-2 rounded-xl border-leather-200 shadow-lg">
                <div className="px-2 py-1.5 text-sm font-medium text-leather-700 border-b border-leather-100 mb-1">
                  Notifications
                </div>
                <div className="py-2 px-2 text-center text-sm text-leather-500">Aucune notification pour le moment</div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative rounded-full h-9 w-9 overflow-hidden hover:bg-leather-50 transition-all duration-300 p-0.5 border border-transparent hover:border-leather-200 shadow-sm hover:shadow-md"
                >
                  <Avatar className="h-full w-full">
                    <AvatarFallback className="bg-gradient-to-br from-leather-600 to-leather-700 text-white text-sm font-medium">
                      {user?.firstname?.[0]}
                      {user?.lastname?.[0]}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-2 rounded-xl border-leather-200 shadow-lg">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center space-x-3 p-3 mb-1 border-b border-leather-100 bg-leather-100/50 rounded-lg">
                    <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                      <AvatarFallback className="bg-gradient-to-br from-leather-600 to-leather-700 text-white">
                        {user?.firstname?.[0]}
                        {user?.lastname?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-leather-900">
                        {user?.firstname} {user?.lastname}
                        {isAdmin && (
                          <Badge className="ml-2 bg-leather-100 hover:bg-inherit text-leather-700 text-[10px] px-1.5 py-0 rounded-full">
                            Admin
                          </Badge>
                        )}
                      </p>
                      <div className="flex items-center">
                        <p className="text-xs text-leather-500">{user?.username}</p>
                      </div>
                    </div>
                  </div>

                  <div className="py-1">
                    <DropdownMenuItem asChild>
                      <Link
                        to="/profile"
                        className="flex cursor-pointer items-center px-2 py-1.5 rounded-lg hover:bg-leather-50 transition-colors text-leather-700 hover:text-leather-900"
                      >
                        <Icons.user className="mr-2 h-4 w-4" />
                        <span>Profil</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        to="/profile/edit"
                        className="flex cursor-pointer items-center px-2 py-1.5 rounded-lg hover:bg-leather-50 transition-colors text-leather-700 hover:text-leather-900"
                      >
                        <Icons.settings className="mr-2 h-4 w-4" />
                        <span>Paramètres</span>
                      </Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link
                          to="/admin"
                          className="flex cursor-pointer items-center px-2 py-1.5 rounded-lg hover:bg-leather-50 transition-colors text-leather-700 hover:text-leather-900"
                        >
                          <Icons.userCog className="mr-2 h-4 w-4" />
                          <span>Administration</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                  </div>

                  <DropdownMenuSeparator className="my-1 bg-leather-100" />

                  <div className="py-1">
                    <DropdownMenuItem
                      onClick={logout}
                      className="flex cursor-pointer items-center px-2 py-1.5 rounded-lg hover:bg-red-50 transition-colors text-red-600 hover:text-red-700"
                    >
                      <Icons.logOut className="mr-2 h-4 w-4" />
                      <span>Déconnexion</span>
                    </DropdownMenuItem>
                  </div>
                </motion.div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}

