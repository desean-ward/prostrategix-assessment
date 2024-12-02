import Image from "next/image";
import tw from "tailwind-styled-components";

export const WeatherPersonWrapper = tw.section`
    inset-0
    absolute 
    hidden 
    lg:block
`;

export const WeatherPersonContainer = tw.div`
    relative
`;

export const WeatherPersonImage = tw(Image)`
    absolute 
    pointer-events-none
`;
