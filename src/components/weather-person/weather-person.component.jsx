"use client";
import { useGSAP } from "@gsap/react";
import {
  WeatherPersonContainer,
  WeatherPersonImage,
  WeatherPersonWrapper,
} from "./weather-person.styles";
import gsap from "gsap";
import useWeatherStore from "@/app/stores/weather-store";
import ChatBubble from "../chat-bubble/chat-bubble.component";
import { useState } from "react";

const WeatherPerson = () => {
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

  const [entered, setEntered] = useState(false);

  // Animate the weather people and chat bubbles together
  useGSAP(() => {
    if (loading || !fiveDayData) return;

    const timeline = gsap.timeline();

    // Animate the "man" image
    timeline.from("#man", {
      x: -100,
      opacity: 0,
      duration: 0.5,
      ease: "easeIn",
    });

    // Animate the "woman" image
    timeline.from("#woman", {
      x: 100,
      opacity: 0,
      duration: 0.5,
      ease: "easeIn",
      delay: -0.5,
    });

    // Animate chat bubbles after the images
    timeline
      .from("#leftChat", {
        x: -300,
        opacity: 0,
        duration: 0.5,
        ease: "easeIn",
        delay: 1.5,
      })
      .from("#rightChat", {
        x: 300,
        opacity: 0,
        duration: 0.5,
        ease: "easeIn",
        delay: 1,
      });
  }, [loading, fiveDayData]);

  if (loading || !fiveDayData) {
    // While loading, do not render the images
    return null;
  }

  // Get all of the lowest and highest temperatures
  const loTempsF =
    fiveDayData && fiveDayData.forecast.forecastday
      ? fiveDayData.forecast.forecastday.map((day) => day.day.mintemp_f)
      : [];

  const hiTempsF =
    fiveDayData && fiveDayData.forecast.forecastday
      ? fiveDayData.forecast.forecastday.map((day) => day.day.maxtemp_f)
      : [];

  const loTempsC =
    fiveDayData && fiveDayData.forecast.forecastday
      ? fiveDayData.forecast.forecastday.map((day) => day.day.mintemp_c)
      : [];

  const hiTempsC =
    fiveDayData && fiveDayData.forecast.forecastday
      ? fiveDayData.forecast.forecastday.map((day) => day.day.maxtemp_c)
      : [];

  // Get the single lowest and highest temperatures
  const lowestTempF = Math.min(...loTempsF);
  const highestTempF = Math.max(...hiTempsF);
  const lowestTempC = Math.min(...loTempsC);
  const highestTempC = Math.max(...hiTempsC);

  // Convert the lowest and highest temperatures
  const lowestTemp = unit === "fahrenheit" ? lowestTempF : lowestTempC;
  const highestTemp = unit === "fahrenheit" ? highestTempF : highestTempC;

  // Construct the left messages
  const leftMessage = `Today's current temperature in ${
    fiveDayData.location.name
  } is  ${
    unit === "fahrenheit"
      ? `${fiveDayData.current.temp_f}°F`
      : `${fiveDayData.current.temp_c}°C`
  }, with ${fiveDayData.current.condition.text.toLowerCase()} skies.`;

  console.log("UNIT: ", unit);
  // Construct the right messages
  const rightMessage = `Over the next several days, we have temperatures ranging from  as low as  ${
    unit === "fahrenheit" ? `${lowestTemp}°F` : `${lowestTemp}°C`
  }  to highs of  ${
    unit === "fahrenheit" ? `${highestTemp}°F` : `${highestTemp}°C`
  }.`;

  return (
    <WeatherPersonWrapper>
      <WeatherPersonContainer>
        <div>
          {/* Left Chat Bubble */}
          <ChatBubble id='leftChat' message={leftMessage} isLeft />

          <WeatherPersonImage
            id='man'
            src='/images/man-left-1.png'
            alt='Weather Man Image'
            width={500}
            height={600}
            className='z-10 size-fit top-72 -left-10'
          />
        </div>

        {/* Weather Woman Image */}
        <div className='flex'>
          {/* Right Chat Bubble */}
          <ChatBubble id='rightChat' message={rightMessage} isRight />
          <WeatherPersonImage
            id='woman'
            src='/images/woman-right-1.png'
            alt='Weather Woman Image'
            width={300}
            height={400}
            className='right-0 z-10 top-80 size-fit'
          />
        </div>
      </WeatherPersonContainer>
    </WeatherPersonWrapper>
  );
};

export default WeatherPerson;
