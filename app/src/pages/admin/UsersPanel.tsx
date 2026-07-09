import { useEffect, useState, type FC } from "react";
import { useAdminPanelRequest } from "../../utils/useAdminPanelRequest";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import type { UserModelType } from "../../components/models/UserModel";
import UserModel from "../../components/models/UserModel";


type Props = {

}


const UsersPanel : FC<Props> = ({}) => {
    const adminPanelRequest = useAdminPanelRequest();

    const [users, setUsers] = useState<UserModelType[]>([]);

    const getUsers = async () => {
        const result = await adminPanelRequest("GET", "/api/users", {timeout:5000});
        if(result.ok) {
            setUsers(result.data.users as UserModelType[])
        }

    }
    useEffect(() => {
        getUsers();
    }, [])


    return (
        <section className="overflow-y-scroll h-full pb-5 flex-1 min-h-0">
            <section className="m-5 mb-10">
                <section className="flex justify-between">
                    <section className="flex flex-col">
                        <h1 className="font-bold text-3xl text-zinc-800">Store Users</h1>
                        <h2 className="font-bold text-xl text-zinc-600">Found: {users.length}</h2>
                    </section>
                    <section className="flex flex-col">
                        <button onClick={getUsers} className="primary-btn"><FontAwesomeIcon icon={faRefresh}/> Refresh</button>
                    </section>
                </section>
                <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mt-15 mx-5 gap-x-10 gap-y-15">
                    {
                        users.map((user) => <UserModel key={user.id} id={user.id} email={user.email} role={user.role} username={user.username}/>)
                    }
                </section>
            </section>
        </section>
    )
}

export default UsersPanel;