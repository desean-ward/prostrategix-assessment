"use client";
import { createContext, useState } from "react";

export const MyContext = createContext({
  unit: null,
  setUnit: () => {},
  fiveDayData: null,
  setFiveDayData: () => {},
  loading: false,
  setLoading: () => {},
  favorite: false,
  setFavorie: () => {},
});

export const ContextProvider = ({ children }) => {
  const [unit, setUnit] = useState("fahrenheit");
  const [fiveDayData, setFiveDayData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [favorite, setFavorite] = useState(null);

  return (
    <MyContext.Provider
      value={{
        unit,
        setUnit,
        fiveDayData,
        setFiveDayData,
        loading,
        setLoading,
        favorite,
        setFavorite,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
