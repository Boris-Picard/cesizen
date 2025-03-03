import { FooterPage } from "@/app/footer/page";
import { Navbar } from "@/components/navigation-menu/navigation-menu";
import EditProfileComponent from "@/components/profile/edit-profile/edit-profile";
import { useAuth } from "@/context/AuthContext";

export default function EditProfilePage() {
    const { user, token } = useAuth()

    return (
        <div className="min-h-screen ">
            <Navbar />
            <EditProfileComponent user={user} token={token} />
            <FooterPage />
        </div>
    )
}