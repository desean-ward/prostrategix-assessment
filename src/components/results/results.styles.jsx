import Image from "next/image";
import tw from "tailwind-styled-components";

export const ResultsWrapper = tw.section`
    size-full 
    max-h-[592px]
    border 
    border-white/50
    rounded-lg 
    bg-slate-700
    flex 
    flex-col 
    justify-center
    items-center
    p-5
`;

export const ResultsContainer = tw.div`
    flex 
    flex-col 
    justify-center
    size-full
    bg-gradient-to-b from-black to-slate-800
    shadow-2xl
    shadow-black
 
`;

export const Result = tw.div`
    flex 
    flex-col 
    gap-3
    items-center
    rounded-lg 
`;

export const WeatherImage = tw(Image)`
    relative 
    top-4
`;

export const ForecastCard = tw.div`
    forecast 
    w-full 
    min-w-[120px]
    flex 
    flex-col 
    border 
    rounded-lg 
    p-2 
    align-center
`;
