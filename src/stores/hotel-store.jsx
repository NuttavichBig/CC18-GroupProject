import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useHotelStore = create(persist((set, get) => ({
  currentHotel: null,
  actionSetCurrentHotel: (hotel) => {
    set({ currentHotel: hotel })
  }
}),
{
    name : "HotelData",
    storage : createJSONStorage(()=>localStorage)
}
));

export default useHotelStore;
