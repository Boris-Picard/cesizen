import ExerciceLibre from "@/components/exercices/exercice-libre/exercice-libre";
import { Navbar } from "@/components/navigation-menu/navigation-menu";

export default function ExerciceLibrePage() {
    return (
        <div className="min-h-screen bg-green-50">
            <Navbar />
            <ExerciceLibre />
        </div>
    )
}