import { useEffect, type FC } from "react"
import LoginUserForm from "../forms/user/LoginUserForm";
import type { Result } from "../../layouts/FormLayout";
import { request } from "../../utils/request";
import useUserStore from "../../stores/useUserStore";



type Props = {
    
}


const LoginUserSection : FC<Props> = ({}) => {

    const onLogin = useUserStore((store) => store.setUser);

    const autoLoginUser = async () => {
        const result = await request("POST", "/api/users/auto-login", {})
        if(result.ok) {
            onLogin(result.data.user);
        } else {
            onLogin(null);
        }
    }

    useEffect(() => {
        autoLoginUser();
    }, [])

    const loginUser = async (formData : FormData) : Promise<Result> => {


        const result = await request("POST", "/api/users/login", {timeout:5000}, {
            email:formData.get("email"),
            password:formData.get("password")
        });
        if(result.ok) {
            onLogin(result.data.user);
            return {ok:true, serverError:false, message:"Login operation success"}
        } else {
            onLogin(null);
            return {ok:false, serverError:result.serverError, message:result.data.errorMessage || "Error appeared"}
        }
    }

    return (
        <section className="flex flex-col items-center justify-between h-full">
            <section className="flex flex-col items-center m-4">
                <img src="/api/config/logo" alt="E-commerce store logo" className="w-25 mt-5" />
                <h1 className="text-6xl font-bold text-zinc-800 my-2 text-center">E-commerce system</h1>
                <h2 className="text-4xl font-bold text-zinc-800 mb-5 text-center">Login</h2>
                <LoginUserForm
                    onSubmit={async (formdata) => {
                        return await loginUser(formdata);
                    }}
                />
            </section>
            <p className="text-xl font-bold text-zinc-700 my-5">&copy; Kkamildev</p>
        </section>
    )
}

export default LoginUserSection;