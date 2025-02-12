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

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Veuillez entrer une adresse e-mail valide." }),
});

export function MailResetPassword({ className, ...props }: React.ComponentProps<"div">) {
  const { mailResetPassword, loading } = useMailResetPassword()

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    const validData = forgotPasswordSchema.parse(values);
    await mailResetPassword({ ut_mail: validData.email })
  }

  return (
    <div
      className={cn("flex flex-col gap-6 items-center justify-center min-h-screen p-4", className)}
      {...props}
    >
      <Card className="overflow-hidden w-full max-w-2xl">
        <CardContent className="p-6 md:p-8">
          {/* Lien pour revenir à la page de connexion */}
          <div className="mb-4">
            <a href="/login" className="text-sm text-primary hover:underline">
              &larr; Retour à la connexion
            </a>
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Réinitialiser votre mot de passe</h1>
                <p className="text-muted-foreground">
                  Entrez votre adresse e-mail pour recevoir un lien de réinitialisation.
                </p>
              </div>

              {/* Champ "Adresse e-mail" */}
              <div className="grid gap-2">
                <Label htmlFor="email">Adresse e-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="exemple@domaine.com"
                  autoComplete="email"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-600">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              {/* Bouton de validation */}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner />
                    Chargement...
                  </>
                ) : (
                  "Envoyer le lien"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
