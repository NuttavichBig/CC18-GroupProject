
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
const API = import.meta.env.VITE_API



const useUserStore = create(persist((set,get)=>({
    token : '',
    filter : {
        search : '',
        journeyDate: new Date(),
        returnDate: new Date(),
        guest: 1
    },
    setFilter : (value)=>{
        set({filter : value})
    }
}),{
    name : "stateUserData",
    storage : createJSONStorage(()=>localStorage),
    partialize: (state) => ({ 
        token: state.token 
    })
}))



export default useUserStore