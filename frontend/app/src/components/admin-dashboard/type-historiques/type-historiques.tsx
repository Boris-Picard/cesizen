import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-siderbar/app-sidebar";
import AdminHeader from "@/components/admin-dashboard/header/header";
import { DataTable } from "@/components/ui/data-table";
import { motion } from "framer-motion";
import { getColumns, TypeHistorique } from "./column";
import { useGetTypeHistoriques } from "@/hooks/admin/type-historiques/useGetTypeHistoriques";
import AddTypeHistoriqueModal from "./add-type-historiques-modal";
import EditTypeHistoriqueModal from "./edit-type-historiques-modal";
import DeleteTypeHistoriqueModal from "./delete-type-historiques-modal";

export function TypeHistoriquesComponents() {
    const [selectedType, setSelectedType] = useState<TypeHistorique | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [selectedTypeToDelete, setSelectedTypeToDelete] = useState<TypeHistorique | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const { typeHistoriques, loading, setTypeHistoriques } = useGetTypeHistoriques();

    const handleEdit = (typeHistorique: TypeHistorique) => {
        setSelectedType(typeHistorique);
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (typeHistorique: TypeHistorique) => {
        setSelectedTypeToDelete(typeHistorique);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirmed = (typeHistoriqueId: number) => {
        setTypeHistoriques(prev => prev.filter(type => type.id !== typeHistoriqueId));
    };

    const columns = getColumns(handleEdit, openDeleteModal);

    return (
        <div className="bg-leather-200 min-h-screen">
            <SidebarProvider>
                <AppSidebar />
                <div className="flex-1">
                    <AdminHeader h1="Gestion des Types d'Historiques" />
                    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-leather-50 shadow-lg rounded-xl p-6 mb-8"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                                <h2 className="text-3xl font-bold text-leather-800 mb-4 md:mb-0">
                                    Liste des Types d'Historiques
                                </h2>
                                <div className="flex items-center space-x-4">
                                    <AddTypeHistoriqueModal
                                        onTypeHistoriqueAdded={(newType) => {
                                            setTypeHistoriques(prev => [...prev, newType]);
                                        }}
                                    />
                                </div>
                            </div>
                            {selectedType && (
                                <EditTypeHistoriqueModal
                                    typeHistorique={selectedType}
                                    open={isEditModalOpen}
                                    onClose={() => setIsEditModalOpen(false)}
                                    onSave={(updatedType) => {
                                        setTypeHistoriques(prev =>
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
                                <DataTable columns={columns} data={typeHistoriques} />
                            )}
                        </motion.div>
                    </main>
                </div>
                {selectedTypeToDelete && (
                    <DeleteTypeHistoriqueModal
                        typeHistorique={selectedTypeToDelete}
                        open={isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(false)}
                        onDelete={handleDeleteConfirmed}
                    />
                )}
            </SidebarProvider>
        </div>
    );
}
