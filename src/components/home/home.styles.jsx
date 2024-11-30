import tw from "tailwind-styled-components";

export const HomeWrapper = tw.div`
    w-full 
    h-screen
`;

export const HomeContainer = tw.div`
    flex 
    flex-col
    lg:flex-row
    justy-center 
    items-center
    w-full
    lg:h-fit
    absolute 
    top-40
    px-4
    md:px-12
    lg:px-48   

    lg:grid 
    grid-cols-2 
    grid-rows-1
    gap-8    
    top-1/2 
    lg:left-1/2 
    transform 
    lg:-translate-x-1/2 
    -translate-y-1/2
`;
