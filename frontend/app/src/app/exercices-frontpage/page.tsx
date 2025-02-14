import BreathingExercises from "@/components/exercices-frontpage/exercices-frontpage";
import { Navbar } from "@/components/navigation-menu/navigation-menu";

export default function ExercicesFrontPage() {
    return (
        <div className="min-h-screen bg-green-50">
            <Navbar />
            <BreathingExercises />
        </div>
    )
}