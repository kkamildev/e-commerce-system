import type { FC, ReactNode } from "react";

import { Helmet } from "react-helmet-async";


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
            <main className="min-h-screen">
                {children}
            </main>
        </>
    )
}

export default PageLayout;