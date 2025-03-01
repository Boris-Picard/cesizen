import { InformationsComponents } from "@/components/informations/informations";
import { Navbar } from "@/components/navigation-menu/navigation-menu";
import { useAuth } from "@/context/AuthContext";
import { useGetTypeInteractions } from "@/hooks/admin/type-interactions/useGetTypeInteractions";
import { useGetInformationsFront } from "@/hooks/informations/useGetInformationsFront";
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom";

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

export default function InformationsPage() {
    const { informations, loading } = useGetInformationsFront()
    const { typeInteractions } = useGetTypeInteractions()
    const navigate = useNavigate()
    const { user } = useAuth()

    const interaction = typeInteractions.find((inter) => inter.type_inter_libelle === 'Information')

    if (!loading && !informations) {
        navigate(-1)
        return null;
    }

    return (
        <div className="min-h-screen ">
            <Navbar />
            {loading ? <Loader /> : <InformationsComponents user={user} interaction={interaction} informationsData={informations} />}
        </div>
    )
}