import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

export function ConfirmAccount({ className, ...props }: React.ComponentProps<"div">) {
  const { token } = useParams<{ token: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      setError("Le token est manquant.");
      return;
    }
    setIsLoading(true);
    axios
      .get(`http://cesizen-api.localhost/account-confirmation/${token}`)
      .then((response) => {
        setMessage("Votre compte a été confirmé avec succès. Vous pouvez maintenant vous connecter.");
      })
      .catch((err) => {
        const errMsg =
          err.response?.data?.message ||
          err.response?.data?.detail ||
          err.response?.data?.error ||
          err.message ||
          "Une erreur est survenue lors de la confirmation de votre compte.";
        setError(errMsg);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-leather-50 to-leather-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md bg-white shadow-2xl rounded-3xl overflow-hidden border border-leather-200">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="text-center">
              <Icons.logo className="mx-auto h-12 w-auto text-leather-600" />
              {isLoading ? (
                <h2 className="mt-6 text-3xl font-extrabold text-leather-800">Confirmation du compte</h2>
              ) : message ? (
                <h2 className="mt-6 text-3xl font-extrabold text-leather-800">Confirmation réussie</h2>
              ) : (
                <h2 className="mt-6 text-3xl font-extrabold text-red-600">Erreur</h2>
              )}
            </div>

            {isLoading && (
              <div className="flex flex-col items-center">
                <Icons.loader className="animate-spin h-10 w-10 text-leather-600" />
                <p className="mt-4 text-leather-600">Chargement...</p>
              </div>
            )}

            {!isLoading && message && (
              <div className="text-center">
                <p className="text-leather-600">{message}</p>
                <Button className="mt-6 w-full" onClick={() => navigate("/login")}>
                  Se connecter
                </Button>
              </div>
            )}

            {!isLoading && error && (
              <div className="text-center">
                <p className="text-red-600">{error}</p>
                <Button variant="outline" className="mt-6 w-full" onClick={() => navigate("/login")}>
                  Retour à la connexion
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

