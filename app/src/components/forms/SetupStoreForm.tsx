import { useState, type FC } from "react";
import BasicInput from "../inputs/BasicInput";
import type { Result } from "../../layouts/FormLayout";
import FormLayout from "../../layouts/FormLayout";
import { faCircleArrowRight, faFile, faHeading, faStore} from "@fortawesome/free-solid-svg-icons";
import AreaInput from "../inputs/AreaInput";


type Props = {

    onSubmit:(formData : FormData) => Promise<Result>,
}


const SetupStoreForm : FC<Props> = ({onSubmit}) => {

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
                setPending(false);
                if(result.ok) {
                    e.target.reset();
                }
            }
        } else {
            setRequired(true);
        }
    }

    return (
        <FormLayout onSubmit={submit} pending={pending} result={result} title="Add store config" submitText="Next" submitIcon={faCircleArrowRight}>
            <BasicInput name="storeName" title="Store name" placeholder="e.g. Kowalski Store"
                regexp={[
                    /^.{1,}$/,
                    /^.{0,30}$/,
                    /^[^\s].*[^\s]$/
                ]}
                errorMessages={[
                    "Required",
                    "Too long",
                    "Invalid spaces"
                ]}
                icon={faStore}
                onErrorChange={(name, error) => setErrors((prev) => ({...prev, [name]:error}))}
                required={required}
            />
            <AreaInput name="storeDescription" title="Store description" placeholder="e.g. it is the best store ever"
                regexp={[
                    /^.{1,}$/,
                    /^.{0,30}$/,
                    /^[^\s].*[^\s]$/
                ]}
                errorMessages={[
                    "Required",
                    "Too long",
                    "Invalid spaces"
                ]}
                icon={faFile}
                onErrorChange={(name, error) => setErrors((prev) => ({...prev, [name]:error}))}
                required={required}
            />
            <section className="flex flex-col lg:flex-row items-center w-full justify-center">
                <BasicInput name="mainPageTitle" title="Main page title" placeholder="e.g. Quality items"
                    regexp={[
                        /^.{1,}$/,
                        /^.{0,30}$/,
                        /^[^\s].*[^\s]$/
                    ]}
                    errorMessages={[
                        "Required",
                        "Too long",
                        "Invalid spaces"
                    ]}
                    icon={faHeading}
                    onErrorChange={(name, error) => setErrors((prev) => ({...prev, [name]:error}))}
                    required={required}
                />
                <BasicInput name="mainPageSubtitle" title="Main page subtitle" placeholder="e.g. only in this store"
                    regexp={[
                        /^.{1,}$/,
                        /^.{0,50}$/,
                        /^[^\s].*[^\s]$/
                    ]}
                    errorMessages={[
                        "Required",
                        "Too long",
                        "Invalid spaces"
                    ]}
                    icon={faHeading}
                    onErrorChange={(name, error) => setErrors((prev) => ({...prev, [name]:error}))}
                    required={required}
                />
            </section>
        </FormLayout>
    )
}

export default SetupStoreForm;