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
    type?:string
    onErrorChange?:(name : string, errorAppear : boolean) => void;
    icon?:IconDefinition,
    required?:boolean
};

const BasicInput: FC<Props> = ({
    name,
    title,
    placeholder,
    regexp = [],
    errorMessages = [],
    onErrorChange,
    type = "text",
    icon,
    required = false,
}) => {

    useEffect(() => {
        if(required) {
            validate("")
        }
    }, [required])
    const inputRef = useRef<HTMLInputElement>(null);
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
        className={`${errorMessage ? "border-red-600" : "border-gray-300"} flex items-center bg-zinc-200 p-2 rounded-lg border-3 focus-within:border-indigo-500 transition-colors ease-in-out duration-200`}
        >

        {
            icon && 
            <FontAwesomeIcon
                icon={icon}
                className="text-2xl p-3 text-zinc-500 font-bold"
            />
        }

        <section className="flex flex-col">
            <p className="font-bold text-zinc-500 text-lg">{title}</p>

            <input
                ref={inputRef}
                placeholder={placeholder}
                name={name}
                type={type}
                id={name}
                className="placeholder:text-gray-400 rounded-lg focus:outline-none focus:ring-0 py-1 font-bold text-xl"
                onChange={(e) => validate(e.target.value)}
            />
        </section>
        </label>

        {errorMessage && (
            <p className="text-red-600 font-bold text-xl py-1 pl-1">{errorMessage && <FontAwesomeIcon icon={faCircleExclamation} className="pr-1"/>}{errorMessage}</p>
        )}
    </section>
    );
};

export default BasicInput;
