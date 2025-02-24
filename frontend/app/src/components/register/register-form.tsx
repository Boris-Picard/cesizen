import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Icons } from "@/components/ui/icons"
import { Link } from "react-router-dom"
import authImg from "@/assets/auth-img.jpg"
import { useRegisterUser } from "@/hooks/api/useRegisterUser";

const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "Le prénom est requis." })
      .regex(/^(?!.*\d)[\p{L}\s]+$/u, {
        message: "Le prénom ne doit pas contenir de chiffres ou de caractères spéciaux.",
      }),
    lastName: z
      .string()
      .min(2, { message: "Le nom est requis." })
      .regex(/^(?!.*\d)[\p{L}\s]+$/u, {
        message: "Le nom ne doit pas contenir de chiffres ou de caractères spéciaux.",
      }),
    email: z.string().email({
      message: "Veuillez entrer une adresse e-mail valide.",
    }),
    password: z.string().min(8, { message: "Le mot de passe doit comporter au moins 8 caractères." }).max(100, {
      message: "Le mot de passe doit comporter moins de 100 caractères.",
    }),
    confirmPassword: z.string().min(8, { message: "Le mot de passe doit comporter au moins 8 caractères." }).max(100, {
      message: "Le mot de passe doit comporter moins de 100 caractères.",
    }),
    rgpd: z.boolean().refine((val) => val === true, {
      message: "Vous devez accepter la politique de confidentialité et les conditions d'utilisation",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
  })

export function RegisterForm() {
  const { registerUser, loading } = useRegisterUser();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      rgpd: false,
    },
  })

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    const validData = registerSchema.parse(values);
    await registerUser({
      firstName: validData.firstName,
      lastName: validData.lastName,
      email: validData.email,
      password: validData.password,
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-leather-50 to-leather-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <Card className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl overflow-hidden border border-leather-200">
        <CardContent className="p-8 sm:p-12 flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-8">
            <div className="text-center lg:text-left">
              <Icons.logo className="mx-auto lg:mx-0 h-12 w-auto text-leather-600" />
              <h2 className="mt-6 text-3xl font-extrabold text-leather-800">Créez votre compte</h2>
              <p className="mt-2 text-sm text-leather-600">
                Rejoignez Cesizen dès aujourd'hui et commencez votre voyage vers le bien-être !
              </p>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium text-leather-700">
                    Prénom
                  </Label>
                  <div className="relative">
                    <Icons.user className="absolute left-3 top-1/2 transform -translate-y-1/2 text-leather-400" />
                    <Input
                      id="firstName"
                      placeholder="Votre prénom"
                      {...form.register("firstName")}
                      className="pl-10 py-3 border-leather-300 focus:border-leather-500 focus:ring-leather-500 rounded-full text-sm bg-leather-50 text-leather-900"
                    />
                  </div>
                  {form.formState.errors.firstName && (
                    <p className="text-sm text-red-600">{form.formState.errors.firstName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium text-leather-700">
                    Nom
                  </Label>
                  <div className="relative">
                    <Icons.user className="absolute left-3 top-1/2 transform -translate-y-1/2 text-leather-400" />
                    <Input
                      id="lastName"
                      placeholder="Votre nom"
                      {...form.register("lastName")}
                      className="pl-10 py-3 border-leather-300 focus:border-leather-500 focus:ring-leather-500 rounded-full text-sm bg-leather-50 text-leather-900"
                    />
                  </div>
                  {form.formState.errors.lastName && (
                    <p className="text-sm text-red-600">{form.formState.errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-leather-700">
                  Adresse e-mail
                </Label>
                <div className="relative">
                  <Icons.mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-leather-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="exemple@domaine.com"
                    {...form.register("email")}
                    className="pl-10 py-3 border-leather-300 focus:border-leather-500 focus:ring-leather-500 rounded-full text-sm bg-leather-50 text-leather-900"
                  />
                </div>
                {form.formState.errors.email && (
                  <p className="text-sm text-red-600">{form.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-leather-700">
                  Mot de passe
                </Label>
                <div className="relative">
                  <Icons.lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-leather-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Votre mot de passe"
                    {...form.register("password")}
                    className="pl-10 py-3 border-leather-300 focus:border-leather-500 focus:ring-leather-500 rounded-full text-sm bg-leather-50 text-leather-900"
                  />
                </div>
                {form.formState.errors.password && (
                  <p className="text-sm text-red-600">{form.formState.errors.password.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-leather-700">
                  Confirmez le mot de passe
                </Label>
                <div className="relative">
                  <Icons.lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-leather-400" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirmez votre mot de passe"
                    {...form.register("confirmPassword")}
                    className="pl-10 py-3 border-leather-300 focus:border-leather-500 focus:ring-leather-500 rounded-full text-sm bg-leather-50 text-leather-900"
                  />
                </div>
                {form.formState.errors.confirmPassword && (
                  <p className="text-sm text-red-600">{form.formState.errors.confirmPassword.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Controller
                  name="rgpd"
                  control={form.control}
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Switch id="rgpd" checked={field.value} onCheckedChange={field.onChange} />
                      <Label htmlFor="rgpd" className="text-sm text-leather-700">
                        J'accepte les{" "}
                        <Link to="/conditions" className="text-leather-600 hover:underline">
                          Conditions d'utilisation
                        </Link>{" "}
                        et la{" "}
                        <Link to="/privacy" className="text-leather-600 hover:underline">
                          Politique de confidentialité
                        </Link>
                      </Label>
                    </div>
                  )}
                />
                {form.formState.errors.rgpd && (
                  <p className="text-sm text-red-600">{form.formState.errors.rgpd.message}</p>
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
                    Inscription en cours...
                  </>
                ) : (
                  "S'inscrire"
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-leather-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-leather-500">Ou s'inscrire avec</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Button
                variant="outline"
                className="w-full py-2 px-4 rounded-full border border-leather-300 bg-white text-leather-700 hover:bg-leather-50 focus:ring-2 focus:ring-offset-2 focus:ring-leather-500 transition-all duration-300"
              >
                <Icons.google className="h-5 w-5" />
                <span className="sr-only">S'inscrire avec Google</span>
              </Button>
              <Button
                variant="outline"
                className="w-full py-2 px-4 rounded-full border border-leather-300 bg-white text-leather-700 hover:bg-leather-50 focus:ring-2 focus:ring-offset-2 focus:ring-leather-500 transition-all duration-300"
              >
                <Icons.apple className="h-5 w-5" />
                <span className="sr-only">S'inscrire avec Apple</span>
              </Button>
              <Button
                variant="outline"
                className="w-full py-2 px-4 rounded-full border border-leather-300 bg-white text-leather-700 hover:bg-leather-50 focus:ring-2 focus:ring-offset-2 focus:ring-leather-500 transition-all duration-300"
              >
                <Icons.facebook className="h-5 w-5" />
                <span className="sr-only">S'inscrire avec Facebook</span>
              </Button>
            </div>

            <p className="text-center text-sm text-leather-600">
              Vous avez déjà un compte ?{" "}
              <Link to="/login" className="font-medium text-leather-600 hover:text-leather-500 transition-colors">
                Connectez-vous
              </Link>
            </p>
          </div>

          <div className="hidden lg:block flex-1">
            <img
              src={authImg}
              alt="Illustration"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default RegisterForm

