import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, type FC } from "react";
import { useSearchParams } from "react-router-dom";

type Props = {
    searchParamName:string,
    id:string,
    defaultValue?:string,
    placeholder?:string
}

const SearchInput : FC<Props> = ({searchParamName, id, defaultValue, placeholder = ""}) => {
    
    const [, setSearchParams] = useSearchParams();
    const [input, setInput] = useState<string>("")

    useEffect(() => {
        if(defaultValue) {
            setInput(defaultValue);
        }
    }, [defaultValue]);

    const search = () => {
        setSearchParams((prev) => ({...prev, [searchParamName]:input}))
    }


    return (
        <section className="flex flex-col lg:flex-row gap-1 items-start lg:items-center">
            <label htmlFor={id} className="rounded-lg border-3 border-zinc-800 text-xl p-1">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-3"/>
                <input type="text" placeholder={placeholder} className=" max-w-50 lg:max-w-100 lg:w-100 focus:outline-none focus:ring-0" id={id} value={input} onChange={(e) => setInput(e.target.value)} />
            </label>
            <button onClick={search} className="primary-btn"><FontAwesomeIcon icon={faMagnifyingGlass}/> Search</button>
        </section>
    )
}

export default SearchInput