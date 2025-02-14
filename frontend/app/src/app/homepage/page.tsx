import { Navbar } from "@/components/navigation-menu/navigation-menu"

export default function HomePage() {

    return (<>
        <div className="min-h-screen bg-green-50">
            <Navbar />
            <a href="api/admin">Admin page</a>
        </div>
    </>)
}