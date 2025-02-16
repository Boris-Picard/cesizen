"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/context/AuthContext";
import { Home, User, Menu, LogOut, Activity, Info, UserCog } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.webp"

// Boutons de navigation à gauche (sans déconnexion)
const LeftDesktopNavigationItems = () => {
  const location = useLocation();

  const baseClasses =
    "group inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors";
  const activeClasses = "bg-green-50 text-green-600";
  const inactiveClasses = "text-gray-600 hover:bg-green-50 hover:text-green-600";

  return (
    <>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link
            to="/informations"
            className={`${baseClasses} ${location.pathname === "/informations" ? activeClasses : inactiveClasses
              }`}
          >
            <Info className="h-4 w-4" /> Informations
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link
            to="/exercices"
            className={`${baseClasses} ${location.pathname === "/exercices" ? activeClasses : inactiveClasses
              }`}
          >
            <Activity className="h-4 w-4" /> Exercices
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </>
  );
};

// Menu mobile (incluant tous les boutons)
const MobileNavigationItems = () => {
  const location = useLocation();
  const { logout, isAdmin, isAuthenticated } = useAuth();

  const baseClasses =
    "flex items-center gap-2 rounded-md px-4 py-4 text-sm font-medium text-left w-full transition-colors";
  const activeClasses = "bg-green-50 text-green-600";
  const inactiveClasses = "text-gray-600 hover:bg-green-50 hover:text-green-600";

  return (
    <nav className="flex flex-col space-y-2">
      <Link
        to="/"
        className={`${baseClasses} ${location.pathname === "/" ? activeClasses : inactiveClasses
          }`}
      >
        <Home className="h-4 w-4" /> Accueil
      </Link>
      <Link
        to="/informations"
        className={`${baseClasses} ${location.pathname === "/informations" ? activeClasses : inactiveClasses
          }`}
      >
        <Info className="h-4 w-4" /> Informations
      </Link>
      <Link
        to="/exercices"
        className={`${baseClasses} ${location.pathname === "/exercices" ? activeClasses : inactiveClasses
          }`}
      >
        <Activity className="h-4 w-4" /> Exercices
      </Link>
      {
        isAdmin ?
          <>
            <Link
              to="/admin"
              className={`${baseClasses} ${location.pathname === "/admin" ? activeClasses : inactiveClasses
                }`}
            >
              <UserCog className="h-4 w-4" /> Admin
            </Link>
            <Link
              to="/profile"
              className={`${baseClasses} ${location.pathname === "/profile" ? activeClasses : inactiveClasses
                }`}
            >
              <User className="h-4 w-4" /> Profil
            </Link>
          </>
          :
          isAuthenticated
            ?
            <Link
              to="/profile"
              className={`${baseClasses} ${location.pathname === "/profile" ? activeClasses : inactiveClasses
                }`}
            >
              <User className="h-4 w-4" /> Profil
            </Link>
            :
            ""
      }
      <div className="border-t pt-4">
        <Button variant="destructive" onClick={logout} className={`${baseClasses} justify-start`}>
          <LogOut className="h-4 w-4" /> Déconnexion
        </Button>
      </div>
    </nav>
  );
};

export const Navbar = () => {
  const { logout, isAdmin, isAuthenticated } = useAuth();

  const baseClasses =
    "group inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors";
  const activeClasses = "bg-green-50 text-green-600";
  const inactiveClasses = "text-gray-600 hover:bg-green-50 hover:text-green-600";

  return (
    <header className="bg-white shadow-sm border-green-100 py-4 min-w-full sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Partie gauche : Logo + navigation */}
        <div className="flex items-center gap-4">
          <Link to="/">
            {/* <h1 className="text-2xl font-bold text-green-600">CESIZen</h1> */}
            <img src={logo} alt="logo cesizen" className="h-10 w-10" />
          </Link>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="flex gap-2">
              <LeftDesktopNavigationItems />
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Bouton de déconnexion à droite (affiché uniquement en desktop) */}
        <div className="hidden md:block">
          <div className="flex flex-wrap gap-2">
            {
              isAdmin ?
                <div>
                  <Link
                    to="/admin"
                    className={`${baseClasses} ${location.pathname === "/admin" ? activeClasses : inactiveClasses
                      }`}
                  >
                    <UserCog className="h-4 w-4" /> Admin
                  </Link>
                  <Link
                    to="/profile"
                    className={`${baseClasses} ${location.pathname === "/profile" ? activeClasses : inactiveClasses
                      }`}
                  >
                    <User className="h-4 w-4" /> Profil
                  </Link>
                </div>
                :
                isAuthenticated
                  ?
                  <Link
                    to="/profile"
                    className={`${baseClasses} ${location.pathname === "/profile" ? activeClasses : inactiveClasses
                      }`}
                  >
                    <User className="h-4 w-4" /> Profil
                  </Link>
                  :
                  ""
            }
            <Button variant="ghost" onClick={logout} size="icon">
              <LogOut className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
        </div>

        {/* Menu Mobile via Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-4">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription className="border-b pb-4">
                Naviguez dans CESIZen
              </SheetDescription>
            </SheetHeader>
            <div className="mt-4">
              <MobileNavigationItems />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
