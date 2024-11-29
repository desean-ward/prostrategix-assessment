import tw from "tailwind-styled-components";

export const InputFormWrapper = tw.section`
    size-full
    min-h-[592px]
    border 
    border-white/50 
    p-5 
    rounded-lg 
    bg-slate-700 
    text-white
    flex justify-center items-center
`;

export const InputFormContainer = tw.div`
    flex 
    flex-col 
    gap-3 
    size-full 
    justify-center
    items-center
    bg-gradient-to-b from-black to-slate-800
    text-white
    shadow-2xl
    shadow-black
    px-12
`;

export const InputFormInput = tw.input`
    w-full 
    p-2 
    border 
    border-black
    rounded-lg
    text-black
`;
