import tw from "tailwind-styled-components";

export const ChatBubbleWrapper = tw.div`
    absolute
    flex
    items-start
    pointer-events-none
    ${(p) =>
      p.$isLeft
        ? "justify-start left-[21rem] top-[32rem] z-10"
        : "justify-end right-[18rem] top-[42rem] -z-10"}
`;

export const ChatBubbleContent = tw.div`
  max-w-[75%]
  p-4
  rounded-lg
  ${(p) =>
    p.$isLeft
      ? "bg-blue-500 text-white rounded-tl-none"
      : "bg-gray-200 text-gray-800 rounded-tr-none"}
`;
