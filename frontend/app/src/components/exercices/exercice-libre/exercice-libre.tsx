import {
    useState,
    useEffect,
    useRef,
    useMemo,
    FC,
} from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
    DndProvider,
    useDrag,
    useDrop,
    XYCoord,
} from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface Phase {
    id: string;
    type: string;
    duration: number;
    active: boolean;
}

interface DragItem {
    index: number;
    id: string;
}

interface PhaseItemProps {
    phase: Phase;
    index: number;
    movePhase: (dragIndex: number, hoverIndex: number) => void;
    updatePhaseDuration: (id: string, newDuration: number) => void;
    togglePhaseActive: (id: string) => void;
    isExerciseActive: boolean;
}

const PhaseItem: FC<PhaseItemProps> = ({
    phase,
    index,
    movePhase,
    updatePhaseDuration,
    togglePhaseActive,
    isExerciseActive,
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: any }>({
        accept: "phase",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item: DragItem, monitor) {
            if (!ref.current) return;
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) return;
            const hoverBoundingRect = ref.current.getBoundingClientRect();
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            if (!clientOffset) return;
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
            movePhase(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: "phase",
        item: () => ({ id: phase.id, index }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    const capitalizeFirst = (str: string) =>
        str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    return (
        <div
            ref={ref}
            className="p-6 border rounded-xl bg-green-50 shadow-md cursor-move hover:bg-green-100 transition-colors duration-200"
            style={{ opacity: isDragging ? 0.5 : 1 }}
            data-handler-id={handlerId}
        >
            <div className="flex items-center justify-between">
                <div
                    {...(drag as any).dragHandleProps}
                    className="cursor-move font-semibold text-lg"
                >
                    {capitalizeFirst(phase.type)}
                </div>
                <div className="flex items-center">
                    <Switch
                        checked={phase.active}
                        onCheckedChange={() => togglePhaseActive(phase.id)}
                        disabled={isExerciseActive}
                    />
                </div>
            </div>
            <div className="mt-2">
                <label className="block text-sm font-medium text-green-700">
                    Durée : {phase.duration} s
                </label>
                <Slider
                    value={[phase.duration]}
                    onValueChange={(value) =>
                        updatePhaseDuration(phase.id, value[0])
                    }
                    min={1}
                    max={30}
                    step={1}
                    disabled={isExerciseActive}
                />
            </div>
        </div>
    );
};

export default function ExerciceLibre() {
    const navigate = useNavigate();
    const [phases, setPhases] = useState<Phase[]>([]);
    const [isActive, setIsActive] = useState(false);
    const [finished, setFinished] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const timerRef = useRef<number>();

    useEffect(() => {
        setTimeout(() => {
            setPhases([
                { id: "1", type: "inspirez", duration: 5, active: true },
                { id: "2", type: "retenez", duration: 15, active: true },
                { id: "3", type: "expirez", duration: 10, active: true },
            ]);
        }, 500);
    }, []);

    const activePhases = useMemo(
        () => phases.filter((phase) => phase.active),
        [phases]
    );
    const currentPhase =
        activePhases[currentPhaseIndex] || { type: "", duration: 0, active: false, id: "0" };

    const remainingTime = Math.ceil(
        currentPhase.duration * (100 - progress) / 100
    );
    const getIntervalTime = () => (currentPhase.duration * 1000) / 100;

    const handlePauseToggle = () => {
        if (!isPaused && timerRef.current) {
            clearTimeout(timerRef.current);
        }
        setIsPaused((prev) => !prev);
    };

    useEffect(() => {
        if (!isActive || isPaused || activePhases.length === 0) return;

        const tick = () => {
            setProgress((prev) => {
                if (prev >= 100) {
                    if (currentPhaseIndex === activePhases.length - 1) {
                        setIsActive(false);
                        setFinished(true);
                        return 100;
                    } else {
                        setCurrentPhaseIndex(currentPhaseIndex + 1);
                        return 0;
                    }
                }
                return prev + 1;
            });
            timerRef.current = window.setTimeout(tick, getIntervalTime());
        };

        tick();

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [isActive, isPaused, currentPhaseIndex, currentPhase.duration, activePhases]);

    const toggleExercise = () => {
        if (!isActive) {
            setCurrentPhaseIndex(0);
            setProgress(0);
            setFinished(false);
            setIsPaused(false);
        } else {
            if (timerRef.current) clearTimeout(timerRef.current);
        }
        setIsActive((prev) => !prev);
    };

    const resetExercise = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        setIsActive(false);
        setCurrentPhaseIndex(0);
        setProgress(0);
        setFinished(false);
    };

    const updatePhaseDuration = (id: string, newDuration: number) => {
        setPhases((prev) =>
            prev.map((phase) => (phase.id === id ? { ...phase, duration: newDuration } : phase))
        );
    };

    const togglePhaseActive = (id: string) => {
        setPhases((prev) =>
            prev.map((phase) => (phase.id === id ? { ...phase, active: !phase.active } : phase))
        );
    };

    const movePhase = (dragIndex: number, hoverIndex: number) => {
        const newPhases = Array.from(phases);
        const [removed] = newPhases.splice(dragIndex, 1);
        newPhases.splice(hoverIndex, 0, removed);
        setPhases(newPhases);
    };

    const isTouchDevice = () => {
        return (
            "ontouchstart" in window ||
            navigator.maxTouchPoints > 0 ||
            (navigator as any).msMaxTouchPoints > 0
        );
    };

    const getStrokeColor = () => {
        switch (currentPhase.type) {
            case "inspirez":
                return "#4ade80";
            case "retenez":
                return "#facc15";
            case "expirez":
                return "#60a5fa";
            default:
                return "#4ade80";
        }
    };

    return (
        <DndProvider
            backend={isTouchDevice() ? TouchBackend : HTML5Backend}
            options={isTouchDevice() ? { enableMouseEvents: true } : {}}
        >
            <div>
                {/* Header moderne */}
                <header className="py-8 bg-white shadow-sm">
                    <div className="max-w-6xl mx-auto px-4 md:px-8 flex items-center">
                        <Button
                            variant="ghost"
                            className="flex items-center text-gray-600 hover:text-gray-800"
                            onClick={() => navigate(-1)}
                        >
                            <ArrowLeft className="mr-2 h-5 w-5" /> Retour
                        </Button>
                        <h1 className="flex-1 text-center text-4xl font-bold text-green-800">
                            Exercice de Respiration Libre
                        </h1>
                    </div>
                </header>

                <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 space-y-12">
                    {/* Visualisation de l'exercice */}
                    <div className="flex flex-col items-center">
                        <div className="relative w-64 h-64 mb-8">
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="45"
                                    fill="none"
                                    stroke={getStrokeColor()}
                                    strokeWidth="10"
                                    strokeDasharray="282.7"
                                    strokeDashoffset={
                                        282.7 - (progress / 100) * 282.7
                                    }
                                    transform="rotate(-90 50 50)"
                                />
                                <text x="50" y="50" textAnchor="middle">
                                    {!isActive && finished ? (
                                        <>
                                            <tspan x="50" dy="-0.3em" className="text-xs font-bold fill-green-800">
                                                Bravo,
                                            </tspan>
                                            <tspan x="50" dy="0.9em" className="text-xs font-bold fill-green-800">
                                                exercice terminé !
                                            </tspan>
                                        </>
                                    ) : (
                                        <>
                                            <tspan x="50" dy="-0.3em" className="text-2xl font-bold fill-green-800">
                                                {currentPhase.type === "inspirez"
                                                    ? "Inspirez"
                                                    : currentPhase.type === "retenez"
                                                        ? "Retenez"
                                                        : currentPhase.type === "expirez"
                                                            ? "Expirez"
                                                            : "Aucun"}
                                            </tspan>
                                            <tspan x="50" dy="1.5em" className="text-xl fill-green-800">
                                                {remainingTime} s
                                            </tspan>
                                        </>
                                    )}
                                </text>
                            </svg>
                        </div>
                        <div className="flex gap-3">
                            <Button
                                onClick={toggleExercise}
                                className="bg-primary hover:bg-green-700 text-white"
                            >
                                {isActive ? "Arrêter" : "Commencer"}
                            </Button>
                            {isActive && (
                                <Button
                                    onClick={handlePauseToggle}
                                    className="bg-blue-500 hover:bg-blue-600 text-white"
                                >
                                    {isPaused ? "Reprendre" : "Pause"}
                                </Button>
                            )}
                            <Button onClick={resetExercise} className="bg-red-500 hover:bg-red-700 text-white">
                                Reset
                            </Button>
                        </div>
                    </div>

                    {/* Configuration des phases */}
                    <div className="w-full max-w-md mx-auto">
                        <h2 className="text-2xl font-bold mb-4 text-center">Configurer les phases</h2>
                        <div className="flex flex-col gap-3">
                            {phases.map((phase, index) => (
                                <PhaseItem
                                    key={phase.id}
                                    phase={phase}
                                    index={index}
                                    movePhase={movePhase}
                                    updatePhaseDuration={updatePhaseDuration}
                                    togglePhaseActive={togglePhaseActive}
                                    isExerciseActive={isActive}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DndProvider>
    );
}
