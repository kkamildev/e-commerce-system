

import {create} from "zustand"


interface WarningStore {
  title:string,
  active:boolean,
  onAccept:() => void,
  onDeny:() => void,
  accept:() => void,
  deny:() => void,
  prepare:(title : string, onAccept : () => void, onDeny : () => void) => void;
  
}

const useWarningStore = create<WarningStore>((set, get) => ({
    title:"",
    active:false,
    onAccept:null,
    onDeny:null,
    prepare: (title, onAccept, onDeny) => set({ 
        active: true, 
        title, 
        onAccept, 
        onDeny 
    }),

    accept: () => {
        const { onAccept } = get();
        if (onAccept) onAccept();
        set({ active: false, onAccept: null, onDeny: null });
    },

    deny: () => {
        const { onDeny } = get();
        if (onDeny) onDeny();
        set({ active: false, onAccept: null, onDeny: null });
    }

}))

export default useWarningStore;