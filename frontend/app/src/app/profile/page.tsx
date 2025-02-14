import { Navbar } from "@/components/navigation-menu/navigation-menu";
import UserDashboard from "@/components/profile/profile";

export default function ProfilePage() {
    return (
        <div className="min-h-screen bg-green-50">
            <Navbar />
            <UserDashboard />
        </div>
    )
}