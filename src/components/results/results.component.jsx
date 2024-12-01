"use client";
import React, { useEffect, useState } from "react";
import { GridLoader } from "react-spinners";
import gsap from "gsap";
import {
  ForecastCard,
  Result,
  ResultsContainer,
  ResultsWrapper,
  WeatherImage,
} from "./results.styles";
import useWeatherStore from "@/app/stores/weather-store";
import { useGSAP } from "@gsap/react";
import { useHydration } from "@/app/stores/hydration-store";

const Results = () => {
  // Track hydration status
  const hydrated = useHydration();

  const {
    fiveDayData,
    loading,
    setFavoriteChecked,
    favoriteCity,
    setFavoriteCity,
    currentCity,
    setCurrentCity,
    checked,
    setChecked,
    unit,
  } = useWeatherStore();

  // Track if the page has initially loaded
  const [pageLoaded, setPageLoaded] = useState(false);

  // Synchronize 'checked' state with the favorite city
  useEffect(() => {
    if (currentCity && favoriteCity) {
      setChecked(currentCity.toLowerCase() === favoriteCity.toLowerCase());
    } else {
      setChecked(false);
    }
  }, [currentCity, favoriteCity, setChecked]);

  // GSAP Animation for Spinner
  useGSAP(() => {
    if (!hydrated || pageLoaded || !loading) return;

    const spinner = document.querySelector("#spinner");

    if (!spinner) {
      console.error("Spinner element not found");
      return;
    }

    // Set initial position for spinner
    gsap.set(spinner, { x: "100%", opacity: 0 });

    // Animate spinner sliding in
    const spinnerTimeline = gsap.timeline();
    spinnerTimeline.to(spinner, {
      x: "0%",
      opacity: 1,
      duration: 0.5,
      ease: "easeIn",
    });

    // Mark the page as fully loaded after spinner animation
    spinnerTimeline.eventCallback("onComplete", () => {
      setPageLoaded(true);
    });

    // Clean up on completion
    return () => {
      spinnerTimeline.kill();
    };
  }, [hydrated, loading, hydrated]);

  /**
   * Results animations.
   */
  useGSAP(() => {
    // Ensure GSAP only runs after hydration and loading
    if (loading || !fiveDayData || !hydrated) return;

    const timeline = gsap.timeline();

    timeline
      .from("#image", {
        duration: 1,
        y: -100,
        opacity: 0,
        ease: "elastic",
      })
      .from("#temp", {
        x: -100,
        opacity: 0,
        ease: "easeIn",
        duration: 0.5,
        delay: -1,
      })
      .from("#city", {
        delay: -1.3,
        duration: 1,
        x: 100,
        opacity: 0,
        ease: "easeIn",
      })
      .from(["#favorite", "#forcast-text"], {
        duration: 0.5,
        delay: -0.4,
        opacity: 0,
        ease: "easeIn",
      })
      .from(".forecast", {
        duration: 0.5,
        scale: 0,
        opacity: 0,
        ease: "back",
        stagger: 0.1,
      });

    // Clean up on completion
    return () => {
      timeline.kill();
    };
  }, [loading, fiveDayData, hydrated]);

  // Prevent rendering until hydration is complete
  if (!hydrated) return null;

  // Handle checkbox state changes.
  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;

    setChecked(isChecked);
    setFavoriteChecked(isChecked);

    if (isChecked) {
      const newCurrentCity = fiveDayData?.location?.name || "";
      setCurrentCity(newCurrentCity);
      setFavoriteCity(newCurrentCity);
    } else {
      setCurrentCity("");
      setFavoriteCity("");
    }
  };

  /**
   * Render Spinner while loading.
   */
  if (loading || !fiveDayData) {
    return (
      <ResultsWrapper id='spinner'>
        <ResultsContainer className='border-none'>
          <div className='flex items-center justify-center'>
            <GridLoader color='white' />
          </div>
        </ResultsContainer>
      </ResultsWrapper>
    );
  }

  /**
   * Render Error if error occurs while retrieving data.
   */
  if (fiveDayData instanceof Error) {
    return (
      <ResultsWrapper id='error'>
        <ResultsContainer>
          <Result>
            <div className='relative flex items-center justify-center -translate-y-1/2 top-1/2'>
              <p className='text-3xl text-center text-white'>
                No information found. <br />
                Please verify the city name and try again.
              </p>
            </div>
          </Result>
        </ResultsContainer>
      </ResultsWrapper>
    );
  }

  // Concatenate the image URL
  const imgUrl = `https:${fiveDayData.current.condition.icon}`;

  return (
    <ResultsWrapper id='results'>
      <ResultsContainer>
        <Result id='result'>
          <WeatherImage
            id='image'
            src={imgUrl}
            alt='Weather'
            width={250}
            height={200}
            className='absolute -mt-24 rounded-lg shadow-lg lg:-mt-36 shadow-black backdrop-blur-lg'
          />
          <p id='temp' className='text-3xl mt-[7.5rem] lg:mt-[80px]'>
            {unit === "fahrenheit"
              ? `${fiveDayData.current.temp_f}° F`
              : `${fiveDayData.current.temp_c}° C`}
          </p>
          <p className='text-2xl'>{fiveDayData.current.condition.text}</p>
          <p id='city' className='text-5xl font-semibold text-[#F0A606]'>
            {fiveDayData.location.name}
          </p>
          <p id='favorite' className='mb-4'>
            <input
              type='checkbox'
              className='mr-2 cursor-pointer'
              checked={checked}
              onChange={handleCheckboxChange}
            />
            Save As Favorite
          </p>

          {/* 5 Day Forecast */}
          <div className='relative w-full mt-2'>
            <p
              id='forcast-text'
              className='w-full py-2 mb-4 text-xl text-center border-t border-b border-white/50'
            >
              5 Day Forecast
            </p>

            {/* 5 Day Forecast Cards */}
            <div className='flex flex-col justify-between gap-4 mb-12 md:flex-row'>
              {fiveDayData && fiveDayData.forecast.forecastday ? (
                fiveDayData.forecast.forecastday.map((day, index) => (
                  <ForecastCard key={index} className='text-center'>
                    {/* Date */}
                    <p className='mb-2 text-sm font-semibold border-b'>
                      {new Date(day.date).toDateString().slice(0, 10)}
                    </p>

                    {/* Temperature */}
                    {unit && unit === "fahrenheit" ? (
                      <p>
                        {day.day.mintemp_f}° / {day.day.maxtemp_f}°
                      </p>
                    ) : (
                      <p>{day.day.avgtemp_c}° C</p>
                    )}

                    {/* Weather Image */}
                    <WeatherImage
                      src={`https:${day.day.condition.icon}`}
                      alt='Image'
                      width={50}
                      height={50}
                      className='mx-auto -mt-4'
                    />

                    {/* Condition */}
                    <p className='-mt-4 line-clamp-1'>
                      {day.day.condition.text}
                    </p>
                  </ForecastCard>
                ))
              ) : (
                <div>No data found.</div>
              )}
            </div>
          </div>
        </Result>
      </ResultsContainer>
    </ResultsWrapper>
  );
};

export default Results;
