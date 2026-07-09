import type { FC } from "react";
import NavButton from "./NavButton";
import type { User } from "../../pages/admin/AdminPanel";
import { faBoxesPacking, faComment, faFile, faPieChart, faTruckFast, faUsers } from "@fortawesome/free-solid-svg-icons";


type Props = {
    user:User
}

const MainNavbar : FC<Props> = ({user}) => {
    return (
        <nav className="h-full min-w-25.75 max-w-25.75 flex flex-col overflow-y-auto bg-zinc-50">
            <NavButton href="/admin" title="dashboard" icon={faPieChart}/>
            {
                user.role == "Admin" &&
                <>
                    <NavButton href="/admin/users" title="users" icon={faUsers}/>
                    <NavButton href="/admin/config" title="Config" icon={faFile}/>
                </>
            }
            <NavButton href="/admin/products" title="Products" icon={faBoxesPacking}/>
            <NavButton href="/admin/orders" title="Orders" icon={faTruckFast}/>
            <NavButton href="/admin/comments" title="Comments" icon={faComment}/>
        </nav>
    )
}

export default MainNavbar;