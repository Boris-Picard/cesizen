import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-siderbar/app-sidebar";
import AdminHeader from "@/components/admin-dashboard/header/header";
import { DataTable } from "@/components/ui/data-table";
import { getColumns, User } from "./columns";
import AddUserModal from "./add-user-modal";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import EditUserModal from "./edit-user-modal";
import DeleteUserModal from "./deleter-user-modal";

export default function UsersComponents() {
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState<User[]>([]);
    const { token } = useAuth();
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);

    const [selectedUserToDelete, setSelectedUserToDelete] = useState<User | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchUsers = async () => {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            }
            const response = await fetch("http://cesizen-api.localhost/api/utilisateurs", options);
            const data = await response.json();

            setData(data);
            setLoading(false);
            console.log(data);
        }
        fetchUsers();
    }, [token]);

    const filteredData = data.filter(
        (user) =>
            user?.ut_mail?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };

    // Ancienne fonction de suppression remplacée par l'ouverture de la modale
    const openDeleteModal = (user: User) => {
        setSelectedUserToDelete(user);
        setIsDeleteModalOpen(true);
    };

    // Callback exécuté après confirmation de suppression dans DeleteUserModal
    const handleDeleteConfirmed = (userId: number) => {
        setData(prevData => prevData.filter(user => user.id !== userId));
    };

    // Par exemple, modifiez getColumns pour utiliser openDeleteModal à la place de handleDelete direct
    const columns = getColumns(handleEdit, openDeleteModal);

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
                                    <AddUserModal onUserAdded={(newUser) => {
                                        setData((prevData) => [...prevData, newUser]);
                                    }} />
                                </div>
                            </div>
                            {selectedUser && (
                                <EditUserModal
                                    user={selectedUser}
                                    open={isEditModalOpen}
                                    onClose={() => setIsEditModalOpen(false)}
                                    onSave={(updatedUser) => {
                                        setData(prevData =>
                                            prevData.map(u =>
                                                u.id === selectedUser.id
                                                    ? {
                                                        ...u,
                                                        ...updatedUser,
                                                        role: typeof updatedUser.role === 'string' ? selectedUser.role : updatedUser.role
                                                    }
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
                {/* Affichage de la modale de suppression */}
                {selectedUserToDelete && (
                    <DeleteUserModal
                        user={selectedUserToDelete}
                        open={isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(false)}
                        onDelete={handleDeleteConfirmed}
                    />
                )}
            </SidebarProvider>
        </div>
    );
}
