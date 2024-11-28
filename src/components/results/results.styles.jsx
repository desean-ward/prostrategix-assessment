import Image from "next/image";
import tw from "tailwind-styled-components";

export const ResultsWrapper = tw.section`
    w-full 
    border 
    border-white/50
    rounded-lg 
    bg-slate-700
    relative
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
    p-2 
    rounded-lg 
    bg-slate-700
`;

export const WeatherImage = tw(Image)`
    w-full
`;
