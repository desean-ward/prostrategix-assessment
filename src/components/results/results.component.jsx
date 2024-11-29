"use client"
import React, { useContext, useEffect, useState } from "react";
import {
  ForecastCard,
  Result,
  ResultsContainer,
  ResultsWrapper,
  WeatherImage,
} from "./results.styles";
import Image from "next/image";
import { GridLoader } from "react-spinners";
import { MyContext } from "@/context/context";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Results = () => {
  const {
    unit,
    setUnit,
    fiveDayData,
    loading,
    setLoading,
    setFavorite,
    favorite,
  } = useContext(MyContext);

  // Local state for checkbox
  const [isChecked, setIsChecked] = useState(false);
  const favoriteCity = JSON.parse(localStorage.getItem("forecast-city"));

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

    const currentCity = fiveDayData?.location.name;
    if (!currentCity) {
      return null;
    }

    setUnit("fahrenheit");

    if (currentCity === favoriteCity) {
      localStorage.getItem("forecast-unit") &&
        setUnit(localStorage.getItem("forecast-unit"));
    }

    setIsChecked(fiveDayData?.location.name === favoriteCity);

    setLoading(false);
  }, [fiveDayData]);

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

  // Edit the image URL
  const imgUrl = fiveDayData
    ? `https:${fiveDayData.current.condition.icon}`
    : "";
  if (!imgUrl) {
    return null;
  }

  const currentCity = fiveDayData?.location.name;
  if (!currentCity) {
    return null;
  }

  const handleCheckboxChange = (e) => {
    // Toggle checkbox state
    const newCheckedState = e.target.checked;
    setIsChecked(newCheckedState);

    // Update localStorage
    if (newCheckedState) {
      setFavorite(true);

      localStorage.setItem("forecast-unit", unit);
      localStorage.setItem("forecast-city", JSON.stringify(currentCity));
    } else {
      setFavorite(false);
      setUnit(null);
      localStorage.removeItem("forecast-city");
      localStorage.setItem("forecast-unit", "fahrenheit");
    }
  };

  return (
    <ResultsWrapper>
      <ResultsContainer>
        <Result className={loading ? "hidden" : ""}>
          {/* Weather Image */}
          <WeatherImage
            id='image'
            src={imgUrl}
            alt='Image'
            width={200}
            height={200}
            className="-mt-8"
          />

          {/* Temperature */}
          {unit && unit === "fahrenheit" ? (
            <p id='temp' className='text-3xl '>
              {fiveDayData.current.temp_f}° F
            </p>
          ) : (
            <p id='temp' className='text-3xl'>
              {fiveDayData.current.temp_c}° C
            </p>
          )}
          
          <p className='text-2xl'>{fiveDayData.current.condition.text}</p>

          {/* City Name */}
          <p id='city'>{fiveDayData.location.name}</p>

          {/* Favorite Checkbox */}
          <p id='favorite' className='mb-4'>
            <input
              type='checkbox'
              className='mr-2'
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            Save As Favorite
          </p>

          {/* 5 Day Forecast */}
          <div className='relative px-4 mt-2'>
            <p
              id='forcast-text'
              className='py-2 mb-8 text-xl text-center border-t border-b border-white/50'
            >
              5 Day Forecast
            </p>

            {/* 5 Day Forecast Cards */}
            <div className='flex flex-col justify-between gap-4 mb-12 md:flex-row'>
              {fiveDayData && fiveDayData.forecast.forecastday
                ? fiveDayData.forecast.forecastday.map((day, index) => (
                    <ForecastCard key={index} className="text-center">
                    {/* Date */}
                      <p className="mb-2 text-sm font-semibold border-b">{new Date(day.date).toDateString().slice(0, 10)}</p>
                                    
                      {/* Temperature */}
                      {unit && unit === "fahrenheit" ? (
                        <p>{day.day.mintemp_f}° / {day.day.maxtemp_f}°</p>
                      ) : (
                        <p>{day.day.avgtemp_c}° C</p>
                      )}
                      
                      {/* Weather Image */}
                      <WeatherImage
                        src={`https:${day.day.condition.icon}`}
                        alt='Image'
                        width={50}
                        height={50}
                        className="mx-auto mb-4 -mt-4"
                      />
                      
                      {/* Condition */}
                      <p className="line-clamp-1">{day.day.condition.text}</p>
                    </ForecastCard>
                  ))
                : "No forecast data available."}
            </div>
          </div>
        </Result>
      </ResultsContainer>
    </ResultsWrapper>
  );
};

export default Results;
