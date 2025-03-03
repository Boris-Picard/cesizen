import { Navbar } from "@/components/navigation-menu/navigation-menu";
import UserDashboard from "@/components/profile/profile";
import { useAuth } from "@/context/AuthContext";
import { useGetUserProfile } from "@/hooks/profile/useGetUserProfiles";
import { motion } from "framer-motion"
import { FooterPage } from "../footer/page";

const Loader = () => (
    <motion.div
        key="loader"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex items-center justify-center h-screen"
    >
        <div className="w-16 h-16 border-4 border-leather-600 rounded-full border-t-transparent animate-spin" />
    </motion.div>
);

export default function ProfilePage() {
    const { user } = useAuth()
    const { userProfile, loading } = useGetUserProfile(user?.id.toString())
    const totalInteractions = userProfile?.interactions.length

    const exercicesData = userProfile?.interactions
        .filter((interaction) => interaction.exercice)
        .map((interaction) => ({
            id: interaction.exercice!.id,
            ex_nom: interaction.exercice!.ex_nom,
            ex_duration: interaction.exercice!.ex_duration,
            inter_date_de_debut: interaction.inter_date_de_debut
                ? new Date(interaction.inter_date_de_debut)
                : undefined,
            inter_date_de_fin: interaction.inter_date_de_fin
                ? new Date(interaction.inter_date_de_fin)
                : undefined,
        })) || [];

    const informationsData = userProfile?.interactions
        .filter((interaction) => interaction.information)
        .map((interaction) => ({
            id: interaction.information!.id,
            info_titre: interaction.information!.info_titre,
            type_info_nom: interaction.information!.typeInformation?.type_info_nom,
            inter_date_de_debut: interaction.inter_date_de_debut
                ? new Date(interaction.inter_date_de_debut)
                : undefined,
            inter_date_de_fin: interaction.inter_date_de_fin
                ? new Date(interaction.inter_date_de_fin)
                : undefined,
        })) || [];

    return (
        <div className="min-h-screen ">
            <Navbar />
            {loading ? <Loader /> : <UserDashboard user={user} exercices={exercicesData} informations={informationsData} totalInteractions={totalInteractions} />}
            <FooterPage />
        </div>
    )
}