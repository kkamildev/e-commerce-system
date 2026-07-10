import { useState, useRef, type FC, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {type IconDefinition } from "@fortawesome/free-regular-svg-icons";
import {faCircleExclamation} from "@fortawesome/free-solid-svg-icons"

type Props = {
    name: string;
    title: string;
    placeholder: string;
    regexp?: RegExp[];
    errorMessages?: string[];
    onErrorChange?:(name : string, errorAppear : boolean) => void;
    icon?:IconDefinition,
    required?:boolean,
    defaultValue?:string
};

const AreaInput: FC<Props> = ({
    name,
    title,
    placeholder,
    regexp = [],
    errorMessages = [],
    onErrorChange,
    icon,
    required = false,
    defaultValue = ""
}) => {

    useEffect(() => {
        if(required) {
            validate(inputRef.current.value || "")
        }
    }, [required])

    useEffect(() => {
        inputRef.current.value = defaultValue;
        if(defaultValue) {
            
            validate(defaultValue);
        }
    }, [defaultValue])


    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [errorMessage, setErrorMessage] = useState("");
    
    function validate(value: string) {
        for (let i = 0; i < regexp.length; i++) {
            if (!regexp[i].test(value)) {
                setErrorMessage(errorMessages[i] || "Invalid input");
                onErrorChange && onErrorChange(name, true)
                return;
            }
        }
        onErrorChange && onErrorChange(name, false)
        setErrorMessage("");
    }

    return (
    <section className="flex flex-col m-3">
        <label
        htmlFor={name}
        className={`${errorMessage ? "border-red-600" : "border-gray-300"} flex items-start bg-zinc-200 p-2 rounded-lg border-3 focus-within:border-indigo-500 transition-colors ease-in-out duration-200`}
        >

        {
            icon && 
            <FontAwesomeIcon
                icon={icon}
                className="text-xl lg:text-2xl p-3 text-zinc-500 font-bold"
            />
        }

        <section className="flex flex-col">
            <p className="font-bold text-zinc-500 text-lg">{title}</p>


            <textarea ref={inputRef} name={name} id={name} placeholder={placeholder} onChange={(e) => validate(e.target.value)} className="placeholder:text-gray-400 h-50 resize-none rounded-lg focus:outline-none focus:ring-0 py-1 font-bold text-lg lg:text-xl"></textarea>
        </section>
        </label>
        <p className={`${errorMessage || "invisible"} text-red-600 font-bold text-lg lg:text-xl pt-1 pl-1`}>{errorMessage && <FontAwesomeIcon icon={faCircleExclamation} className="pr-1"/>}{errorMessage || "Error message here"}</p>
    </section>
    );
};

export default AreaInput;
