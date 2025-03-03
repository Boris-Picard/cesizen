import { FooterPage } from "@/app/footer/page";
import { InformationsDetailPageComponents } from "@/components/informations/informations-detail-page/informations-detail-page";
import { Navbar } from "@/components/navigation-menu/navigation-menu";
import { useGetInformationsId } from "@/hooks/informations/useGetInformationsId";
import { useNavigate, useParams } from "react-router-dom";

export function InformationsDetailPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { information, loading } = useGetInformationsId(id)

    if (!loading && !information) {
        navigate("/informations");
        return null;
    }

    return (
        <div className="min-h-scren">
            <Navbar />
            <InformationsDetailPageComponents information={information} />
            <FooterPage />
        </div>
    )
}