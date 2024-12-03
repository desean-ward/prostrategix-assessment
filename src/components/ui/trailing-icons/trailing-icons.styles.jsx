import tw from "tailwind-styled-components";

export const IconTrail = tw.div`
  absolute 
  w-16 
  h-16
  bg-transparent 
  transform 
  transition-transform 
  duration-200 
  ease-out
`;

export const TrailWrapper = tw.div`
  absolute 
  inset-0 
  pointer-events-none
  bg-transparent
  z-[9999]
`;
