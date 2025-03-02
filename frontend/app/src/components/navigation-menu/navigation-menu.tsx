import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Link, useLocation } from "react-router-dom"
import { Icons } from "../ui/icons"
import { useAuth } from "@/context/AuthContext"

// Composant pour les éléments de navigation desktop
const LeftDesktopNavigationItems = () => {
  const location = useLocation()

  const baseClasses = "group inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors relative"
  const activeClasses = "text-leather-800"
  const inactiveClasses = "text-leather-600 hover:text-leather-700"

  return (
    <>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link
            to="/informations"
            className={`${baseClasses} ${location.pathname === "/informations" ? activeClasses : inactiveClasses}`}
          >
            <Icons.info className="h-4 w-4" /> Informations
            {location.pathname === "/informations" && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-leather-500"
                layoutId="navbar-indicator"
              />
            )}
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link
            to="/exercices"
            className={`${baseClasses} ${location.pathname === "/exercices" ? activeClasses : inactiveClasses}`}
          >
            <Icons.activity className="h-4 w-4" /> Exercices
            {location.pathname === "/exercices" && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-leather-500"
                layoutId="navbar-indicator"
              />
            )}
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </>
  )
}

// Composant pour la navigation mobile
const MobileNavigationItems = () => {
  const { logout, isAdmin, isAuthenticated } = useAuth()

  const baseClasses =
    "flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-left w-full transition-colors"
  const activeClasses = "bg-leather-100 text-leather-800"
  const inactiveClasses = "text-leather-600 hover:bg-leather-50 hover:text-leather-700"

  return (
    <motion.nav
      className="flex flex-col space-y-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to="/" className={`${baseClasses} ${location.pathname === "/" ? activeClasses : inactiveClasses}`}>
        <Icons.home className="h-4 w-4" /> Accueil
      </Link>
      <Link
        to="/informations"
        className={`${baseClasses} ${location.pathname === "/informations" ? activeClasses : inactiveClasses}`}
      >
        <Icons.info className="h-4 w-4" /> Informations
      </Link>
      <Link
        to="/exercices"
        className={`${baseClasses} ${location.pathname === "/exercices" ? activeClasses : inactiveClasses}`}
      >
        <Icons.activity className="h-4 w-4" /> Exercices
      </Link>
      {isAuthenticated && (
        <>
          <Link
            to="/profile"
            className={`${baseClasses} ${location.pathname === "/profile" ? activeClasses : inactiveClasses}`}
          >
            <Icons.user className="h-4 w-4" /> Profil
          </Link>
          <Link
            to="/profile/edit"
            className={`${baseClasses} ${location.pathname === "/profile/edit" ? activeClasses : inactiveClasses}`}
          >
            <Icons.settings className="h-4 w-4" />
            Paramètres
          </Link>
        </>
      )}
      {isAdmin && (
        <Link to="/admin" className={`${baseClasses} ${location.pathname === "/admin" ? activeClasses : inactiveClasses}`}>
          <Icons.userCog className="h-4 w-4" /> Admin
        </Link>
      )}
      {isAuthenticated && (
        <div className="border-t border-leather-200 pt-4">
          <Button
            variant="destructive"
            onClick={logout}
            className={`${baseClasses} justify-start bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700`}
          >
            <Icons.logOut className="h-4 w-4" /> Déconnexion
          </Button>
        </div>
      )}
      {!isAuthenticated && (
        <div className="border-t border-leather-200 pt-4 space-y-2">
          <div className="flex-col flex space-y-2">
            <Link to="/login" className="w-full">
              <Button variant="outline" className="w-full rounded-full justify-start">
                <Icons.login className="mr-2 h-4 w-4" />
                Connexion
              </Button>
            </Link>
            <Link to="/register" className="w-full">
              <Button className="w-full rounded-full justify-start bg-leather-600 text-white hover:bg-leather-700">
                <Icons.userplus className="mr-2 h-4 w-4" />
                Inscription
              </Button>
            </Link>
          </div>
        </div>
      )}
    </motion.nav>
  )
}

// Composant principal Navbar
export const Navbar = () => {
  const { isAuthenticated, user, logout, isAdmin } = useAuth()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-leather-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 relative max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo et navigation desktop */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center space-x-2">
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                <Icons.logo className="h-8 w-8 text-leather-600" />
              </motion.div>
              <span className="text-xl font-bold text-leather-800">CESIZen</span>
            </Link>
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList className="flex gap-2">
                <LeftDesktopNavigationItems />
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Actions desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "200px", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Input
                    type="search"
                    placeholder="Rechercher..."
                    className="w-full rounded-full border border-leather-300"
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-leather-600 hover:bg-leather-50 hover:text-leather-700 rounded-full"
            >
              <Icons.search className="h-5 w-5" />
            </Button>

            {/* Boutons d'authentification desktop */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative rounded-full h-8 w-8 overflow-hidden hover:bg-inherit">
                    <Avatar>
                      <AvatarFallback>
                        {user?.firstname?.[0]}
                        {user?.lastname?.[0]}
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
                        <AvatarFallback>
                          {user?.firstname?.[0]}
                          {user?.lastname?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-leather-800">
                          {user?.firstname} {user?.lastname}
                        </p>
                        <p className="text-sm text-leather-500">{user?.username}</p>
                      </div>
                    </div>
                    <DropdownMenuItem asChild>
                      <Link
                        to="/profile"
                        className="flex items-center px-2 py-2 rounded-3xl hover:bg-leather-100 transition-colors cursor-pointer"
                      >
                        <Icons.user className="mr-2 h-4 w-4" />
                        <span>Profil</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        to="/profile/edit"
                        className="flex items-center px-2 py-2 rounded-3xl hover:bg-leather-100 transition-colors cursor-pointer"
                      >
                        <Icons.settings className="mr-2 h-4 w-4" />
                        <span>Paramètres</span>
                      </Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link
                          to="/admin"
                          className="flex items-center px-2 py-2 rounded-3xl hover:bg-leather-100 transition-colors cursor-pointer"
                        >
                          <Icons.userCog className="mr-2 h-4 w-4" />
                          <span>Admin</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator className="my-2" />
                    <DropdownMenuItem
                      onClick={logout}
                      className="flex items-center px-2 py-2 rounded-3xl hover:bg-red-100 transition-colors cursor-pointer text-red-600 hover:text-red-700"
                    >
                      <Icons.logOut className="mr-2 h-4 w-4" />
                      <span>Déconnexion</span>
                    </DropdownMenuItem>
                  </motion.div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="rounded-full text-leather-600 hover:text-leather-700 hover:bg-leather-50 transition-all duration-300"
                  >
                    <Icons.login className="mr-2 h-4 w-4" />
                    Connexion
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="rounded-full bg-leather-600 text-white hover:bg-leather-700 transition-all duration-300 shadow-sm hover:shadow-md">
                    <Icons.userplus className="mr-2 h-4 w-4" />
                    Inscription
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Menu mobile */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Icons.menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-4 bg-white">
              <SheetHeader>
                <SheetTitle className="text-leather-800">Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-4">
                <MobileNavigationItems />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

