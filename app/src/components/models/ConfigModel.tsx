import { faPen, faStore, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FC } from "react"




export type ConfigTypeModel = {
    id:number,
    storeName:string,
    storeDescription:string,
    mainPageTitle:string,
    mainPageSubtitle:string,
    onUpdate?:(model : ConfigTypeModel) => Promise<void>,
    onUpload?:() => Promise<void>
}


const ConfigModel : FC<ConfigTypeModel> = ({id, storeName, storeDescription, mainPageTitle, mainPageSubtitle, onUpdate, onUpload}) => {
    return (
        <section className="p-4 shadow-lg shadow-black/40 rounded-md flex flex-col justify-start items-start gap-y-3 mt-10 m-2 max-w-150">
            <section className="flex flex-col items-center w-full mb-5 text-center">
                <FontAwesomeIcon icon={faStore} className="text-6xl text-indigo-600"/>
                <h1 className="text-5xl font-bold text-zinc-700 my-2">Configuration</h1>
            </section>
            <h2 className="text-4xl font-bold text-zinc-700">Store Title</h2>
            <p className="text-xl font-bold text-zinc-700">{storeName}</p>
            <h2 className="text-4xl font-bold text-zinc-700">Store Description</h2>
            <p className="text-xl font-bold text-zinc-700 break-all">{storeDescription}</p>
            <h2 className="text-4xl font-bold text-zinc-700">Store main page title</h2>
            <p className="text-xl font-bold text-zinc-700">{mainPageTitle}</p>
            <h2 className="text-4xl font-bold text-zinc-700">Store main page subtitle</h2>
            <p className="text-xl font-bold text-zinc-700">{mainPageSubtitle}</p>
            <section className="flex flex-col lg:flex-row gap-3 mt-5">
                <button onClick={() => onUpdate({id, storeName, storeDescription, mainPageTitle, mainPageSubtitle})} className="primary-btn"><FontAwesomeIcon icon={faPen}/> Edit config</button>
                <button onClick={() => onUpload()} className="primary-btn"><FontAwesomeIcon icon={faUpload}/> Upload logo, banner</button>
            </section>
        </section>
    )
}

export default ConfigModel;