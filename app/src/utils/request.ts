import type { AxiosRequestConfig } from "axios";
import axios from "axios";
import type { Result } from "../layouts/FormLayout";


export interface FullResult extends Result {
    data?:any,
    headers?:any
}


export const request = async (method : "GET" | "POST" | "PUT"| "DELETE", url : string, config : AxiosRequestConfig<any>, data? : any) : Promise<FullResult> => {

    const methods = {
        "GET": () => axios.get(url, config),
        "POST": () => axios.post(url, data, config),
        "PUT": () => axios.put(url, data, config),
        "DELETE": () => axios.delete(url, config)
    }

    try {
        const result = await methods[method]();
        return {data:result.data, headers:result.headers, ok:true, serverError:false, message:result.data.message};
    } catch(err) {
        const status = err.response?.status;

        if(err.response?.data.unauthorized) {
            return {data:err.response?.data, headers:err.response?.headers, ok:false, serverError:false, message:"UNAUTHORIZED"};
        }
        if(err.response?.data.forbidden) {
            return {data:err.response?.data, headers:err.response?.headers, ok:false, serverError:false, message:"FORBIDDEN"};
        }
        if(status >= 500) {
            return {data:err.response?.data, headers:err.response?.headers, ok:false, serverError:true, message:"SERVER_ERROR"};
        } else if(err.code == "ECONNABORTED") {
            return {data:err.response?.data, headers:err.response?.headers, ok:false, serverError:false, message:"TIMEOUT"};
        } else if (err.response) {
            return {data:err.response?.data, headers:err.response?.headers, ok:false, serverError:false, message:err.response.data.errorMessage};
        } else if(err.request) {
            return {data:err.request, headers:err.request?.headers, ok:false, serverError:false, message:"BAD_REQUEST"};
        }
    }
}
