import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";

const AnimatedButton = () => {
  useGSAP(() => {
    gsap.from("#submit", {
      opacity: 0,
      duration: 0.2,
      delay: 0.8,
      ease: "easeInOut",
    });
  });

  return (
    <button
      id='submit'
      className='relative inline-flex h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none shadow-lg shadow-black'
    >
      <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#F0A606_0%,#393BB2_50%,#E2CBFF_100%)]' />
      <span className='inline-flex items-center justify-center w-full h-full px-3 py-1 text-xl font-medium text-white rounded-lg cursor-pointer bg-slate-950 hover:bg-slate-900 backdrop-blur-3xl'>
        Enter
      </span>{" "}
    </button>
  );
};

export default AnimatedButton;
