import type { FC, FormEventHandler } from "react";


type Props = {

}

const BaseForm : FC<Props> = ({}) => {

    const handleSubmitAction = (formData: FormData) => {
        const name = formData.get("name");
        console.log("Wysyłam przez Action:", name);
    };

    return (
        <form>
            <h5>Form Title</h5>
            <hr />
            <section>
                input
            </section>
        </form>
    )
}