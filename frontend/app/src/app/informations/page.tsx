import InformationsComponents from "@/components/informations/informations";
import { Navbar } from "@/components/navigation-menu/navigation-menu";

export default function InformationsPage () {
    return(
        <div className="min-h-screen ">
            <Navbar />
            <InformationsComponents />
        </div>
    )
}