import tw from "tailwind-styled-components";

export const InputFormWrapper = tw.section`
    size-full
    min-h-[592px]
    border 
    border-white/50 
    p-2 
    rounded-lg 
    bg-slate-800 
    flex justify-center items-center
`;

export const InputFormContainer = tw.div`
    flex 
    flex-col 
    gap-3 
    w-full 
    justify-center
    items-center
    p-4
`;

export const InputFormInput = tw.input`
    w-full 
    p-2 
    border 
    border-black
    rounded-lg
`;
