import { InformationsDetailPageComponents } from "@/components/informations/informations-detail-page/informations-detail-page";
import { Navbar } from "@/components/navigation-menu/navigation-menu";

export function InformationsDetailPage() {
    return (
        <div className="min-h-scren">
            <Navbar />
            <InformationsDetailPageComponents params={{ id: "dad" }} />
        </div>
    )
}