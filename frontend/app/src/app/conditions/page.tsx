import { ConditionsComponents } from "@/components/conditions/conditions";
import { Navbar } from "@/components/navigation-menu/navigation-menu";
import { FooterPage } from "../footer/page";

export function ConditionsPage() {
    return (
        <>
            <Navbar />
            <ConditionsComponents />
            <FooterPage />
        </>
    )
}