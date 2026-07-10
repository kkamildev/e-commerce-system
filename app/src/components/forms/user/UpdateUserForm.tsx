import { useState, type FC } from "react";
import BasicInput from "../../inputs/BasicInput";
import type { Result } from "../../../layouts/FormLayout";
import FormLayout from "../../../layouts/FormLayout";
import { faAddressBook, faEnvelope, faPen, faUser} from "@fortawesome/free-solid-svg-icons";
import SelectInput from "../../inputs/SelectInput";
import type { UserModelType } from "../../models/UserModel";


type Props = {

    onSubmit:(formData : FormData) => Promise<Result>,
    model:UserModelType
}


const UpdateUserForm : FC<Props> = ({onSubmit, model}) => {

    const [errors, setErrors] = useState<any>();
    const [pending, setPending] = useState<boolean>();
    const [result, setResult] = useState<Result>();
    const [required, setRequired] = useState<boolean>(false);

    const submit = async (e : React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(errors && Object.keys(errors).length == 3) {
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
        <FormLayout onSubmit={submit} pending={pending} result={result} title="Update User" submitText="Update" submitIcon={faPen}>
            <section className="flex flex-col lg:flex-row justify-center">
                <BasicInput name="username" title="Username" placeholder="e.g. Jan Kowalski" defaultValue={model.username}
                    regexp={[
                        /^.{3,}$/,
                        /^.{0,50}$/,
                        /^[^\s].*[^\s]$/
                    ]}
                    errorMessages={[
                        "Too short",
                        "Too long",
                        "Invalid spaces"
                    ]}
                    icon={faUser}
                    onErrorChange={(name, error) => setErrors((prev) => ({...prev, [name]:error}))}
                    required={required}
                />
            </section>
            <section className="flex flex-col-reverse lg:flex-row justify-center">
                <BasicInput name="email" title="Email" placeholder="e.g. kowalski@gmail.com" defaultValue={model.email}
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
            </section>
            <section className="flex flex-col lg:flex-row justify-center">
                <SelectInput name="role" title="Select role" placeholder="User role" defaultValue={model.role}
                    icon={faAddressBook}
                    onErrorChange={(name, error) => setErrors((prev) => ({...prev, [name]:error}))}
                    required={required}
                    options={[
                        {title:"Admin", value:"Admin"},
                        {title:"Product Manager", value:"Product_manager"},
                        {title:"Sales Manager", value:"Sales_manager"},
                        {title:"Producer", value:"Producer"}
                    ]}
                />
            </section>
            
        </FormLayout>
    )
}

export default UpdateUserForm;