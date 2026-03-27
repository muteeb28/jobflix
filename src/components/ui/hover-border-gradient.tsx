"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HoverBorderGradientProps {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
  as?: React.ElementType;
  duration?: number;
  clockwise?: boolean;
  [key: string]: any;
}

export const HoverBorderGradient = ({
  children,
  containerClassName,
  className,
  as: Component = "button",
  duration = 1,
  clockwise = true,
  ...otherProps
}: HoverBorderGradientProps) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<string>("top");

  const radialGradientSize = hovered ? 400 : 0;

  const gradientDirection = clockwise ? "clockwise" : "counterclockwise";

  return (
    <Component
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex rounded-full border content-center bg-white/20 hover:bg-neutral-100 transition duration-500 dark:bg-white/20 items-center flex-col flex-shrink-0 overflow-hidden",
        containerClassName
      )}
      {...otherProps}
    >
      <div
        className={cn(
          "w-auto text-neutral-900 dark:text-neutral-900 z-10 bg-white px-4 py-2 rounded-[inherit]",
          className
        )}
      >
        {children}
      </div>
      <motion.div
        className={cn(
          "flex-shrink-0 rounded-[inherit] absolute inset-0 opacity-0 transition duration-500",
          hovered && "opacity-100"
        )}
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, #ffffff 60deg, #d4d4d4 120deg, #a3a3a3 180deg, #d4d4d4 240deg, #ffffff 300deg, transparent 360deg)`,
          animation: hovered ? `spin ${duration}s linear infinite ${gradientDirection === 'clockwise' ? 'normal' : 'reverse'}` : undefined,
        }}
      />
      <div className={cn("bg-white absolute z-1 flex-shrink-0 rounded-[inherit] inset-[2px]")} />
    </Component>
  );
};