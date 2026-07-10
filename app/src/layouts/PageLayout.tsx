import type { FC, ReactNode } from "react";

import { Helmet } from "react-helmet-async";
import ErrorNotification from "../components/pop/ErrorNotification";
import WarningNotification from "../components/pop/WarningNotification";


type Props = {
    children:ReactNode,
    title?:string
}

const PageLayout : FC<Props> = ({children, title}) => {
    return (
        <>
            <Helmet>
                <title>{title || "e-commerce-app"}</title>
            </Helmet>
            <main className="min-h-screen h-screen">
                <ErrorNotification/>
                <WarningNotification/>
                {children}
            </main>
        </>
    )
}

export default PageLayout;