import { ChatInterface } from "@/components/chatbot/chatbot";
import { useAuth } from "@/context/AuthContext";

export function ChatbotPage() {
    const { token } = useAuth()
    return (
        <>
            {token && <ChatInterface />}
        </>
    )
}