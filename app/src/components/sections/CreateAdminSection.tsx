import { useState, type FC } from "react";
import AdminRegisterForm from "../forms/AdminRegisterForm";
import type { Result } from "../../layouts/FormLayout";
import SetupStoreForm from "../forms/SetupStoreForm";
import BaseConfirmation from "../confirmations/BaseConfirmation";


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
                {
                    formData.length == 2 && <>
                        <h1 className="text-6xl font-bold text-zinc-800 my-2 text-center">Check data</h1>
                        <h2 className="text-4xl font-bold text-zinc-800 mb-5 text-center">And finish configuration</h2>

                        <BaseConfirmation acceptContent="Finish" onAccept={async () => ({ok:false, message:"Unexpected error appeared", serverError:false})} >
                            <section className="flex flex-col lg:flex-row justify-center">
                                <section className="flex flex-col m-4 font-bold w-75">
                                    <h3 className="text-3xl font-bold text-zinc-800 mb-2">Admin information</h3>
                                    <p className="text-zinc-700 text-xl mt-3">Username: {formData[0].get("username").toString()}</p>
                                    <p className="text-zinc-700 text-xl mt-3">Email: {formData[0].get("email").toString()}</p>
                                    <p className="text-zinc-700 text-xl mt-3">Password: {formData[0].get("password").toString().replaceAll(/./g, "*")}</p>
                                </section>
                                <section className="flex flex-col m-4 font-bold w-75">
                                    <h3 className="text-3xl text-zinc-800 mb-2">Store config</h3>
                                    <p className="text-zinc-700 text-xl mt-3">Store name: {formData[1].get("storeName").toString()}</p>
                                    <p className="text-zinc-700 text-xl mt-3">Store description: {formData[1].get("storeDescription").toString()}</p>
                                    <p className="text-zinc-700 text-xl mt-3">Main page title: {formData[1].get("mainPageTitle").toString()}</p>
                                    <p className="text-zinc-700 text-xl mt-3">Main page subtitle: {formData[1].get("mainPageSubtitle").toString()}</p>
                                </section>
                                <section className="flex flex-col m-4 font-bold w-75">
                                    <h3 className="text-3xl text-zinc-800 mb-2">Store Images</h3>
                                    <p className="text-zinc-700 text-xl mt-3">Store logo: {formData[1].has("storeIcon") ? "New" : "Default"}</p>
                                    <p className="text-zinc-700 text-xl mt-3">Store banner: {formData[1].has("storeBanner") ? "New" : "Default"}</p>
                                </section>
                            </section>
                        </BaseConfirmation>
                    </>
                }
            </section>
            <p className="text-xl font-bold text-zinc-700 my-5">&copy; Kkamildev</p>
        </section>
    )
}

export default CreateAdminSecion;