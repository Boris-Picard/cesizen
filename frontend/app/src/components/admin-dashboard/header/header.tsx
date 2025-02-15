"use client"

import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

export default function AdminHeader({ h1 }: { h1: string }) {
  return (
    <header className="bg-white shadow-sm border-b border-green-100">
      <div className="flex items-center">
        <div className="px-4 sm:px-6 lg:px-8">
          <SidebarTrigger className="p-2 rounded-md bg-green-100 text-green-600" />
        </div>
        <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-green-800">{h1}</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5 text-green-600" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="flex items-center">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="Admin" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="bg-white shadow-md rounded-md p-2 mt-2 min-w-[150px] border border-green-100"
                align="end"
              >
                <DropdownMenuItem className="px-3 py-2 text-green-600 hover:bg-green-100 rounded-md cursor-pointer">
                  Mon profil
                </DropdownMenuItem>
                <DropdownMenuItem className="px-3 py-2 text-green-600 hover:bg-green-100 rounded-md cursor-pointer">
                  Paramètres
                </DropdownMenuItem>
                <DropdownMenuSeparator className="h-px bg-green-100 my-1" />
                <DropdownMenuItem className="px-3 py-2 text-green-600 hover:bg-green-100 rounded-md cursor-pointer">
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
