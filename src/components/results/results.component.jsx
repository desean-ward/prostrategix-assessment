import React, { useContext, useEffect } from "react";
import { Result, ResultsContainer, ResultsWrapper } from "./results.styles";
import Image from "next/image";
import { GridLoader } from "react-spinners";
import { MyContext } from "@/context/context";

const Results = () => {
  const { unit, setUnit, weatherData, setWeatherData, loading, setLoading } =
    useContext(MyContext);

  if (loading && weatherData === null)
    return (
      <ResultsWrapper>
        <ResultsContainer>
          <div className='flex justify-center items-center absolute inset-0'>
            <GridLoader color='white' />
          </div>
        </ResultsContainer>
      </ResultsWrapper>
    );

  let imgUrl;
  weatherData
    ? (imgUrl = `https:${weatherData.current.condition.icon}`)
    : (imgUrl = "");

  let tempUnit;
  unit ? (tempUnit = unit) : (tempUnit = "fahrenheit");

  return (
    <ResultsWrapper>
      <ResultsContainer>
        <Result className={loading ? "hidden" : ""}>
          <Image src={imgUrl} alt='Image' width={100} height={100} />

          {unit && unit === "fahrenheit" ? (
            <p className='text-3xl'>{weatherData.current.temp_f}° F</p>
          ) : (
            <p className='text-3xl'>{weatherData.current.temp_c}° C</p>
          )}
          <p>{weatherData.location.name}</p>
          <p className='text-3xl'>{weatherData.current.condition.text}</p>
        </Result>
      </ResultsContainer>
    </ResultsWrapper>
  );
};

export default Results;
