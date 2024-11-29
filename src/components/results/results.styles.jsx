import Image from "next/image";
import tw from "tailwind-styled-components";

export const ResultsWrapper = tw.section`
    size-full 
    max-h-[592px]
    border 
    border-white/50
    rounded-lg 
    bg-slate-800
    flex 
    flex-col 
    justify-center
    items-center
`;

export const ResultsContainer = tw.div`
    flex 
    flex-col 
    justify-center
    pb-4 
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
    flex 
    flex-col 
    border 
    rounded-lg 
    p-2 
    align-center
`;
