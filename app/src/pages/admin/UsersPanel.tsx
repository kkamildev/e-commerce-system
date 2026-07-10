import { useEffect, useState, type FC } from "react";
import { useAdminPanelRequest } from "../../utils/useAdminPanelRequest";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft, faPlus, faRefresh } from "@fortawesome/free-solid-svg-icons";
import type { UserModelType } from "../../components/models/UserModel";
import UserModel from "../../components/models/UserModel";
import CreateUserForm from "../../components/forms/user/CreateUserForm";
import type { Result } from "../../layouts/FormLayout";
import UpdateUserForm from "../../components/forms/user/UpdateUserForm";
import UpdateUserPasswordForm from "../../components/forms/user/UpdateUserPasswordForm";


type Props = {

}


const UsersPanel : FC<Props> = ({}) => {
    const adminPanelRequest = useAdminPanelRequest();

    const [users, setUsers] = useState<UserModelType[]>([]);
    const [form, setForm] = useState<string>(null);
    const [editUser, setEditUser] = useState<UserModelType>(null);

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

    const updateUser = async (id:number, formData : FormData) => {
        const result = await adminPanelRequest("PUT", "/api/users", {}, {
            id,
            email:formData.get("email"),
            username:formData.get("username"),
            role:formData.get("role")
        });
        if(result.ok) {
            setForm(null);
            return {ok:true, message:"Success", serverError:false}
        } else {
            return {ok:false, message:result.message, serverError:result.serverError}
        }
    }

    const updateUserPassword = async (id:number, formData : FormData) => {
        const result = await adminPanelRequest("PUT", "/api/users/password", {}, {
            id,
            newPassword:formData.get("password"),
        });
        if(result.ok) {
            setForm(null);
            return {ok:true, message:"Success", serverError:false}
        } else {
            return {ok:false, message:result.message, serverError:result.serverError}
        }
    }

    const deleteUser = async (id : number) => {
        const result = await adminPanelRequest("DELETE", "/api/users", {data:{id}}, {})
        if(result.ok) {
            setUsers((prev) => prev.filter((user) => user.id != id))
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
        <section className="overflow-y-scroll h-full pb-10 flex-1 min-h-0">
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
                        users.map((user) => <UserModel key={user.id} id={user.id} email={user.email} role={user.role} username={user.username}
                        onDelete={deleteUser}
                        onUpdate={async (userModel) => {
                            setForm("update")
                            setEditUser(userModel)
                        }}
                        onPasswordUpdate={async (userModel) => {
                            setForm("password_change")
                            setEditUser(userModel)
                        }}
                        />)
                    }
                </section>
            </section>
            {
                form &&
                <section className="m-5 mb-10">
                    <section className="flex flex-col lg:flex-row justify-between gap-y-4">
                        <section className="flex flex-col">
                            <button onClick={() => setForm(null)} className="deny-btn text-xl"><FontAwesomeIcon icon={faCircleLeft}/> Back</button>
                        </section>
                        <section>
                            
                        </section>
                    </section>
                    <section className="flex justify-center items-center mt-10">
                        {
                            form == "create" && 
                            <CreateUserForm onSubmit={async (formData) => {
                                return await createUser(formData)
                            }}/>
                        }
                        {
                            form == "update" && 
                            <UpdateUserForm model={editUser} onSubmit={async (formData) => {
                                return await updateUser(editUser.id, formData)
                            }}/>
                        }
                        {
                            form == "password_change" && 
                            <UpdateUserPasswordForm onSubmit={async (formData) => {
                                return await updateUserPassword(editUser.id, formData)
                            }}/>
                        }
                    </section>
                </section>
            }
        </section>
    )
}

export default UsersPanel;