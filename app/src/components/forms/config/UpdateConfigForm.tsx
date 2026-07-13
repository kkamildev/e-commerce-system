import { useState, type FC } from "react";
import BasicInput from "../../inputs/BasicInput";
import type { Result } from "../../../layouts/FormLayout";
import FormLayout from "../../../layouts/FormLayout";
import {faFile, faHeading, faPen, faStore} from "@fortawesome/free-solid-svg-icons";
import type { ConfigTypeModel } from "../../models/ConfigModel";
import AreaInput from "../../inputs/AreaInput";


type Props = {

    onSubmit:(formData : FormData) => Promise<Result>,
    model:ConfigTypeModel
}


const UpdateConfigForm : FC<Props> = ({onSubmit, model}) => {

    const [errors, setErrors] = useState<any>();
    const [pending, setPending] = useState<boolean>();
    const [result, setResult] = useState<Result>();
    const [required, setRequired] = useState<boolean>(false);

    const submit = async (e : React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(errors && Object.keys(errors).length == 4) {
            if(Object.values(errors).every((error) => !error)) {
                setPending(true);
                // logic
                const formData = new FormData(e.target);
                const result : Result = await onSubmit(formData);
                setResult(result);
                if(result.ok) {
                    e.target.reset();
                }
                setPending(false);
            }
        } else {
            setRequired(true);
        }
    }

    return (
        <FormLayout onSubmit={submit} pending={pending} result={result} title="Update Config" submitText="Update" submitIcon={faPen}>
            <BasicInput name="storeName" title="Store title" placeholder="max 30 characters" defaultValue={model.storeName}
                regexp={[
                    /^.{1,}$/,
                    /^.{0,30}$/,
                    /^[^\s].*[^\s]$/
                ]}
                errorMessages={[
                    "Too short",
                    "Too long",
                    "Invalid spaces"
                ]}
                icon={faStore}
                onErrorChange={(name, error) => setErrors((prev) => ({...prev, [name]:error}))}
                required={required}
            />
            <AreaInput name="storeDescription" title="Store Description" placeholder="max 255 characters" defaultValue={model.storeDescription}
                regexp={[
                    /^.{1,}$/,
                    /^.{0,255}$/,
                    /^[^\s].*[^\s]$/
                ]}
                errorMessages={[
                    "Too short",
                    "Too long",
                    "Invalid spaces"
                ]}
                icon={faFile}
                onErrorChange={(name, error) => setErrors((prev) => ({...prev, [name]:error}))}
                required={required}
            />
            <BasicInput name="storeMainPageTitle" title="Store main page title" placeholder="max 30 characters" defaultValue={model.mainPageTitle}
                regexp={[
                    /^.{1,}$/,
                    /^.{0,30}$/,
                    /^[^\s].*[^\s]$/
                ]}
                errorMessages={[
                    "Too short",
                    "Too long",
                    "Invalid spaces"
                ]}
                icon={faHeading}
                onErrorChange={(name, error) => setErrors((prev) => ({...prev, [name]:error}))}
                required={required}
            />
            <BasicInput name="storeMainPageSubtitle" title="Store main page subtitle" placeholder="max 50 characters" defaultValue={model.mainPageSubtitle}
                regexp={[
                    /^.{1,}$/,
                    /^.{0,50}$/,
                    /^[^\s].*[^\s]$/
                ]}
                errorMessages={[
                    "Too short",
                    "Too long",
                    "Invalid spaces"
                ]}
                icon={faHeading}
                onErrorChange={(name, error) => setErrors((prev) => ({...prev, [name]:error}))}
                required={required}
            />
            
        </FormLayout>
    )
}

export default UpdateConfigForm;