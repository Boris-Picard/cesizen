"use client"

import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Search } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

export default function AdminHeader({ h1 }: { h1: string }) {
  return (
    <header className="bg-white shadow-sm border-b border-leather-200 sticky top-0 z-10">
      <div className="flex items-center h-16">
        <div className="px-4 sm:px-6 lg:px-8">
          <SidebarTrigger className="p-2 rounded-md bg-leather-100 text-leather-600 hover:bg-leather-200 transition-colors" />
        </div>
        <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-leather-800">{h1}</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-leather-400" />
              <Input
                type="search"
                placeholder="Rechercher..."
                className="pl-10 pr-4 py-2 border-leather-300 focus:border-leather-500 focus:ring-leather-500 rounded-full"
              />
            </div>
            <Button variant="ghost" size="icon" className="text-leather-600 hover:bg-leather-100">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="Admin" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-64 p-2"
                align="end"
              >
                <DropdownMenuItem className="hover:bg-leather-100">Mon profil</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-leather-100">Paramètres</DropdownMenuItem>
                <DropdownMenuSeparator className="bg-leather-200" />
                <DropdownMenuItem className="hover:bg-leather-100 text-red-600">Déconnexion</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}

