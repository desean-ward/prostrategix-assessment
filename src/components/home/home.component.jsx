"use client";
import { useEffect, useState } from "react";
import InputForm from "../input-form/input-form.component";
import Results from "../results/results.component";
import { getFiveDayWeather } from "@/app/api/getWeather";
import { HomeContainer, HomeWrapper } from "./home.styles";
import useWeatherStore from "@/app/stores/weather-store";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Home = () => {
  const { setFiveDayData, setLoading, setCurrentCity } = useWeatherStore();

  const [sValue, setSValue] = useState(
    typeof window !== "undefined" && window.innerWidth >= 810 ? "-5" : ""
  );

  useEffect(() => {
    // Dynamically fetch window size
    const handleResize = () => {
      const newS = window.innerWidth >= 810 ? "-5" : "";
      setSValue(newS);
    };

    // Run the resize logic on initial mount
    handleResize();

    // Add resize listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  useGSAP(() => {
    const timeline = gsap.timeline();

    timeline
      .fromTo(
        ".anytime",
        {
          opacity: 0,
          y: -100,
          x: 130,
          duration: 0.5,
          ease: "easeIn",
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "ease",
        }
      )
      .to(".anytime", {
        x: sValue,
        duration: 0.5,
        ease: "ease",
      })
      .from(".weather", {
        display: "hidden",
        opacity: 0,
        x: -100,
        duration: 0.5,
        ease: "ease",
      });
  }, []);

  return (
    <HomeWrapper>
      <header className='flex justify-center w-full py-4 mb-4 text-5xl font-bold lg:py-8 md:text-6xl'>
        <div className='absolute flex items-center justify-center w-full top-12 lg:top-12 md:top-4'>
          <span id='anytime' className='text-center anytime'>
            Anytime
          </span>{" "}
          <span
            id='weather'
            className='bg-gradient-to-r from-[#272781]  via-[#F0A606] to-[#272781] left-1/2 weather z-10 text-transparent bg-clip-text'
          >
            Weather
          </span>
        </div>
      </header>
      <HomeContainer>
        <InputForm />
        <Results />
      </HomeContainer>
    </HomeWrapper>
  );
};

export default Home;
