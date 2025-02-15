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
import useMailResetPassword from "@/hooks/useMailResetPassword";
import authImg from "@/assets/auth-img.jpeg";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Veuillez entrer une adresse e-mail valide." }),
});

export function MailResetPassword({ className, ...props }: React.ComponentProps<"div">) {
  const { mailResetPassword, loading } = useMailResetPassword();

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    const validData = forgotPasswordSchema.parse(values);
    await mailResetPassword({ ut_mail: validData.email });
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
              {/* Lien pour revenir à la connexion */}
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
                    Entrez votre adresse e-mail pour recevoir un lien de réinitialisation.
                  </p>
                </div>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Champ "Adresse e-mail" */}
                  <div className="grid gap-2">
                    <Label htmlFor="email">Adresse e-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="exemple@domaine.com"
                      autoComplete="email"
                      {...form.register("email")}
                      className="mt-1 w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {form.formState.errors.email && (
                      <p className="text-sm text-red-600">
                        {form.formState.errors.email.message}
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
                      "Envoyer le lien"
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
