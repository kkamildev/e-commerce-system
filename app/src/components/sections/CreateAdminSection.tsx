import { useState, type FC } from "react";
import AdminRegisterForm from "../forms/AdminRegisterForm";
import type { Result } from "../../layouts/FormLayout";
import SetupStoreForm from "../forms/SetupStoreForm";


type Props = {

}

const CreateAdminSecion : FC<Props> = ({}) => {

    const [formData, setFormData] = useState<FormData[]>([]);

    return (
        <section className="flex flex-col items-center justify-between h-full">
            <section className="flex flex-col items-center m-4">
                <img src="/api/config/logo" alt="E-commerce store logo" className="w-25 mt-5" />
                {
                    formData.length == 0 && <>
                        <h1 className="text-6xl font-bold text-zinc-800 my-2 text-center">Welcome to</h1>
                        <h2 className="text-4xl font-bold text-zinc-800 mb-5 text-center">E-commerce application</h2>
        
                        <AdminRegisterForm
                            onSubmit={async (formdata) => {
                                setFormData((prev) => [...prev, formdata])
                                const result : Result = {ok:true, serverError:false, message:"Success"};
                                return result;
                            }}
                        />
                    </>
                }
                {
                    formData.length == 1 && <>
                        <h1 className="text-6xl font-bold text-zinc-800 my-2 text-center">Welcome {formData[0].get("username").toString()}</h1>
                        <h2 className="text-4xl font-bold text-zinc-800 mb-5 text-center">Setup your e-commerce shop</h2>

                        <SetupStoreForm
                            onSubmit={async (formdata) => {
                                setFormData((prev) => [...prev, formdata])
                                const result : Result = {ok:true, serverError:false, message:"Success"};
                                return result;
                            }}
                        />
                    </>
                }
            </section>
            <p className="text-xl font-bold text-zinc-700 my-5">&copy; Kkamildev</p>
        </section>
    )
}

export default CreateAdminSecion;