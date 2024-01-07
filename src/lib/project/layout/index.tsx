import { Link, Tooltip } from "@nextui-org/react";
import { GoBug, GoRocket } from "react-icons/go";
import { LiaStickyNoteSolid } from "react-icons/lia";
import { CiBoxList } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";

import { Outlet, useLocation } from "react-router-dom";

const ProjectLayout = () => {
    const path = useLocation().pathname;

    const active = (link: string) => path.startsWith(link)
    
    const links = [
        { name: 'Features', icon: <GoRocket size={24} />, link: '/features'},
        { name: 'Task List', icon: <CiBoxList size={24} />, link: '/list'},
        { name: 'Bugs', icon: <GoBug size={24} />, link: '/bugs'},
        { name: 'Notes', icon: <LiaStickyNoteSolid size={24} />, link: '/notes'},
        { name: 'Settings', icon: <IoSettingsOutline size={24} />, link: '/settings'}
    ]

    return (
        <div className="h-screen max-w-full flex">
            <div className="basis-12 border bg-white flex flex-col gap-8 items-center pt-20">
                {links.map((link, i) => (
                    <Tooltip key={i} content={link.name} placement="right" color="primary" showArrow className="rounded-md">
                        <Link href={link.link} color={active(link.link) ? 'primary' : 'foreground'}>{link.icon}</Link>
                    </Tooltip>
                ))}            
            </div>

            <div className="flex-grow bg-slate-100 flex">
                <Outlet />
            </div>
        </div>
    );
}

export default ProjectLayout