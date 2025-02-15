import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-siderbar/app-sidebar"
import AdminHeader from "@/components/admin-dashboard/header/header"
import { DataTable } from "@/components/ui/data-table"
import { columns, User } from "./columns"

export default function UsersComponents() {
    const [searchTerm, setSearchTerm] = useState("")
    const [data, setData] = useState<User[]>([])

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUsers = async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            const fakeUsers: User[] = [
                { id: 1, firstname: "Alice", lastname: "Johnson", email: "alice@example.com", role: "Utilisateur" },
                { id: 2, firstname: "Bob", lastname: "Smith", email: "bob@example.com", role: "Admin" },
                { id: 3, firstname: "Carol", lastname: "Williams", email: "carol@example.com", role: "Utilisateur" },
                { id: 4, firstname: "David", lastname: "Brown", email: "david@example.com", role: "Utilisateur" },
                { id: 5, firstname: "Eva", lastname: "Green", email: "eva@example.com", role: "Admin" },
                { id: 6, firstname: "Frank", lastname: "Miller", email: "frank@example.com", role: "Utilisateur" },
                { id: 7, firstname: "Grace", lastname: "Lee", email: "grace@example.com", role: "Admin" },
                { id: 8, firstname: "Henry", lastname: "Taylor", email: "henry@example.com", role: "Utilisateur" },
                { id: 9, firstname: "Ivy", lastname: "Davis", email: "ivy@example.com", role: "Utilisateur" },
                { id: 10, firstname: "Jack", lastname: "Wilson", email: "jack@example.com", role: "Admin" },
                { id: 11, firstname: "Kate", lastname: "Miller", email: "kate@example.com", role: "Utilisateur" },
                { id: 12, firstname: "Liam", lastname: "Anderson", email: "liam@example.com", role: "Admin" },
                { id: 13, firstname: "Mia", lastname: "Robinson", email: "mia@example.com", role: "Utilisateur" },
                { id: 14, firstname: "Noah", lastname: "Thompson", email: "noah@example.com", role: "Utilisateur" },
                { id: 15, firstname: "Olivia", lastname: "Martinez", email: "olivia@example.com", role: "Admin" }
            ]
            setData(fakeUsers)
            setLoading(false)
        }
        fetchUsers()
    }, [])

    const filteredData = data.filter(
        (user) =>
            user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div>
            <SidebarProvider>
                <AppSidebar />
                <div className="flex-1">
                    <AdminHeader h1="Gestion des Utilisateurs" />
                    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="mb-8 flex justify-between items-center">
                            <h2 className="text-2xl font-semibold text-green-800">Liste des Utilisateurs</h2>
                            <Button className="bg-green-600 hover:bg-green-700 text-white">
                                Ajouter un Utilisateur
                            </Button>
                        </div>
                        {loading ? (
                            <p>Chargement...</p>
                        ) : (
                            <DataTable columns={columns} data={filteredData} />
                        )}
                    </main>
                </div>
            </SidebarProvider>
        </div>
    )
}
