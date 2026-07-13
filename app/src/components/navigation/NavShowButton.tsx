import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FC } from "react";


type Props = {
    setHidden:React.Dispatch<React.SetStateAction<boolean>>
}

const NavShowButton : FC<Props> = ({setHidden}) => {
    return (
        <section className="position fixed bottom-5 left-5 block lg:hidden">
            <button className="black-btn" onMouseDown={() => setHidden((prev) => !prev)}>
                <FontAwesomeIcon icon={faBars} className="text-2xl p-1"/>
            </button>
        </section>
    )
}

export default NavShowButton;