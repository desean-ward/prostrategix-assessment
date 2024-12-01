import Image from "next/image";
import tw from "tailwind-styled-components";

export const ResultsWrapper = tw.section`
    w-full 
    md:size-full
    lg:max-h-[592px]
    border 
    border-white/50
    rounded-lg 
    bg-slate-700
    flex 
    flex-col 
    justify-center
    items-center
    p-5 
    pb-8 
    translate-x-[100%] 
    opacity-0 
    transition-none
`;

export const ResultsContainer = tw.div`
    card
    flex 
    flex-col 
    md:flex-row
    justify-center
    size-full
    lg:size-full
    bg-gradient-to-b from-black to-slate-800
    shadow-2xl
    shadow-black
    px-8
    rounded-lg
`;

export const Result = tw.div`
    flex 
    flex-col 
    gap-3
    items-center
    rounded-lg 
    w-full
`;

export const WeatherImage = tw(Image)`
    relative 
`;

export const ForecastCard = tw.div`
    relative 
    flex 
    flex-col 
    w-full 
    gap-2 
    p-2
    border 
    border-[#F0A606]
    rounded-lg  
    h-fit 
    forecast 
    align-center 
    shadow-lg 
    shadow-black
`;
