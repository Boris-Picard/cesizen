import { MailResetPassword } from "@/components/mail-reset-password/mail-reset-password"

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <MailResetPassword />
      </div>
    </div>
  )
}
