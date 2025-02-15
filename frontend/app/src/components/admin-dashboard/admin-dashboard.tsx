import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, FileText, Clock, Activity, TrendingUp } from "lucide-react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-siderbar/app-sidebar"
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  ResponsiveContainer,
  Pie,
  PieChart,
} from "recharts"
import AdminHeader from "@/components/admin-dashboard/header/header"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// ----- DONNÉES POUR LA LINE CHART -----
const lineChartData = [
  { month: "Lun", utilisateurs: 400, interactions: 240 },
  { month: "Mar", utilisateurs: 300, interactions: 139 },
  { month: "Mer", utilisateurs: 200, interactions: 980 },
  { month: "Jeu", utilisateurs: 278, interactions: 390 },
  { month: "Ven", utilisateurs: 189, interactions: 480 },
  { month: "Sam", utilisateurs: 239, interactions: 380 },
  { month: "Dim", utilisateurs: 349, interactions: 430 },
]

const lineChartConfig = {
  utilisateurs: {
    label: "Utilisateurs",
    color: "#10B981", // couleur Cesizen
  },
  interactions: {
    label: "Interactions",
    color: "#047857",
  },
} satisfies ChartConfig

// ----- DONNÉES POUR LA PIE CHART -----
// Utilisation de couleurs fixes en accord avec le thème Cesizen
const pieChartData = [
  { browser: "Consultation", visitors: 400, fill: "#10B981" },
  { browser: "Commentaire", visitors: 300, fill: "#047857" },
  { browser: "Like", visitors: 300, fill: "#065f46" },
  { browser: "Partage", visitors: 200, fill: "#0F766E" },
]

const pieChartConfig = {
  visitors: {
    label: "Interactions",
  },
  consultation: {
    label: "Consultation",
    color: "#10B981",
  },
  commentaire: {
    label: "Commentaire",
    color: "#047857",
  },
  like: {
    label: "Like",
    color: "#065f46",
  },
  partage: {
    label: "Partage",
    color: "#0F766E",
  },
} satisfies ChartConfig

export default function AdminDashboard() {
  // Données statistiques
  const stats = [
    { title: "Total Utilisateurs", value: "1,234", icon: Users },
    { title: "Exercices Actifs", value: "56", icon: Activity },
    { title: "Articles Publiés", value: "89", icon: FileText },
    { title: "Interactions Aujourd'hui", value: "152", icon: Clock },
  ]

  const recentUsers = [
    { name: "Alice Johnson", email: "alice@example.com", joinDate: "2023-05-15" },
    { name: "Bob Smith", email: "bob@example.com", joinDate: "2023-05-14" },
    { name: "Carol Williams", email: "carol@example.com", joinDate: "2023-05-13" },
  ]

  const recentArticles = [
    { title: "Comprendre la Santé Mentale", type: "Santé", date: "2023-05-15" },
    { title: "Techniques de Gestion du Stress", type: "Stress", date: "2023-05-14" },
    { title: "Bienfaits de la Respiration Profonde", type: "Respiration", date: "2023-05-13" },
  ]

  return (
    <div className="min-h-screen bg-green-50">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex-1">
          <AdminHeader h1="Tableau de bord Admin" />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Titre de la section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-green-800">Vue d'ensemble</h2>
            </div>

            {/* Cartes de statistiques */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="bg-white shadow-lg rounded-xl transition transform hover:scale-105"
                >
                  <div className="flex items-center p-4">
                    <div className="flex-shrink-0">
                      <div className="p-3 bg-green-100 rounded-full">
                        <stat.icon className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-green-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-green-800">{stat.value}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Zone des graphiques */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
              {/* --- Line Chart --- */}
              <Card>
                <CardHeader className="items-center">
                  <CardTitle>Activité Utilisateurs et Interactions</CardTitle>
                  <CardDescription>Du Lundi au Dimanche</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={lineChartConfig}>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={lineChartData} margin={{ left: 12, right: 12 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="month"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <Line
                          dataKey="utilisateurs"
                          type="monotone"
                          stroke="#10B981"
                          strokeWidth={2}
                          dot={false}
                        />
                        <Line
                          dataKey="interactions"
                          type="monotone"
                          stroke="#047857"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this week <TrendingUp className="h-4 w-4" />
                  </div>
                  <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 7 days
                  </div>
                </CardFooter>
              </Card>

              {/* --- Pie Chart --- */}
              <Card className="flex flex-col">
                <CardHeader className="items-center pb-0">
                  <CardTitle>Distribution des Interactions par Type</CardTitle>
                  <CardDescription>Derniers 6 mois</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                  <ChartContainer
                    config={pieChartConfig}
                    className="mx-auto aspect-square max-h-[300px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
                  >
                    <PieChart>
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Pie
                        data={pieChartData}
                        dataKey="visitors"
                        nameKey="browser"
                        outerRadius={90}
                        label
                      />
                    </PieChart>
                  </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                  </div>
                  <div className="leading-none text-muted-foreground">
                    Showing total interactions for the last 6 months
                  </div>
                </CardFooter>
              </Card>
            </div>

            {/* Nouvelle section "Activités Récentes" sous forme de 3 cartes en grille */}
            <div>
              <h2 className="text-2xl font-semibold text-green-800 mb-6">Activités Récentes</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Utilisateurs Récentes */}
                <Card className="bg-white shadow-lg rounded-xl">
                  <CardHeader>
                    <CardTitle>Utilisateurs Récentes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentUsers.map((user, index) => (
                        <div key={index} className="flex items-center justify-between border-b pb-3">
                          <div className="flex items-center gap-4">
                            <Avatar>
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-green-800">{user.name}</p>
                              <p className="text-sm text-green-600">{user.email}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-green-600">
                            {user.joinDate}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Articles Récentes */}
                <Card className="bg-white shadow-lg rounded-xl">
                  <CardHeader>
                    <CardTitle>Articles Récentes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentArticles.map((article, index) => (
                        <div key={index} className="flex items-center justify-between border-b pb-3">
                          <div>
                            <p className="font-medium text-green-800">{article.title}</p>
                            <p className="text-sm text-green-600">{article.date}</p>
                          </div>
                          <Badge className="bg-green-100 text-green-700">{article.type}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Gestion des Exercices */}
                <Card className="bg-white shadow-lg rounded-xl">
                  <CardHeader>
                    <CardTitle>Gestion des Exercices</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-green-600">
                      Contenu de gestion des exercices à venir.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  )
}
