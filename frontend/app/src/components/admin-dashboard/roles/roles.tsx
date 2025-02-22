import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-siderbar/app-sidebar";
import AdminHeader from "@/components/admin-dashboard/header/header";
import { DataTable } from "@/components/ui/data-table";
import { motion } from "framer-motion";
import { getColumns, Role } from "./columns";
import AddRoleModal from "./add-role-modal";
import EditRoleModal from "./edit-role-modal";
// import DeleteRoleModal from "./delete-role-modal";
import { useGetRoles } from "@/hooks/admin/useGetRoles";
import DeleteRoleModal from "./delete-role-modal";

export function RolesComponents() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [selectedRoleToDelete, setSelectedRoleToDelete] = useState<Role | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const { roles, loading, setRoles } = useGetRoles();

    const filteredData = roles.filter((role) =>
        role.role_nom.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (role: Role) => {
        setSelectedRole(role);
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (role: Role) => {
        setSelectedRoleToDelete(role);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirmed = (roleId: number) => {
        setRoles((prevData) => prevData.filter((role) => role.id !== roleId));
    };

    const columns = getColumns(handleEdit, openDeleteModal);

    return (
        <div className="bg-leather-200 min-h-screen">
            <SidebarProvider>
                <AppSidebar />
                <div className="flex-1">
                    <AdminHeader h1="Gestion des Rôles" />
                    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-leather-50 shadow-lg rounded-xl p-6 mb-8"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                                <h2 className="text-3xl font-bold text-leather-800 mb-4 md:mb-0">
                                    Liste des Rôles
                                </h2>
                                <div className="flex items-center space-x-4">
                                    <AddRoleModal
                                        onRoleAdded={(newRole) => {
                                            setRoles((prev) => [...prev, newRole]);
                                        }}
                                    />
                                </div>
                            </div>
                            {selectedRole && (
                                <EditRoleModal
                                    role={selectedRole}
                                    open={isEditModalOpen}
                                    onClose={() => setIsEditModalOpen(false)}
                                    onSave={(updatedRole) => {
                                        setRoles((prev) =>
                                            prev.map((role) =>
                                                role.id === selectedRole.id ? { ...role, ...updatedRole } : role
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
                {/* Modale de suppression */}
                {selectedRoleToDelete && (
                    <DeleteRoleModal
                        role={selectedRoleToDelete}
                        open={isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(false)}
                        onDelete={handleDeleteConfirmed}
                    />
                )}
            </SidebarProvider>
        </div>
    );
}
