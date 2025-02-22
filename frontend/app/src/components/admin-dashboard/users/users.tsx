import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-siderbar/app-sidebar";
import AdminHeader from "@/components/admin-dashboard/header/header";
import { DataTable } from "@/components/ui/data-table";
import { getColumns, User } from "./columns";
import AddUserModal from "./add-user-modal";
import { motion } from "framer-motion";
import EditUserModal from "./edit-user-modal";
import DeleteUserModal from "./deleter-user-modal";
import { useGetUsers } from "@/hooks/admin/users/useGetUsers";

export default function UsersComponents() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [selectedUserToDelete, setSelectedUserToDelete] = useState<User | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const { users, loading, setUsers } = useGetUsers()

    const filteredData = users.filter(
        (user) =>
            user?.ut_mail?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (user: User) => {
        setSelectedUserToDelete(user);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirmed = (userId: number) => {
        setUsers(prevData => prevData.filter(user => user.id !== userId));
    };

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
                                        setUsers((prevData) => [...prevData, newUser]);
                                    }} />
                                </div>
                            </div>
                            {selectedUser && (
                                <EditUserModal
                                    user={selectedUser}
                                    open={isEditModalOpen}
                                    onClose={() => setIsEditModalOpen(false)}
                                    onSave={(updatedUser) => {
                                        setUsers(prevData =>
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
