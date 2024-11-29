import Image from "next/image";
import tw from "tailwind-styled-components";

export const ResultsWrapper = tw.section`
    size-full 
    border 
    border-white/50
    rounded-lg 
    bg-slate-800
    relative
`;

export const ResultsContainer = tw.div`
    flex 
    flex-col 
    py-8 
   
    
`;

export const Result = tw.div`
    flex 
    flex-col 
    gap-3
    items-center
rounded-lg 
`;

export const WeatherImage = tw(Image)`
    w-full
`;
