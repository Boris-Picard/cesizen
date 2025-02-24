import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
import { Link } from "react-router-dom"
import useMailResetPassword from "@/hooks/api/useMailResetPassword";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Veuillez entrer une adresse e-mail valide." }),
})

export function MailResetPassword() {
  const { mailResetPassword, loading } = useMailResetPassword()

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    const validData = forgotPasswordSchema.parse(values);
    await mailResetPassword({ ut_mail: validData.email })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-leather-50 to-leather-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md bg-white shadow-2xl rounded-3xl overflow-hidden border border-leather-200">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="text-center">
              <Icons.logo className="mx-auto h-12 w-auto text-leather-600" />
              <h2 className="mt-6 text-3xl font-extrabold text-leather-800">Réinitialiser votre mot de passe</h2>
              <p className="mt-2 text-sm text-leather-600">
                Entrez votre adresse e-mail pour recevoir un lien de réinitialisation.
              </p>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-leather-700">
                  Adresse e-mail
                </Label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icons.mail className="h-5 w-5 text-leather-400" aria-hidden="true" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="exemple@domaine.com"
                    {...form.register("email")}
                    className="block w-full pl-10 pr-3 py-2 border-leather-300 rounded-full focus:ring-leather-500 focus:border-leather-500 sm:text-sm"
                  />
                </div>
                {form.formState.errors.email && (
                  <p className="text-sm text-red-600">{form.formState.errors.email.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-leather-600 hover:bg-leather-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-leather-500 transition-all duration-300 transform hover:scale-105"
              >
                {loading ? (
                  <>
                    <Icons.loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" aria-hidden="true" />
                    Envoi en cours...
                  </>
                ) : (
                  "Envoyer le lien de réinitialisation"
                )}
              </Button>
            </form>

            <div className="text-center">
              <Link
                to="/login"
                className="text-sm text-leather-600 hover:text-leather-500 transition-colors"
              >
                &larr; Retour à la connexion
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default MailResetPassword
