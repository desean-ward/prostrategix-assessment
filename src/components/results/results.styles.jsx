import Image from "next/image";
import tw from "tailwind-styled-components";

export const ResultsWrapper = tw.div`
    w-full 
    border 
    rounded-lg 
    bg-slate-700
    relative
    top-24
`;

export const ResultsContainer = tw.div`
    flex 
    flex-col 
    gap-3 
    w-full 
    justify-center
    items-center
`;

export const Result = tw.div`
    w-full 
    flex 
    flex-col 
    gap-3
    items-center
    border 
    p-2 
    rounded-lg 
    bg-slate-700
`;

export const WeatherImage = tw(Image)`
    w-full
`;
