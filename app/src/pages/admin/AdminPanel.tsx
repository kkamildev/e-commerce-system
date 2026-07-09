import { useEffect, useState, type FC} from "react";

import PageLayout from "../../layouts/PageLayout";
import { request } from "../../utils/request";
import CreateAdminSection from "../../components/sections/CreateAdminSection";
import LoginUserSection from "../../components/sections/LoginUserSection";
import MainNavbar from "../../components/navigation/MainNavbar";
import { Outlet } from "react-router-dom";
import useUserStore from "../../stores/useUserStore";


export type User = {
    id:number,
    username:string,
    role:string
}

type Props = {
    
}

const AdminPanel : FC<Props> = ({}) => {
    
    const [adminExist, setAdminExist] = useState<boolean>(true);

    const user = useUserStore((store) => store.user);
    const setUser = useUserStore((store) => store.setUser);

    const [config, setConfig] = useState(null);

    const logout = async () => {
        const result = await request("GET", "/api/users/logout", {timeout:5000})
        if(result.ok) {
            setUser(null);
        }
    }

    const checkAdminExist = async () => {
        const result = await request("GET", "/api/users/admin", {timeout:5000});
        if(result.ok) {
            setAdminExist(result.data.exist);
        }
    }

    const getConfig = async () => {
        const result = await request("GET", "/api/config", {timeout:5000});
        if(result.ok) {
            setConfig(result.data.config);
        }
    }

    useEffect(() => {
        if(user) {
           getConfig(); 
        }
    }, [user])

    useEffect(() => {
        checkAdminExist();
    }, [])

    return(
        <PageLayout title="Admin Panel">
            {
                !user ? (!adminExist ? <CreateAdminSection onCreate={checkAdminExist}/> : <LoginUserSection/>) :
                <section className="flex flex-col h-screen max-h-screen w-full overflow-hidden">
                    <header className="bg-indigo-600 flex flex-col lg:flex-row justify-center lg:justify-between">
                        <section className="flex items-center">
                            <img src="/api/config/logo" alt="E-commerce store logo" className="w-15 ml-4 m-2" />
                            <h1 className="text-white font-bold ml-3 text-2xl">{config?.storeName}</h1>
                        </section>
                        <section className="flex items-center">
                            <h2 className="text-white font-bold mx-3 text-2xl">Logged as {user.username}</h2>
                            <button onClick={logout} className="primary-btn m-3">Logout</button>
                        </section>
                    </header>
                    <main className="flex flex-1 min-h-0">
                        <MainNavbar/>
                        <Outlet/>
                    </main>
                </section>
            }
        </PageLayout>
    )
}

export default AdminPanel;