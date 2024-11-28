import React, { useContext } from "react";
import { Result, ResultsContainer, ResultsWrapper } from "./results.styles";
import Image from "next/image";
import { GridLoader } from "react-spinners";
import { MyContext } from "@/context/context";

const Results = () => {
    const { unit, setUnit, weatherData, setWeatherData } = useContext(MyContext);

    if (!weatherData || weatherData === null || weatherData === undefined)
    return (
      <div>
        <GridLoader />
      </div>
    );
    
  let imgUrl;
  weatherData ? (imgUrl = `https:${weatherData.current.condition.icon}`) : (imgUrl = "");

  let tempUnit;
  unit ? (tempUnit = unit) : (tempUnit = "fahrenheit");

  return (
    <ResultsWrapper>
      <ResultsContainer>
        <Result>
        <Image src={imgUrl} alt='Image' width={100} height={100} />

        {unit && unit === "fahrenheit" ? (
          <p className='text-3xl'>{weatherData.current.temp_f}°F</p>
        ) : (
          <p className='text-3xl'>{weatherData.current.temp_c}°C</p>
        )}
        <p>{weatherData.location.name}</p>
        <p className='text-3xl'>{weatherData.current.condition.text}</p>

        </Result>
      </ResultsContainer>
    </ResultsWrapper>
  );
};

export default Results;
