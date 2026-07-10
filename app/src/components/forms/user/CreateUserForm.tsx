import { useState, type FC } from "react";
import BasicInput from "../../inputs/BasicInput";
import type { Result } from "../../../layouts/FormLayout";
import FormLayout from "../../../layouts/FormLayout";
import { faAddressBook, faEnvelope, faLock, faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import SelectInput from "../../inputs/SelectInput";


type Props = {

    onSubmit:(formData : FormData) => Promise<Result>,
}


const CreateUserForm : FC<Props> = ({onSubmit}) => {

    const [errors, setErrors] = useState<any>();
    const [pending, setPending] = useState<boolean>();
    const [result, setResult] = useState<Result>();
    const [required, setRequired] = useState<boolean>(false);

    const submit = async (e : React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(errors && Object.keys(errors).length == 5) {
            if(Object.values(errors).every((error) => !error)) {
                setPending(true);
                // logic
                const formData = new FormData(e.target);

                if(formData.get("password") == formData.get("passwordRepeated")){
                    const result : Result = await onSubmit(formData);
                    setResult(result);
                    if(result.ok) {
                        e.target.reset();
                    }
                } else {
                    setResult({ok:false, message:"Passwords are not the same", serverError:false})
                }
                setPending(false);
            }
        } else {
            setRequired(true);
        }
    }

    return (
        <FormLayout onSubmit={submit} pending={pending} result={result} title="Register User" submitText="Register" submitIcon={faUserPlus}>
            <section className="flex flex-col lg:flex-row justify-center">
                <BasicInput name="username" title="Username" placeholder="e.g. Jan Kowalski"
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
                <BasicInput name="password" title="Password" placeholder="e.g. 123456"
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
                    type="password"
                />
            </section>
            <section className="flex flex-col-reverse lg:flex-row justify-center">
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
                <BasicInput name="passwordRepeated" title="Repeat password" placeholder="e.g. 123456"
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
                    type="password"
                />
            </section>
            <section className="flex flex-col lg:flex-row justify-center">
                <SelectInput name="role" title="Select role" placeholder="User role"
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

export default CreateUserForm;