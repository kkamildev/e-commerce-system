import { useEffect, useState, type FC } from "react";

import PageLayout from "../layouts/PageLayout";
import { request } from "../utils/request";
import CreateAdminSecion from "../components/sections/CreateAdminSection";


type Props = {

}

const AdminPanel : FC<Props> = ({}) => {
    
    const [adminExist, setAdminExist] = useState<boolean>(true);

    const checkAdminExist = async () => {
        const result = await request("GET", "/api/users/admin", {timeout:5000});
        if(result.ok) {
            setAdminExist(result.data.exist);
        }
        
    }
    useEffect(() => {
        checkAdminExist();
    }, [])

    return(
        <PageLayout title="Admin Panel">
            {
                !adminExist ? <CreateAdminSecion/> : <></>
            }
        </PageLayout>
    )
}

export default AdminPanel;