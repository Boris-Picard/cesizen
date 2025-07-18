import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-siderbar/app-sidebar";
import AdminHeader from "@/components/admin-dashboard/header/header";
import { DataTable } from "@/components/ui/data-table";
import { motion } from "framer-motion";
import { ExerciceType, getColumns } from "./column";
import AddExerciceModal from "./add-exercice-modal";
import EditExerciceModal from "./edit-exercice-modal";
import DeleteExerciceModal from "./delete-exercice-modal";
import { useGetExercices } from "@/hooks/admin/exercices/useGetExercices";

export function ExercicesComponents() {
    const [selectedExercice, setSelectedExercice] = useState<ExerciceType | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [selectedExerciceToDelete, setSelectedExerciceToDelete] = useState<ExerciceType | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const { exercices, loading, setExercices } = useGetExercices();

    const handleEdit = (exercice: ExerciceType) => {
        setSelectedExercice(exercice);
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (exercice: ExerciceType) => {
        setSelectedExerciceToDelete(exercice);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirmed = (exId: number) => {
        setExercices((prevData) => prevData.filter((ex) => ex.id !== exId));
    };

    const columns = getColumns(handleEdit, openDeleteModal);

    return (
        <div className="bg-leather-200 min-h-screen">
            <SidebarProvider>
                <AppSidebar />
                <div className="flex-1">
                    <AdminHeader h1="Gestion des Exercices" />
                    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-leather-50 shadow-lg rounded-xl p-6 mb-8"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                                <h2 className="text-3xl font-bold text-leather-800 mb-4 md:mb-0">
                                    Liste des Exercices
                                </h2>
                                <div className="flex items-center space-x-4">
                                    <AddExerciceModal
                                        onExerciceAdded={(newExercice) => {
                                            setExercices((prev) => [...prev, newExercice]);
                                        }}
                                    />
                                </div>
                            </div>
                            {selectedExercice && (
                                <EditExerciceModal
                                    exercice={selectedExercice}
                                    open={isEditModalOpen}
                                    onClose={() => setIsEditModalOpen(false)}
                                    onSave={(updatedExercice) => {
                                        setExercices((prev) =>
                                            prev.map((ex) =>
                                                ex.id === selectedExercice.id
                                                    ? { ...ex, ...updatedExercice }
                                                    : ex
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
                                <DataTable columns={columns} data={exercices} />
                            )}
                        </motion.div>
                    </main>
                </div>
                {selectedExerciceToDelete && (
                    <DeleteExerciceModal
                        exercice={selectedExerciceToDelete}
                        open={isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(false)}
                        onDelete={handleDeleteConfirmed}
                    />
                )}
            </SidebarProvider>
        </div>
    );
}
