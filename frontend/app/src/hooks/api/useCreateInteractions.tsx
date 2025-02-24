import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "@/hooks/useToast";
import { useState } from "react";

interface InteractionInterface {
  inter_date_de_debut: string;
  inter_date_de_fin?: string;
  information?: string;
  exercice?: string;
  utilisateur: string;
  typeInteraction: string;
}

export function useCreateInteraction() {
  const { token } = useAuth();
  const [interactionIds, setInteractionIds] = useState<number[]>(() => {
    const stored = localStorage.getItem("interactionIds");
    return stored ? JSON.parse(stored) : [];
  });

  const lastInteractionId = interactionIds.length > 0 ? interactionIds[interactionIds.length - 1] : null;

  const createInteraction = async (interactionData: InteractionInterface) => {
    try {
      const { data } = await axios.post(
        "http://cesizen-api.localhost/api/interactions",
        interactionData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newId = data.id;
      const newIds = [...interactionIds, newId];
      setInteractionIds(newIds);
      localStorage.setItem("interactionIds", JSON.stringify(newIds));
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
    }
  };

  return { createInteraction, interactionIds, lastInteractionId };
}
