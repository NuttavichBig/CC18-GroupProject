import { summary } from "framer-motion/m";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useHotelStore = create(
  persist(
    (set, get) => ({
      currentHotel: null,
      selectedRoom: null, // Keep selectedRoom as a single item
      summary: null,
      amount : 1,
      actionSetCurrentHotel: (hotel) => {
        set({ currentHotel: hotel });
      },
      actionClearHotel: () => {
        set({ currentHotel: null });
      },
      actionSetSelectedRoom: (room) => {
        set({ selectedRoom: room });
      },
      actionClearSelectedRoom: () => {
        set({ selectedRoom: null });
      },
      actionSetSummary: (summaryData) => { // Renamed parameter to avoid conflict
        set({ summary: summaryData });
      },
      actionSetRoom : (room)=>{
        set({amount :room})
      },
      actionClearSummary: () =>{
        set({ summary: null ,amount : 1});
      }
    }),
    {
      name: "HotelData",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useHotelStore;