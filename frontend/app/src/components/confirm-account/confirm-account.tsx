import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import axios from "axios"
import { Link, useNavigate, useParams } from "react-router-dom"
import { motion } from "framer-motion"
import logo from "@/assets/cesizen-logo.png"

export function ConfirmAccount() {
  const { token } = useParams<{ token: string }>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      setError("Le token est manquant.")
      return
    }
    setIsLoading(true)
    axios
      .get(`${import.meta.env.VITE_API_URL}/account-confirmation/${token}`)
      .then(() => {
        setMessage("Votre compte a été confirmé avec succès. Vous pouvez maintenant vous connecter.")
      })
      .catch((err) => {
        const errMsg =
          err.response?.data?.message ||
          err.response?.data?.detail ||
          err.response?.data?.error ||
          err.message ||
          "Une erreur est survenue lors de la confirmation de votre compte."
        setError(errMsg)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [token])

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
                  {isLoading ? (
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-leather-800 to-leather-600 bg-clip-text text-transparent">
                      Confirmation du compte
                    </h2>
                  ) : message ? (
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                      Confirmation réussie
                    </h2>
                  ) : (
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                      Erreur de confirmation
                    </h2>
                  )}

                  <p className="mt-3 text-leather-600">
                    {isLoading ? "Nous vérifions votre lien de confirmation..." : ""}
                  </p>
                </motion.div>
              </div>

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-col items-center justify-center py-8"
                >
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-leather-100 animate-ping opacity-75"></div>
                    <div className="relative bg-leather-50 p-6 rounded-full">
                      <Icons.loader className="animate-spin h-12 w-12 text-leather-600" />
                    </div>
                  </div>
                  <p className="mt-6 text-leather-600 text-lg">Vérification en cours...</p>
                </motion.div>
              )}

              {!isLoading && message && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-100/50 to-green-200/50 rounded-2xl blur-md transform -rotate-1 scale-105 opacity-70"></div>
                  <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-green-200/70 shadow-sm">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-green-100 p-4 rounded-full mb-4">
                        <Icons.checkCircle className="h-12 w-12 text-green-600" />
                      </div>
                      <p className="text-green-800 text-lg font-medium mb-6">{message}</p>
                      <Button
                        onClick={() => navigate("/login")}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-medium text-white bg-gradient-to-r from-leather-600 to-leather-700 hover:from-leather-700 hover:to-leather-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-leather-500 transition-all duration-300"
                      >
                        <Icons.login className="mr-2 h-5 w-5" />
                        Se connecter
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {!isLoading && error && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-100/50 to-red-200/50 rounded-2xl blur-md transform -rotate-1 scale-105 opacity-70"></div>
                  <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-red-200/70 shadow-sm">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-red-100 p-4 rounded-full mb-4">
                        <Icons.alertTriangle className="h-12 w-12 text-red-600" />
                      </div>
                      <p className="text-red-800 text-lg font-medium mb-6">{error}</p>
                      <Button
                        variant="outline"
                        onClick={() => navigate("/login")}
                        className="w-full flex justify-center py-3 px-4 border border-leather-300 rounded-xl shadow-sm text-sm font-medium text-leather-700 bg-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-leather-500 transition-all duration-300"
                      >
                        <Icons.arrowLeft className="mr-2 h-5 w-5" />
                        Retour à la connexion
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {!isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className={`bg-leather-50/80 rounded-xl p-4 border border-leather-100/70 ${message ? "block" : "hidden"}`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Icons.info className="h-5 w-5 text-leather-600 mt-0.5" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-leather-800">Que faire maintenant ?</h3>
                      <div className="mt-1 text-sm text-leather-600">
                        <p>
                          Vous pouvez maintenant vous connecter à votre compte et commencer à explorer toutes les
                          fonctionnalités de notre plateforme.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

