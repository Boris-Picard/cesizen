import { Navbar } from "@/components/navigation-menu/navigation-menu";
import EditProfileComponent from "@/components/profile/edit-profile/edit-profile";

export default function EditProfilePage() {
    return (
        <div className="min-h-screen ">
            <Navbar />
            <EditProfileComponent />
        </div>

    )
}