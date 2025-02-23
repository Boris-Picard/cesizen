import type React from "react"

import { motion } from "framer-motion"
import { Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ParameterCardProps {
    phases: {
        label: string
        value: number
        color: string
        gradient: string
        icon?: React.ReactNode
    }[]
    cycleDuration: number
    isActive?: boolean
}

export default function ParameterCard({ phases, cycleDuration, isActive = false }: ParameterCardProps) {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Card className="relative overflow-hidden group backdrop-blur-sm bg-white/90">
                {/* Particules d'ambiance */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-32 h-32 bg-gradient-radial from-leather-200/10 to-transparent rounded-full"
                            animate={{
                                x: ["0%", "100%", "0%"],
                                y: ["0%", "100%", "0%"],
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 15,
                                delay: i * 2,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                            }}
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                        />
                    ))}
                </div>

                <div className="relative p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <motion.h2
                            className="text-xl font-semibold text-leather-900"
                            animate={{ opacity: [0.8, 1, 0.8] }}
                            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        >
                            Paramètres du cycle
                        </motion.h2>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-leather-600 hover:text-leather-700 hover:bg-leather-100/50 transition-all duration-500"
                                    >
                                        <Info className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Durée de chaque phase du cycle de respiration</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>

                    <div className="space-y-5">
                        {phases.map((phase, index) => (
                            <motion.div
                                key={phase.label}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                className="group/phase"
                            >
                                <div className="relative p-4 rounded-3xl bg-gradient-to-br from-leather-50/80 to-leather-100/50 hover:from-leather-100/80 hover:to-leather-200/50 transition-all duration-700">
                                    {/* Effet de bordure animée */}
                                    <motion.div
                                        className="absolute inset-0 rounded-3xl opacity-0 group-hover/phase:opacity-100"
                                        style={{
                                            background: `linear-gradient(90deg, ${phase.color}20, ${phase.color}40)`,
                                        }}
                                        animate={
                                            isActive
                                                ? {
                                                    opacity: [0, 0.5, 0],
                                                    scale: [1, 1.02, 1],
                                                }
                                                : {}
                                        }
                                        transition={{
                                            duration: 2,
                                            repeat: Number.POSITIVE_INFINITY,
                                            ease: "easeInOut",
                                        }}
                                    />

                                    <div className="relative flex justify-between items-center">
                                        <span className="text-leather-700 font-medium flex items-center gap-3">
                                            {phase.icon}
                                            <motion.span
                                                animate={isActive ? { scale: [1, 1.02, 1] } : {}}
                                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                                            >
                                                {phase.label}
                                            </motion.span>
                                        </span>
                                        <Badge
                                            variant="outline"
                                            className="bg-white/80 border-leather-200 text-leather-800 group-hover/phase:border-leather-300 transition-all duration-500"
                                        >
                                            {phase.value}s
                                        </Badge>
                                    </div>

                                    {/* Barre de progression avec animation */}
                                    <div className="relative h-2 bg-leather-100/30 rounded-full overflow-hidden mt-3">
                                        <motion.div
                                            className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${phase.gradient}`}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(phase.value / cycleDuration) * 100}%` }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                        />
                                        {/* Effet de brillance */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                                            animate={{
                                                x: ["-100%", "100%"],
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Number.POSITIVE_INFINITY,
                                                ease: "easeInOut",
                                            }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Indicateur de durée totale */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="mt-4 pt-4 border-t border-leather-100"
                    >
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-leather-600">Durée totale du cycle</span>
                            <motion.span
                                className="font-medium text-leather-800"
                                animate={
                                    isActive
                                        ? {
                                            opacity: [0.7, 1, 0.7],
                                        }
                                        : {}
                                }
                                transition={{
                                    duration: 2,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "easeInOut",
                                }}
                            >
                                {cycleDuration}s
                            </motion.span>
                        </div>
                    </motion.div>
                </div>
            </Card>
        </motion.div>
    )
}

