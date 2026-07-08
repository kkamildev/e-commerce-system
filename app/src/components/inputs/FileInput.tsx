import { useState, useRef, type FC, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {type IconDefinition } from "@fortawesome/free-regular-svg-icons";
import {faCancel, faCircleExclamation} from "@fortawesome/free-solid-svg-icons"

type Props = {
    name: string;
    title: string;
    onErrorChange?:(name : string, errorAppear : boolean) => void;
    icon?:IconDefinition,
    required?:boolean,
    maxFilesCount?:number,
    maxSizeMb?:number,
    mediaType:string,
    imgClasses?:string,
    placeholder?:string
};


export type InputFile = {
    file:File,
    url:string
}


const FileInput: FC<Props> = ({
    name,
    title,
    onErrorChange,
    icon,
    required = false,
    maxFilesCount = 1,
    maxSizeMb = 5,
    mediaType,
    imgClasses = "w-25",
    placeholder = ""
}) => {

    useEffect(() => {
        if(required) {
            validate(inputRef.current.files.length != 0 ? inputRef.current.files : null)
        }
    }, [required])
    const inputRef = useRef<HTMLInputElement>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [files, setFiles] = useState<InputFile[]>(null);
    
    function validate(value: FileList) {
        inputRef.current.files = null;
        setFiles(null);
        onErrorChange && onErrorChange(name, false);
        setErrorMessage("");


        if(value == null) {
            onErrorChange && onErrorChange(name, true);
            setErrorMessage("Required");
            return;
        }
        const files : InputFile[] = [];
        for (let i = 0;i<maxFilesCount;i++) {
            const file = value[i];
            if(!file) {
                continue;
            }
            if(file.size / (1024 * 1024) < maxSizeMb) {
                if(file.type.startsWith(mediaType)) {
                    files.push({file, url:URL.createObjectURL(file)});
                } else {
                    if(required) {
                        onErrorChange && onErrorChange(name, true);
                        setErrorMessage("Invalid media type");
                    }
                    return;
                }
            } else {
                if(required) {
                    onErrorChange && onErrorChange(name, true);
                    setErrorMessage("Too big");
                }
                return;
            }
        }
        const dataTransfer = new DataTransfer();
        files.forEach((obj) => dataTransfer.items.add(obj.file))

        inputRef.current.files = dataTransfer.files;

        setFiles(files);
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
            <input multiple={maxFilesCount > 1} ref={inputRef} type="file" name={name} id={name} onChange={(e) => validate(e.target.files)} className="hidden" />
            {
                !files && <p className="text-gray-400 font-bold m-1 text-xl">{placeholder}</p>
            }
            <section className="flex flex-col items-center justify-center">
            {
                files?.map((obj, index) => <img key={index} src={obj.url} alt={obj.file.name} className={`${imgClasses}`}/>)
            }
            </section>
        </section>
        {
            files && <button type="button" onClick={() => {
                inputRef.current.files = null;
                setFiles(null);
                onErrorChange && onErrorChange(name, false);
                setErrorMessage("");
            }}><FontAwesomeIcon className="text-2xl cursor-pointer text-zinc-500 ml-3" icon={faCancel}/></button>
        }
        </label>
        <p className={`${errorMessage || "invisible"} text-red-600 font-bold text-xl pt-1 pl-1`}>{errorMessage && <FontAwesomeIcon icon={faCircleExclamation} className="pr-1"/>}{errorMessage || "Error message here"}</p>
    </section>
    );
};

export default FileInput;
