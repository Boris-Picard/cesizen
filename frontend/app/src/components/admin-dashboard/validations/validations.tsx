import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-siderbar/app-sidebar";
import AdminHeader from "@/components/admin-dashboard/header/header";
import { DataTable } from "@/components/ui/data-table";
import { motion } from "framer-motion";
import { useGetValidations } from "@/hooks/admin/validations/useGetValidations";
import { validationColumns } from "./column";

export function ValidationsComponents() {
    const { validations, loading } = useGetValidations();

    return (
        <div className="bg-leather-200 min-h-screen">
            <SidebarProvider>
                <AppSidebar />
                <div className="flex-1">
                    <AdminHeader h1="Validations" />
                    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-leather-50 shadow-lg rounded-xl p-6 mb-8"
                        >
                            <h2 className="text-3xl font-bold text-leather-800 mb-4">
                                Liste des Validations
                            </h2>
                            {loading ? (
                                <div className="flex justify-center items-center h-64">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-leather-600"></div>
                                </div>
                            ) : (
                                <DataTable
                                    columns={validationColumns}
                                    data={validations.map((item) => ({ ...item, id: item.id }))}
                                />
                            )}
                        </motion.div>
                    </main>
                </div>
            </SidebarProvider>
        </div>
    );
}
