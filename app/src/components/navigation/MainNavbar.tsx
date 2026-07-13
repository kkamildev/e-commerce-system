import { useState, type FC } from "react";
import NavButton from "./NavButton";
import { faBoxesPacking, faComment, faFile, faPieChart, faTruckFast, faUsers } from "@fortawesome/free-solid-svg-icons";
import useUserStore from "../../stores/useUserStore";
import NavShowButton from "./NavShowButton";


type Props = {
    
}

const MainNavbar : FC<Props> = ({}) => {

    const user = useUserStore((store) => store.user)

    const [hidden, setHidden] = useState<boolean>(true);

    return (
        <>
            <nav className={`h-full min-w-25.75 max-w-25.75 flex flex-col overflow-y-auto bg-zinc-50 ${hidden && "-translate-x-full absolute"} lg:static lg:translate-0 lg:flex transition-all duration-150 ease-in-out`}>
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
            <NavShowButton setHidden={setHidden}/>
        </>
    )
}

export default MainNavbar;