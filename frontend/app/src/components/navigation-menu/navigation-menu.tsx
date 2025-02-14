import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/context/AuthContext";
import { Home, User, Settings, Menu, LogOut, Activity, Info } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const NavigationItems = () => {
    const location = useLocation()
    const { logout } = useAuth()

    return (
        <>
            <NavigationMenuItem>
                <NavigationMenuLink asChild>
                    <Link
                        to="/"
                        className={`group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors 
                            hover:bg-green-50 hover:text-accent-foreground focus:bg-green-50 focus:text-accent-foreground 
                            ${location.pathname === "/" ? "bg-green-50" : ""}`}
                    >
                        <Home className="mr-2 h-4 w-4" /> Accueil
                    </Link>
                </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink asChild>
                    <Link
                        to="/informations"
                        className={`group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors 
                            hover:bg-green-50 hover:text-accent-foreground focus:bg-green-50 focus:text-accent-foreground 
                            ${location.pathname === "/informations" ? "bg-green-50" : ""}`}
                    >
                        <Info className="mr-2 h-4 w-4" /> Informations
                    </Link>
                </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink asChild>
                    <Link
                        to="/exercices"
                        className={`group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors 
                            hover:bg-green-50 hover:text-accent-foreground focus:bg-green-50 focus:text-accent-foreground 
                            ${location.pathname === "/exercices" ? "bg-green-50" : ""}`}
                    >
                        <Activity className="mr-2 h-4 w-4" /> Exercices
                    </Link>
                </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink asChild>
                    <Link
                        to="/profile"
                        className={`group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors 
                            hover:bg-green-50 hover:text-accent-foreground focus:bg-green-50 focus:text-accent-foreground 
                            ${location.pathname === "/profile" ? "bg-green-50" : ""}`}
                    >
                        <User className="mr-2 h-4 w-4" /> Profil
                    </Link>
                </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink asChild>
                    <Link
                        to="/profile/edit"
                        className={`group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors 
                            hover:bg-green-50 hover:text-accent-foreground focus:bg-green-50 focus:text-accent-foreground 
                            ${location.pathname === "/profile/edit" ? "bg-green-50" : ""}`}
                    >
                        <Settings className="mr-2 h-4 w-4" /> Paramètres
                    </Link>
                </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink asChild>
                    <Button variant={"destructive"} onClick={logout}>
                        <LogOut className="mr-2 h-4 w-4" /> Déconnexion
                    </Button>
                </NavigationMenuLink>
            </NavigationMenuItem>
        </>
    );
};

export const Navbar = () => {
    return (
        <header className="bg-white border-b border-green-200 py-4 min-w-full">
            <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-green-600">CESIZen</h1>
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
