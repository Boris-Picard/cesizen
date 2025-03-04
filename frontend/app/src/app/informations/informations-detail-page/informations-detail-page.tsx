import { FooterPage } from "@/app/footer/page";
import { InformationsDetailPageComponents } from "@/components/informations/informations-detail-page/informations-detail-page";
import { Navbar } from "@/components/navigation-menu/navigation-menu";
import { useAuth } from "@/context/AuthContext";
import { useGetTypeInteractions } from "@/hooks/admin/type-interactions/useGetTypeInteractions";
import { useGetInformationsFront } from "@/hooks/informations/useGetInformationsFront";
import { useGetInformationsId } from "@/hooks/informations/useGetInformationsId";
import { useNavigate, useParams } from "react-router-dom";

export function InformationsDetailPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { information, loading } = useGetInformationsId(id)
    const { informations } = useGetInformationsFront()
    const { typeInteractions } = useGetTypeInteractions()
    const { user } = useAuth()

    if (!loading && !information) {
        navigate("/informations");
        return null;
    }

    const interaction = typeInteractions.find((inter) => inter.type_inter_libelle === 'Information')

    return (
        <div className="min-h-scren">
            <Navbar />
            <InformationsDetailPageComponents information={information} articles={informations} interaction={interaction} user={user} />
            <FooterPage />
        </div>
    )
}