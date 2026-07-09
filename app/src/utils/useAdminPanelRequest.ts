import type { AxiosRequestConfig } from "axios";
import { useNavigate } from "react-router-dom";
import { request, type FullResult } from "./request";

export const useAdminPanelRequest = () => {
    const navigate = useNavigate();

    const adminPanelRequest = async (
        method: "GET" | "POST" | "PUT" | "DELETE", 
        url: string, 
        config: AxiosRequestConfig<any>, 
        data?: any
    ): Promise<FullResult> => {
        const result = await request(method, url, config, data);

        if (result.message === "UNAUTHORIZED") {
            // Logika ponownego logowania
        } else if (result.message === "FORBIDDEN") {
            navigate("/admin");
        }
        return result;
    };

    return adminPanelRequest;
};