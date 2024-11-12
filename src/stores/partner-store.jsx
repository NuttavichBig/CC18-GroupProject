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
    },
    updatePartner : async(body)=>{
      const {token} = useUserStore.getState()
      const result = await axios.patch(`${API}/partner`,body,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(result.data.partner)
      set({partner  :result.data.partner})
    },
    updateHotel : async(body)=>{
      const {token} = useUserStore.getState()
      const {hotel} =usePartnerStore.getState()
      const result = await axios.patch(`${API}/hotel/${hotel.id}`,body,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(result.data)
      set({hotel : result.data})
    },
    deleteRoom : async(roomId)=>{
      const {token} = useUserStore.getState()
      await axios.delete(`${API}/room/${roomId}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }
    
    
}))

export default usePartnerStore;