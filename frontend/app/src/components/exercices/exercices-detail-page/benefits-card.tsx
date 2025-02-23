import { motion } from "framer-motion"
import { Heart, Sparkles } from "lucide-react"
import { Card } from "@/components/ui/card"

interface BenefitsCardProps {
    benefits: string[]
    isActive?: boolean
}

export default function BenefitsCard({ benefits, isActive = false }: BenefitsCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
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

                <div className="relative p-6">
                    <motion.div
                        className="flex items-center gap-3 mb-6"
                        animate={
                            isActive
                                ? {
                                    y: [0, -2, 0],
                                }
                                : {}
                        }
                        transition={{
                            duration: 4,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                        }}
                    >
                        <Sparkles className="h-5 w-5 text-leather-600" />
                        <h2 className="text-xl font-semibold text-leather-900">Bénéfices</h2>
                    </motion.div>

                    <div className="space-y-3">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                className="group/benefit"
                            >
                                <motion.div
                                    className="relative p-4 rounded-3xl bg-gradient-to-br from-leather-50/80 to-leather-100/50 hover:from-leather-100/80 hover:to-leather-200/50 transition-all duration-700"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Effet de bordure animée */}
                                    <motion.div
                                        className="absolute inset-0 rounded-3xl opacity-0 group-hover/benefit:opacity-100"
                                        animate={
                                            isActive
                                                ? {
                                                    opacity: [0, 0.3, 0],
                                                    scale: [1, 1.02, 1],
                                                }
                                                : {}
                                        }
                                        transition={{
                                            duration: 3,
                                            repeat: Number.POSITIVE_INFINITY,
                                            ease: "easeInOut",
                                        }}
                                        style={{
                                            background: "linear-gradient(90deg, #8D5F5220, #BDA38C40)",
                                        }}
                                    />

                                    <div className="relative flex items-center gap-3">
                                        <motion.div
                                            className="flex items-center justify-center w-8 h-8 rounded-full bg-white/80 group-hover/benefit:bg-white transition-colors duration-500"
                                            animate={
                                                isActive
                                                    ? {
                                                        scale: [1, 1.1, 1],
                                                    }
                                                    : {}
                                            }
                                            transition={{
                                                duration: 2,
                                                delay: index * 0.2,
                                                repeat: Number.POSITIVE_INFINITY,
                                                ease: "easeInOut",
                                            }}
                                        >
                                            <Heart className="h-5 w-5 text-leather-600 group-hover/benefit:scale-110 transition-transform duration-500" />
                                        </motion.div>
                                        <span className="text-leather-700 group-hover/benefit:text-leather-800 transition-colors duration-500">
                                            {benefit}
                                        </span>
                                    </div>

                                    {/* Effet de brillance */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                                        animate={{
                                            x: ["-100%", "100%"],
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Number.POSITIVE_INFINITY,
                                            ease: "easeInOut",
                                        }}
                                    />
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Card>
        </motion.div>
    )
}

