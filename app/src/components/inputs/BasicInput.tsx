import { useState, useRef, type FC, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {type IconDefinition } from "@fortawesome/free-regular-svg-icons";
import {faCircleExclamation, faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons"

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
            validate(inputRef.current.value || "")
        }
    }, [required])
    const inputRef = useRef<HTMLInputElement>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    
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
                type={passwordVisible ? "text" : type}
                id={name}
                className="placeholder:text-gray-400 rounded-lg focus:outline-none focus:ring-0 py-1 font-bold text-xl"
                onChange={(e) => validate(e.target.value)}
                autoComplete={type == "password" ? "new-password" : "off"}
            />
        </section>
        {
            type == "password" && <button type="button" onClick={() => setPasswordVisible(!passwordVisible)}><FontAwesomeIcon className="text-2xl cursor-pointer text-zinc-500" icon={passwordVisible ? faEyeSlash : faEye}/></button>
        }
        </label>
        <p className={`${errorMessage || "invisible"} text-red-600 font-bold text-xl pt-1 pl-1`}>{errorMessage && <FontAwesomeIcon icon={faCircleExclamation} className="pr-1"/>}{errorMessage || "Error message here"}</p>
    </section>
    );
};

export default BasicInput;
