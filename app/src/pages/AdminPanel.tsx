import type { FC } from "react";

import PageLayout from "../layouts/PageLayout";
import BasicInput from "../components/inputs/BasicInput";
import { faHome } from "@fortawesome/free-regular-svg-icons";


type Props = {

}

const AdminPanel : FC<Props> = ({}) => {
    return(
        <PageLayout title="Admin Panel">
            <section className="flex flex-col items-center justify-center m-4">
                <img src="/api/config/logo" alt="" className="w-25 mt-5" />
                <h1 className="text-6xl font-bold text-zinc-800 my-2">Welcome to</h1>
                <h2 className="text-4xl font-bold text-zinc-800">E-commerce application</h2>

                <BasicInput name="input" title="Test" placeholder="Name..."
                    regexp={[
                        /^[a-z]{1,1}$/
                    ]}
                    errorMessages={[
                        "Odd input"
                    ]}
                    icon={faHome}
                />
            </section>
        </PageLayout>
    )
}

export default AdminPanel;