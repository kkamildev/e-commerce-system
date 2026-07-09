
import { faPen, faTrashCan, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FC } from "react";


export type UserModelType = {
    id:number,
    username:string,
    email:string,
    role:string
}

const UserModel : FC<UserModelType> = ({id, username, email, role}) => {

    const roleFormats = {
        "Admin":"bg-red-600",
        "Product_manager":"bg-orange-600",
        "Sales_manager":"bg-green-600",
        "Producer":"bg-indigo-600"
    }

    return (
        <section className="p-4 shadow-lg shadow-black/40 rounded-md flex flex-col justify-start items-start gap-y-3">
            <FontAwesomeIcon icon={faUser} className="text-4xl text-zinc-700"/>
            <h4 className="text-xl font-bold text-zinc-700">{username}</h4>
            <h4 className="text-lg font-bold text-zinc-700">Email: {email}</h4>

            <p className={`${roleFormats[role]} text-lg p-2 rounded-lg font-bold text-white`}>{role}</p>
            <section className="flex flex-col lg:flex-row gap-3 mt-5">
                <button className="primary-btn"><FontAwesomeIcon icon={faPen}/> Edit user</button>
                <button className="deny-btn"><FontAwesomeIcon icon={faTrashCan}/>Delete user</button>
            </section>
        </section>
    )
}

export default UserModel;