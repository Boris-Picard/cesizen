"use client"

import { motion } from "framer-motion"
import { Play, Wind, Clock, Award, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ExerciceType } from "@/components/admin-dashboard/exercices/column"

interface WelcomeStateProps {
    exercise: ExerciceType | null
    onStart: () => void
}

export default function WelcomeState({ exercise, onStart }: WelcomeStateProps) {
    return (
        <div className="relative w-full max-w-3xl mx-auto">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
                    <div className="absolute inset-0 bg-gradient-to-br from-leather-200/20 to-leather-300/20 rounded-full animate-breathe-ambient" />
                    <div className="absolute inset-0 scale-90 bg-gradient-to-br from-leather-300/20 to-leather-400/20 rounded-full animate-breathe-ambient [animation-delay:1s]" />
                    <div className="absolute inset-0 scale-75 bg-gradient-to-br from-leather-400/20 to-leather-500/20 rounded-full animate-breathe-ambient [animation-delay:2s]" />
                </div>
            </div>

            {/* Main content card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative bg-white/90 backdrop-blur-lg rounded-3xl p-8 sm:p-12 shadow-xl border border-leather-100"
            >
                <div className="flex flex-col items-center text-center space-y-8">
                    {/* Icon with animation */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-leather-100 rounded-full animate-pulse-ring" />
                        <div className="relative bg-gradient-to-br from-leather-600 to-leather-700 text-white p-6 rounded-full shadow-lg">
                            <Wind className="w-12 h-12 animate-float" />
                        </div>
                    </motion.div>

                    {/* Title and description */}
                    <div className="space-y-4">
                        <h2 className="text-2xl sm:text-3xl font-bold text-leather-900">
                            Prêt à commencer votre séance de {exercise?.ex_nom} ?
                        </h2>
                        <p className="text-leather-600 max-w-lg mx-auto">
                            Installez-vous confortablement dans un endroit calme. Cette séance durera {exercise?.ex_duration} minutes,
                            avec des cycles de {exercise?.ex_inspiration}s d'inspiration, {exercise?.ex_apnee}s de rétention, et{" "}
                            {exercise?.ex_expiration}s d'expiration.
                        </p>
                    </div>

                    {/* Exercise parameters */}
                    <div className="w-full bg-gradient-to-br from-leather-50 to-leather-100/70 rounded-2xl p-6 shadow-inner">
                        <div className="grid grid-cols-3 gap-6">
                            {[
                                {
                                    label: "Inspiration",
                                    value: exercise?.ex_inspiration,
                                    icon: <ArrowRight className="h-4 w-4 rotate-90 text-leather-600" />,
                                },
                                { label: "Apnée", value: exercise?.ex_apnee, icon: <Clock className="h-4 w-4 text-leather-700" /> },
                                {
                                    label: "Expiration",
                                    value: exercise?.ex_expiration,
                                    icon: <ArrowRight className="h-4 w-4 -rotate-90 text-leather-800" />,
                                },
                            ].map((phase, index) => (
                                <motion.div
                                    key={phase.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex flex-col items-center p-3 bg-white/80 rounded-xl shadow-sm"
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        {phase.icon}
                                        <p className="text-sm font-medium text-leather-700">{phase.label}</p>
                                    </div>
                                    <p className="text-2xl font-bold text-leather-800">{phase.value}s</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Start button */}
                    <div className="w-full max-w-md mx-auto">
                        <Button
                            size="lg"
                            onClick={onStart}
                            className="w-full bg-gradient-to-r from-leather-600 to-leather-700 rounded-full hover:from-leather-700 hover:to-leather-800 text-white shadow-lg group transition-all duration-300 hover:shadow-xl"
                        >
                            <Play className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                            Commencer la séance
                        </Button>
                    </div>

                    {/* Tip */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="flex items-center gap-2 text-leather-500 bg-leather-50 px-4 py-2 rounded-full"
                    >
                        <Award className="h-4 w-4 text-leather-600" />
                        <p className="text-sm italic">Conseil : Respirez naturellement et ne forcez pas. Écoutez votre corps.</p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}

