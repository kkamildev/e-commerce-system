import { useState, type FC } from "react";
import type { Result } from "../../../layouts/FormLayout";
import FormLayout from "../../../layouts/FormLayout";
import {faFile, faUpload} from "@fortawesome/free-solid-svg-icons";
import FileInput from "../../inputs/FileInput";


type Props = {

    onSubmit:(formData : FormData) => Promise<Result>,
}


const UploadConfigFilesForm : FC<Props> = ({onSubmit}) => {

    const [errors, setErrors] = useState<any>();
    const [pending, setPending] = useState<boolean>();
    const [result, setResult] = useState<Result>();
    const [required, setRequired] = useState<boolean>(false);

    const submit = async (e : React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(errors && Object.keys(errors).length == 2) {
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
        <FormLayout onSubmit={submit} pending={pending} result={result} title="Upload images" submitText="Finish upload" submitIcon={faUpload}>
            <section className="flex flex-col lg:flex-row justify-center items-center gap-6">
                <FileInput name="logo" title="Store logo" placeholder="PNG Max 20MB"
                    icon={faFile}
                    onErrorChange={(name, error) => setErrors((prev) => ({ ...prev, [name]: error }))}
                    required={required}
                    mediaType={"image/png"}
                />
                <img src="/api/config/logo" alt="Actual logo" className="w-50" />
            </section>
            <section className="flex flex-col lg:flex-row justify-center items-center gap-6 mt-10">
                <FileInput name="banner" title="Store banner" placeholder="JPG Max 20MB"
                    icon={faFile}
                    onErrorChange={(name, error) => setErrors((prev) => ({ ...prev, [name]: error }))}
                    required={required}
                    mediaType={"image/jpeg"}
                />
                <img src="/api/config/banner" alt="Actual Banner" className="w-50" />
            </section>
            
        </FormLayout>
    )
}

export default UploadConfigFilesForm;