"use client";
import React, { useEffect, useState } from "react";
import { IconTrail, TrailWrapper } from "./trailing-icons.styles";
import Image from "next/image";

const TrailingIcons = ({ icon }) => {
  const [trail, setTrail] = useState([]);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isMouseMoving, setIsMouseMoving] = useState(false); // Tracks if the mouse is moving
  const [opacity, setOpacity] = useState(1); // Controls the opacity of the trail

  useEffect(() => {
    let stopTimer;

    const handleMouseMove = (e) => {
      setIsMouseMoving(true); // Show the trail on movement
      setOpacity(1); // Reset opacity to fully visible
      setCursorPos({ x: e.clientX, y: e.clientY });

      // Add a new trail icon at the cursor position
      setTrail((prevTrail) => [...prevTrail, { x: e.clientX, y: e.clientY }]);

      // Reset the fade-out timer
      clearTimeout(stopTimer);
      stopTimer = setTimeout(() => {
        setIsMouseMoving(false); // Stop mouse movement
        fadeOutTrail(); // Begin fading out
      }, 50); // 200ms delay after stopping
    };

    const fadeOutTrail = () => {
      let fadeTimer = setInterval(() => {
        setOpacity((prev) => {
          if (prev <= 0) {
            clearInterval(fadeTimer); // Stop fading once opacity reaches 0
            setTrail([]); // Clear the trail completely
            return 0;
          }
          return prev - 0.150; // Decrease opacity gradually
        });
      }, 50); // Fade step every 50ms
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(stopTimer);
    };
  }, []);

  useEffect(() => {
    if (trail.length > 20) {
      // Limit the length of the trail
      setTrail((prevTrail) => prevTrail.slice(1));
    }
  }, [trail]);

  return (
    <TrailWrapper>
      {trail
        .slice()
        .reverse() // Reverse to make the largest icon closest to the cursor
        .map((position, index) => (
          <IconTrail
            key={index}
            style={{
              left: `${position.x + 8}px`, // Offset by 0.5rem (8px)
              top: `${position.y + 8}px`,
              transform: `translate(-50%, -50%) scale(${1.2 - index * 0.05})`,
              opacity: `${opacity * (1 - index * 0.05)}`, // Combine trail opacity with global opacity
            }}
          >
            <Image
              src={icon}
              width={24}
              height={24}
              alt="icon"
              className="w-12 h-12"
            />
          </IconTrail>
        ))}
    </TrailWrapper>
  );
};

export default TrailingIcons;
