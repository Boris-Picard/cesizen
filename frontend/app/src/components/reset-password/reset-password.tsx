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
    const { resetPasswordUser, loading } = useResetPasswordUser(token)

    const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            plainPassword: "",
            confirmPassword: "",
        },
    });

    async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
        const validData = resetPasswordSchema.parse(values)
        await resetPasswordUser({ plainPassword: validData.plainPassword })
    }

    if (!token) {
        return (
            <div className={cn("flex flex-col gap-6 items-center", className)} {...props}>
                <Card className="overflow-hidden w-full max-w-2xl">
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
            className={cn("flex flex-col gap-6 items-center", className)}
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
                                    Entrez votre nouveau mot de passe.
                                </p>
                            </div>

                            {/* Champ pour le nouveau mot de passe */}
                            <div className="grid gap-2">
                                <Label htmlFor="plainPassword">Nouveau mot de passe</Label>
                                <Input
                                    id="plainPassword"
                                    type="password"
                                    placeholder="Votre nouveau mot de passe"
                                    {...form.register("plainPassword")}
                                />
                                {form.formState.errors.plainPassword && (
                                    <p className="text-sm text-red-600">
                                        {form.formState.errors.plainPassword.message}
                                    </p>
                                )}
                            </div>

                            {/* Champ pour confirmer le nouveau mot de passe */}
                            <div className="grid gap-2">
                                <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirmez votre nouveau mot de passe"
                                    {...form.register("confirmPassword")}
                                />
                                {form.formState.errors.confirmPassword && (
                                    <p className="text-sm text-red-600">
                                        {form.formState.errors.confirmPassword.message}
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
                                    "Réinitialiser le mot de passe"
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
