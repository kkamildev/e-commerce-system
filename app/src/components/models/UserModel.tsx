
import { faLock, faPen, faTrashCan, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FC } from "react";
import useWarningStore from "../../stores/useWarningStore";


export type UserModelType = {
    id:number,
    username:string,
    email:string,
    role:string,
    onDelete?:(id : number) => Promise<void>,
    onUpdate?:(model : UserModelType) => Promise<void>,
    onPasswordUpdate?:(model : UserModelType) => Promise<void>
}

const UserModel : FC<UserModelType> = ({id, username, email, role, onDelete, onUpdate, onPasswordUpdate}) => {

    const prepare = useWarningStore((store) => store.prepare);

    const roleFormats = {
        "Admin":{color: "bg-red-600", title:"Admin"},
        "Product_manager":{color: "bg-orange-600", title:"Product Manager"},
        "Sales_manager":{color: "bg-green-600", title:"Sales Manager"},
        "Producer":{color: "bg-indigo-600", title:"Producer"}
    }

    return (
        <section className="p-4 shadow-lg shadow-black/40 rounded-md flex flex-col justify-start items-start gap-y-3">
            <FontAwesomeIcon icon={faUser} className="text-4xl text-zinc-700"/>
            <h4 className="text-xl font-bold text-zinc-700">{username}</h4>
            <h4 className="text-lg font-bold text-zinc-700">Email: {email}</h4>

            <p className={`${roleFormats[role].color} text-lg p-2 rounded-lg font-bold text-white`}>{roleFormats[role].title}</p>
            <section className="flex flex-col lg:flex-row gap-3 mt-5">
                <button onClick={() => onPasswordUpdate({id, username, email, role})} className="primary-btn"><FontAwesomeIcon icon={faLock}/> Change password</button>
                <button onClick={() => onUpdate({id, username, email, role})} className="primary-btn"><FontAwesomeIcon icon={faPen}/> Edit user</button>
                {
                    role != "Admin" &&
                    <button className="deny-btn" onClick={() => {
                        prepare("Do you want delete this user?", () => onDelete(id), () => {})
                    }}><FontAwesomeIcon icon={faTrashCan}/>Delete user</button>
                }
            </section>
        </section>
    )
}

export default UserModel;