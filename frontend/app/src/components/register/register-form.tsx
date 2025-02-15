"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Spinner from "@/components/spinner/spinner";
import { useRegisterUser } from "@/hooks/useRegisterUser";
import { Switch } from "@/components/ui/switch";
import authImg from "@/assets/auth-img.jpeg";

const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "Le prénom est requis." })
      .regex(/^(?!.*\d)[\p{L}\s]+$/u, {
        message:
          "Le prénom ne doit pas contenir de chiffres ou de caractères spéciaux.",
      }),
    lastName: z
      .string()
      .min(2, { message: "Le nom est requis." })
      .regex(/^(?!.*\d)[\p{L}\s]+$/u, {
        message:
          "Le nom ne doit pas contenir de chiffres ou de caractères spéciaux.",
      }),
    email: z.string().email({
      message: "Veuillez entrer une adresse e-mail valide.",
    }),
    password: z
      .string()
      .min(8, { message: "Le mot de passe doit comporter au moins 8 caractères." })
      .max(100, {
        message: "Le mot de passe doit comporter moins de 100 caractères.",
      }),
    confirmPassword: z
      .string()
      .min(8, { message: "Le mot de passe doit comporter au moins 8 caractères." })
      .max(100, {
        message: "Le mot de passe doit comporter moins de 100 caractères.",
      }),
    rgpd: z.boolean().refine((val) => val === true, {
      message:
        "Vous devez accepter la politique de confidentialité et les conditions d'utilisation",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
  });

export function RegisterForm({ className, ...props }: React.ComponentProps<"div">) {
  const { registerUser, loading } = useRegisterUser();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      rgpd: false,
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    const validData = registerSchema.parse(values);
    await registerUser({
      firstName: validData.firstName,
      lastName: validData.lastName,
      email: validData.email,
      password: validData.password,
    });
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
              <div>
                <div className="mb-8">
                  <h1 className="text-4xl font-bold text-green-700 mb-2">
                    Créez votre compte
                  </h1>
                  <p className="text-base text-gray-500">
                    Rejoignez Cesizen dès aujourd'hui !
                  </p>
                </div>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Prénom */}
                  <div>
                    <Label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      Prénom
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Votre prénom"
                      {...form.register("firstName")}
                      className="mt-1 w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {form.formState.errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">
                        {form.formState.errors.firstName.message}
                      </p>
                    )}
                  </div>
                  {/* Nom */}
                  <div>
                    <Label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Nom
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Votre nom"
                      {...form.register("lastName")}
                      className="mt-1 w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {form.formState.errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">
                        {form.formState.errors.lastName.message}
                      </p>
                    )}
                  </div>
                  {/* Email */}
                  <div>
                    <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Adresse e-mail
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="exemple@domaine.com"
                      autoComplete="email"
                      {...form.register("email")}
                      className="mt-1 w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {form.formState.errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                  {/* Mot de passe */}
                  <div>
                    <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Mot de passe
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Votre mot de passe"
                      autoComplete="new-password"
                      {...form.register("password")}
                      className="mt-1 w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {form.formState.errors.password && (
                      <p className="mt-1 text-sm text-red-600">
                        {form.formState.errors.password.message}
                      </p>
                    )}
                  </div>
                  {/* Confirmation du mot de passe */}
                  <div>
                    <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirmez le mot de passe
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirmez votre mot de passe"
                      autoComplete="new-password"
                      {...form.register("confirmPassword")}
                      className="mt-1 w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {form.formState.errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">
                        {form.formState.errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                  {/* Acceptation RGPD */}
                  <div>
                    <Controller
                      name="rgpd"
                      control={form.control}
                      render={({ field }) => (
                        <div className="flex items-center">
                          <Switch
                            id="rgpd"
                            checked={field.value}
                            onCheckedChange={(checked) => field.onChange(checked)}
                          />
                          <Label htmlFor="rgpd" className="ml-2">
                            J'accepte les{" "}
                            <a href="/conditions" className="underline">
                              Conditions d'utilisation
                            </a>{" "}
                            et la{" "}
                            <a href="/privacy" className="underline">
                              Politique de confidentialité
                            </a>
                          </Label>
                        </div>
                      )}
                    />
                    {form.formState.errors.rgpd && (
                      <p className="mt-1 text-sm text-red-600">
                        {form.formState.errors.rgpd.message}
                      </p>
                    )}
                  </div>
                  {/* Bouton d'inscription */}
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
                      "Inscription"
                    )}
                  </Button>
                  {/* Section "Ou continuer avec" */}
                  <div className="relative text-center text-sm">
                    <span className="relative z-10 bg-gray-50 px-2 text-gray-500">
                      Ou continuer avec
                    </span>
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                  </div>
                  {/* Boutons des providers */}
                  <div className="grid grid-cols-3 gap-4">
                    <Button variant="outline" className="w-full">
                      {/* Icône Apple */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09z"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="sr-only">S'inscrire avec Apple</span>
                    </Button>
                    <Button variant="outline" className="w-full">
                      {/* Icône Google */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        />
                      </svg>
                      <span className="sr-only">S'inscrire avec Google</span>
                    </Button>
                    <Button variant="outline" className="w-full">
                      {/* Icône Meta */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z"
                        />
                      </svg>
                      <span className="sr-only">S'inscrire avec Meta</span>
                    </Button>
                  </div>
                </form>
              </div>
              {/* Lien vers la page de connexion */}
              <div className="mt-8 text-center">
                <span className="text-sm text-gray-500">
                  Vous avez déjà un compte ?{" "}
                </span>
                <a href="/login" className="text-green-600 font-medium hover:underline">
                  Connectez-vous
                </a>
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
