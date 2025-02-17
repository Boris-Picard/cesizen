import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Bell, Search } from "lucide-react"
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

export default function AdminHeader({ h1 }: { h1: string }) {
  const { isAdmin, logout, user } = useAuth()
  return (
    <header className="sticky top-0 z-50 w-full border-b border-leather-300 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 ">
      {/* Toggle pour desktop : caché sur mobile, visible en desktop */}
      <SidebarTrigger
        className="hidden md:flex md:absolute md:left-4 md:top-1/2 md:transform md:-translate-y-1/2 p-2 rounded-md bg-leather-100 text-leather-600 hover:bg-leather-200 transition-colors items-center justify-center"
      />

      {/* Contenu centré */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Sur mobile, affiche le toggle inline */}
          <div className="flex items-center gap-4">
            <SidebarTrigger
              className="md:hidden flex p-2 rounded-md bg-leather-100 text-leather-600 hover:bg-leather-200 transition-colors items-center justify-center"
            />
            <h1 className="text-2xl font-semibold text-leather-800">{h1}</h1>
          </div>

          {/* Partie droite : Recherche, notifications et profil */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-leather-400" />
              <Input
                type="search"
                placeholder="Rechercher..."
                className="pl-10 pr-4 py-2 border-leather-300 focus:border-leather-500 focus:ring-leather-500"
              />
            </div>
            <Button variant="ghost" size="icon" className="text-leather-600 hover:bg-leather-100">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 overflow-hidden hover:bg-inherit">
                  <Avatar>
                    <AvatarFallback>
                      {user?.firstname[0]}{user?.lastname[0]}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-2">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center space-x-2 p-2 mb-2 border-b border-leather-200">
                    <Avatar>
                      <AvatarFallback>{user?.firstname[0]}{user?.lastname[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-leather-800">{user?.firstname} {user?.lastname}</p>
                      <p className="text-sm text-leather-500">{user?.username}</p>
                    </div>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/profile"
                      className="group flex cursor-pointer items-center px-2 py-2 rounded-md hover:bg-leather-100 transition-colors"
                    >
                      <Icons.user className="mr-2 h-4 w-4" />
                      <span>Profil</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/profile/edit"
                      className="flex cursor-pointer items-center px-2 py-2 rounded-md hover:bg-leather-100 transition-colors"
                    >
                      <Icons.settings className="mr-2 h-4 w-4" />
                      <span>Paramètres</span>
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link
                        to="/admin"
                        className="flex cursor-pointer items-center px-2 py-2 rounded-md hover:bg-leather-100 transition-colors"
                      >
                        <Icons.userCog className="mr-2 h-4 w-4" />
                        <span>Admin</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator className="my-2" />
                  <DropdownMenuItem
                    onClick={logout}
                    className="flex cursor-pointer items-center px-2 py-2 rounded-md hover:bg-red-100 transition-colors text-red-600 hover:text-red-700"
                  >
                    <Icons.logOut className="mr-2 h-4 w-4" />
                    <span>Déconnexion</span>
                  </DropdownMenuItem>
                </motion.div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
