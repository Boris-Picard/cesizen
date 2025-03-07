"use client"

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
import { useRegisterUser } from "@/hooks/api/useRegisterUser"
import { motion } from "framer-motion"
import logo from "@/assets/cesizen-logo.png"

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
  const { registerUser, loading } = useRegisterUser()

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
    const validData = registerSchema.parse(values)
    await registerUser({
      firstName: validData.firstName,
      lastName: validData.lastName,
      email: validData.email,
      password: validData.password,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-leather-50 to-leather-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[15%] w-72 h-72 bg-leather-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[15%] left-[10%] w-80 h-80 bg-leather-300/20 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl relative z-10"
      >
        <Card className="bg-white/95 backdrop-blur-sm shadow-xl rounded-3xl overflow-hidden border border-leather-200/70">
          <CardContent className="p-6 sm:p-10 flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-6">
              <div className="text-center lg:text-left">
                <Link to="/" className="flex justify-center items-center space-x-2 group h-20">
                  <img src={logo} alt="CESIZen" className="w-36 h-36" />
                </Link>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="text-3xl font-bold bg-gradient-to-r from-leather-800 to-leather-600 bg-clip-text text-transparent"
                >
                  Créez votre compte
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="mt-2 text-sm text-leather-600"
                >
                  Rejoignez Cesizen dès aujourd'hui et commencez votre voyage vers le bien-être !
                </motion.p>
              </div>

              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                >
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium text-leather-700">
                      Prénom
                    </Label>
                    <div className="relative">
                      <Icons.user className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-leather-400" />
                      <Input
                        id="firstName"
                        placeholder="Votre prénom"
                        {...form.register("firstName")}
                        className="pl-11 py-2.5 border-leather-200 focus:border-leather-500 focus:ring-leather-500 rounded-xl text-sm bg-leather-50/50 text-leather-800 placeholder:text-leather-400 shadow-sm hover:border-leather-300 transition-colors"
                      />
                    </div>
                    {form.formState.errors.firstName && (
                      <p className="text-sm text-red-600 flex items-center">
                        <Icons.alertCircle className="h-4 w-4 mr-1.5" />
                        {form.formState.errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium text-leather-700">
                      Nom
                    </Label>
                    <div className="relative">
                      <Icons.user className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-leather-400" />
                      <Input
                        id="lastName"
                        placeholder="Votre nom"
                        {...form.register("lastName")}
                        className="pl-11 py-2.5 border-leather-200 focus:border-leather-500 focus:ring-leather-500 rounded-xl text-sm bg-leather-50/50 text-leather-800 placeholder:text-leather-400 shadow-sm hover:border-leather-300 transition-colors"
                      />
                    </div>
                    {form.formState.errors.lastName && (
                      <p className="text-sm text-red-600 flex items-center">
                        <Icons.alertCircle className="h-4 w-4 mr-1.5" />
                        {form.formState.errors.lastName.message}
                      </p>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="space-y-2"
                >
                  <Label htmlFor="email" className="text-sm font-medium text-leather-700">
                    Adresse e-mail
                  </Label>
                  <div className="relative">
                    <Icons.mail className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-leather-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="exemple@domaine.com"
                      {...form.register("email")}
                      className="pl-11 py-2.5 border-leather-200 focus:border-leather-500 focus:ring-leather-500 rounded-xl text-sm bg-leather-50/50 text-leather-800 placeholder:text-leather-400 shadow-sm hover:border-leather-300 transition-colors"
                    />
                  </div>
                  {form.formState.errors.email && (
                    <p className="text-sm text-red-600 flex items-center">
                      <Icons.alertCircle className="h-4 w-4 mr-1.5" />
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="space-y-2"
                >
                  <Label htmlFor="password" className="text-sm font-medium text-leather-700">
                    Mot de passe
                  </Label>
                  <div className="relative">
                    <Icons.lock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-leather-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Votre mot de passe"
                      {...form.register("password")}
                      className="pl-11 py-2.5 border-leather-200 focus:border-leather-500 focus:ring-leather-500 rounded-xl text-sm bg-leather-50/50 text-leather-800 placeholder:text-leather-400 shadow-sm hover:border-leather-300 transition-colors"
                    />
                  </div>
                  {form.formState.errors.password && (
                    <p className="text-sm text-red-600 flex items-center">
                      <Icons.alertCircle className="h-4 w-4 mr-1.5" />
                      {form.formState.errors.password.message}
                    </p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                  className="space-y-2"
                >
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-leather-700">
                    Confirmez le mot de passe
                  </Label>
                  <div className="relative">
                    <Icons.lock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-leather-400" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirmez votre mot de passe"
                      {...form.register("confirmPassword")}
                      className="pl-11 py-2.5 border-leather-200 focus:border-leather-500 focus:ring-leather-500 rounded-xl text-sm bg-leather-50/50 text-leather-800 placeholder:text-leather-400 shadow-sm hover:border-leather-300 transition-colors"
                    />
                  </div>
                  {form.formState.errors.confirmPassword && (
                    <p className="text-sm text-red-600 flex items-center">
                      <Icons.alertCircle className="h-4 w-4 mr-1.5" />
                      {form.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                  className="space-y-2"
                >
                  <Controller
                    name="rgpd"
                    control={form.control}
                    render={({ field }) => (
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="rgpd"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-leather-600"
                        />
                        <Label htmlFor="rgpd" className="text-sm text-leather-700">
                          J'accepte les{" "}
                          <Link
                            to="/conditions"
                            className="text-leather-700 hover:text-leather-900 underline decoration-leather-300 hover:decoration-leather-500 underline-offset-2 transition-colors"
                          >
                            Conditions d'utilisation
                          </Link>{" "}
                          et la{" "}
                          <Link
                            to="/privacy"
                            className="text-leather-700 hover:text-leather-900 underline decoration-leather-300 hover:decoration-leather-500 underline-offset-2 transition-colors"
                          >
                            Politique de confidentialité
                          </Link>
                        </Label>
                      </div>
                    )}
                  />
                  {form.formState.errors.rgpd && (
                    <p className="text-sm text-red-600 flex items-center">
                      <Icons.alertCircle className="h-4 w-4 mr-1.5" />
                      {form.formState.errors.rgpd.message}
                    </p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.9 }}
                  className="pt-2"
                >
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-medium text-white bg-gradient-to-r from-leather-600 to-leather-700 hover:from-leather-700 hover:to-leather-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-leather-500 transition-all duration-300"
                  >
                    {loading ? (
                      <>
                        <Icons.loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" aria-hidden="true" />
                        Inscription en cours...
                      </>
                    ) : (
                      <>
                        <Icons.userplus className="mr-2 h-5 w-5" />
                        S'inscrire
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.0 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-leather-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-white text-leather-500 font-medium">Ou s'inscrire avec</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <Button
                    variant="outline"
                    className="w-full py-2.5 px-4 rounded-xl border border-leather-200 bg-white text-leather-700  hover:border-leather-300 shadow-sm transition-all duration-300"
                  >
                    <Icons.google className="h-5 w-5" />
                    <span className="sr-only">S'inscrire avec Google</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full py-2.5 px-4 rounded-xl border border-leather-200 bg-white text-leather-700  hover:border-leather-300 shadow-sm transition-all duration-300"
                  >
                    <Icons.apple className="h-5 w-5" />
                    <span className="sr-only">S'inscrire avec Apple</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full py-2.5 px-4 rounded-xl border border-leather-200 bg-white text-leather-700  hover:border-leather-300 shadow-sm transition-all duration-300"
                  >
                    <Icons.facebook className="h-5 w-5" />
                    <span className="sr-only">S'inscrire avec Facebook</span>
                  </Button>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.1 }}
                className="text-center text-sm text-leather-600"
              >
                Vous avez déjà un compte ?{" "}
                <Link
                  to="/login"
                  className="font-medium text-leather-700 hover:text-leather-900 transition-colors underline decoration-leather-300 hover:decoration-leather-500 underline-offset-2"
                >
                  Connectez-vous
                </Link>
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hidden lg:block flex-1 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-leather-600/20 to-leather-800/20 rounded-2xl mix-blend-multiply"></div>
              <img
                src={authImg || "/placeholder.svg"}
                alt="Illustration"
                className="w-full h-full object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-leather-900/30 to-transparent rounded-2xl"></div>

              <div className="absolute bottom-8 left-8 right-8 text-white">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                  <h3 className="text-xl font-bold mb-2">Votre bien-être commence ici</h3>
                  <p className="text-sm text-white/90">
                    Rejoignez notre communauté et découvrez des techniques de respiration et de méditation pour
                    améliorer votre quotidien.
                  </p>
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default RegisterForm

