import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-siderbar/app-sidebar"
import { Search, Edit, Trash2, Eye } from "lucide-react"
import AdminHeader from "@/components/admin-dashboard/header/header"

export default function ArticlesComponents() {
    const [searchTerm, setSearchTerm] = useState("")

    const articles = [
        { id: 1, title: "Comprendre la Santé Mentale", type: "Santé", date: "2023-05-15", status: "Publié" },
        { id: 2, title: "Techniques de Gestion du Stress", type: "Stress", date: "2023-05-14", status: "Brouillon" },
        { id: 3, title: "Bienfaits de la Respiration Profonde", type: "Respiration", date: "2023-05-13", status: "Publié" },
    ]

    const filteredArticles = articles.filter(
        (article) =>
            article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.type.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    return (
        <div>
            <SidebarProvider>
                <AppSidebar />
                <div className="flex-1">
                    <AdminHeader h1="Gestion des Articles" />
                    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <Card className="bg-white">
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <CardTitle>Liste des Articles</CardTitle>
                                    <Button className="bg-green-600 hover:bg-green-700 text-white">Ajouter un Article</Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="relative mb-4">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                                    <Input
                                        type="search"
                                        placeholder="Rechercher un article..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="max-w-sm pl-10"
                                    />
                                </div>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Titre</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Statut</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredArticles.map((article) => (
                                            <TableRow key={article.id}>
                                                <TableCell>{article.title}</TableCell>
                                                <TableCell>{article.type}</TableCell>
                                                <TableCell>{article.date}</TableCell>
                                                <TableCell>{article.status}</TableCell>
                                                <TableCell>
                                                    <div className="flex space-x-2">
                                                        <Button variant="ghost" size="icon">
                                                            <Eye className="h-4 w-4 text-blue-600" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon">
                                                            <Edit className="h-4 w-4 text-green-600" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon">
                                                            <Trash2 className="h-4 w-4 text-red-600" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </main>
                </div>
            </SidebarProvider >
        </div >
    )
}

