import InformationsComponents from "@/components/informations/informations";
import { Navbar } from "@/components/navigation-menu/navigation-menu";

export default function InformationsPage () {
    return(
        <div className="min-h-screen bg-green-50">
            <Navbar />
            <InformationsComponents />
        </div>
    )
}