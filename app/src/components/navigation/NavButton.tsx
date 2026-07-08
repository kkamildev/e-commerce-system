import { type IconDefinition } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FC } from "react";
import { Link } from "react-router-dom";


type Props = {
    href:string,
    icon:IconDefinition,
    title:string
}

const NavButton : FC<Props> = ({href, title, icon}) => {
    return (
        <Link to={href} className="m-2 shadow-lg shadow-black/40 text-center py-3 px-3 rounded-md text-3xl text-zinc-700 hover:text-white bg-white hover:bg-indigo-600 transition-colors duration-150 ease-in-out">
            <FontAwesomeIcon icon={icon}/>
            <p className="text-xs">{title}</p>
        </Link>
    )
}

export default NavButton;