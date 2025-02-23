import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  FileText,
  Activity,
  TrendingUp,
  ChevronRight,
  Zap,
} from "lucide-react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-siderbar/app-sidebar"
import { CartesianGrid, XAxis, Pie, PieChart, Cell, Label, Bar, BarChart, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button"
import AdminHeader from "./header/header"
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { useMemo } from "react"
import { useAuth } from "@/context/AuthContext"
import { Link } from "react-router-dom"

const lineChartData = [
  { month: "Lun", utilisateurs: 400, interactions: 240 },
  { month: "Mar", utilisateurs: 300, interactions: 139 },
  { month: "Mer", utilisateurs: 200, interactions: 980 },
  { month: "Jeu", utilisateurs: 278, interactions: 390 },
  { month: "Ven", utilisateurs: 189, interactions: 480 },
  { month: "Sam", utilisateurs: 239, interactions: 380 },
  { month: "Dim", utilisateurs: 349, interactions: 430 },
]

const pieChartData = [
  { name: "Consultation", value: 400, color: "#8d5f52" },
  { name: "Commentaire", value: 300, color: "#bda38c" },
  { name: "Like", value: 300, color: "#d4c3b3" },
  { name: "Partage", value: 200, color: "#eae2db" },
]


export default function AdminDashboard() {
  const { user } = useAuth()

  const totalInteractions = useMemo(
    () => pieChartData.reduce((acc, cur) => acc + cur.value, 0),
    []
  )

  const chartConfig: ChartConfig = {
    utilisateurs: {
      label: "Utilisateurs",
      color: "#8d5f52",
    },
    interactions: {
      label: "Interactions",
      color: "#bda38c",
    },
  } satisfies ChartConfig

  const stats = [
    {
      title: "Total Utilisateurs",
      value: "1,234",
      icon: Users,
      color: "from-leather-600 to-leather-500",
      trend: "+5.2%",
      trendUp: true,
    },
    {
      title: "Exercices Actifs",
      value: "56",
      icon: Activity,
      color: "from-leather-500 to-leather-400",
      trend: "+2.4%",
      trendUp: true,
    },
    {
      title: "Articles Publiés",
      value: "89",
      icon: FileText,
      color: "from-leather-400 to-leather-300",
      trend: "-0.5%",
      trendUp: false,
    },
    {
      title: "Interactions Aujourd'hui",
      value: "152",
      icon: Zap,
      color: "from-leather-300 to-leather-200",
      trend: "+12.3%",
      trendUp: true,
    },
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
    <div className="min-h-screen bg-leather-200">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex-1">
          <AdminHeader h1="Tableau de bord Admin" />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h2 className="text-5xl font-bold text-modern-900 mb-2">Vue d'ensemble</h2>
              <p className="text-modern-600">Bienvenue <span className="font-bold">{user?.firstname}</span> sur votre tableau de bord administrateur</p>
            </motion.div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className="group"
                >
                  <Card className="relative overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl border-none">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
                    />
                    <CardContent className="p-6 relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-full bg-gradient-to-br ${stat.color}`}>
                          <stat.icon className="h-6 w-6 text-white" />
                        </div>
                        <Badge variant={stat.trendUp ? "default" : "destructive"} className="text-xs font-semibold">
                          {stat.trend}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-leather-600 mb-1">{stat.title}</p>
                        <p className="text-3xl font-bold text-leather-900">{stat.value}</p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-leather-200">
                        <Button
                          variant="ghost"
                          className="w-full justify-between text-leather-600 hover:bg-leather-500 h-auto font-medium group"
                        >
                          Voir les détails
                          <ChevronRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="flex flex-col rounded-3xl h-full">
                  <CardHeader className="border-b border-leather-200 bg-leather-50 items-center rounded-t-3xl text-center">
                    <CardTitle className="text-xl font-bold text-leather-900">
                      Activité Utilisateurs et Interactions
                    </CardTitle>
                    <CardDescription className="text-leather-600">
                      Tendances hebdomadaires
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 pb-0 flex items-center justify-center">
                    <ChartContainer config={chartConfig} className="mx-auto w-full h-[300px]">
                      <BarChart data={lineChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#eae2db" />
                        <XAxis
                          dataKey="month"
                          tickLine={false}
                          tickMargin={10}
                          axisLine={false}
                          tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar
                          dataKey="utilisateurs"
                          stackId="a"
                          fill="#8d5f52"
                          radius={[0, 0, 4, 4]}
                        />
                        <Bar
                          dataKey="interactions"
                          stackId="a"
                          fill="#bda38c"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                  <CardFooter className="flex-col gap-2 text-sm border-t p-6 border-leather-200 bg-leather-50 items-center rounded-b-3xl text-center">
                    <div className="flex items-center gap-2 font-medium leading-none">
                      <TrendingUp className="h-4 w-4" />
                      <span>Tendance en hausse de 5.2% cette semaine</span>
                    </div>
                    <div className="leading-none text-muted-foreground">
                      Showing total visitors for the last 6 months
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                <Card className="flex flex-col rounded-3xl h-full">
                  <CardHeader className="border-b border-leather-200 bg-leather-50 items-center rounded-t-3xl">
                    <CardTitle className="text-xl font-bold text-leather-900">
                      Distribution des Interactions
                    </CardTitle>
                    <CardDescription className="text-leather-600">
                      Répartition sur les 6 derniers mois
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 pb-0 flex items-center justify-center">
                    <ChartContainer config={chartConfig} className="mx-auto" style={{ height: 250 }}>
                      <ResponsiveContainer>
                        <PieChart>
                          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                          <Pie
                            data={pieChartData}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={60}
                            outerRadius={100}
                            strokeWidth={5}
                          >
                            <Label
                              content={({ viewBox }) => {
                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                  return (
                                    <text
                                      x={viewBox.cx}
                                      y={viewBox.cy}
                                      textAnchor="middle"
                                      dominantBaseline="middle"
                                    >
                                      <tspan
                                        x={viewBox.cx}
                                        y={viewBox.cy}
                                        className="fill-foreground text-3xl font-bold"
                                      >
                                        {totalInteractions.toLocaleString()}
                                      </tspan>
                                      <tspan
                                        x={viewBox.cx}
                                        y={(viewBox.cy || 0) + 24}
                                        className="fill-muted-foreground"
                                      >
                                        Interactions
                                      </tspan>
                                    </text>
                                  )
                                }
                                return null
                              }}
                            />
                            {pieChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                  <CardFooter className="flex-col gap-2 text-sm border-t p-6 border-leather-200 bg-leather-50 items-center rounded-b-3xl">
                    <div className="flex items-center gap-2 font-medium leading-none">
                      <TrendingUp className="h-4 w-4" />
                      <span>Commentaires en hausse de 12% ce mois-ci</span>
                    </div>
                    <div className="leading-none text-muted-foreground">
                      Répartition des interactions sur les 6 derniers mois
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="text-5xl font-bold text-leather-900 mb-6">Activités Récentes</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="bg-white shadow-lg rounded-3xl overflow-hidden border-none flex flex-col">
                  <CardHeader className="border-b border-leather-200 bg-leather-50 text-center">
                    <CardTitle className="text-xl font-bold text-leather-900">Utilisateurs Récents</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow p-0">
                    <div className="divide-y divide-leather-200">
                      {recentUsers.map((user, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center justify-between p-4 hover:bg-leather-50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <Avatar className="border-2 border-leather-200">
                              <AvatarImage src={`https://i.pravatar.cc/150?u=${user.email}`} alt={user.name} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-leather-900">{user.name}</p>
                              <p className="text-sm text-leather-600">{user.email}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-leather-600">
                            {user.joinDate}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="bg-leather-50 border-t border-leather-200 p-4 text-center">
                    <Button variant="link" className="w-full text-leather-600 hover:text-leather-800">
                      Voir tous les utilisateurs
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="bg-white shadow-lg rounded-3xl overflow-hidden border-none flex flex-col">
                  <CardHeader className="border-b border-leather-200 bg-leather-50 text-center">
                    <CardTitle className="text-xl font-bold text-leather-900">Articles Récents</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow p-0">
                    <div className="divide-y divide-leather-200">
                      {recentArticles.map((article, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center justify-between p-4 hover:bg-leather-50 transition-colors"
                        >
                          <div>
                            <p className="font-medium text-leather-900">{article.title}</p>
                            <p className="text-sm text-leather-600">{article.date}</p>
                          </div>
                          <Badge className="bg-leather-100 text-leather-800 hover:bg-primary/20">{article.type}</Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="bg-leather-50 border-t border-leather-200 p-4 text-center">
                    <Button variant="link" className="w-full text-leather-600 hover:text-leather-800">
                      Voir tous les articles
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="bg-white shadow-lg rounded-3xl overflow-hidden border-none flex flex-col">
                  <CardHeader className="border-b border-leather-200 bg-leather-50 text-center">
                    <CardTitle className="text-xl font-bold text-leather-900">Gestion des Exercices</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow p-6">
                    <p className="text-leather-600 mb-4 text-center">
                      Gérez et créez de nouveaux exercices pour les utilisateurs.
                    </p>
                    <Button className="w-full bg-leather-600 rounded-full hover:bg-leather-700 text-white transition-colors duration-300">
                      Créer un nouvel exercice
                    </Button>
                  </CardContent>
                  <CardFooter className="bg-leather-50 border-t border-leather-200 p-4 text-center">
                    <Button variant="link" className="w-full text-leather-600 hover:text-leather-800">
                      Voir tous les exercices
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </motion.div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  )
}

