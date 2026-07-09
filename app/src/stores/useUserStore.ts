

import {create} from "zustand"
import type { User } from "../pages/admin/AdminPanel"


interface UserStore {
  user: User | null;

  setUser: (user: User) => void;
}

const useUserStore = create<UserStore>((set) => ({
    user:null,
    setUser:(newUser) => set({user:newUser})
}))

export default useUserStore;