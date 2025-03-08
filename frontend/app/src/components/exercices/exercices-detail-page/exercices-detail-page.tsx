import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Clock, Award, Heart, Play, Pause, RotateCcw, CheckCircle2, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import WelcomeState from "./welcome-state"
import type { ExerciceType } from "@/components/admin-dashboard/exercices/column"
import { useCreateInteraction } from "@/hooks/api/useCreateInteractions"
import { TypeInteraction } from "@/components/admin-dashboard/type-interactions/columns"
import { UserPayload } from "@/context/AuthContext"
import { usePatchInteractions } from "@/hooks/admin/interactions/usePatchInteractions"
import ParameterCard from "./parameter-card"
import BenefitsCard from "./benefits-card"


interface ExerciceDetailProps {
  exercice: ExerciceType | null
  typeInteraction: TypeInteraction | undefined
  user: UserPayload | null
}

export default function ExercicePage({ exercice, typeInteraction, user }: ExerciceDetailProps) {
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [currentPhase, setCurrentPhase] = useState<"inspiration" | "apnee" | "expiration">("inspiration")
  const [phaseTime, setPhaseTime] = useState(0)
  const [cycleCount, setCycleCount] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const timerRef = useRef<number | null>(null)
  const { patchInteraction } = usePatchInteractions()
  const { createInteraction, lastInteractionId } = useCreateInteraction()

  useEffect(() => {
    if (isCompleted && lastInteractionId) {
      const updateInteraction = async () => {
        try {
          await patchInteraction({
            id: lastInteractionId,
            inter_date_de_fin: new Date().toISOString(),
            utilisateur: `/api/utilisateurs/${user!.id}`,
            exercice: `/api/exercices/${exercice!.id}`,
            typeInteraction: `/api/type_interactions/${typeInteraction!.id}`,
          });
        } catch (error) {
          console.error("Erreur lors de la mise à jour de l'interaction", error);
        }
      };
      updateInteraction();
    }
  }, [isCompleted, lastInteractionId, patchInteraction, user, exercice, typeInteraction]);



  const [hasStarted, setHasStarted] = useState(false)

  const totalDurationInSeconds = (exercice?.ex_duration ?? 0) * 60
  const cycleDurationInSeconds =
    (exercice?.ex_inspiration ?? 0) + (exercice?.ex_apnee ?? 0) + (exercice?.ex_expiration ?? 0)
  const totalCycles = cycleDurationInSeconds > 0 ? Math.floor(totalDurationInSeconds / cycleDurationInSeconds) : 0
  const cycleDuration = cycleDurationInSeconds

  const remainingTotalTime = totalDurationInSeconds - Math.floor(totalTime / 1000)

  const getPhaseConfig = useCallback(() => {
    const configs = {
      inspiration: {
        duration: exercice?.ex_inspiration,
        color: "#8D5F52",
        next: "apnee" as const,
        message: "Inspirez lentement...",
        gradient: "from-leather-600 to-leather-500",
        textColor: "text-leather-700",
        borderColor: "border-leather-600",
        shadowColor: "shadow-leather-600/20",
      },
      apnee: {
        duration: exercice?.ex_apnee,
        color: "#A47864",
        next: "expiration" as const,
        message: "Retenez votre souffle...",
        gradient: "from-leather-700 to-leather-600",
        textColor: "text-leather-800",
        borderColor: "border-leather-700",
        shadowColor: "shadow-leather-700/20",
      },
      expiration: {
        duration: exercice?.ex_expiration,
        color: "#BDA38C",
        next: "inspiration" as const,
        message: "Expirez doucement...",
        gradient: "from-leather-800 to-leather-700",
        textColor: "text-leather-900",
        borderColor: "border-leather-800",
        shadowColor: "shadow-leather-800/20",
      },
    }
    return configs[currentPhase]
  }, [currentPhase, exercice?.ex_apnee, exercice?.ex_expiration, exercice?.ex_inspiration])

  // Mise à jour des durées d'animation CSS
  useEffect(() => {
    const phaseConfig = getPhaseConfig()
    document.documentElement.style.setProperty("--phase-duration", `${phaseConfig.duration}s`)
  }, [getPhaseConfig])

  // Timer amélioré avec une meilleure précision
  useEffect(() => {
    if (!isActive || isPaused) {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      return
    }

    const phaseConfig = getPhaseConfig()
    const phaseDuration = (phaseConfig?.duration ?? 0) * 1000
    const interval = 50

    timerRef.current = window.setInterval(() => {
      const now = Date.now()

      setPhaseTime((prev) => {
        const newTime = prev + interval
        if (newTime >= phaseDuration) {
          if (currentPhase === "expiration") {
            setCycleCount((prev) => {
              const newCycleCount = prev + 1
              if (newCycleCount >= totalCycles) {
                handleComplete()
                return prev
              }
              return newCycleCount
            })
          }
          setCurrentPhase(phaseConfig.next)
          return 0
        }
        return newTime
      })

      setTotalTime((prev) => {
        const newTotal = prev + interval
        if (newTotal >= totalDurationInSeconds * 1000) {
          handleComplete()
          return prev
        }
        return newTotal
      })
    }, interval)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isActive, isPaused, getPhaseConfig, currentPhase, totalCycles, totalDurationInSeconds])

  const handleStart = () => {
    setIsActive(!isActive)
    setIsPaused(false)
    setIsCompleted(false)
    if (isActive) {
      handleReset()
    }
  }

  const handlePause = () => {
    setIsPaused(!isPaused)
  }

  const handleReset = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    setIsActive(false)
    setIsPaused(false)
    setPhaseTime(0)
    setCurrentPhase("inspiration")
    setCycleCount(0)
    setTotalTime(0)
    setIsCompleted(false)
  }

  const handleComplete = () => {
    handleReset()
    setIsCompleted(true)
  }

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  // Calculs de progression améliorés
  const getPhaseProgress = () => {
    const phaseConfig = getPhaseConfig()
    return (phaseTime / (phaseConfig.duration ?? 0)) * 1000 * 100
  }

  const getTotalProgress = () => {
    return (totalTime / (totalDurationInSeconds * 1000)) * 100
  }

  const handleInitialStart = () => {
    setHasStarted(true)
    handleStart()
  }

  // Définition des durées d'animation CSS
  useEffect(() => {
    document.documentElement.style.setProperty("--breathe-duration", `${exercice?.ex_inspiration}s`)
    document.documentElement.style.setProperty("--hold-duration", `${exercice?.ex_apnee}s`)
    document.documentElement.style.setProperty("--progress-duration", `${(exercice?.ex_duration ?? 0) * 60}s`)
  }, [exercice?.ex_apnee, exercice?.ex_duration, exercice?.ex_inspiration])

  // Rendu du cercle de respiration amélioré
  const renderBreathingCircle = () => {
    const phaseConfig = getPhaseConfig()
    const progress = getPhaseProgress()

    return (
      <div className="relative w-full max-w-[320px] mx-auto aspect-square">
        {/* Fond ambiant avec plusieurs couches */}
        <div className="absolute inset-0">
          {/* Première couche - Gradient de base */}
          <div className="absolute inset-0 rounded-full bg-leather-200 shadow-2xl" />

          {/* Deuxième couche - Effet de pulsation */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-leather-200 to-leather-300 rounded-full opacity-50"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Troisième couche - Effet de rotation */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-conic from-leather-300/10 via-transparent to-leather-300/10"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />

          {/* Cercle principal avec animation de phase */}
          <motion.div
            className="absolute inset-0"
            animate={{
              scale: currentPhase === "inspiration" ? [1, 1.2] : currentPhase === "apnee" ? 1.2 : [1.2, 0.95],
              rotate: currentPhase === "inspiration" ? [0, 180] : currentPhase === "expiration" ? [180, 360] : 180,
            }}
            transition={{
              duration: phaseConfig.duration,
              ease: "easeInOut",
            }}
          >
            <svg className="w-full h-full -rotate-90">
              <defs>
                {/* Gradient principal */}
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={phaseConfig.color} stopOpacity="0.8" />
                  <stop offset="100%" stopColor={phaseConfig.color} stopOpacity="1" />
                </linearGradient>

                {/* Effet de lueur */}
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Gradient pour les repères */}
                <linearGradient id="markerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={phaseConfig.color} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={phaseConfig.color} stopOpacity="0.6" />
                </linearGradient>
              </defs>

              {/* Cercle de fond avec effet de pulse */}
              <motion.circle
                cx="50%"
                cy="50%"
                r="47%"
                className="fill-none stroke-leather-100/20"
                strokeWidth="1%"
                animate={{
                  scale: [1, 1.02, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />

              {/* Arc de progression principal */}
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="4%"
                strokeLinecap="round"
                strokeDasharray={`${progress * 2.83} 283`}
                className="filter transition-all duration-300 ease-in-out"
                style={{ filter: "url(#glow)" }}
              />
            </svg>
          </motion.div>

          {/* Message central avec animation de phase */}
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPhase}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`
        text-center p-6 rounded-full
        bg-white/90 backdrop-blur-sm
        border-2 ${phaseConfig.borderColor}
        ${phaseConfig.shadowColor} shadow-lg
        transform transition-all duration-300
      `}
              >
                <motion.div
                  className={`text-2xl font-bold ${phaseConfig.textColor} mb-2`}
                  animate={{
                    opacity: isActive && !isPaused ? [1, 0.7, 1] : 1,
                    scale: isActive && !isPaused && currentPhase === "inspiration" ? [1, 1.05, 1] : 1,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  {phaseConfig.message}
                </motion.div>
                <div className={`text-4xl font-bold ${phaseConfig.textColor}`}>
                  {(((phaseConfig.duration ?? 0) * 1000 - phaseTime) / 1000).toFixed(0)}s
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicateur de phase */}
          <div className="absolute -bottom-4 left-0 right-0 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`
      px-4 py-2 rounded-full
      bg-white/90 backdrop-blur-sm
      border ${phaseConfig.borderColor}
      ${phaseConfig.shadowColor} shadow-md
    `}
            >
              <motion.div
                className={`text-sm font-medium ${phaseConfig.textColor}`}
                animate={{
                  opacity: isActive && !isPaused ? [0.7, 1, 0.7] : 1,
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                Phase {cycleCount * 3 + (currentPhase === "inspiration" ? 1 : currentPhase === "apnee" ? 2 : 3)}
                <span className="text-leather-400"> / {totalCycles * 3}</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  // Rendu de la barre de progression améliorée
  const renderProgressBar = () => {
    const progress = getTotalProgress()
    const phaseConfig = getPhaseConfig()

    return (
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-leather-600">Progression totale</span>
          <span className="text-leather-800 font-medium">
            {formatTime(totalTime)} / {exercice?.ex_duration}:00
          </span>
        </div>
        <div className="h-3 bg-leather-100 rounded-full overflow-hidden">
          <div
            className={`
              h-full rounded-full
              bg-gradient-to-r ${phaseConfig.gradient}
              transition-all duration-300 ease-linear
            `}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-leather-200 min-h-screen">
      {/* Header avec animation améliorée */}
      <div className="relative isolate overflow-hidden bg-leather-900">
        <div className="absolute inset-0 -z-10 h-full w-full bg-[url('/grid.svg')] bg-center opacity-20"></div>
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-leather-500 to-leather-700 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 py-16 sm:py-24 max-w-7xl lg:px-8">
          <div className="flex items-center justify-start mb-6">
            <Button
              variant="ghost"
              className="text-white hover:text-leather-800 transition-all duration-300 hover:bg-leather-100 rounded-full group"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">Retour aux exercices</span>
              <span className="sm:hidden">Retour</span>
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-6">
              {exercice?.ex_nom}
            </h1>
            <p className="text-xl text-leather-200 max-w-2xl mx-auto mb-8">{exercice?.ex_description}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge className="bg-leather-700/30 text-leather-100 border-leather-600/30 rounded-full px-4 py-1.5 text-sm">
                      <Clock className="mr-2 h-4 w-4" />
                      {exercice?.ex_duration} minutes
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Durée totale de l'exercice</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge className="bg-leather-700/30 text-leather-100 border-leather-600/30 rounded-full px-4 py-1.5 text-sm">
                      <Award className="mr-2 h-4 w-4" />
                      {exercice?.ex_difficulty}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Niveau de difficulté</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 sm:py-8 max-w-7xl lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          <div className="lg:col-span-8 space-y-6">
            <AnimatePresence mode="wait">
            {!hasStarted ? (
                <WelcomeState exercise={exercice} onStart={handleInitialStart} />
              ) : isCompleted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white/90  rounded-3xl p-8 sm:p-12 text-center shadow-xl border border-leather-100 relative overflow-hidden"
                >
                  {/* Background decoration */}
                  <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                      className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-green-100/30 to-transparent rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                      transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-radial from-leather-100/30 to-transparent rounded-full"
                      animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                      transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    />
                  </div>

                  {/* Success icon with animation */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                    }}
                    className="relative mb-8"
                  >
                    <div className="absolute inset-0 bg-green-100 rounded-full animate-pulse-ring" />
                    <div className="relative bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-full shadow-lg mx-auto w-24 h-24 flex items-center justify-center">
                      <CheckCircle2 className="w-12 h-12 animate-float" />
                    </div>
                  </motion.div>

                  {/* Congratulations text */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="relative space-y-6"
                  >
                    <div className="space-y-3">
                      <h2 className="text-3xl sm:text-4xl font-bold text-leather-900">Félicitations !</h2>
                      <p className="text-leather-600 max-w-lg mx-auto text-lg">
                        Vous avez terminé votre séance de {exercice?.ex_duration} minutes avec succès.
                        <br className="hidden sm:block" />
                        Prenez un moment pour apprécier votre état de détente.
                      </p>
                    </div>

                    {/* Stats summary */}
                    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto my-8">
                      <div className="bg-leather-100 rounded-2xl p-4">
                        <p className="text-leather-600 text-sm">Durée totale</p>
                        <p className="text-leather-900 text-xl font-bold">{exercice?.ex_duration} min</p>
                      </div>
                      <div className="bg-leather-100 rounded-2xl p-4">
                        <p className="text-leather-600 text-sm">Cycles complétés</p>
                        <p className="text-leather-900 text-xl font-bold">{totalCycles}</p>
                      </div>
                    </div>

                    {/* Restart button */}
                    <Button
                      size="lg"
                      onClick={() => {
                        handleReset()
                        createInteraction({
                          inter_date_de_debut: new Date().toISOString(),
                          utilisateur: `/api/utilisateurs/${user?.id}`,
                          exercice: `/api/exercices/${exercice?.id}`,
                          typeInteraction: `/api/type_interactions/${typeInteraction?.id}`,
                        })
                      }}
                      className="bg-gradient-to-r from-leather-600 to-leather-700 rounded-full hover:from-leather-700 hover:to-leather-800 text-white shadow-lg transition-all duration-300 hover:shadow-xl group px-8"
                    >
                      <RotateCcw className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-180" />
                      Recommencer
                    </Button>
                  </motion.div>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  <Card className="bg-white p-6 sm:p-8 border-leather-100 rounded-3xl shadow-xl overflow-hidden">
                    {/* Timer et informations */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="text-sm font-medium text-leather-600">Temps écoulé</div>
                        <div className="text-2xl sm:text-3xl font-bold text-leather-900">{formatTime(totalTime)}</div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="sm:text-right"
                      >
                        <div className="text-sm font-medium text-leather-600">Cycle</div>
                        <div className="text-2xl sm:text-3xl font-bold text-leather-900">
                          {cycleCount + 1}/{totalCycles}
                        </div>
                      </motion.div>
                    </div>

                    {/* Cercle de respiration amélioré */}
                    {renderBreathingCircle()}

                    {/* Barre de progression avec animation */}
                    {renderProgressBar()}
                  </Card>

                  {/* Contrôles avec animations */}
                  <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                    <Button
                      size="lg"
                      className={` rounded-full ${isActive ? "bg-red-500 hover:bg-red-600" : "bg-leather-600 hover:bg-leather-700"
                        } text-white min-w-[140px] sm:min-w-[160px] transition-all duration-300 transform hover:scale-105`}
                      onClick={handleStart}
                    >
                      {isActive ? (
                        <>
                          <Pause className="mr-2 h-5 w-5 animate-pulse" />
                          Arrêter
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-5 w-5" />
                          Commencer
                        </>
                      )}
                    </Button>
                    {isActive && (
                      <Button
                        size="lg"
                        variant="outline"
                        className="rounded-full border-leather-600 text-leather-600 hover:bg-leather-50 hover:text-leather-600 min-w-[140px] sm:min-w-[160px] transition-all duration-300"
                        onClick={handlePause}
                      >
                        {isPaused ? "Reprendre" : "Pause"}
                      </Button>
                    )}
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full border-leather-600 text-leather-600 hover:bg-leather-50 hover:text-leather-600 transition-all duration-300"
                      onClick={handleReset}
                      disabled={!isActive && !isCompleted}
                    >
                      <RotateCcw className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Colonne d'informations avec animations */}
          <div className="lg:col-span-4 space-y-6">
            <ParameterCard
              phases={[
                {
                  label: "Inspiration",
                  value: exercice?.ex_inspiration ?? 0,
                  color: "#8D5F52",
                  gradient: "from-leather-600 to-leather-500",
                  icon: (
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                      className="w-2 h-2 rounded-full bg-leather-600"
                    />
                  ),
                },
                {
                  label: "Rétention",
                  value: exercice?.ex_apnee ?? 0,
                  color: "#A47864",
                  gradient: "from-leather-700 to-leather-600",
                  icon: (
                    <motion.div
                      animate={{
                        opacity: [1, 0.5, 1],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                      className="w-2 h-2 rounded-full bg-leather-700"
                    />
                  ),
                },
                {
                  label: "Expiration",
                  value: exercice?.ex_expiration ?? 0,
                  color: "#BDA38C",
                  gradient: "from-leather-800 to-leather-700",
                  icon: (
                    <motion.div
                      animate={{
                        scale: [1, 0.8, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                      className="w-2 h-2 rounded-full bg-leather-800"
                    />
                  ),
                },
              ]}
              cycleDuration={cycleDuration}
              isActive={isActive && !isPaused}
            />

            <BenefitsCard benefits={exercice?.ex_benefits} isActive={isActive && !isPaused} />
          </div>
        </div>
      </div>
    </div>
  )
}

