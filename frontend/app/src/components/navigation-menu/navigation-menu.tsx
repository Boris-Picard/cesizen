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
import { Badge } from "@/components/ui/badge"

// Composant pour les éléments de navigation desktop
const LeftDesktopNavigationItems = () => {
  const location = useLocation()
  const { isAuthenticated } = useAuth()

  const baseClasses = "group inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all duration-300 relative"
  const activeClasses = "text-leather-900 font-semibold"
  const inactiveClasses = "text-leather-600 hover:text-leather-800"

  return (
    <>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link
            to="/informations"
            className={`${baseClasses} ${location.pathname === "/informations" ? activeClasses : inactiveClasses}`}
          >
            <Icons.info className="h-4 w-4" />
            <span className="relative">
              Informations
              {location.pathname === "/informations" && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-leather-600 to-leather-400 rounded-full"
                  layoutId="navbar-indicator"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </span>
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      {isAuthenticated && (
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              to="/exercices"
              className={`${baseClasses} ${location.pathname === "/exercices" ? activeClasses : inactiveClasses}`}
            >
              <Icons.activity className="h-4 w-4" />
              <span className="relative">
                Exercices
                {location.pathname === "/exercices" && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-leather-600 to-leather-400 rounded-full"
                    layoutId="navbar-indicator"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </span>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      )}
    </>
  )
}

// Composant pour la navigation mobile
const MobileNavigationItems = () => {
  const location = useLocation()
  const { logout, isAdmin, isAuthenticated } = useAuth()

  const baseClasses =
    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-left w-full transition-all duration-300"
  const activeClasses = "bg-gradient-to-r from-leather-100 to-leather-50 text-leather-900 shadow-sm"
  const inactiveClasses = "text-leather-600 hover:bg-leather-50/70 hover:text-leather-800"

  return (
    <motion.nav
      className="flex flex-col space-y-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to="/" className={`${baseClasses} ${location.pathname === "/" ? activeClasses : inactiveClasses}`}>
        <div className={`p-2 rounded-lg ${location.pathname === "/" ? "bg-white shadow-sm" : "bg-leather-50"}`}>
          <Icons.home className="h-4 w-4 text-leather-600" />
        </div>
        <span>Accueil</span>
      </Link>

      <Link
        to="/informations"
        className={`${baseClasses} ${location.pathname === "/informations" ? activeClasses : inactiveClasses}`}
      >
        <div className={`p-2 rounded-lg ${location.pathname === "/informations" ? "bg-white shadow-sm" : "bg-leather-50"}`}>
          <Icons.info className="h-4 w-4 text-leather-600" />
        </div>
        <span>Informations</span>
      </Link>

      {isAuthenticated && (
        <Link
          to="/exercices"
          className={`${baseClasses} ${location.pathname === "/exercices" ? activeClasses : inactiveClasses}`}
        >
          <div className={`p-2 rounded-lg ${location.pathname === "/exercices" ? "bg-white shadow-sm" : "bg-leather-50"}`}>
            <Icons.activity className="h-4 w-4 text-leather-600" />
          </div>
          <span>Exercices</span>
        </Link>
      )}

      {isAuthenticated && (
        <>
          <div className="h-px bg-gradient-to-r from-leather-200 via-leather-100 to-leather-200 my-2"></div>

          <Link
            to="/profile"
            className={`${baseClasses} ${location.pathname === "/profile" ? activeClasses : inactiveClasses}`}
          >
            <div className={`p-2 rounded-lg ${location.pathname === "/profile" ? "bg-white shadow-sm" : "bg-leather-50"}`}>
              <Icons.user className="h-4 w-4 text-leather-600" />
            </div>
            <span>Profil</span>
          </Link>

          <Link
            to="/profile/edit"
            className={`${baseClasses} ${location.pathname === "/profile/edit" ? activeClasses : inactiveClasses}`}
          >
            <div className={`p-2 rounded-lg ${location.pathname === "/profile/edit" ? "bg-white shadow-sm" : "bg-leather-50"}`}>
              <Icons.settings className="h-4 w-4 text-leather-600" />
            </div>
            <span>Paramètres</span>
          </Link>
        </>
      )}

      {isAdmin && (
        <Link
          to="/admin"
          className={`${baseClasses} ${location.pathname === "/admin" ? activeClasses : inactiveClasses}`}
        >
          <div className={`p-2 rounded-lg ${location.pathname === "/admin" ? "bg-white shadow-sm" : "bg-leather-50"}`}>
            <Icons.userCog className="h-4 w-4 text-leather-600" />
          </div>
          <span>Admin</span>
          <Badge className="ml-auto text-[10px] bg-leather-100 text-leather-700 px-1.5">
            Panel
          </Badge>
        </Link>
      )}

      {isAuthenticated && (
        <div className="pt-4">
          <Button
            variant="destructive"
            onClick={logout}
            className="w-full justify-start rounded-xl bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border border-red-100"
          >
            <div className="p-2 rounded-lg bg-white shadow-sm mr-2">
              <Icons.logOut className="h-4 w-4 text-red-500" />
            </div>
            <span>Déconnexion</span>
          </Button>
        </div>
      )}

      {!isAuthenticated && (
        <div className="pt-4 space-y-3">
          <Link to="/login" className="w-full">
            <Button
              variant="outline"
              className="w-full rounded-xl justify-start border-leather-200 hover:border-leather-300 hover:bg-leather-50"
            >
              <div className="p-2 rounded-lg bg-leather-50 mr-2">
                <Icons.login className="h-4 w-4 text-leather-600" />
              </div>
              <span>Connexion</span>
            </Button>
          </Link>

          <Link to="/register" className="w-full">
            <Button
              className="w-full rounded-xl justify-start bg-gradient-to-r from-leather-600 to-leather-700 text-white hover:from-leather-700 hover:to-leather-800 shadow-sm hover:shadow-md"
            >
              <div className="p-2 rounded-lg bg-white/20 mr-2">
                <Icons.userplus className="h-4 w-4 text-white" />
              </div>
              <span>Inscription</span>
            </Button>
          </Link>
        </div>
      )}
    </motion.nav>
  )
}

// Composant principal Navbar
export const Navbar = () => {
  const { isAuthenticated, user, logout, isAdmin } = useAuth()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-leather-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      {/* Subtle gradient line at the top */}
      <div className="h-0.5 w-full bg-gradient-to-r from-leather-600 to-leather-400"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 relative max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo et navigation desktop */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-br from-leather-300 to-leather-500 rounded-xl opacity-70 group-hover:opacity-100 blur-sm transition-opacity duration-300"></div>
                <motion.div
                  className="relative bg-white p-1.5 rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-300"
                  whileHover={{ rotate: 360, transition: { duration: 0.7, ease: "easeInOut" } }}
                >
                  <Icons.logo className="h-7 w-7 text-leather-600" />
                </motion.div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-leather-800 to-leather-600 bg-clip-text text-transparent">
                CESIZen
              </span>
            </Link>

            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList className="flex gap-2">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/"
                      className={`group inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all duration-300 relative ${location.pathname === "/" ? "text-leather-900 font-semibold" : "text-leather-600 hover:text-leather-800"}`}
                    >
                      <Icons.home className="h-4 w-4" />
                      <span className="relative">
                        Accueil
                        {location.pathname === "/" && (
                          <motion.div
                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-leather-600 to-leather-400 rounded-full"
                            layoutId="navbar-indicator"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                      </span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <LeftDesktopNavigationItems />
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Actions desktop */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated && (
              <>
                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "220px", opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative">
                        <Icons.search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-leather-400 h-4 w-4" />
                        <Input
                          type="search"
                          placeholder="Rechercher..."
                          className="w-full pl-9 pr-4 py-2 h-9 border-leather-200 focus:border-leather-500 focus:ring-leather-500 rounded-full bg-leather-50/50 text-leather-700 placeholder:text-leather-400 shadow-sm hover:border-leather-300 transition-colors"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="text-leather-600 hover:text-leather-700 hover:bg-leather-50 rounded-full transition-all duration-300"
                >
                  <Icons.search className="h-5 w-5" />
                </Button>
              </>
            )}

            {/* Boutons d'authentification desktop */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative rounded-full h-9 w-9 overflow-hidden hover:bg-leather-50 transition-all duration-300 p-0.5 border border-transparent hover:border-leather-200 shadow-sm hover:shadow-md"
                  >
                    <Avatar className="h-full w-full">
                      <AvatarFallback className="bg-gradient-to-br from-leather-600 to-leather-700 text-white text-sm font-medium">
                        {user?.firstname?.[0]}{user?.lastname?.[0]}
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
                          {user?.firstname?.[0]}{user?.lastname?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-leather-900">
                          {user?.firstname} {user?.lastname}
                          {isAdmin && (
                            <Badge className="ml-2 hover:bg-inherit bg-leather-100 text-leather-700 text-[10px] px-1.5 py-0 rounded-full">
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
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link to="/login">
                  <Button
                    variant="outline"
                    className="rounded-full text-leather-600 hover:text-leather-800 hover:bg-leather-50 transition-all duration-300 border-leather-200 hover:border-leather-300 shadow-sm"
                  >
                    <Icons.login className="mr-2 h-4 w-4" />
                    Connexion
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    className="rounded-full bg-gradient-to-r from-leather-600 to-leather-700 text-white hover:from-leather-700 hover:to-leather-800 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
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
              <Button
                variant="outline"
                size="icon"
                className="md:hidden rounded-full border-leather-200 hover:border-leather-300 hover:bg-leather-50 shadow-sm"
              >
                <Icons.menu className="h-5 w-5 text-leather-600" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-4 bg-white border-r border-leather-200">
              <SheetHeader className="text-left mb-6">
                <Link to="/" className="flex items-center space-x-2 group mb-2">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-br from-leather-300 to-leather-500 rounded-xl opacity-70 group-hover:opacity-100 blur-sm transition-opacity duration-300"></div>
                    <div className="relative bg-white p-1.5 rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-300">
                      <Icons.logo className="h-7 w-7 text-leather-600" />
                    </div>
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-leather-800 to-leather-600 bg-clip-text text-transparent">
                    CESIZen
                  </span>
                </Link>
                <SheetTitle className="text-leather-700 text-base font-medium">Menu de navigation</SheetTitle>
              </SheetHeader>
              <div className="mt-2">
                <MobileNavigationItems />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
