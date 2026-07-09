

import { useState, useRef, type FC, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {type IconDefinition } from "@fortawesome/free-regular-svg-icons";
import {faCircleExclamation, faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons"


export type Option = {
    title:string,
    value:string
}

type Props = {
    name: string;
    title: string;
    placeholder: string;
    type?:string
    onErrorChange?:(name : string, errorAppear : boolean) => void;
    icon?:IconDefinition,
    required?:boolean,
    options:Option[]
};

const SelectInput: FC<Props> = ({
    name,
    title,
    placeholder,
    onErrorChange,
    type = "text",
    icon,
    required = false,
    options
}) => {

    useEffect(() => {
        if(required) {
            validate(input || "")
        }
    }, [required])
    const inputRef = useRef<HTMLInputElement>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [input, setInput] = useState<string>("");
    const [focus, setFocus] = useState<boolean>(false);
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    
    function validate(value: string) {
        setInput(value);
        const matchedTitle = options.find((option) => value.match(new RegExp(option.title, "gi")));
        if(!matchedTitle) {
            onErrorChange && onErrorChange(name, true)
            setErrorMessage("Required");
        } else {
            inputRef.current.value = matchedTitle.value;
            onErrorChange && onErrorChange(name, false)
            setErrorMessage("");
        }
    }

    return (
    <section className="flex flex-col m-3">
        <label
        htmlFor={name}
        className={`${errorMessage ? "border-red-600" : "border-gray-300"} relative flex items-center bg-zinc-200 p-2 rounded-lg border-3 focus-within:border-indigo-500 transition-colors ease-in-out duration-200`}
        >

        {
            icon && 
            <FontAwesomeIcon
                icon={icon}
                className="text-2xl p-3 text-zinc-500 font-bold"
            />
        }

        <section className="flex flex-col" onMouseDown={() => setFocus(true)}>
            <p className="font-bold text-zinc-500 text-lg">{title}</p>

            <input ref={inputRef} type="hidden" name={name}/>
            <input
                placeholder={placeholder}
                type={passwordVisible ? "text" : type}
                id={name}
                className="placeholder:text-gray-400 rounded-lg focus:outline-none focus:ring-0 py-1 font-bold text-xl"
                onChange={(e) => validate(e.target.value)}
                onBlur={() => setFocus(false)}
                value={input}
            />
            {
                focus &&
                <section className="absolute max-h-50 overflow-y-scroll z-100 w-full top-20 right-0 bg-zinc-200 rounded-md">
                    {
                        options.filter((option) => option.title.match(new RegExp(input, "gi"))).map((option) => <section onMouseDown={() => {
                            validate(option.title);
                            setFocus(false);
                        }} className="p-2 hover:bg-zinc-300 cursor-pointer font-bold text-zinc-700" key={option.value}>{option.title}</section>)
                    }
                </section>
            }
        </section>
        {
            type == "password" && <button type="button" onClick={() => setPasswordVisible(!passwordVisible)}><FontAwesomeIcon className="text-2xl cursor-pointer text-zinc-500" icon={passwordVisible ? faEyeSlash : faEye}/></button>
        }
        </label>
        <p className={`${errorMessage || "invisible"} text-red-600 font-bold text-xl pt-1 pl-1`}>{errorMessage && <FontAwesomeIcon icon={faCircleExclamation} className="pr-1"/>}{errorMessage || "Error message here"}</p>
    </section>
    );
};

export default SelectInput;
