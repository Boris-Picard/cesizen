import { useState, useEffect } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-siderbar/app-sidebar"
import AdminHeader from "@/components/admin-dashboard/header/header"
import { DataTable } from "@/components/ui/data-table"
import { getColumns, User } from "./columns"
import AddUserModal from "./add-user-modal"
import { motion } from "framer-motion"
import { useAuth } from "@/context/AuthContext"
import EditUserModal from "./edit-user-modal"

export default function UsersComponents() {
    const [searchTerm, setSearchTerm] = useState("")
    const [data, setData] = useState<User[]>([])
    const { token } = useAuth()
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUsers = async () => {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            }
            const response = await fetch("http://cesizen-api.localhost/api/utilisateurs", options)
            const data = await response.json();

            setData(data)
            setLoading(false)
            console.log(data);

        }
        fetchUsers()
    }, [])

    const filteredData = data.filter(
        (user) =>
            user?.ut_mail.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };

    // Fonction de suppression
    const handleDelete = async (user: User) => {
        if (confirm(`Voulez-vous vraiment supprimer ${user.ut_nom} ?`)) {
            try {
                const options = {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };
                await fetch(`http://cesizen-api.localhost/api/utilisateurs/${user.id}`, options);
                // Mettre à jour l'état local en supprimant l'utilisateur
                setData((prev) => prev.filter((u) => u.id !== user.id));
            } catch (error) {
                console.error("Erreur lors de la suppression de l'utilisateur", error);
            }
        }
    };

    const columns = getColumns(handleEdit, handleDelete);

    return (
        <div className="bg-leather-200 min-h-screen">
            <SidebarProvider>
                <AppSidebar />
                <div className="flex-1">
                    <AdminHeader h1="Gestion des Utilisateurs" />
                    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-leather-50 shadow-lg rounded-xl p-6 mb-8"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                                <h2 className="text-3xl font-bold text-leather-800 mb-4 md:mb-0">
                                    Liste des Utilisateurs
                                </h2>
                                <div className="flex items-center space-x-4">
                                    <AddUserModal />
                                </div>
                            </div>
                            {selectedUser && (
                                <EditUserModal
                                    user={selectedUser}
                                    open={isEditModalOpen}
                                    onClose={() => setIsEditModalOpen(false)}
                                    onSave={(updatedUser) => {
                                        // Met à jour le state "data" avec la nouvelle liste d'utilisateurs
                                        setData(prevData =>
                                            // Pour chaque utilisateur de la liste
                                            prevData.map(u =>
                                                // Si c'est l'utilisateur modifié
                                                u.id === selectedUser.id
                                                    // On fusionne l'utilisateur existant (u) avec les données mises à jour (updatedUser)
                                                    // et on force la propriété "role" à reprendre la valeur de selectedUser.role 
                                                    ? { ...u, ...updatedUser, role: selectedUser.role }
                                                    // Sinon, on garde l'utilisateur inchangé
                                                    : u
                                            )
                                        );
                                    }}
                                />
                            )}
                            {loading ? (
                                <div className="flex justify-center items-center h-64">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-leather-600"></div>
                                </div>
                            ) : (
                                <DataTable columns={columns} data={filteredData} />
                            )}
                        </motion.div>
                    </main>
                </div>
            </SidebarProvider>
        </div>
    );
}
