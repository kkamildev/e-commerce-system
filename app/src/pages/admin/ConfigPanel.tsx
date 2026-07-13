import { faCircleLeft, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, type FC } from "react";
import { useAdminPanelRequest } from "../../utils/useAdminPanelRequest";
import type { ConfigTypeModel } from "../../components/models/ConfigModel";
import ConfigModel from "../../components/models/ConfigModel";
import UpdateConfigForm from "../../components/forms/config/UpdateConfigForm";
import UploadConfigFilesForm from "../../components/forms/config/UploadConfigFilesForm";
import type { FullResult } from "../../utils/request";


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

    const updateConfig = async (formData : FormData) => {
        const result = await adminRequest("PUT", "/api/config", {},
            {
                storeName:formData.get("storeName"),
                storeDescription:formData.get("storeDescription"),
                mainPageTitle:formData.get("storeMainPageTitle"),
                mainPageSubtitle:formData.get("storeMainPageSubtitle")
            })
        if(result.ok) {
            setForm(null);
            return {ok:true, message:"Success", serverError:false}
        } else {
            return {ok:false, message:result.message, serverError:result.serverError}
        }
    }

    const uploadFiles = async (formData : FormData) => {
        const results : FullResult[] = [];
        if(formData.has("logo")) {
            const uploadLogoFormData = new FormData();

            uploadLogoFormData.append("file", formData.get("logo"));
    
            const uploadLogoResult = await adminRequest("POST", "/api/config/logo", {}, uploadLogoFormData);
            if(uploadLogoResult.ok) {
                results.push(uploadLogoResult);
            }
        }
        if(formData.has("banner")) {
            const uploadBannerFormData = new FormData();

            uploadBannerFormData.append("file", formData.get("banner"));
    
            const uploadBannerResult = await adminRequest("POST", "/api/config/banner", {}, uploadBannerFormData);
            if(uploadBannerResult.ok) {
                results.push(uploadBannerResult)
            }
        }
        if(results.length == 2) {
            setForm(null);
            return {ok:true, message:"Upload success", serverError:false}
        } else {
            return {ok:false, message:"Something went wrong", serverError:false}
        }
    }

    useEffect(() => {
        if(!form) {
            getConfig()
        }
    }, [form])

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
                    {
                        config &&
                        <ConfigModel id={config.id} storeName={config.storeName} storeDescription={config.storeDescription}
                        mainPageTitle={config.mainPageTitle} mainPageSubtitle={config.mainPageSubtitle}
                            onUpdate={async () => {
                                setForm("update")
                            }}
                            onUpload={async () => {
                                setForm("upload")
                            }}
                        />
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
                            form == "update" && 
                            <UpdateConfigForm model={config} onSubmit={async (formdata) => {
                                return await updateConfig(formdata)
                            }}/>
                        }
                        {
                            form == "upload" && 
                            <UploadConfigFilesForm onSubmit={async (formdata) => {
                                return await uploadFiles(formdata)
                            }}/>
                        }
                    </section>
                </section>
            }
        </section>
    )
}

export default ConfigPage;