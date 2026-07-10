import type { FC } from "react";
import useWarningStore from "../../stores/useWarningStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";


type Props = {

}

const WarningNotification : FC<Props> = ({}) => {

    const warningStore = useWarningStore();

    return (
        warningStore.active &&
        <section className="fixed z-50 flex justify-center items-center w-full h-full bg-black/50">
            <section className="bg-white p-5 rounded-xl min-w-0 lg:min-w-125">
                <h1 className="font-bold text-center mb-10 text-2xl lg:text-3xl">{warningStore.title}</h1>
                <section className="flex flex-col lg:flex-row gap-5 justify-center">
                    <button onClick={warningStore.accept} className="accept-btn"><FontAwesomeIcon icon={faCheck}/> Yes</button>
                    <button onClick={warningStore.deny} className="deny-btn"><FontAwesomeIcon icon={faXmark}/> No</button>
                </section>
            </section>
        </section>
    )
}

export default WarningNotification;