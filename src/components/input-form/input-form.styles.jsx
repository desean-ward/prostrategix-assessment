import AnimatedButton from "@/app/ui/animated-button/animated-button.ui";
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
    mt-36
    md:mt-16
    lg:mt-0
`;

export const InputFormContainer = tw.div`
    card
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

export const SubmitButton = tw(AnimatedButton)`

`