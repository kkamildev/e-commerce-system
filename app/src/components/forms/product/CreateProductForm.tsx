import { useState, type FC } from "react";
import BasicInput from "../../inputs/BasicInput";
import type { Result } from "../../../layouts/FormLayout";
import FormLayout from "../../../layouts/FormLayout";
import {faFile, faHeading, faPen, faPlus, faStore} from "@fortawesome/free-solid-svg-icons";
import AreaInput from "../../inputs/AreaInput";
import { faFileArchive } from "@fortawesome/free-regular-svg-icons";
import SelectInput from "../../inputs/SelectInput";


type Props = {

    onSubmit:(formData : FormData) => Promise<Result>,
}


const CreateProductForm : FC<Props> = ({onSubmit}) => {

    const [errors, setErrors] = useState<any>({
        "description":false
    });
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
        <FormLayout onSubmit={submit} pending={pending} result={result} title="Create new Product" submitText="Finish" submitIcon={faPlus}>
            <section className="flex flex-col lg:flex-row">

                <section>
                    <p className="font-bold text-zinc-800 text-2xl text-center mt-5">Product basic info</p>
                    <BasicInput name="fullName" title="Product full name" placeholder="Unique product name"
                        regexp={[
                            /^.{1,}$/,
                            /^.{0,50}$/,
                            /^[^\s].*[^\s]$/
                        ]}
                        errorMessages={[
                            "Too short",
                            "Max 50 characters",
                            "Invalid spaces"
                        ]}
                        icon={faHeading}
                        onErrorChange={(name, error) => setErrors((prev) => ({ ...prev, [name]: error }))}
                        required={required}
                    />
                    <AreaInput name="description" title="Product full name *" placeholder="Product description"
                        regexp={[
                            /^.{0,400}$/,
                        ]}
                        errorMessages={[
                            "Max 400 characters",
                        ]}
                        icon={faFileArchive}
                        onErrorChange={(name, error) => setErrors((prev) => ({ ...prev, [name]: error }))}
                        required={false}
                    />
                </section>
                <section>
                    <p className="font-bold text-zinc-800 text-2xl text-center mt-5">Category and delivery</p>
                    <AreaInput name="deliveryNote" title="Delivery note *" placeholder="Delivery note for buyers"
                        regexp={[
                            /^.{0,100}$/,
                        ]}
                        errorMessages={[
                            "Max 100 characters",
                        ]}
                        icon={faFile}
                        onErrorChange={(name, error) => setErrors((prev) => ({ ...prev, [name]: error }))}
                        required={false}
                    />
                    <SelectInput name="categoryString" title="Category" placeholder="Product category"
                        icon={faFile}
                        onErrorChange={(name, error) => setErrors((prev) => ({ ...prev, [name]: error }))}
                        required={false} options={[]}/>
                </section>
            </section>
            
        </FormLayout>
    )
}

export default CreateProductForm;