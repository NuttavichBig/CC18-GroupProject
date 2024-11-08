import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useBookingStore = create(
  persist(
    (set, get) => ({
      currentHotel: null,
      selectedRoom: null, // Keep selectedRoom as a single item
      summary: null,
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
      actionClearSummary: () =>{
        set({ summary: null });
      }
    }),
    {
      name: "HotelData",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useBookingStore;