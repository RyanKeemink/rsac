"use client";
import React, { useEffect, useState, useRef } from "react";

export function RotatingTagline({ taglines }: { taglines: string[] }) {
  const [current, setCurrent] = useState(0);
  const slotRef = useRef<HTMLSpanElement>(null);
  const [slotHeight, setSlotHeight] = useState(20); // fallback px

  useEffect(() => {
    if (slotRef.current) {
      const style = getComputedStyle(slotRef.current);
      const height = style.getPropertyValue("--slot-word-height");
      // Convert rem to px
      if (height.includes("rem")) {
        const rem = parseFloat(height);
        setSlotHeight(
          rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
        );
      } else if (height.includes("px")) {
        setSlotHeight(parseFloat(height));
      }
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % taglines.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [taglines]);

  return (
    <p className="text-lg font-medium drop-shadow-lg flex justify-center items-center">
      Kom{" "}
      <span className="rotating-slot mx-2" ref={slotRef}>
        <span
          className="rotating-slot-inner"
          style={{
            transform: `translateY(-${current * slotHeight}px)`,
          }}
        >
          {taglines.map((word, i) => (
            <span className="rotating-slot-word" key={i}>
              {word}
            </span>
          ))}
        </span>
      </span>
      met ons
    </p>
  );
}