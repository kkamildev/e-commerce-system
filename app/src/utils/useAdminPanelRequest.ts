import type { AxiosRequestConfig } from "axios";
import { useNavigate } from "react-router-dom";
import { request, type FullResult } from "./request";
import useErrorStore from "../stores/useErrorStore";
import useUserStore from "../stores/useUserStore";

export const useAdminPanelRequest = () => {
    const navigate = useNavigate();

    const setUnauthorized = useErrorStore((store) => store.setUnauthorized);
    const setServerError = useErrorStore((store) => store.setSeverError);
    const setUser = useUserStore((store) => store.setUser);

    const adminPanelRequest = async (
        method: "GET" | "POST" | "PUT" | "DELETE", 
        url: string, 
        config: AxiosRequestConfig<any>, 
        data?: any
    ): Promise<FullResult> => {
        const result = await request(method, url, config, data);

        if (result.message === "UNAUTHORIZED") {
            setUnauthorized("You are unauthorized, log in");
            setUser(null);
        } else if (result.message === "FORBIDDEN") {
            setUnauthorized("You have no permission");
            navigate("/admin");
        } else if(result.serverError) {
            setServerError("Unexpected Server Error");
        }
        return result;
    };

    return adminPanelRequest;
};