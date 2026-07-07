import type { FC } from "react";

import PageLayout from "../layouts/PageLayout";
import AdminRegisterForm from "../components/forms/AdminRegisterForm";
import type { Result } from "../layouts/FormLayout";


type Props = {

}

const AdminPanel : FC<Props> = ({}) => {
    return(
        <PageLayout title="Admin Panel">
            <section className="flex flex-col items-center justify-center m-4">
                <img src="/api/config/logo" alt="E-commerce store logo" className="w-25 mt-5" />
                <h1 className="text-6xl font-bold text-zinc-800 my-2">Welcome to</h1>
                <h2 className="text-4xl font-bold text-zinc-800 mb-5">E-commerce application</h2>

                <AdminRegisterForm
                    onSubmit={async (formdata) => {
                        const result : Result = {ok:true, serverError:false, message:"Success"};
                        return result;
                    }}
                />

            </section>
        </PageLayout>
    )
}

export default AdminPanel;