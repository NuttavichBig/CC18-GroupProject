import { create } from "zustand";
import useUserStore from "./user-store";
import axios from "axios";
const API  = import.meta.env.VITE_API




const usePartnerStore = create((set,get)=>({
    partner : null,
    hotel : null,
    setPartner : async()=>{
        const {token} = useUserStore.getState()
        const result = await axios.get(`${API}/partner`,{
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
    if(result.data){
        set({partner : result.data.partner , hotel : result.data.hotel})
    }},
    updateRoom : async(roomId,body)=>{
      const {token} = useUserStore.getState()
      await axios.patch(`${API}/room/${roomId}`,body,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    },
    creteNewRoom  :async(body)=>{
      const {token} = useUserStore.getState()
      await axios.post(`${API}/room`,body,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }
    
    
}))

export default usePartnerStore;