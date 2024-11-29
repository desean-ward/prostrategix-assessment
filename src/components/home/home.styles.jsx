import tw from "tailwind-styled-components";

export const HomeWrapper = tw.div`
    flex 
    flex-col
    justify-center  
    h-screen
    w-full 
    mx-auto
    px-24
`;

export const HomeContainer = tw.div`
    grid 
    grid-cols-1
    md:grid-cols-2 
    grid-rows-2 
    md:grid-rows-1
    gap-8
`;
