import { InformationsComponents } from "@/components/informations/informations";
import { Navbar } from "@/components/navigation-menu/navigation-menu";
import { useGetInformationsFront } from "@/hooks/informations/useGetInformationsFront";
import { motion } from "framer-motion"

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
console.log(informations);

    return (
        <div className="min-h-screen ">
            <Navbar />
            {loading ? <Loader /> : <InformationsComponents informationsData={informations} />}
        </div>
    )
}