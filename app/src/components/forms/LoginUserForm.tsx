
import { useState, type FC } from "react";
import BasicInput from "../inputs/BasicInput";
import type { Result } from "../../layouts/FormLayout";
import FormLayout from "../../layouts/FormLayout";
import { faEnvelope, faLock} from "@fortawesome/free-solid-svg-icons";


type Props = {

    onSubmit:(formData : FormData) => Promise<Result>,
}


const LoginUserForm : FC<Props> = ({onSubmit}) => {

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
        <FormLayout onSubmit={submit} pending={pending} result={result} title="Login User" submitText="Login">
            <BasicInput name="email" title="Email" placeholder="e.g. kowalski@gmail.com"
                regexp={[
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    /^.{1,75}$/s
                ]}
                errorMessages={[
                    "Invalid Email",
                    "Too long"
                ]}
                icon={faEnvelope}
                onErrorChange={(name, error) => setErrors((prev) => ({...prev, [name]:error}))}
                required={required}
            />
            <BasicInput name="password" title="Password" placeholder="e.g. 123456"
                regexp={[
                    /^.{1,}$/,
                ]}
                errorMessages={[
                    "Required"
                ]}
                icon={faLock}
                onErrorChange={(name, error) => setErrors((prev) => ({...prev, [name]:error}))}
                required={required}
                type="password"
            />
        </FormLayout>
    )
}

export default LoginUserForm;