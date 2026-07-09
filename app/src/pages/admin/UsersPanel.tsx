import { useEffect, useState, type FC } from "react";
import { useAdminPanelRequest } from "../../utils/useAdminPanelRequest";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft, faPlus, faRefresh } from "@fortawesome/free-solid-svg-icons";
import type { UserModelType } from "../../components/models/UserModel";
import UserModel from "../../components/models/UserModel";
import CreateUserForm from "../../components/forms/CreateUserForm";
import type { Result } from "../../layouts/FormLayout";


type Props = {

}


const UsersPanel : FC<Props> = ({}) => {
    const adminPanelRequest = useAdminPanelRequest();

    const [users, setUsers] = useState<UserModelType[]>([]);
    const [form, setForm] = useState<string>(null);

    const createUser = async (formData : FormData) : Promise<Result> => {
        const result = await adminPanelRequest("POST", "/api/users", {}, {
            email:formData.get("email"),
            username:formData.get("username"),
            password:formData.get("password"),
            role:formData.get("role")
        });
        if(result.ok) {
            setForm(null);
            return {ok:true, message:"Success", serverError:false}
        } else {
            return {ok:false, message:result.message, serverError:result.serverError}
        }
    }

    const getUsers = async () => {
        const result = await adminPanelRequest("GET", "/api/users", {timeout:5000});
        if(result.ok) {
            setUsers(result.data.users as UserModelType[])
        }
    }
    useEffect(() => {
        if(!form) {
            getUsers();
        }
    }, [form])


    return (
        <section className="overflow-y-scroll h-full pb-5 flex-1 min-h-0">
            <section className={`${form && "hidden"} m-5 mb-10`}>
                <section className="flex flex-col-reverse lg:flex-row justify-between gap-y-4">
                    <section className="flex flex-col">
                        <h1 className="font-bold text-3xl text-zinc-800">Store Users</h1>
                        <h2 className="font-bold text-xl text-zinc-600">Found: {users.length}</h2>
                    </section>
                    <section>
                        <button onClick={() => setForm("create")} className="primary-btn"><FontAwesomeIcon icon={faPlus}/> Create new</button>
                        <button onClick={getUsers} className="primary-btn"><FontAwesomeIcon icon={faRefresh}/> Refresh</button>
                    </section>
                </section>
                <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mt-15 mx-5 gap-x-10 gap-y-15">
                    {
                        users.map((user) => <UserModel key={user.id} id={user.id} email={user.email} role={user.role} username={user.username}/>)
                    }
                </section>
            </section>
            {
                form == "create" && 
                <section className="m-5 mb-10">
                    <section className="flex flex-col lg:flex-row justify-between gap-y-4">
                        <section className="flex flex-col">
                            <button onClick={() => setForm(null)} className="deny-btn text-xl"><FontAwesomeIcon icon={faCircleLeft}/> Back</button>
                        </section>
                        <section>
                            
                        </section>
                    </section>
                    <section className="flex justify-center items-center mt-10">
                        <CreateUserForm onSubmit={async (formData) => {
                            return await createUser(formData)
                        }}/>
                    </section>
                </section>
            }
        </section>
    )
}

export default UsersPanel;