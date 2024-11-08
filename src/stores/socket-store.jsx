import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import useUserStore from "./user-store";
import { io } from "socket.io-client";

const API = import.meta.env.VITE_API;


const useAdminStore = create(persist((set, get) => ({
    socket : null,
    connect : ()=>{
        const {token} = useUserStore.getState();
        if(token){
            const socket = io(API, {
                extraHeaders: {
                    Authorization: `Bearer ${token}`
                },
            });
            console.log(socket)
            set({ socket })
        }
    },
}), {
  name: "statSocketData",
  storage: createJSONStorage(() => localStorage),
  partialize : (state)=>({

  })
},
)
);

export default useAdminStore;
