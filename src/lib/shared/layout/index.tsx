import { useEffect } from "react";
import { useAuth } from "../../auth/hooks"
import { Outlet } from "react-router-dom";
import { Link, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";

const Layout = () => {
    const { redirectIfUnauthenticated } = useAuth();
    useEffect(() => redirectIfUnauthenticated(), [])

    return (
        <div className="min-h-screen w-screen bg-slate-50">
            <Navbar isBordered>
                <NavbarContent justify="center">
                    <NavbarItem as={Link} href="/">Projects</NavbarItem>
                    <NavbarItem as={Link} href="/">Logout</NavbarItem>
                </NavbarContent>
            </Navbar>
            <Outlet></Outlet>
        </div>
    )
}

export default Layout