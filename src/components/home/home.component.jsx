"use client";
import { useEffect } from "react";
import InputForm from "../input-form/input-form.component";
import Results from "../results/results.component";
import { getFiveDayWeather } from "@/app/api/getWeather";
import { HomeContainer, HomeWrapper } from "./home.styles";
import useWeatherStore from "@/app/stores/weather-store";

const Home = () => {
  const {
    setFiveDayData,
    setLoading,
    currentCity,
    favoriteCity,
    setCurrentCity,
  } = useWeatherStore();

  useEffect(() => {
    const handleGetWeather = async () => {
      setLoading(true);

      try {
        const state = useWeatherStore.getState();
        const { favoriteCity, currentCity } = state;

        const location = favoriteCity || currentCity || "New York";
        setCurrentCity(location);

        const fiveDays = await getFiveDayWeather(location);
        setFiveDayData(fiveDays);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setFiveDayData(null);
      } finally {
        setLoading(false);
      }
    };

    handleGetWeather();
  }, [setFiveDayData, setLoading, setCurrentCity]);

  // Check for Hydration
  const isHydrated = useWeatherStore.persist.hasHydrated();

  if (!isHydrated) {
    return null; // Avoid rendering until hydration is complete
  }

  return (
    <HomeWrapper>
      <HomeContainer>
        <InputForm />
        <Results />
      </HomeContainer>
    </HomeWrapper>
  );
};

export default Home;
