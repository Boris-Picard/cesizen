import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
import { Link, useParams } from "react-router-dom"
import useResetPasswordUser from "@/hooks/api/useResetPasswordUser"
import { motion } from "framer-motion"
import logo from "@/assets/cesizen-logo.png"

const resetPasswordSchema = z
  .object({
    plainPassword: z.string().min(8, "Votre mot de passe doit contenir au moins 8 caractères."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.plainPassword === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
  })

export function ResetPassword() {
  const { token } = useParams<{ token: string }>()
  const { resetPasswordUser, loading } = useResetPasswordUser(token)

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      plainPassword: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    const validData = resetPasswordSchema.parse(values)
    await resetPasswordUser({ plainPassword: validData.plainPassword })
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-leather-50 to-leather-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] right-[15%] w-64 h-64 bg-leather-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[25%] left-[10%] w-72 h-72 bg-leather-300/20 rounded-full blur-3xl"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md relative z-10"
        >
          <Card className="bg-white/95 backdrop-blur-sm shadow-xl rounded-3xl overflow-hidden border border-leather-200/70">
            <CardContent className="p-8">
              <div className="space-y-8">
                <div className="text-center">
                  <Link to="/" className="flex justify-center items-center space-x-2 group h-20">
                    <img src={logo} alt="CESIZen" className="w-36 h-36" />
                  </Link>


                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-leather-800 to-leather-600 bg-clip-text text-transparent">
                      Lien invalide
                    </h2>
                    <p className="mt-3 text-leather-600">
                      Le lien de réinitialisation est invalide ou le token est manquant.
                    </p>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="bg-red-50 rounded-xl p-4 border border-red-100"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Icons.alertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">Erreur de validation</h3>
                      <div className="mt-1 text-sm text-red-700">
                        <p>
                          Veuillez vérifier le lien que vous avez utilisé ou demander un nouveau lien de
                          réinitialisation.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="text-center"
                >
                  <Link
                    to="/login"
                    className="inline-flex items-center text-leather-700 hover:text-leather-900 transition-colors font-medium underline decoration-leather-300 hover:decoration-leather-500 underline-offset-2"
                  >
                    <Icons.arrowLeft className="mr-2 h-4 w-4" />
                    Retour à la connexion
                  </Link>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-leather-50 to-leather-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[15%] w-64 h-64 bg-leather-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[25%] left-[10%] w-72 h-72 bg-leather-300/20 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-white/95 shadow-xl rounded-3xl overflow-hidden border border-leather-200/70">
          <CardContent className="p-8">
            <div className="space-y-8">
              <div className="text-center">
                <Link to="/" className="flex justify-center items-center space-x-2 group h-20">
                  <img src={logo} alt="CESIZen" className="w-36 h-36" />
                </Link>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-leather-800 to-leather-600 bg-clip-text text-transparent">
                    Réinitialiser votre mot de passe
                  </h2>
                  <p className="mt-3 text-leather-600">
                    Entrez votre nouveau mot de passe pour sécuriser votre compte.
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-leather-100/50 to-leather-200/50 rounded-2xl blur-md transform -rotate-1 scale-105 opacity-70"></div>
                <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-leather-200/70 shadow-sm">
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="plainPassword" className="text-sm font-medium text-leather-700">
                        Nouveau mot de passe
                      </Label>
                      <div className="relative">
                        <Icons.lock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-leather-400" />
                        <Input
                          id="plainPassword"
                          type="password"
                          placeholder="Votre nouveau mot de passe"
                          {...form.register("plainPassword")}
                          className="pl-11 py-2.5 border-leather-200 focus:border-leather-500 focus:ring-leather-500 rounded-xl text-sm bg-leather-50/50 text-leather-800 placeholder:text-leather-400 shadow-sm hover:border-leather-300 transition-colors"
                        />
                      </div>
                      {form.formState.errors.plainPassword && (
                        <p className="text-sm text-red-600 flex items-center">
                          <Icons.alertCircle className="h-4 w-4 mr-1.5" />
                          {form.formState.errors.plainPassword.message}
                        </p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="confirmPassword" className="text-sm font-medium text-leather-700">
                        Confirmer le mot de passe
                      </Label>
                      <div className="relative">
                        <Icons.lock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-leather-400" />
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirmez votre nouveau mot de passe"
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
                      transition={{ duration: 0.4, delay: 0.6 }}
                    >
                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-medium text-white bg-gradient-to-r from-leather-600 to-leather-700 hover:from-leather-700 hover:to-leather-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-leather-500 transition-all duration-300"
                      >
                        {loading ? (
                          <>
                            <Icons.loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" aria-hidden="true" />
                            Réinitialisation en cours...
                          </>
                        ) : (
                          <>
                            <Icons.refreshCw className="mr-2 h-5 w-5" />
                            Réinitialiser le mot de passe
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 }}
                className="bg-leather-50/80 rounded-xl p-4 border border-leather-100/70"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Icons.shield className="h-5 w-5 text-leather-600 mt-0.5" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-leather-800">Conseils de sécurité</h3>
                    <div className="mt-1 text-sm text-leather-600">
                      <p>
                        Pour plus de sécurité, utilisez un mot de passe unique avec des lettres, des chiffres et des
                        caractères spéciaux.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="text-center"
              >
                <Link
                  to="/login"
                  className="inline-flex items-center text-leather-700 hover:text-leather-900 transition-colors font-medium underline decoration-leather-300 hover:decoration-leather-500 underline-offset-2"
                >
                  <Icons.arrowLeft className="mr-2 h-4 w-4" />
                  Retour à la connexion
                </Link>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default ResetPassword

