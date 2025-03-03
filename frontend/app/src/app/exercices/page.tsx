import BreathingExercises from "@/components/exercices/exercices-frontpage";
import { Navbar } from "@/components/navigation-menu/navigation-menu";
import { useAuth } from "@/context/AuthContext";
import { useGetTypeInteractions } from "@/hooks/admin/type-interactions/useGetTypeInteractions";
import { useGetExercicesFront } from "@/hooks/exercices/useGetExercicesFront";
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom";
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

export default function ExercicesFrontPage() {
    const { exercices, loading } = useGetExercicesFront();
    const navigate = useNavigate();
    const { typeInteractions } = useGetTypeInteractions()
    const { user } = useAuth()

    const interaction = typeInteractions.find((inter) => inter.type_inter_libelle === 'Exercice')

    if (!loading && !exercices) {
        navigate(-1)
        return null;
    }
    return (
        <div className="min-h-screen">
            <Navbar />
            {loading ? <Loader /> : <BreathingExercises exercices={exercices} interaction={interaction} user={user} />}
            <FooterPage />
        </div>
    )
}