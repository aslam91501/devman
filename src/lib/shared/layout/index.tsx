import { useEffect } from "react";
import { useAuth } from "../../auth/hooks"
import { Outlet } from "react-router-dom";
import { Link, Tooltip } from "@nextui-org/react";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";

const Layout = () => {
    const { redirectIfUnauthenticated } = useAuth();
    useEffect(() => redirectIfUnauthenticated(), [])

    return (
        <div className="flex flex-col min-h-screen max-w-full w-screen bg-slate-100">
            <nav className="border-b-1 flex items-center justify-center gap-5 h-10 text-sm bg-white font-mono uppercase">
                <Link href="/home" color="foreground" >
                    <Tooltip showArrow placement="bottom" content="Home">
                        <IoHomeOutline size={20} />
                    </Tooltip>
                </Link>
                <Link href="/logout" color="foreground" >
                    <Tooltip showArrow placement="bottom" content="Log Out">
                        <IoIosLogOut size={20} />
                    </Tooltip>
                </Link>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}

export default Layout