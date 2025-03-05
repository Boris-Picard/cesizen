import { ConfirmAccount } from "@/components/confirm-account/confirm-account";
import { Navbar } from "@/components/navigation-menu/navigation-menu";
import { FooterPage } from "../footer/page";

export default function ConfirmAccountPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <ConfirmAccount />
      <FooterPage />
    </div>
  )
}
