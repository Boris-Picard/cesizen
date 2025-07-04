import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-siderbar/app-sidebar";
import AdminHeader from "@/components/admin-dashboard/header/header";
import { DataTable } from "@/components/ui/data-table";
import { motion } from "framer-motion";
import { getColumns, TypeInformation } from "./column";
import { useGetTypeInformations } from "@/hooks/admin/useGetTypeInformations";
import AddTypeInformationModal from "./add-type-informations-modal";
import EditTypeInformationModal from "./edit-type-informations-modal";
import DeleteTypeInformationModal from "./delete-type-informations-modal";

export function TypeInformationsComponents() {
    const [selectedType, setSelectedType] = useState<TypeInformation | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [selectedTypeToDelete, setSelectedTypeToDelete] = useState<TypeInformation | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const { typeInformations, loading, setTypeInformations } = useGetTypeInformations();

    const handleEdit = (typeInfo: TypeInformation) => {
        setSelectedType(typeInfo);
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (typeInfo: TypeInformation) => {
        setSelectedTypeToDelete(typeInfo);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirmed = (typeInfoId: number) => {
        setTypeInformations(prev => prev.filter(typeInfo => typeInfo.id !== typeInfoId));
    };

    const columns = getColumns(handleEdit, openDeleteModal);

    return (
        <div className="bg-leather-200 min-h-screen">
            <SidebarProvider>
                <AppSidebar />
                <div className="flex-1">
                    <AdminHeader h1="Gestion des Types d'Informations" />
                    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-leather-50 shadow-lg rounded-xl p-6 mb-8"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                                <h2 className="text-3xl font-bold text-leather-800 mb-4 md:mb-0">
                                    Liste des Types d'Informations
                                </h2>
                                <div className="flex items-center space-x-4">
                                    <AddTypeInformationModal
                                        onTypeInformationAdded={(newType) => {
                                            setTypeInformations(prev => [...prev, newType]);
                                        }}
                                    />
                                </div>
                            </div>
                            {selectedType && (
                                <EditTypeInformationModal
                                    typeInformation={selectedType}
                                    open={isEditModalOpen}
                                    onClose={() => setIsEditModalOpen(false)}
                                    onSave={(updatedType) => {
                                        setTypeInformations(prev =>
                                            prev.map(typeInfo =>
                                                typeInfo.id === selectedType.id ? { ...typeInfo, ...updatedType } : typeInfo
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
                                <DataTable columns={columns} data={typeInformations} />
                            )}
                        </motion.div>
                    </main>
                </div>
                {selectedTypeToDelete && (
                    <DeleteTypeInformationModal
                        typeInformation={selectedTypeToDelete}
                        open={isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(false)}
                        onDelete={handleDeleteConfirmed}
                    />
                )}
            </SidebarProvider>
        </div>
    );
}
