

import {create} from "zustand"


interface ErrorStore {
  errorMessage:string,
  unauthorized:boolean,
  forbidden:boolean,
  serverError:boolean

  setUnauthorized: (message : string) => void;
  setForbidden: (message : string) => void;
  setSeverError: (message : string) => void;
  dismissError: () => void;
}

const useErrorStore = create<ErrorStore>((set) => ({
    errorMessage:null,
    forbidden:false,
    serverError:false,
    unauthorized:false,
    dismissError:() => set({errorMessage:null, unauthorized:false, serverError:false, forbidden:false}),
    setForbidden:(message) => set({errorMessage:message, forbidden:true}),
    setUnauthorized:(message) => set({errorMessage:message, unauthorized:true}),
    setSeverError:(message) => set({errorMessage:message, serverError:true})
}))

export default useErrorStore;