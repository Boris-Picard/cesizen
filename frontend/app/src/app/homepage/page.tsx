import HomePageComponents from "@/components/homepage/homepage"
import { Navbar } from "@/components/navigation-menu/navigation-menu"
import { FooterPage } from "../footer/page"

export default function HomePage() {

    return (<>
        <div className="min-h-screen">
            <Navbar />
            <HomePageComponents />
            <FooterPage />
        </div>
    </>)
}