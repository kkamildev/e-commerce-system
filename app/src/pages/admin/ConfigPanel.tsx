import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, type FC } from "react";
import { useAdminPanelRequest } from "../../utils/useAdminPanelRequest";
import type { ConfigTypeModel } from "../../components/models/ConfigModel";


type Props = {

}

const ConfigPage : FC<Props> = ({}) => {
    const adminRequest = useAdminPanelRequest();

    const [form, setForm] = useState<string>(null);
    const [config, setConfig] = useState<ConfigTypeModel>(null);
    

    const getConfig = async () => {
        const result = await adminRequest("GET", "/api/config", {timeout:5000});
        if(result.ok) {
            setConfig(result.data.config);
        }
    }

    return (
        <section className="overflow-y-scroll h-full pb-10 flex-1 min-h-0">
            <section className={`${form && "hidden"} m-5 mb-10`}>
                <section className="flex flex-col-reverse lg:flex-row justify-between gap-y-4">
                    <section className="flex flex-col">
                        <h1 className="font-bold text-3xl text-zinc-800">Store Config</h1>
                    </section>
                    <section>
                        <button onClick={getConfig} className="primary-btn"><FontAwesomeIcon icon={faRefresh}/> Refresh</button>
                    </section>
                </section>
                <section className="flex justify-center items-center">

                </section>
            </section>
        </section>
    )
}

export default ConfigPage;