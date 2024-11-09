import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
const API = import.meta.env.VITE_API

const useBookingStore = create(
  persist(
    (set, get) => ({
      id: null,
      bookingData : null,
      bookingDetail : null,
      clientSecret : '',
      uuid : null,
      resBookingData : null,
      setClientSecret : (data)=>{
        set({clientSecret : data})
      },
      actionSetBooking : (Data) => {
        set({ bookingData: Data })
      },
      actionClearBookingData : () => {
        set({bookingData: null})
      },
      actionSetId : (bookingId) =>{
        set({id: bookingId})
      },
      actionClearId : () =>{
        set({id: null})
      },
      actionSetBookingDetail : (Data) => {
        set({bookingDetail: Data})
      },
      actionClearBookingDetail : () => {
        set({bookingDetail: null})
      },
      setResponseBooking : (data)=>{
        set({resBookingData  :data})
      },
      searchByUUID : async(uuid)=>{
        const result = await axios.get(`${API}/booking/${uuid}`)
        console.log(result.data)
        return result.data
      }
    }),
    {
      name: "bookingData",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useBookingStore;