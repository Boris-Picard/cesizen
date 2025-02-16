import BreathingExercises from "@/components/exercices/exercices-frontpage";
import { Navbar } from "@/components/navigation-menu/navigation-menu";

export default function ExercicesFrontPage() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <BreathingExercises />
        </div>
    )
}