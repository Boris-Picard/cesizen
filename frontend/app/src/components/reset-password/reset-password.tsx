"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Spinner from "@/components/spinner/spinner";
import { useParams } from "react-router-dom";
import useResetPasswordUser from "@/hooks/useResetPasswordUser";
import authImg from "@/assets/auth-img.jpeg";

const resetPasswordSchema = z
  .object({
    plainPassword: z.string().min(8, "Votre mot de passe doit contenir au moins 8 caractères."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.plainPassword === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
  });

export function ResetPassword({ className, ...props }: React.ComponentProps<"div">) {
  const { token } = useParams<{ token: string }>();
  const { resetPasswordUser, loading } = useResetPasswordUser(token);

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      plainPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    const validData = resetPasswordSchema.parse(values);
    await resetPasswordUser({ plainPassword: validData.plainPassword });
  }

  if (!token) {
    return (
      <div
        className={cn("flex items-center justify-center min-h-screen bg-gray-50 px-4", className)}
        {...props}
      >
        <Card className="w-full max-w-2xl shadow-xl rounded-xl overflow-hidden">
          <CardContent className="p-6 md:p-8">
            <div className="mb-4">
              <a href="/login" className="text-sm text-primary hover:underline">
                &larr; Retour à la connexion
              </a>
            </div>
            <p className="text-center text-lg">
              Le lien de réinitialisation est invalide ou le token est manquant.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div
      className={cn("flex items-center justify-center min-h-screen bg-gray-50 px-4", className)}
      {...props}
    >
      <Card className="w-full max-w-4xl shadow-xl rounded-xl overflow-hidden">
        <CardContent className="flex flex-col md:flex-row p-0">
          {/* Partie formulaire */}
          <div className="flex-1 p-10">
            <div className="flex flex-col h-full justify-between">
              {/* Lien de retour à la connexion */}
              <div className="mb-4">
                <a href="/login" className="text-sm text-primary hover:underline">
                  &larr; Retour à la connexion
                </a>
              </div>
              <div>
                <div className="mb-8">
                  <h1 className="text-4xl font-bold text-green-700 mb-2">
                    Réinitialiser votre mot de passe
                  </h1>
                  <p className="text-base text-gray-500">
                    Entrez votre nouveau mot de passe.
                  </p>
                </div>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Nouveau mot de passe */}
                  <div className="grid gap-2">
                    <Label htmlFor="plainPassword">Nouveau mot de passe</Label>
                    <Input
                      id="plainPassword"
                      type="password"
                      placeholder="Votre nouveau mot de passe"
                      {...form.register("plainPassword")}
                      className="mt-1 w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {form.formState.errors.plainPassword && (
                      <p className="text-sm text-red-600">
                        {form.formState.errors.plainPassword.message}
                      </p>
                    )}
                  </div>
                  {/* Confirmer le mot de passe */}
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirmez votre nouveau mot de passe"
                      {...form.register("confirmPassword")}
                      className="mt-1 w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {form.formState.errors.confirmPassword && (
                      <p className="text-sm text-red-600">
                        {form.formState.errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                  {/* Bouton de validation */}
                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md transition-colors"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <Spinner />
                        <span className="ml-3">Chargement...</span>
                      </div>
                    ) : (
                      "Réinitialiser le mot de passe"
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
          {/* Partie illustration */}
          <div className="hidden md:block flex-1">
            <img
              src={authImg}
              alt="Illustration"
              className="w-full h-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
