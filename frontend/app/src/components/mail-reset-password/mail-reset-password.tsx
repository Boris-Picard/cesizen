import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useToast } from "@/hooks/useToast";
import Spinner from "@/components/spinner/spinner";
import { useIsLoading } from "@/hooks/useLoading";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Veuillez entrer une adresse e-mail valide." }),
});

export function MailResetPassword({ className, ...props }: React.ComponentProps<"div">) {
  const { toast } = useToast();
  const { isLoading, loading } = useIsLoading();

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    const validData = forgotPasswordSchema.parse(values);
    try {
      loading(true);
      const response = await axios.post('http://cesizen-api.localhost/reset-password/forgot-password', {
        ut_mail: validData.email,
      });
      if (response.status === 200) {
        toast({
          variant: "success",
          title: "Un email de réinitialisation a été envoyé (si l'adresse existe).",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        
        if (axios.isAxiosError(error)) {
          toast({
            variant: "destructive",
            title: error.response?.data?.title ?? error.message,
            description: error.response?.data?.message ? error.response?.data?.detail : error.response?.data?.error,
          });
        }
      } else {
        toast({
          variant: "destructive",
          title: "Une erreur est survenue",
        });
      }
    } finally {
      loading(false);
    }
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
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
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
