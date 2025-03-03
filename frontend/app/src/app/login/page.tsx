import { LoginForm } from "@/components/login/login-form"
import { Navbar } from "@/components/navigation-menu/navigation-menu"
import { FooterPage } from "../footer/page"

export default function LoginPage() {
  return (
    <div className="min-h-screen ">
      <Navbar />
      <LoginForm />
      <FooterPage />
    </div>
  )
}
