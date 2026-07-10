import { useState, type FC } from "react";
import BasicInput from "../../inputs/BasicInput";
import type { Result } from "../../../layouts/FormLayout";
import FormLayout from "../../../layouts/FormLayout";
import {faLock, faPen} from "@fortawesome/free-solid-svg-icons";


type Props = {

    onSubmit:(formData : FormData) => Promise<Result>,
}


const UpdateUserPasswordForm : FC<Props> = ({onSubmit}) => {

    const [errors, setErrors] = useState<any>();
    const [pending, setPending] = useState<boolean>();
    const [result, setResult] = useState<Result>();
    const [required, setRequired] = useState<boolean>(false);

    const submit = async (e : React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(errors && Object.keys(errors).length == 1) {
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
        <FormLayout onSubmit={submit} pending={pending} result={result} title="Update password" submitText="Update" submitIcon={faPen}>
            <BasicInput name="password" title="New password" placeholder="e.g. 123456"
                regexp={[
                    /^.{8,}$/s,
                    /^.{1,72}$/s
                ]}
                errorMessages={[
                    "Min 8 characters",
                    "Too long"
                ]}
                icon={faLock}
                onErrorChange={(name, error) => setErrors((prev) => ({...prev, [name]:error}))}
                required={required}
            />
        </FormLayout>
    )
}

export default UpdateUserPasswordForm;