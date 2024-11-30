/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import {
  ForecastCard,
  Result,
  ResultsContainer,
  ResultsWrapper,
  WeatherImage,
} from "./results.styles";
import { GridLoader } from "react-spinners";
import { MyContext } from "@/context/context";
import gsap from "gsap";
import { responseCookiesToRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

const Results = () => {
  const {
    unit,
    setUnit,
    fiveDayData,
    loading,
    setLoading,
    favoriteChecked,
    setFavoriteChecked,
    favoriteCity,
    setFavoriteCity,
    currentCity,
    setCurrentCity,
  } = useContext(MyContext);

  // Checks to see if the favorite city matches the current city
  const [match, setMatch] = useState(false);

  const [checked, setChecked] = useState(false);

  {
    /* Animations */
  }
  useGSAP(() => {
    gsap
      .timeline()
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
  }, [loading]);

  // Synchronize with localStorage on component mount
  useEffect(() => {
    if (!fiveDayData) {
      return;
    }

    const favoriteCity = localStorage.getItem("favorite-city");
    const currentUnit = localStorage.getItem("forecast-unit");
    const isChecked = localStorage.getItem("favorite-checked");

    if (currentCity?.toLowerCase() === favoriteCity?.toLowerCase()) {
      setMatch(true);
      setChecked(true);
    } else {
      setMatch(false);
      setChecked(false);
    }
    setLoading(false);
  }, [fiveDayData]);

  // Synchronize with localStorage on component update
  useEffect(() => {
    if (!favoriteChecked) {
      return;
    }

    if (favoriteChecked) {
      localStorage.setItem("favorite-checked", favoriteChecked);

      localStorage.setItem("favorite-city", favoriteCity);

      localStorage.setItem("forecast-unit", unit);
    } else {
      console.log("Something's wrong");
    }
  }, [favoriteChecked, currentCity]);

  // Function to handle checkbox change
  const handleCheckboxChange = (e) => {
    if (e.target.checked === true) {
      setChecked(true);

      const newCurrentCity = fiveDayData.location.name;
      setCurrentCity(newCurrentCity);
      setFavoriteChecked(e.target.checked);
      setFavoriteCity(newCurrentCity);
      setUnit(unit);
    } else {
      setChecked(false);
      localStorage.clear();
    }
  };

  if (loading)
    return (
      <ResultsWrapper>
        <ResultsContainer className='border-none'>
          {/* Loading Spinner */}
          <div className='flex items-center justify-center '>
            <GridLoader color='white' />
          </div>
        </ResultsContainer>
      </ResultsWrapper>
    );

  if (fiveDayData instanceof Error) {
    return (
      <ResultsWrapper>
        <ResultsContainer>
          <Result className={loading ? "hidden" : ""}>
            <div className='flex items-center justify-center '>
              <p className='text-3xl text-center text-white'>
                No information found. <br />
                Please verify the city name and try agian.
              </p>
            </div>
          </Result>
        </ResultsContainer>
      </ResultsWrapper>
    );
  }

  // Edit the image URL
  let imgUrl;
  try {
    imgUrl = `https:${fiveDayData.current.condition.icon}`;
  } catch (error) {
    console.log(error);
    return null;
  }

  return (
    <ResultsWrapper>
      <ResultsContainer>
        <Result className={loading ? "hidden" : ""}>
          {/* Weather Image */}
          <WeatherImage
            id='image'
            src={imgUrl}
            alt='Image'
            width={250}
            height={200}
            className='relative -mt-32'
          />

          {/* Temperature */}
          {unit && unit === "fahrenheit" ? (
            <p id='temp' className='-mt-4 text-3xl'>
              {fiveDayData.current.temp_f}° F
            </p>
          ) : (
            <p id='temp' className='-mt-4 text-3xl'>
              {fiveDayData.current.temp_c}° C
            </p>
          )}

          <p className='text-2xl'>{fiveDayData.current.condition.text}</p>

          {/* City Name */}
          <p id='city' className='text-4xl font-semibold'>
            {fiveDayData.location.name}
          </p>

          {/* Favorite Checkbox */}
          <p id='favorite' className='mb-4'>
            <input
              type='checkbox'
              className='mr-2 cursor-pointer'
              //defaultChecked={match === true}
              checked={checked ? true : false}
              onChange={handleCheckboxChange}
            />
            Save As Favorite
          </p>

          {/* 5 Day Forecast */}
          <div className='relative mt-2'>
            <p
              id='forcast-text'
              className='py-2 mb-8 text-xl text-center border-t border-b border-white/50'
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
                      className='mx-auto mb-4 -mt-4'
                    />

                    {/* Condition */}
                    <p className='line-clamp-1'>{day.day.condition.text}</p>
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
