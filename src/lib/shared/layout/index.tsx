import { useEffect } from "react";
import { useAuth } from "../../auth/hooks"
import { Outlet } from "react-router-dom";
import { Button, Link, Popover, PopoverContent, PopoverTrigger, Tooltip } from "@nextui-org/react";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";

const Layout = () => {
    const { redirectIfUnauthenticated, logout } = useAuth();
    useEffect(() => redirectIfUnauthenticated(), [])

    return (
        <div className="flex flex-col min-h-screen max-w-full w-screen bg-slate-50">
            <nav className="border-b-1 flex items-center justify-center gap-5 h-10 text-sm bg-white font-mono uppercase">
                <Tooltip showArrow placement="bottom" content="Home">
                    <Link href="/home" color="foreground">
                        <IoHomeOutline size={20} />
                    </Link>
                </Tooltip>
                

                <Popover placement="right">
                    <PopoverTrigger>
                        <div>
                        <Tooltip content={"Logout"} placement="bottom" color="primary" showArrow>
                            <p>
                                <IoIosLogOut size={20} />
                            </p>
                        </Tooltip>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className="px-3 py-3">
                            <div className="font-bold">Are you sure?</div>
                            <Button color="danger" className="mt-2 ml-2"
                                onClick={logout}>Log Out</Button>
                        </div>
                    </PopoverContent>
                </Popover>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}

export default Layout