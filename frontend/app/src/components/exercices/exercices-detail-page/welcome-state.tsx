import { motion } from "framer-motion"
import { Play, Wind } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ExerciceType } from "@/components/admin-dashboard/exercices/column"

interface WelcomeStateProps {
    exercise: ExerciceType | null
    onStart: () => void
}

export default function WelcomeState({ exercise, onStart }: WelcomeStateProps) {
    return (
        <div className="relative w-full max-w-3xl mx-auto">
            {/* Cercles d'ambiance */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
                    <div className="absolute inset-0 bg-gradient-to-br from-leather-200/20 to-leather-300/20 rounded-full animate-breathe-ambient" />
                    <div className="absolute inset-0 scale-90 bg-gradient-to-br from-leather-300/20 to-leather-400/20 rounded-full animate-breathe-ambient [animation-delay:1s]" />
                    <div className="absolute inset-0 scale-75 bg-gradient-to-br from-leather-400/20 to-leather-500/20 rounded-full animate-breathe-ambient [animation-delay:2s]" />
                </div>
            </div>

            {/* Contenu principal */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative bg-white/80 backdrop-blur-lg rounded-3xl p-8 sm:p-12 shadow-xl border border-leather-100"
            >
                <div className="flex flex-col items-center text-center space-y-6">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-leather-100 rounded-full animate-pulse-ring" />
                        <div className="relative bg-leather-600 text-white p-6 rounded-full">
                            <Wind className="w-12 h-12 animate-float" />
                        </div>
                    </motion.div>

                    <div className="space-y-3">
                        <h2 className="text-2xl sm:text-3xl font-bold text-leather-900">
                            Prêt à commencer votre séance de {exercise?.ex_nom} ?
                        </h2>
                        <p className="text-leather-600 max-w-lg mx-auto">
                            Installez-vous confortablement dans un endroit calme. Cette séance durera {exercise?.ex_duration} minutes,
                            avec des cycles de {exercise?.ex_inspiration}s d'inspiration, {exercise?.ex_apnee}s de rétention, et{" "}
                            {exercise?.ex_expiration}s d'expiration.
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-leather-100 rounded-3xl">
                        {[
                            { label: "Inspiration", value: exercise?.ex_inspiration },
                            { label: "Apnée", value: exercise?.ex_apnee },
                            { label: "Expiration", value: exercise?.ex_expiration },
                        ].map((phase, index) => (
                            <motion.div
                                key={phase.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <p className="text-sm font-medium text-leather-600">{phase.label}</p>
                                <p className="text-2xl font-bold text-leather-800">{phase.value}s</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto">
                        <Button
                            size="lg"
                            onClick={onStart}
                            className="bg-leather-600 rounded-full hover:bg-leather-700 text-white min-w-full sm:w-2/3 group transition-all duration-300 hover:scale-105"
                        >
                            <Play className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                            Commencer la séance
                        </Button>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="text-sm text-leather-500 italic"
                    >
                        Conseil : Respirez naturellement et ne forcez pas. Écoutez votre corps.
                    </motion.p>
                </div>
            </motion.div>
        </div>
    )
}

