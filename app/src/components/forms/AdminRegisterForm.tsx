import { useState, type FC } from "react";
import BasicInput from "../inputs/BasicInput";
import { faCreditCard, faHome} from "@fortawesome/free-regular-svg-icons";
import type { Result } from "../../layouts/FormLayout";
import FormLayout from "../../layouts/FormLayout";


type Props = {

    onSubmit:(formData : FormData) => Promise<Result>,
}


const AdminRegisterForm : FC<Props> = ({onSubmit}) => {

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
        <FormLayout onSubmit={submit} pending={pending} result={result} title="Register" submitText="Register" submitIcon={faCreditCard}>
            <BasicInput name="input" title="Test" placeholder="Name..."
                regexp={[
                    /^[a-z]{1,1}$/
                ]}
                errorMessages={[
                    "Odd input"
                ]}
                icon={faHome}
                onErrorChange={(name, error) => setErrors((prev) => ({...prev, [name]:error}))}
                required={required}
            />
            <BasicInput name="input2" title="Test" placeholder="Name..."
                regexp={[
                    /^[a-z]{1,1}$/
                ]}
                errorMessages={[
                    "Odd input"
                ]}
                icon={faHome}
                onErrorChange={(name, error) => setErrors((prev) => ({...prev, [name]:error}))}
                required={required}
            />
        </FormLayout>
    )
}

export default AdminRegisterForm;