import { faCheck, faCircleNotch, faWarning, type IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FC, ReactNode } from "react";


type Props = {
    onSubmit:(e : React.SubmitEvent<HTMLFormElement>) => Promise<void>,
    title?:string,
    children:ReactNode,
    pending:boolean,
    result?:Result,
    submitText?:string,
    submitIcon?:IconDefinition,
}

export type Result = {
    ok:boolean,
    serverError:boolean,
    message:string
};

const FormLayout : FC<Props> = ({onSubmit, title, children, pending, result, submitIcon, submitText}) => {

    
    return (
        <form onSubmit={onSubmit} className="m-3 p-2 border-6 border-gray-400 rounded-lg shadow-xl shadow-black/35">
            {title && <p className="text-3xl text-zinc-600 text-center font-bold my-5">{title}</p>}
            <section className="flex flex-col">
                {children}
            </section>
            <section className="flex flex-col">
                {
                    !pending ?
                    <button type="submit" className="primary-btn my-5 mx-5 text-xl">{submitIcon && <FontAwesomeIcon icon={submitIcon}/>} {submitText}</button>
                    :
                    <button type="button" className="primary-btn my-5 mx-5 text-xl cursor-not-allowed!"><section className="animate-spin"><FontAwesomeIcon icon={faCircleNotch}/></section></button>
                }
            </section>
            {
                result &&
                <section className="flex flex-col mt-2">
                    {!result.ok ?
                    <section className="error-label">
                        <FontAwesomeIcon icon={faWarning}/> {result.message}
                    </section>
                    :
                    <section className="success-label">
                        <FontAwesomeIcon icon={faCheck}/> {result.message}
                    </section>
                    }
                </section>
            }
        </form>
    )
}

export default FormLayout;