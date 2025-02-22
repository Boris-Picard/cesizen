import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-siderbar/app-sidebar";
import AdminHeader from "@/components/admin-dashboard/header/header";
import { DataTable } from "@/components/ui/data-table";
import { motion } from "framer-motion";
import { getColumns, TypeInteraction } from "./columns";
import { useGetTypeInteractions } from "@/hooks/admin/type-interactions/useGetTypeInteractions";
import AddTypeInteractionModal from "./add-type-interactions-modal";
import EditTypeInteractionModal from "./edit-type-interactions-modal";
import DeleteTypeInteractionModal from "./delete-type-interactions-modal";

export function TypeInteractionsComponents() {
    const [selectedType, setSelectedType] = useState<TypeInteraction | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [selectedTypeToDelete, setSelectedTypeToDelete] = useState<TypeInteraction | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const { typeInteractions, loading, setTypeInteractions } = useGetTypeInteractions();

    const handleEdit = (typeInteraction: TypeInteraction) => {
        setSelectedType(typeInteraction);
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (typeInteraction: TypeInteraction) => {
        setSelectedTypeToDelete(typeInteraction);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirmed = (typeInteractionId: number) => {
        setTypeInteractions(prev => prev.filter(type => type.id !== typeInteractionId));
    };

    const columns = getColumns(handleEdit, openDeleteModal);

    return (
        <div className="bg-leather-200 min-h-screen">
            <SidebarProvider>
                <AppSidebar />
                <div className="flex-1">
                    <AdminHeader h1="Gestion des Types d'Interactions" />
                    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-leather-50 shadow-lg rounded-xl p-6 mb-8"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                                <h2 className="text-3xl font-bold text-leather-800 mb-4 md:mb-0">
                                    Liste des Types d'Interactions
                                </h2>
                                <div className="flex items-center space-x-4">
                                    <AddTypeInteractionModal
                                        onTypeInteractionAdded={(newType) => {
                                            setTypeInteractions(prev => [...prev, newType]);
                                        }}
                                    />
                                </div>
                            </div>
                            {selectedType && (
                                <EditTypeInteractionModal
                                    typeInteraction={selectedType}
                                    open={isEditModalOpen}
                                    onClose={() => setIsEditModalOpen(false)}
                                    onSave={(updatedType) => {
                                        setTypeInteractions(prev =>
                                            prev.map(type =>
                                                type.id === selectedType.id ? { ...type, ...updatedType } : type
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
                                <DataTable columns={columns} data={typeInteractions} />
                            )}
                        </motion.div>
                    </main>
                </div>
                {selectedTypeToDelete && (
                    <DeleteTypeInteractionModal
                        typeInteraction={selectedTypeToDelete}
                        open={isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(false)}
                        onDelete={handleDeleteConfirmed}
                    />
                )}
            </SidebarProvider>
        </div>
    );
}
