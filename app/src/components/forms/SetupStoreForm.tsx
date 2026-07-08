import { useState, type FC } from "react";
import BasicInput from "../inputs/BasicInput";
import type { Result } from "../../layouts/FormLayout";
import FormLayout from "../../layouts/FormLayout";
import { faCamera, faCircleArrowRight, faFile, faHeading, faStore} from "@fortawesome/free-solid-svg-icons";
import AreaInput from "../inputs/AreaInput";
import FileInput from "../inputs/FileInput";


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
        if(errors && Object.keys(errors).length == 6) {
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
            <section className="flex flex-col lg:flex-row items-center justify-around">
                <FileInput
                    name="storeIcon"
                    title="* Store icon"
                    mediaType="image/"
                    placeholder="Max 20 MB"
                    icon={faCamera}
                    maxFilesCount={1}
                    imgClasses="w-50"
                    maxSizeMb={20}
                    required={false}
                    onErrorChange={(name, error) => setErrors((prev) => ({...prev, [name]:error}))}
                />
                <FileInput
                    name="storeBanner"
                    title="* Store banner"
                    mediaType="image/"
                    placeholder="Max 20 MB"
                    icon={faCamera}
                    maxFilesCount={1}
                    imgClasses="w-50 max-w-100"
                    maxSizeMb={20}
                    required={false}
                    onErrorChange={(name, error) => setErrors((prev) => ({...prev, [name]:error}))}
                />
            </section>
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