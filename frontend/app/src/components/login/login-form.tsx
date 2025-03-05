"use client"

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
import { motion } from "framer-motion"

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
    const validData = loginSchema.parse(values)
    await loginUser({ username: validData.email, password: validData.password })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-leather-50 to-leather-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[15%] right-[10%] w-64 h-64 bg-leather-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[20%] left-[5%] w-72 h-72 bg-leather-300/20 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-white/95 backdrop-blur-sm shadow-xl rounded-3xl overflow-hidden border border-leather-200/70">
          <CardContent className="p-8">
            <div className="mb-8 text-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.1,
                }}
                className="relative mx-auto w-16 h-16 mb-4"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-leather-300 to-leather-500 rounded-2xl opacity-70 blur-sm"></div>
                <div className="relative bg-white p-3 rounded-2xl shadow-md">
                  <Icons.logo className="h-10 w-10 text-leather-600" />
                </div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-3xl font-bold bg-gradient-to-r from-leather-800 to-leather-600 bg-clip-text text-transparent"
              >
                Bienvenue
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mt-2 text-sm text-leather-600"
              >
                Connectez-vous à votre compte pour continuer
              </motion.p>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <Label htmlFor="email" className="block text-sm font-medium text-leather-700 mb-1.5">
                  Adresse e-mail
                </Label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Icons.mail className="h-5 w-5 text-leather-400" aria-hidden="true" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    {...form.register("email")}
                    className="block w-full pl-11 pr-4 py-2.5 border-leather-200 rounded-xl focus:ring-leather-500 focus:border-leather-500 bg-leather-50/50 text-leather-800 placeholder:text-leather-400 shadow-sm hover:border-leather-300 transition-colors"
                    placeholder="vous@exemple.com"
                  />
                </div>
                {form.formState.errors.email && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <Icons.alertCircle className="h-4 w-4 mr-1.5" />
                    {form.formState.errors.email.message}
                  </p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <Label htmlFor="password" className="block text-sm font-medium text-leather-700">
                    Mot de passe
                  </Label>
                  <Link
                    to="/reset-password"
                    className="text-xs font-medium text-leather-600 hover:text-leather-800 transition-colors"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Icons.lock className="h-5 w-5 text-leather-400" aria-hidden="true" />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    {...form.register("password")}
                    className="block w-full pl-11 pr-4 py-2.5 border-leather-200 rounded-xl focus:ring-leather-500 focus:border-leather-500 bg-leather-50/50 text-leather-800 placeholder:text-leather-400 shadow-sm hover:border-leather-300 transition-colors"
                    placeholder="Votre mot de passe"
                  />
                </div>
                {form.formState.errors.password && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <Icons.alertCircle className="h-4 w-4 mr-1.5" />
                    {form.formState.errors.password.message}
                  </p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
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
                      Connexion en cours...
                    </>
                  ) : (
                    <>
                      <Icons.login className="mr-2 h-5 w-5" />
                      Se connecter
                    </>
                  )}
                </Button>
              </motion.div>
            </form>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="mt-8"
            >
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-leather-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white text-leather-500 font-medium">Ou continuer avec</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <Button
                  variant="outline"
                  className="w-full py-2.5 px-4 rounded-xl border border-leather-200 bg-white text-leather-700 hover:border-leather-300 shadow-sm transition-all duration-300"
                >
                  <Icons.google className="h-5 w-5" />
                  <span className="sr-only">Continuer avec Google</span>
                </Button>
                <Button
                  variant="outline"
                  className="w-full py-2.5 px-4 rounded-xl border border-leather-200 bg-white text-leather-700 hover:border-leather-300 shadow-sm transition-all duration-300"
                >
                  <Icons.apple className="h-5 w-5" />
                  <span className="sr-only">Continuer avec Apple</span>
                </Button>
                <Button
                  variant="outline"
                  className="w-full py-2.5 px-4 rounded-xl border border-leather-200 bg-white text-leather-700 hover:border-leather-300 shadow-sm transition-all duration-300"
                >
                  <Icons.facebook className="h-5 w-5" />
                  <span className="sr-only">Continuer avec Facebook</span>
                </Button>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="mt-8 text-center text-sm text-leather-600"
            >
              Pas encore de compte ?{" "}
              <Link
                to="/register"
                className="font-medium text-leather-700 hover:text-leather-900 transition-colors underline decoration-leather-300 hover:decoration-leather-500 underline-offset-2"
              >
                Inscrivez-vous gratuitement
              </Link>
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

