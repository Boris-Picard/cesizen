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
    BarChart2,
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
  
  const menuItems = [
    { title: "Dashboard", url: "/admin", icon: Home },
    {
      title: "Utilisateurs",
      url: "/admin/users",
      icon: Users,
      submenu: [
        { title: "Liste des Utilisateurs", url: "/admin/users", icon: User },
        { title: "Rôles", url: "/admin/users/roles", icon: Settings },
      ],
    },
    {
      title: "Contenus",
      url: "/admin",
      icon: FileText,
      submenu: [
        { title: "Articles", url: "/admin/articles", icon: Info },
        { title: "Exercices", url: "/admin/exercises", icon: Activity },
      ],
    },
    {
      title: "Interactions",
      url: "/admin/interactions",
      icon: Activity,
    },
    {
      title: "Historique",
      url: "/admin/history",
      icon: Clock,
    },
    {
      title: "Validation",
      url: "/admin/validation",
      icon: CheckSquare,
    },
    {
      title: "Statistiques",
      url: "/admin/stats",
      icon: BarChart2,
    },
  ]
  
  export function AppSidebar() {
    const location = useLocation()
    const { state, isMobile } = useSidebar()
  
    return (
      <Sidebar collapsible="icon" className="bg-green-50 shadow-lg font-sans">
        {/* En-tête de la sidebar avec le logo et la version */}
        <SidebarHeader className="px-4 py-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link to="/" className="flex items-center gap-2">
                  <img src="/logo.png" alt="CESIZen" className="h-8" />
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-bold text-green-600 text-lg">CESIZen</span>
                    <span className="text-xs text-green-500">v1.0.0</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
  
        <SidebarContent className="py-4">
          {menuItems.map((item) => (
            <SidebarGroup key={item.title}>
              <SidebarGroupLabel className="text-green-60 font-semibold uppercase text-xs tracking-wider mb-2">
                {item.title}
              </SidebarGroupLabel>
              <SidebarMenu>
                {item.submenu ? (
                  item.submenu.map((subItem) => (
                    <SidebarMenuItem key={subItem.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          to={subItem.url}
                          className={`flex items-center gap-3 text-green-800 p-2 rounded-md transition-colors hover:bg-green-100 ${
                            location.pathname === subItem.url ? "bg-green-200" : ""
                          }`}
                        >
                          <subItem.icon className="w-5 h-5" />
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
                        className={`flex items-center gap-3 text-green-800 p-2 rounded-md transition-colors hover:bg-green-100 ${
                          location.pathname === item.url ? "bg-green-200" : ""
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            </SidebarGroup>
          ))}
        </SidebarContent>
  
        <SidebarFooter>
          <div className="p-4 text-xs text-center text-green-500">
            {state !== "collapsed" || isMobile ? "© 2024 CESIZen Admin" : ""}
          </div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    )
  }
  