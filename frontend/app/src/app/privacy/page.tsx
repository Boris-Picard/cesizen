import { Navbar } from "@/components/navigation-menu/navigation-menu";
import { FooterPage } from "../footer/page";
import { PrivacyComponents } from "@/components/privacy/privacy";

export function PrivacyPage() {
    return (
        <>
            <Navbar />
            <PrivacyComponents />
            <FooterPage />
        </>
    )
}