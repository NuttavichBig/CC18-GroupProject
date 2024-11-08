import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useBookingStore = create(
  persist(
    (set, get) => ({
      id: null,
      bookingData : null,
      bookingDetail : null,
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
      }
    }),
    {
      name: "bookingData",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useBookingStore;