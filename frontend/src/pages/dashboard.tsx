import SideNavbar from "../components/side-navbar";

export default function Dashboard() {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                <SideNavbar />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
                Dashboard
            </div>
        </div>
    )
}
