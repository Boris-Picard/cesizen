import { useParams, useNavigate } from "react-router-dom";
import { useGetExercicesId } from "@/hooks/exercices/useGetExercicesId";
import ExerciceDetail from "@/components/exercices/exercices-detail-page/exercices-detail-page";
import { Navbar } from "@/components/navigation-menu/navigation-menu";
import { motion } from "framer-motion"
import { useGetTypeInteractions } from "@/hooks/admin/type-interactions/useGetTypeInteractions";
import { useAuth } from "@/context/AuthContext";
import { FooterPage } from "@/app/footer/page";

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

export default function ExercicesDetailPage() {
    const { id } = useParams();
    const { exercice, loading } = useGetExercicesId(id);
    const navigate = useNavigate();
    const { typeInteractions } = useGetTypeInteractions()
    const { user } = useAuth()

    const interaction = typeInteractions.find((inter) => inter.type_inter_libelle === 'Exercice')

    if (!loading && !exercice) {
        navigate("/exercices");
        return null;
    }

    return (
        <div className="min-h-screen">
            <Navbar />
            {loading ? <Loader /> : <ExerciceDetail exercice={exercice} user={user} typeInteraction={interaction} />}
            <FooterPage />
        </div>
    );
}
