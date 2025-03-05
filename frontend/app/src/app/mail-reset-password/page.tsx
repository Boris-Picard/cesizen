import { MailResetPassword } from "@/components/mail-reset-password/mail-reset-password"
import { Navbar } from "@/components/navigation-menu/navigation-menu"
import { FooterPage } from "../footer/page"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen ">
      <Navbar />
      <MailResetPassword />
      <FooterPage />
    </div>
  )
}
