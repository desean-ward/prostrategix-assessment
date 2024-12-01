import tw from "tailwind-styled-components";

export const InputFormWrapper = tw.section`
    size-full 
    min-h-[592px]
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
`;

export const InputFormContainer = tw.div`
    flex 
    flex-col 
    gap-3 
    size-full 
    md:justify-center
    md:items-center
    bg-gradient-to-b from-black to-slate-800
    text-white
    shadow-2xl
    shadow-black
    md:px-12 
    rounded-lg
`;

export const InputFormInput = tw.input`
    w-full 
    p-2 
    border 
    border-black
    rounded-lg
    text-black
`;
