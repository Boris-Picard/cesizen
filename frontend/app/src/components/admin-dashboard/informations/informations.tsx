import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-siderbar/app-sidebar";
import AdminHeader from "@/components/admin-dashboard/header/header";
import { DataTable } from "@/components/ui/data-table";
import { motion } from "framer-motion";
import { getInformationColumns, Information } from "./column";
import AddInformationModal from "./add-information-modal";
import EditInformationModal from "./edit-information-modal";
import DeleteInformationModal from "./delete-information";
import { useGetInformations } from "@/hooks/admin/informations/useGetInformations";

export function InformationsComponents() {
    const [selectedInformation, setSelectedInformation] = useState<Information | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [selectedInformationToDelete, setSelectedInformationToDelete] = useState<Information | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const { informations, loading, setInformations } = useGetInformations();

    const handleEdit = (information: Information) => {
        setSelectedInformation(information);
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (information: Information) => {
        setSelectedInformationToDelete(information);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirmed = (infoId: number) => {
        setInformations(prev => prev.filter(info => info.id !== infoId));
    };

    const columns = getInformationColumns(handleEdit, openDeleteModal);

    return (
        <div className="bg-leather-200 min-h-screen">
            <SidebarProvider>
                <AppSidebar />
                <div className="flex-1">
                    <AdminHeader h1="Gestion des Informations" />
                    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-leather-50 shadow-lg rounded-xl p-6 mb-8"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                                <h2 className="text-3xl font-bold text-leather-800 mb-4 md:mb-0">
                                    Liste des Informations
                                </h2>
                                <div className="flex items-center space-x-4">
                                    <AddInformationModal
                                        onInformationAdded={(newInfo) => {
                                            setInformations(prev => [...prev, newInfo]);
                                        }}
                                    />
                                </div>
                            </div>
                            {selectedInformation && (
                                <EditInformationModal
                                    information={selectedInformation}
                                    open={isEditModalOpen}
                                    onClose={() => setIsEditModalOpen(false)}
                                    onSave={(updatedInfo) => {
                                        setInformations((prev) =>
                                            prev.map((info) =>
                                                info.id === selectedInformation.id
                                                    ? {
                                                        ...info,
                                                        ...updatedInfo,
                                                        typeInformation:
                                                            typeof updatedInfo.typeInformation === "string"
                                                                ? { id: selectedInformation.typeInformation.id, type_info_nom: updatedInfo.typeInformation }
                                                                : updatedInfo.typeInformation,
                                                    }
                                                    : info
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
                                <DataTable columns={columns} data={informations} />
                            )}
                        </motion.div>
                    </main>
                </div>
                {selectedInformationToDelete && (
                    <DeleteInformationModal
                        information={selectedInformationToDelete}
                        open={isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(false)}
                        onDelete={handleDeleteConfirmed}
                    />
                )}
            </SidebarProvider>
        </div>
    );
}
