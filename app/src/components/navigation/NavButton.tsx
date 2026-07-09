import { type IconDefinition } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FC } from "react";
import { Link, useLocation } from "react-router-dom";


type Props = {
    href:string,
    icon:IconDefinition,
    title:string
}

const NavButton : FC<Props> = ({href, title, icon}) => {

    const path = useLocation();

    return (
        <Link to={href} className={`${path.pathname == href ? "bg-indigo-600 text-white" : "bg-white text-zinc-700"} m-2 shadow-lg shadow-black/20 text-center py-3 px-3 rounded-md text-3xl hover:text-white hover:bg-indigo-600 transition-colors duration-150 ease-in-out`}>
            <FontAwesomeIcon icon={icon}/>
            <p className="text-xs">{title}</p>
        </Link>
    )
}

export default NavButton;