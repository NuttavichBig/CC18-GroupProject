import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const API = import.meta.env.VITE_API;



const useUserStore = create(persist((set, get) => ({
  user: null,
  token: '',
  filter: {
    journeyDate: new Date(),
    returnDate: new Date(),
    guest: 1
  },
  selectedLocation: null,
  searchBooking: '',
  setUserProfileImage: (imageUrl) => {
    set((state) => ({
      user: { ...state.user, image: imageUrl }
    }));
  },
  setSelectedLocation: (location) => set({ selectedLocation: location }),
  setFilter: (value) => {
    set({ filter: value })
  },
  setAllFilterDefault: () => set({
    filter: {
      journeyDate: new Date(),
      returnDate: new Date(),
      guest: 1
    },
    selectedLocation: null
  }),
  login: async (body) => {
    const result = await axios.post(`${API}/auth/login`, body)
    if (result.data && result.data.token) {
      set({ token: result.data.token, user: result.data.user });
    }
  },
  logout: () => {
    set({ token: '', user: null })
  },
  register: async (body) => {
    console.log(body)
    await axios.post(`${API}/auth/register`, body)
  },
  googleLogin: async (accessToken) => {
    const result = await axios.post(`${API}/auth/google`, { accessToken });
    set({ token: result.data.token, user: result.data.user })
  },
  getMe: async () => {
    const { token } = useUserStore.getState();
    if (!token) throw new Error('Please Login')
    const result = await axios.get(`${API}/auth/user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return result.data
  },
  updateUserProfile: async (data) => {
    const { token } = useUserStore.getState();
    if (!token) throw new Error('Please Login')
    const result = await axios.patch(`${API}/auth/user`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    set({ user: result.data.user })
    return result
  },
  setSearch: (UUID) => {
    set({searchBooking : UUID})
  }
}), {
  name: "stateUserData",
  storage: createJSONStorage(() => localStorage),
},
)
);

export default useUserStore;
