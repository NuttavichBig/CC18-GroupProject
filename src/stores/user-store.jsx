
import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
const API = import.meta.env.VITE_API



const useUserStore = create(persist((set,get)=>({
    user : null ,
    token : '',
    filter : {
        search : '',
        journeyDate: new Date(),
        returnDate: new Date(),
        guest: 1
    },
    setFilter : (value)=>{
        set({filter : value})
    },
    login : async(body)=>{
        const result = await axios.post(`${API}/auth/login`,body)
        set({token : result.data.token , user : result.data.user})
    },
    logout : ()=>{
        set({token : ''})
    }
}),{
    name : "stateUserData",
    storage : createJSONStorage(()=>localStorage),
    partialize: (state) => ({ 
        user : state.user,
        token: state.token 
    })
}))



export default useUserStore