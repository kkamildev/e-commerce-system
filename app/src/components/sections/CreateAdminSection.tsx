import { useState, type FC } from "react";
import AdminRegisterForm from "../forms/user/AdminRegisterForm";
import type { Result } from "../../layouts/FormLayout";
import SetupStoreForm from "../forms/config/SetupStoreForm";
import BaseConfirmation from "../confirmations/BaseConfirmation";
import { request } from "../../utils/request";


type Props = {
    onCreate:() => Promise<void>
}

const CreateAdminSection : FC<Props> = ({onCreate}) => {

    const [formData, setFormData] = useState<FormData[]>([]);


    const createAdminAndConfig = async () : Promise<Result> => {

        let okResultsCount = 0;
        let errorMessage = "";
        const adminCreationResult = await request("POST", "/api/users/admin", {},
            {
                username:formData[0].get("username"),
                email:formData[0].get("email"),
                password:formData[0].get("password")
            }
        );
        if(adminCreationResult.ok) okResultsCount++; else errorMessage = adminCreationResult.message
        const configCreationResult = await request("POST", "/api/config", {},
            {
                storeName:formData[1].get("storeName"),
                storeDescription:formData[1].get("storeDescription"),
                mainPageTitle:formData[1].get("mainPageTitle"),
                mainPageSubtitle:formData[1].get("mainPageSubtitle")
            }
        );
        if(configCreationResult.ok) okResultsCount++; else errorMessage = adminCreationResult.message

        if(okResultsCount == 2) {
            onCreate();
            return {ok:true, serverError:false, message:"Configuration successfully created"}
        } else {
            return {ok:false, serverError:false, message:errorMessage}
        }
    }

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

                        <BaseConfirmation acceptContent="Finish"
                            onAccept={async () => {
                                const result = await createAdminAndConfig();
                                return result;
                            }} >
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
                            </section>
                        </BaseConfirmation>
                    </>
                }
            </section>
            <p className="text-xl font-bold text-zinc-700 my-5">&copy; Kkamildev</p>
        </section>
    )
}

export default CreateAdminSection;