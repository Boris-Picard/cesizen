import { Navbar } from "@/components/navigation-menu/navigation-menu"
import { RegisterForm } from "@/components/register/register-form"
import { FooterPage } from "../footer/page"

export default function RegisterPage() {
  return (
    <div className="min-h-screen ">
      <Navbar />
      <RegisterForm />
      <FooterPage />
    </div>
  )
}
