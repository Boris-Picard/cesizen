import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { z } from "zod";
import { toast } from "@/hooks/useToast";
import { useState } from "react";

export const chatbotSchema = z.object({
    query: z.string().min(1, "Le message est requis.")
});

export type ChatbotFormValues = z.infer<typeof chatbotSchema>;

interface Chatbot {
    validData: ChatbotFormValues;
    onResponseReceived: (response: any) => void;
}

export function useChatbot() {
    const { token } = useAuth();
    const [loading, SetIsLoading] = useState<boolean>(false)

    const sendMessage = async ({ validData, onResponseReceived }: Chatbot) => {
        try {
            SetIsLoading(true)
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/chatbot`,
                {
                    message: validData.query,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            onResponseReceived(response.data.reply);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast({
                    variant: "destructive",
                    title: error.response?.data?.title ?? "Une erreur est survenue",
                    description: error.response?.data?.message,
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Une erreur est survenue",
                });
            }
        } finally {
            SetIsLoading(false)
        }
    };

    return { sendMessage, loading };
}
