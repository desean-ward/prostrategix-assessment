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
          <div className='flex justify-center items-center '>
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
      localStorage.removeItem("forecast-unit");
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

          {/* City Name */}
          <p id='city'>{fiveDayData.location.name}</p>

          {/* Favorite Checkbox */}
          <p id='favorite' className='mb-4'>
            <input
              type='checkbox'
              className='mr-2'
              checked={isChecked}
              onClick={handleCheckboxChange}
            />
            Save As Favorite
          </p>

          {/* 5 Day Forecast */}
          <div className='mt-2 relative px-8'>
            <p
              id='forcast-text'
              className='border-b border-white/50 text-center text-xl pb-2 mb-4'
            >
              5 Day Forecast
            </p>

            {/* 5 Day Forecast Cards */}
            <div className='flex flex-col md:flex-row justify-between gap-4 mb-12'>
              {fiveDayData && fiveDayData.forecast.forecastday
                ? fiveDayData.forecast.forecastday.map((day, index) => (
                    <ForecastCard key={index}>
                      <p>{new Date(day.date).toLocaleDateString("en-US")}</p>
                      <p className='line-clamp-1'>{day.day.condition.text}</p>
                      {unit && unit === "fahrenheit" ? (
                        <p>{day.day.avgtemp_f}° F</p>
                      ) : (
                        <p>{day.day.avgtemp_c}° C</p>
                      )}
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
