import type { FC } from "react";
import NavButton from "./NavButton";
import type { User } from "../../pages/AdminPanel";
import { faPieChart, faUsers } from "@fortawesome/free-solid-svg-icons";


type Props = {
    user:User
}

const MainNavbar : FC<Props> = ({user}) => {
    return (
        <nav className="h-full bg-white min-w-18.75 flex flex-col overflow-y-auto">
            <NavButton href="/admin" title="dashboard" icon={faPieChart}/>
            <NavButton href="/admin/users" title="users" icon={faUsers}/>
        </nav>
    )
}

export default MainNavbar;