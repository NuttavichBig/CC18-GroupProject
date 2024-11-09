import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import useUserStore from "./user-store";
import { io } from "socket.io-client";

const API = import.meta.env.VITE_API;


const useAdminStore = create(persist((set, get) => ({
    socket : null,
    chatRoom : null,
    connect : ()=>{
        const {token} = useUserStore.getState();
        if(token){
            const socket = io(API, {
                extraHeaders: {
                    Authorization: `Bearer ${token}`
                },
            });
            set({ socket })
        }
    },
    setChatBox : (id)=>{
        const {socket} = useAdminStore.getState();
        if(socket && id){
            socket.off('joinComplete')
            socket.on('joinComplete',(data)=>{
                set({chatRoom : data.room})
            })
            socket.emit('adminJoinChat',id)

        }
    },
    addMessage : (newMsg)=>{
        const {chatRoom} = useAdminStore.getState()
        if(chatRoom){
            const updatedMessage = [...chatRoom.messages,newMsg]
            set({chatRoom : {...chatRoom,messages  : updatedMessage}})
        }
    }
}), {
  name: "statSocketData",
  storage: createJSONStorage(() => localStorage),
  partialize : (state)=>({

  })
},
)
);

export default useAdminStore;
