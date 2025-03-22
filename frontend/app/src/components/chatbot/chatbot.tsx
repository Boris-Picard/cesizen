import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MessageSquare,
  X,
  Send,
  ChevronDown,
  Bot,
  User,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChatbot, ChatbotFormValues, chatbotSchema } from "@/hooks/chatbot/usePostChatbot";

export type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

interface ChatInterfaceProps {
  initialMessages?: Message[];
  botName?: string;
  botAvatarUrl?: string;
  userAvatarUrl?: string;
  position?: "bottom-right" | "bottom-left";
  welcomeMessage?: string;
  placeholder?: string;
}

export function ChatInterface({
  initialMessages = [],
  botName = "Assistant",
  botAvatarUrl,
  userAvatarUrl,
  position = "bottom-right",
  welcomeMessage = "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
  placeholder = "Posez votre question...",
}: ChatInterfaceProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [autoScroll, setAutoScroll] = useState(true);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const form = useForm<ChatbotFormValues>({
    resolver: zodResolver(chatbotSchema),
    defaultValues: { query: "" },
  });
  const { register, handleSubmit, watch, reset } = form;
  const input = watch("query");

  // Utilisation de notre hook useChatbot pour envoyer le message
  const { sendMessage, loading } = useChatbot();

  // Ajout d'un message de bienvenue au chargement
  useEffect(() => {
    if (messages.length === 0 && welcomeMessage) {
      setMessages([
        {
          id: "welcome",
          content: welcomeMessage,
          role: "assistant",
          timestamp: new Date(),
        },
      ]);
    }
  }, [messages.length, welcomeMessage]);

  // Auto-scroll vers le bas lors de l'arrivée d'un nouveau message
  useEffect(() => {
    if (autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, autoScroll, isOpen]);

  // Détecte si l'utilisateur a défilé manuellement
  const handleScroll = () => {
    if (!scrollAreaRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollAreaRef.current;
    const isScrolledToBottom = scrollHeight - scrollTop - clientHeight < 10;
    setAutoScroll(isScrolledToBottom);
  };

  const onSubmit = async (data: ChatbotFormValues) => {
    if (!data.query.trim()) return;
    const userMessage: Message = {
      id: Date.now().toString(),
      content: data.query.trim(),
      role: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    reset();
    await sendMessage({
      validData: data,
      onResponseReceived: (response) => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: response || "Une erreur s'est produite",
          role: "assistant",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      },
    });
    // Remet le focus sur le textarea
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Permet d'envoyer le message via la touche "Entrée" (sauf si Maj+Entrée)
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  // Copier le contenu d'un message dans le presse-papier
  const copyToClipboard = (text: string, messageId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(messageId);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  // Bouton pour défiler jusqu'en bas
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      setAutoScroll(true);
    }
  };

  return (
    <>
      {/* Bouton de bascule du chat */}
      <motion.div
        className={cn("fixed z-50", position === "bottom-right" ? "bottom-6 right-6" : "bottom-6 left-6")}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-14 h-14 rounded-full shadow-lg flex items-center justify-center",
            "bg-leather-600 hover:bg-leather-700 text-white",
            "transition-all duration-300 hover:shadow-xl"
          )}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                <MessageSquare className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={cn(
              "fixed z-40 rounded-2xl overflow-hidden shadow-2xl flex flex-col",
              "bg-white border border-leather-200 w-full max-w-md h-[600px] max-h-[80vh]",
              position === "bottom-right" ? "bottom-24 right-6" : "bottom-24 left-6"
            )}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* En-tête du chat */}
            <div className="bg-leather-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 border-2 border-white/20">
                  {botAvatarUrl ? (
                    <AvatarImage src={botAvatarUrl} alt={botName} />
                  ) : (
                    <AvatarFallback className="bg-leather-700 text-white">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <h3 className="font-medium text-white flex items-center gap-1">
                    {botName}
                    <Sparkles className="h-3 w-3 text-yellow-300 ml-1" />
                  </h3>
                  <p className="text-xs text-leather-200">En ligne</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-leather-700/50 rounded-full h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Affichage des messages */}
            <div className="flex-1 relative overflow-hidden">
              <ScrollArea className="h-full p-4" onScroll={handleScroll} ref={scrollAreaRef}>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      className={cn("flex items-start gap-3 group", message.role === "user" && "justify-end")}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {message.role === "assistant" && (
                        <Avatar className="mt-0.5 h-8 w-8 border border-leather-200 shadow-sm flex-shrink-0">
                          {botAvatarUrl ? (
                            <AvatarImage src={botAvatarUrl} alt={botName} />
                          ) : (
                            <AvatarFallback className="bg-leather-100 text-leather-700">
                              <Bot className="h-4 w-4" />
                            </AvatarFallback>
                          )}
                        </Avatar>
                      )}
                      <div className={cn("relative max-w-[80%] group", message.role === "user" ? "order-1" : "order-2")}>
                        <div
                          className={cn(
                            "p-3 rounded-2xl",
                            message.role === "assistant"
                              ? "bg-leather-50 text-leather-900 border border-leather-100"
                              : "bg-leather-600 text-white"
                          )}
                        >
                          <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                        </div>
                        <div
                          className={cn(
                            "mt-1 flex items-center gap-2 text-xs text-leather-400",
                            message.role === "user" ? "justify-end" : "justify-start"
                          )}
                        >
                          <span>
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                          <div className={cn("opacity-0 group-hover:opacity-100 transition-opacity flex gap-1", message.role === "assistant" && "ml-1")}>
                            {message.role === "assistant" && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-5 w-5 rounded-full hover:bg-leather-100"
                                  onClick={() => copyToClipboard(message.content, message.id)}
                                >
                                  {copiedMessageId === message.id ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                                </Button>
                                <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full hover:bg-leather-100">
                                  <ThumbsUp className="h-3 w-3" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full hover:bg-leather-100">
                                  <ThumbsDown className="h-3 w-3" />
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      {message.role === "user" && (
                        <Avatar className="mt-0.5 h-8 w-8 border border-leather-200 shadow-sm flex-shrink-0 order-2">
                          {userAvatarUrl ? (
                            <AvatarImage src={userAvatarUrl} alt="Vous" />
                          ) : (
                            <AvatarFallback className="bg-leather-600 text-white">
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          )}
                        </Avatar>
                      )}
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              <AnimatePresence>
                {!autoScroll && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute bottom-4 right-4">
                    <Button size="sm" variant="outline" onClick={scrollToBottom} className="h-8 w-8 rounded-full p-0 bg-white shadow-md border-leather-200">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Zone de saisie du chat */}
            <div className="p-4 border-t border-leather-200 bg-leather-50">
              <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 items-end">
                <Textarea
                  disabled={loading}
                  {...register("query")}
                  onKeyDown={handleKeyPress}
                  placeholder={placeholder}
                  className="min-h-[60px] max-h-[120px] resize-none rounded-xl border-leather-200 focus:border-leather-400 focus:ring-leather-400 bg-white"
                />
                <Button type="submit" disabled={!input.trim()} className="h-10 w-10 rounded-xl bg-leather-600 hover:bg-leather-700 text-white flex-shrink-0">
                  <Send className="h-5 w-5" />
                </Button>
              </form>
              <div className="mt-2 text-center">
                <p className="text-xs text-leather-400">
                  Appuyez sur Entrée pour envoyer, Maj+Entrée pour une nouvelle ligne
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
