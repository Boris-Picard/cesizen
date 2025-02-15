"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import Spinner from "@/components/spinner/spinner";
import axios from "axios";

export function ConfirmAccount({ className, ...props }: React.ComponentProps<"div">) {
  const { token } = useParams<{ token: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    <div
      className={cn("flex items-center justify-center min-h-screen bg-gray-50 px-4", className)}
      {...props}
    >
      <Card className="w-full max-w-4xl shadow-xl rounded-xl overflow-hidden">
        <CardContent className="p-6 md:p-8">
          {isLoading && (
            <div className="flex flex-col items-center">
              <Spinner />
              <p className="mt-4">Chargement...</p>
            </div>
          )}
          {!isLoading && message && (
            <div className="text-center">
              <h1 className="text-4xl font-bold text-green-700 mb-4">Confirmation réussie</h1>
              <p className="text-base text-gray-500">{message}</p>
              <a href="/login" className="mt-6 inline-block text-sm text-primary hover:underline">
                Se connecter
              </a>
            </div>
          )}
          {!isLoading && error && (
            <div className="text-center">
              <h1 className="text-4xl font-bold text-red-600 mb-4">Erreur</h1>
              <p className="text-base text-red-600">{error}</p>
              <a href="/login" className="mt-6 inline-block text-sm text-primary hover:underline">
                Retour à la connexion
              </a>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
