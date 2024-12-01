import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useWeatherStore = create(
  persist(
    (set) => ({
      unit: "fahrenheit",
      fiveDayData: null,
      loading: true,
      favoriteChecked: false,
      favoriteCity: null,
      currentCity: "New York",
      match: false,
      checked: false,
      setUnit: (unit) => set({ unit }),
      setFiveDayData: (data) => set({ fiveDayData: data }),
      setLoading: (loading) => set({ loading }),
      setFavoriteChecked: (checked) => set({ favoriteChecked: checked }),
      setFavoriteCity: (city) => set({ favoriteCity: city }),
      setCurrentCity: (city) => set({ currentCity: city }),
      setMatch: (match) => set({ match }),
      setChecked: (checked) => set({ checked }),
    }),
    {
      name: "weather-storage",
      getStorage: () => localStorage,
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useWeatherStore;
