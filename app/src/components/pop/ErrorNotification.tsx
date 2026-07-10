import type { FC } from "react";
import useErrorStore from "../../stores/useErrorStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning, faXmark } from "@fortawesome/free-solid-svg-icons";


type Props = {

}


const ErrorNotification : FC<Props> = ({}) => {
    const error = useErrorStore();


    return (
        error.errorMessage &&
        <section className="fixed top-40 lg:top-20 w-full flex justify-center pointer-events-none z-100">
            <section className="bg-red-600 border-4 rounded-md border-red-700 text-white font-bold p-2 text-xl flex justify-between items-center gap-x-5 max-w-[50%] pointer-events-auto">
                <section className="w-full">
                    <FontAwesomeIcon icon={faWarning}/> {error.errorMessage}
                </section>
                <FontAwesomeIcon icon={faXmark} onClick={() => error.dismissError()} className="cursor-pointer hover:bg-red-800 p-1 rounded-xl transition-colors duration-150 ease-in-out"/>
            </section>
        </section>
    )
}

export default ErrorNotification;