

import {create} from "zustand"


interface ErrorStore {
  errorMessage:string,
  unauthorized:boolean,
  forbidden:boolean,
  serverError:boolean,
  networkError:boolean

  setUnauthorized: (message : string) => void;
  setForbidden: (message : string) => void;
  setServerError: (message : string) => void;
  setNetworkError: (message : string) => void;
  dismissError: () => void;
}

const useErrorStore = create<ErrorStore>((set) => ({
    errorMessage:null,
    forbidden:false,
    serverError:false,
    unauthorized:false,
    networkError:false,
    dismissError:() => set({errorMessage:null, unauthorized:false, serverError:false, forbidden:false}),
    setForbidden:(message) => set({errorMessage:message, forbidden:true}),
    setUnauthorized:(message) => set({errorMessage:message, unauthorized:true}),
    setNetworkError:(message) => set({errorMessage:message, networkError:true}),
    setServerError:(message) => set({errorMessage:message, serverError:true})
}))

export default useErrorStore;