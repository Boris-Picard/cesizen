import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
import { Link } from "react-router-dom"
import useLoginUser from "@/hooks/api/useLoginUser"

const loginSchema = z.object({
  email: z.string().email("Veuillez entrer une adresse e-mail valide."),
  password: z
    .string()
    .min(8, "Le mot de passe doit comporter au moins 8 caractères.")
    .max(100, "Le mot de passe doit comporter moins de 100 caractères."),
})

export function LoginForm() {
  const { loginUser, loading } = useLoginUser()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const validData = loginSchema.parse(values);
    await loginUser({ username: validData.email, password: validData.password })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-leather-50 to-leather-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md bg-white shadow-2xl rounded-3xl overflow-hidden border border-leather-200">
        <CardContent className="p-8">
          <div className="mb-8 text-center">
            <Icons.logo className="mx-auto h-12 w-auto text-leather-600" />
            <h2 className="mt-6 text-3xl font-extrabold text-leather-800">Bienvenue</h2>
            <p className="mt-2 text-sm text-leather-600">Connectez-vous à votre compte pour continuer</p>
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-leather-700">
                Adresse e-mail
              </Label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icons.mail className="h-5 w-5 text-leather-400" aria-hidden="true" />
                </div>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  {...form.register("email")}
                  className="block w-full pl-10 pr-3 py-2 border-leather-300 rounded-full focus:ring-leather-500 focus:border-leather-500 sm:text-sm"
                  placeholder="vous@exemple.com"
                />
              </div>
              {form.formState.errors.email && (
                <p className="mt-2 text-sm text-red-600">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-leather-700">
                Mot de passe
              </Label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icons.lock className="h-5 w-5 text-leather-400" aria-hidden="true" />
                </div>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  {...form.register("password")}
                  className="block w-full pl-10 pr-3 py-2 border-leather-300 rounded-full focus:ring-leather-500 focus:border-leather-500 sm:text-sm"
                  placeholder="Votre mot de passe"
                />
              </div>
              {form.formState.errors.password && (
                <p className="mt-2 text-sm text-red-600">{form.formState.errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-end">
              <div className="text-sm">
                <Link
                  to="/reset-password"
                  className="font-medium text-leather-600 hover:text-leather-500 transition-colors"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-leather-600 hover:bg-leather-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-leather-500 transition-all duration-300 transform hover:scale-105"
              >
                {loading ? (
                  <>
                    <Icons.loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" aria-hidden="true" />
                    Connexion en cours...
                  </>
                ) : (
                  "Se connecter"
                )}
              </Button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-leather-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-leather-500">Ou continuer avec</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <Button
                variant="outline"
                className="w-full py-2 px-4 rounded-full border border-leather-300 bg-white text-leather-700 hover:bg-leather-50 focus:ring-2 focus:ring-offset-2 focus:ring-leather-500 transition-all duration-300"
              >
                <Icons.google className="h-5 w-5" />
                <span className="sr-only">Continuer avec Google</span>
              </Button>
              <Button
                variant="outline"
                className="w-full py-2 px-4 rounded-full border border-leather-300 bg-white text-leather-700 hover:bg-leather-50 focus:ring-2 focus:ring-offset-2 focus:ring-leather-500 transition-all duration-300"
              >
                <Icons.apple className="h-5 w-5" />
                <span className="sr-only">Continuer avec Apple</span>
              </Button>
              <Button
                variant="outline"
                className="w-full py-2 px-4 rounded-full border border-leather-300 bg-white text-leather-700 hover:bg-leather-50 focus:ring-2 focus:ring-offset-2 focus:ring-leather-500 transition-all duration-300"
              >
                <Icons.facebook className="h-5 w-5" />
                <span className="sr-only">Continuer avec Facebook</span>
              </Button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-leather-600">
            Pas encore de compte ?{" "}
            <Link to="/register" className="font-medium text-leather-600 hover:text-leather-500 transition-colors">
              Inscrivez-vous gratuitement
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

