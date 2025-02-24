import { Navbar } from "@/components/navigation-menu/navigation-menu";
import UserDashboard from "@/components/profile/profile";

export default function ProfilePage() {
    return (
        <div className="min-h-screen ">
            <Navbar />
            <UserDashboard />
        </div>
    )
}