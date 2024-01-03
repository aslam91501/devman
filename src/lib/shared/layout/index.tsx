import { useEffect } from "react";
import { useAuth } from "../../auth/hooks"
import { Outlet } from "react-router-dom";
import { Link, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";

const Layout = () => {
    const { redirectIfUnauthenticated } = useAuth();
    useEffect(() => redirectIfUnauthenticated(), [])

    return (
        <div className="flex flex-col min-h-screen w-screen bg-slate-100">
            <nav className="border-b-1 flex items-center justify-center gap-8 h-10 text-sm bg-white font-mono uppercase">
                <Link href="/home" color="primary" >Home</Link>
                <Link href="/logout" color="danger" >Logout</Link>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}

export default Layout