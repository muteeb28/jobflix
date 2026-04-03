"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map";
import { useTheme } from "@/context/ThemeContext";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
  avatars?: Array<{
    lat: number;
    lng: number;
    src: string;
    name?: string;
  }>;
}

export default function WorldMap({
  dots = [],
  lineColor = "#00B5A3",
  avatars = [],
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const map = new DottedMap({ height: 100, grid: "diagonal" });

  const { theme } = useTheme();

  const svgMap = map.getSVG({
    radius: 0.22,
    color: theme === "dark" ? "#FFFFFF40" : "#00000040",
    shape: "circle",
    backgroundColor: theme === "dark" ? "black" : "white",
  });

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  const AVATAR_SIZE = 22;
  const AVATAR_BORDER = 2;

  return (
    <div className="w-full aspect-[2/1] dark:bg-black bg-white rounded-lg relative font-sans">
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
        alt="world map"
        height="495"
        width="1056"
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          {/* Clip paths for each avatar */}
          {avatars.map((_, i) => (
            <clipPath key={`clip-${i}`} id={`avatar-clip-${i}`}>
              <circle cx="0" cy="0" r={AVATAR_SIZE / 2} />
            </clipPath>
          ))}
        </defs>

        {/* Animated connection paths */}
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 1.5,
                  delay: 0.5 * i,
                  ease: "easeOut",
                }}
              />
            </g>
          );
        })}

        {/* Pulse dots at all connection endpoints (without avatars) */}
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          const hasStartAvatar = avatars.some(
            (a) =>
              Math.abs(a.lat - dot.start.lat) < 0.01 &&
              Math.abs(a.lng - dot.start.lng) < 0.01
          );
          const hasEndAvatar = avatars.some(
            (a) =>
              Math.abs(a.lat - dot.end.lat) < 0.01 &&
              Math.abs(a.lng - dot.end.lng) < 0.01
          );

          return (
            <g key={`points-group-${i}`}>
              {!hasStartAvatar && (
                <g>
                  <circle cx={startPoint.x} cy={startPoint.y} r="2" fill={lineColor} />
                  <circle cx={startPoint.x} cy={startPoint.y} r="2" fill={lineColor} opacity="0.5">
                    <animate attributeName="r" from="2" to="8" dur="1.5s" begin="0s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" begin="0s" repeatCount="indefinite" />
                  </circle>
                </g>
              )}
              {!hasEndAvatar && (
                <g>
                  <circle cx={endPoint.x} cy={endPoint.y} r="2" fill={lineColor} />
                  <circle cx={endPoint.x} cy={endPoint.y} r="2" fill={lineColor} opacity="0.5">
                    <animate attributeName="r" from="2" to="8" dur="1.5s" begin="0s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" begin="0s" repeatCount="indefinite" />
                  </circle>
                </g>
              )}
            </g>
          );
        })}

        {/* Avatar images at designated points */}
        {avatars.map((avatar, i) => {
          const point = projectPoint(avatar.lat, avatar.lng);
          const half = AVATAR_SIZE / 2;
          return (
            <g key={`avatar-${i}`} transform={`translate(${point.x}, ${point.y})`}>
              {/* Outer ring pulse */}
              <circle r={half + AVATAR_BORDER + 1} fill="none" stroke={lineColor} strokeWidth="1.5" opacity="0.6">
                <animate attributeName="r" from={half + AVATAR_BORDER} to={half + AVATAR_BORDER + 5} dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.6" to="0" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
              </circle>
              {/* White border ring */}
              <circle r={half + AVATAR_BORDER} fill="white" stroke={lineColor} strokeWidth="1.5" />
              {/* Avatar image clipped to circle */}
              <image
                href={avatar.src}
                x={-half}
                y={-half}
                width={AVATAR_SIZE}
                height={AVATAR_SIZE}
                clipPath={`url(#avatar-clip-${i})`}
                preserveAspectRatio="xMidYMid slice"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
