import { Navbar } from "@/components/navigation-menu/navigation-menu";
import { ResetPassword } from "@/components/reset-password/reset-password";
import { FooterPage } from "../footer/page";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen ">
      <Navbar />
      <ResetPassword />
      <FooterPage />
    </div>
  )
}
