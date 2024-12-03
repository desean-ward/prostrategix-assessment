import tw from "tailwind-styled-components";

export const HomeWrapper = tw.div`
    w-full 
    h-full
    min-h-screen
    bg-gradient-to-b from-black from-50%  to-slate-900
    overflow-hidden
`;

export const HomeContainer = tw.div`
    flex 
    flex-col
    lg:flex-row
    justy-center 
    items-center
    size-full
    lg:h-fit
    absolute 
    py-4 
    px-4
    pb-8
    md:p-8
    lg:px-48   
    gap-4

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
