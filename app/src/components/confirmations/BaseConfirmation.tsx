import { useState, type FC, type ReactNode } from "react";
import type { Result } from "../../layouts/FormLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircleNotch, faWarning, faXmark } from "@fortawesome/free-solid-svg-icons";



type Props = {
    children:ReactNode,
    acceptContent?:string,
    denyContent?:string,
    onAccept?:() => Promise<Result>,
    onDeny?:() => Promise<Result>,
}

const BaseConfirmation : FC<Props> = ({children, onAccept, onDeny, acceptContent = "Accept", denyContent = "Deny"}) => {
    const [pending, setPending] = useState<boolean>();
    const [result, setResult] = useState<Result>();

    const accept = async () => {
        setPending(true);
        // logic
        const result : Result = await onAccept();
        setResult(result);
        setPending(false);
    }

    const deny = async () => {
        setPending(true);
        // logic
        const result : Result = await onDeny();
        setResult(result);
        setPending(false);
    }

    return (
        <section className="flex flex-col items-center p-2 rounded-md border-gray-400 border-6">
            {children}
            <section className="flex flex-col lg:flex-row gap-5 justify-center items-center">
                {
                    onAccept && (!pending ? <button onClick={accept} className="accept-btn my-5 mx-5 text-xl"><FontAwesomeIcon icon={faCheck}/> {acceptContent}</button>
                        :
                         <button className="accept-btn my-5 mx-5 text-xl cursor-not-allowed!"><section className="animate-spin"><FontAwesomeIcon icon={faCircleNotch}/></section></button>
                    )
                }
                {
                    onDeny && (!pending ? <button onClick={deny} className="deny-btn my-5 mx-5 text-xl"><FontAwesomeIcon icon={faXmark}/> {denyContent}</button>
                        :
                         <button className="deny-btn my-5 mx-5 text-xl cursor-not-allowed!"><section className="animate-spin"><FontAwesomeIcon icon={faCircleNotch}/></section></button>
                    )
                }
            </section>
            {
                result &&
                <section className="flex flex-col mt-2">
                    {!result.ok &&
                        <section className="error-label">
                            <FontAwesomeIcon icon={faWarning}/> {result.message}
                        </section>
                    }
                </section>
            }
        </section>
    )
}

export default BaseConfirmation;