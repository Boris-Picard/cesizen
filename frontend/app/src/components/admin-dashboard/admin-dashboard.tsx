"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  FileText,
  Activity,
  ChevronRight,
  Zap,
  TrendingUp,
  TrendingDown,
  Clock,
  Calendar,
  PieChartIcon,
  BarChartIcon,
} from "lucide-react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-siderbar/app-sidebar"
import { CartesianGrid, XAxis, Pie, PieChart, Cell, Label, Bar, BarChart, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button"
import AdminHeader from "./header/header"
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart"
import { useAuth } from "@/context/AuthContext"
import { useGetUsers } from "@/hooks/admin/users/useGetUsers"
import { useNavigate } from "react-router-dom"
import { useGetExercices } from "@/hooks/admin/exercices/useGetExercices"
import { useGetInteractions } from "@/hooks/admin/interactions/useGetInteractions"
import { useGetInformations } from "@/hooks/admin/informations/useGetInformations"

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { users, newUsersPercentage, totalUsers } = useGetUsers()
  const { exercices, totalExercices } = useGetExercices()
  const { informationsActive, totalInformations } = useGetInformations()
  const { interactions, getTotalInteractions, newInteractionsPercentage, totalInteractionsDay } = useGetInteractions()

  const sortedInformations = [...informationsActive!].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  const slicedActiveInformations = sortedInformations?.slice(0, 3)

  const filterUsersActive = users.filter((u) => u.ut_active === true)
  const filterExercicesActive = exercices.filter((ex) => ex.ex_active === true)
  const slicedExercices = filterExercicesActive.slice(0, 4)

  const trendUpOrDownUsers = newUsersPercentage > 0 ? true : false
  const trendUpOrDownInteractions = newInteractionsPercentage > 0 ? true : false

  const sortedUsers = [...filterUsersActive].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
  const slicedUsers = sortedUsers.slice(0, 3)

  const daysOfWeek = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
  const interactionsByDay = interactions.reduce((acc: any, interaction) => {
    const dayIndex = new Date(interaction.inter_date_de_debut).getDay()
    const dayName = daysOfWeek[dayIndex]

    acc[dayName] = (acc[dayName] || 0) + 1
    return acc
  }, {})

  const usersByDay = users.reduce((acc: any, user) => {
    const dayIndex = new Date(user.createdAt).getDay()
    const dayName = daysOfWeek[dayIndex]

    acc[dayName] = (acc[dayName] || 0) + 1
    return acc
  }, {})

  const lineChartData = daysOfWeek.map((day) => ({
    month: day,
    utilisateurs: usersByDay[day] || 0,
    interactions: interactionsByDay[day] || 0,
  }))

  const counts = interactions.reduce((acc: any, interaction) => {
    const libelle = interaction.typeInteraction.type_inter_libelle
    acc[libelle] = (acc[libelle] || 0) + 1
    return acc
  }, {})

  const uniqueTypeInteractions = Object.entries(counts).map(([libelle, count]) => ({
    libelle,
    count,
  }))

  const pieChartData = uniqueTypeInteractions.map(({ libelle, count }) => {
    const color = libelle == "Exercice" ? "#bda38c" : "#8d5f52"
    return { name: libelle, value: count, color: color }
  })

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
      value: totalUsers,
      icon: Users,
      color: "from-leather-600 to-leather-500",
      trend: `${Math.floor(newUsersPercentage)} %`,
      trendUp: trendUpOrDownUsers,
      link: "/admin/users",
    },
    {
      title: "Exercices Actifs",
      value: totalExercices,
      icon: Activity,
      color: "from-leather-500 to-leather-400",
      link: "/admin/content/exercices",
    },
    {
      title: "Articles Publiés",
      value: totalInformations,
      icon: FileText,
      color: "from-leather-400 to-leather-300",
      link: "/admin/content/informations",
    },
    {
      title: "Interactions Aujourd'hui",
      value: totalInteractionsDay,
      icon: Zap,
      color: "from-leather-300 to-leather-200",
      trend: `${Math.floor(newInteractionsPercentage)} %`,
      trendUp: trendUpOrDownInteractions,
      link: "/admin/interactions",
    },
  ]

  const recentUsers = slicedUsers.map(({ ut_nom, ut_prenom, ut_mail, createdAt }) => {
    return { name: `${ut_prenom}  ${ut_nom}`, email: ut_mail, joinDate: new Date(createdAt).toLocaleString() }
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-leather-200 to-leather-300">
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
              <h2 className="text-4xl sm:text-5xl font-bold text-leather-900 mb-2 bg-gradient-to-r from-leather-800 to-leather-600 bg-clip-text text-transparent">
                Vue d'ensemble
              </h2>
              <p className="text-leather-600">
                Bienvenue <span className="font-bold text-leather-700">{user?.firstname}</span> sur votre tableau de
                bord administrateur
              </p>
            </motion.div>

            {/* Stats Cards Section */}
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
                  <Card className="relative overflow-hidden bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl border-none">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
                    />
                    <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-leather-100/50 group-hover:bg-leather-100 transition-colors duration-300" />
                    <div className="absolute right-4 bottom-4 w-12 h-12 rounded-full bg-leather-100/30 group-hover:scale-150 transition-transform duration-700" />

                    <CardContent className="p-6 sm:p-8 relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`p-3 rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                        >
                          <stat.icon className="h-6 w-6 text-white" />
                        </div>
                        {stat.trend && (
                          <Badge
                            variant={stat.trendUp ? "default" : "destructive"}
                            className={`text-xs font-semibold ${stat.trendUp ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-red-100 text-red-800 hover:bg-red-200"} shadow-sm`}
                          >
                            {stat.trendUp ? (
                              <TrendingUp className="mr-1 h-3 w-3" />
                            ) : (
                              <TrendingDown className="mr-1 h-3 w-3" />
                            )}
                            {stat.trend}
                          </Badge>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-leather-600 mb-1">{stat.title}</p>
                        <p className="text-3xl font-bold text-leather-900 bg-gradient-to-r from-leather-800 to-leather-600 bg-clip-text text-transparent">
                          {stat.value}
                        </p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-leather-200">
                        <Button
                          variant="ghost"
                          className="w-full justify-between text-leather-600 hover:text-leather-100 hover:bg-leather-600 transition-all duration-300 rounded-xl h-auto font-medium group"
                          onClick={() => navigate(stat.link)}
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

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="flex flex-col rounded-3xl h-full bg-white/90 border-none shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="border-b border-leather-200 bg-gradient-to-r from-leather-100 to-leather-50 items-center rounded-t-3xl text-center p-6">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <BarChartIcon className="h-5 w-5 text-leather-700" />
                      <CardTitle className="text-xl font-bold text-leather-900">
                        Activité Utilisateurs et Interactions
                      </CardTitle>
                    </div>
                    <CardDescription className="text-leather-600">Tendances hebdomadaires</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 pb-0 flex items-center justify-center p-6">
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
                        <Bar dataKey="utilisateurs" stackId="a" fill="#8d5f52" radius={[0, 0, 4, 4]} />
                        <Bar dataKey="interactions" stackId="a" fill="#bda38c" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                  <CardFooter className="flex-col gap-2 text-sm border-t p-6 border-leather-200 bg-gradient-to-r from-leather-100 to-leather-50 items-center rounded-b-3xl text-center">
                    <div className="flex items-center gap-2 font-medium text-leather-700">
                      <Calendar className="h-4 w-4" />
                      <span>Données des 7 derniers jours</span>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                <Card className="flex flex-col rounded-3xl h-full bg-white/90 border-none shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="border-b border-leather-200 bg-gradient-to-r from-leather-100 to-leather-50 items-center rounded-t-3xl p-6">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <PieChartIcon className="h-5 w-5 text-leather-700" />
                      <CardTitle className="text-xl font-bold text-leather-900">
                        Distribution des Interactions
                      </CardTitle>
                    </div>
                    <CardDescription className="text-leather-600">Répartition par type</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 pb-0 flex items-center justify-center p-6">
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
                                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                      <tspan
                                        x={viewBox.cx}
                                        y={viewBox.cy}
                                        className="fill-leather-900 text-3xl font-bold"
                                      >
                                        {getTotalInteractions}
                                      </tspan>
                                      <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-leather-600">
                                        Total
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
                  <CardFooter className="flex-col gap-2 text-sm border-t p-6 border-leather-200 bg-gradient-to-r from-leather-100 to-leather-50 items-center rounded-b-3xl">
                    <div className="flex items-center gap-2 font-medium text-leather-700">
                      <Clock className="h-4 w-4" />
                      <span>Dernières 24 heures</span>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            </div>

            {/* Recent Activity Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-leather-800 to-leather-600 bg-clip-text text-transparent mb-6">
                Activités Récentes
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Users Card */}
                <Card className="bg-white/90 shadow-lg rounded-3xl overflow-hidden border-none hover:shadow-xl transition-all duration-300 flex flex-col">
                  <CardHeader className="border-b border-leather-200 bg-gradient-to-r from-leather-100 to-leather-50 text-center p-6">
                    <div className="flex items-center justify-center gap-3 mb-1">
                      <Users className="h-5 w-5 text-leather-700" />
                      <CardTitle className="text-xl font-bold text-leather-900">Utilisateurs Récents</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow p-0">
                    <div className="divide-y divide-leather-200">
                      {recentUsers.map((user, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center justify-between p-6 hover:bg-leather-50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <Avatar className="border-2 border-leather-200 h-10 w-10 shadow-md">
                              <AvatarImage src={`https://i.pravatar.cc/150?u=${user.email}`} alt={user.name} />
                              <AvatarFallback className="bg-leather-600 text-white">
                                {user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-leather-900">{user.name}</p>
                              <p className="text-sm text-leather-600">{user.email}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="bg-leather-50 text-leather-700 border-leather-200">
                            {user.joinDate}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gradient-to-r from-leather-100 to-leather-50 border-t border-leather-200 p-4 text-center">
                    <Button
                      variant="ghost"
                      className="w-full text-leather-700 hover:text-leather-100 hover:bg-leather-600 transition-all duration-300 rounded-xl"
                      onClick={() => navigate("/admin/users")}
                    >
                      Voir tous les utilisateurs
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardFooter>
                </Card>

                {/* Recent Articles Card */}
                <Card className="bg-white/90 shadow-lg rounded-3xl overflow-hidden border-none hover:shadow-xl transition-all duration-300 flex flex-col">
                  <CardHeader className="border-b border-leather-200 bg-gradient-to-r from-leather-100 to-leather-50 text-center p-6">
                    <div className="flex items-center justify-center gap-3 mb-1">
                      <FileText className="h-5 w-5 text-leather-700" />
                      <CardTitle className="text-xl font-bold text-leather-900">Articles Récents</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow p-0">
                    <div className="divide-y divide-leather-200">
                      {slicedActiveInformations?.map((article, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center justify-between p-6 hover:bg-leather-50 transition-colors"
                        >
                          <div>
                            <p className="font-medium text-leather-900 line-clamp-1">{article.info_titre}</p>
                            <p className="text-sm text-leather-600">{new Date(article.createdAt).toLocaleString()}</p>
                          </div>
                          <Badge className="bg-leather-100 text-leather-800 border-none shadow-sm">
                            {article.typeInformation.type_info_nom}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gradient-to-r from-leather-100 to-leather-50 border-t border-leather-200 p-4 text-center">
                    <Button
                      onClick={() => navigate("/admin/content/informations")}
                      variant="ghost"
                      className="w-full text-leather-700 hover:text-leather-100 hover:bg-leather-600 transition-all duration-300 rounded-xl"
                    >
                      Voir tous les articles
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardFooter>
                </Card>

                {/* Exercises Card */}
                <Card className="bg-white/90 shadow-lg rounded-3xl overflow-hidden border-none hover:shadow-xl transition-all duration-300 flex flex-col">
                  <CardHeader className="border-b border-leather-200 bg-gradient-to-r from-leather-100 to-leather-50 text-center p-6">
                    <div className="flex items-center justify-center gap-3 mb-1">
                      <Activity className="h-5 w-5 text-leather-700" />
                      <CardTitle className="text-xl font-bold text-leather-900">Gestion des Exercices</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow p-0">
                    <div className="divide-y divide-leather-200">
                      {slicedExercices.map((exercice, index) => (
                        <motion.div
                          key={exercice.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center justify-between p-6 hover:bg-leather-50 transition-colors"
                        >
                          <div>
                            <p className="font-medium text-leather-900">{exercice.ex_nom}</p>
                            <p className="text-sm text-leather-600">{exercice.ex_duration} min</p>
                          </div>
                          <Badge className="bg-leather-100 text-leather-800 border-none shadow-sm">
                            {exercice.ex_difficulty}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gradient-to-r from-leather-100 to-leather-50 border-t border-leather-200 p-4 text-center">
                    <Button
                      variant="ghost"
                      className="w-full text-leather-700 hover:text-leather-100 hover:bg-leather-600 transition-all duration-300 rounded-xl"
                      onClick={() => navigate("/admin/content/exercices")}
                    >
                      Voir tous les exercices
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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

