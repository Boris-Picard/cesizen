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
import { Home, User, Settings, Menu, LogOut, Activity, Info } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const NavigationItems = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const baseClasses =
    "group inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors";
  const activeClasses = "bg-green-50 text-green-600";
  const inactiveClasses = "text-gray-600 hover:bg-green-50 hover:text-green-600";

  return (
    <>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link
            to="/"
            className={`${baseClasses} ${location.pathname === "/" ? activeClasses : inactiveClasses}`}
          >
            <Home className="mr-2 h-4 w-4" /> Accueil
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link
            to="/informations"
            className={`${baseClasses} ${
              location.pathname === "/informations" ? activeClasses : inactiveClasses
            }`}
          >
            <Info className="mr-2 h-4 w-4" /> Informations
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link
            to="/exercices"
            className={`${baseClasses} ${
              location.pathname === "/exercices" ? activeClasses : inactiveClasses
            }`}
          >
            <Activity className="mr-2 h-4 w-4" /> Exercices
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link
            to="/profile"
            className={`${baseClasses} ${
              location.pathname === "/profile" ? activeClasses : inactiveClasses
            }`}
          >
            <User className="mr-2 h-4 w-4" /> Profil
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link
            to="/profile/edit"
            className={`${baseClasses} ${
              location.pathname === "/profile/edit" ? activeClasses : inactiveClasses
            }`}
          >
            <Settings className="mr-2 h-4 w-4" /> Paramètres
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Button variant="destructive" onClick={logout} className="px-4 py-2">
            <LogOut className="mr-2 h-4 w-4" /> Déconnexion
          </Button>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </>
  );
};

export const Navbar = () => {
  return (
    <header className="bg-white shadow-sm border-b border-green-100 py-4">
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex justify-between items-center">
        <Link to="/"><h1 className="text-2xl font-bold text-green-600">CESIZen</h1></Link>
        {/* Menu complet sur desktop */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationItems />
          </NavigationMenuList>
        </NavigationMenu>
        {/* Menu mobile avec Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-4">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>Naviguer dans CESIZen</SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col space-y-4 mt-4">
              <NavigationItems />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
