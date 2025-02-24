import ExerciceLibre from "@/components/exercices/exercice-libre/exercice-libre";
import { Navbar } from "@/components/navigation-menu/navigation-menu";

export default function ExerciceLibrePage() {
    return (
        <div className="min-h-screen 0">
            <Navbar />
            <ExerciceLibre />
        </div>
    )
}