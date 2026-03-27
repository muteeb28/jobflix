"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";


export interface Node {
    text: string;
    type: "primary" | "secondary";
}

export interface Step {
    id: number;
    title: string;
    leftNodes: Node[];
    rightNodes: Node[];
}

export interface RoadmapData {
    title: string;
    description: string;
    steps: Step[];
}

export const GoogleGeminiEffect = ({
    title,
    description,
    className,
    roadmap
}: {
    title?: string;
    description?: string;
    className?: string;
    roadmap?: RoadmapData;
}) => {
    // Default fallback if no data provided
    const steps = roadmap?.steps || [];

    // Flatten nodes for desktop SVG mapping (fixed slots)
    const allLeftNodes = steps.flatMap(s => s.leftNodes);
    const allRightNodes = steps.flatMap(s => s.rightNodes);

    return (
        <div className={cn("relative pt-0 pb-10", className)}>
            <h2 className="text-3xl md:text-5xl font-bold text-center text-neutral-900 mb-6 uppercase font-pixel drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
                {title || roadmap?.title || `Build with Aceternity UI`}
            </h2>
            <p className="text-sm md:text-lg text-center text-neutral-500 max-w-2xl mx-auto mb-0 px-4">
                {description || roadmap?.description ||
                    `Scroll this component and see the bottom SVG come to life wow this
        works!`}
            </p>

            {/* Desktop View: Original SVG Animation */}
            <div className="relative w-full max-w-7xl mx-auto hidden md:flex items-center justify-center -mt-8 md:-mt-32">
                <div className="relative w-[1200px] h-[500px] scale-100 origin-center flex items-center justify-center">
                    {/* Connecting Lines SVG - Remains hardcoded as it defines geometry */}
                    <svg
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        viewBox="0 0 1200 500"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* ... existing SVG paths ... keep them as is for visual structure */}
                        {/* Left Connections */}
                        {/* Center 1 to Left 1 */}
                        <motion.path d="M 470 270 C 350 270 350 150 250 150" stroke="#3f3f46" strokeWidth="1.5" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }} />
                        {/* Center 1 to Left 2 */}
                        <motion.path d="M 470 270 C 350 270 350 225 250 225" stroke="#3f3f46" strokeWidth="1.5" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }} />
                        {/* Center 2 to Left 3 */}
                        <motion.path d="M 470 310 C 350 310 350 300 250 300" stroke="#ffffff" strokeOpacity="0.8" strokeWidth="1.5" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }} />
                        {/* Center 3 to Left 4 */}
                        <motion.path d="M 470 350 C 350 350 350 375 250 375" stroke="#3f3f46" strokeWidth="1.5" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }} />
                        {/* Center 3 to Left 5 */}
                        <motion.path d="M 470 350 C 350 350 350 450 230 450" stroke="#3f3f46" strokeWidth="1.5" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }} />

                        {/* Right Connections */}
                        {/* Center 1 to Right 1 */}
                        <motion.path d="M 750 270 C 850 270 850 150 970 150" stroke="#3f3f46" strokeWidth="1.5" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }} />
                        {/* Center 1 to Right 2 */}
                        <motion.path d="M 750 270 C 850 270 850 225 970 225" stroke="#3f3f46" strokeWidth="1.5" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }} />
                        {/* Center 2 to Right 3 */}
                        <motion.path d="M 750 310 C 850 310 850 300 970 300" stroke="#ffffff" strokeOpacity="0.8" strokeWidth="1.5" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }} />
                        {/* Center 3 to Right 4 */}
                        <motion.path d="M 750 350 C 850 350 850 375 970 375" stroke="#3f3f46" strokeWidth="1.5" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }} />
                        {/* Center 3 to Right 5 */}
                        <motion.path d="M 750 350 C 850 350 850 450 970 450" stroke="#3f3f46" strokeWidth="1.5" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }} />
                    </svg>

                    {/* Nodes Layer - Centered relative to the container */}
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">

                        {/* Center Block */}
                        <div className="absolute left-[470px] top-[250px] w-[280px] h-fit z-20 border border-neutral-200 bg-neutral-1000 rounded-xl p-4 flex flex-col gap-4 backdrop-blur-md shadow-2xl">
                            {steps.map((step, idx) => (
                                <div key={idx} className={cn("flex items-center gap-3 p-2 rounded-lg border h-10",
                                    step.id === 3 ? "bg-neutral-100 border-white/30 shadow-[0_0_15px_rgba(234,179,8,0.2)]" : "bg-neutral-100 border-white/5"
                                )}>
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-neutral-100 text-xs font-mono text-neutral-500">{step.id}</span>
                                    <span className={cn("text-sm font-medium", step.id === 3 ? "text-neutral-900" : "text-neutral-600")}>{step.title}</span>
                                </div>
                            ))}
                        </div>

                        {/* Left Nodes - Anchored based on SVG geometry */}
                        <div className="absolute right-[950px] top-0 bottom-0 w-[200px] flex flex-col justify-center gap-0 text-right pr-4">
                            {[135, 210, 285, 360, 435].map((top, idx) => {
                                const node = allLeftNodes[idx];
                                if (!node) return null;
                                return (
                                    <div key={idx} className="absolute right-0 h-[30px] flex items-center justify-end" style={{ top: `${top}px` }}>
                                        <span className={cn(
                                            "text-sm px-4 py-1.5 whitespace-nowrap",
                                            node.type === "primary"
                                                ? "text-neutral-900 border-l-2 border-white/30 bg-neutral-100 rounded-r-full"
                                                : "text-neutral-500 border border-neutral-200 bg-neutral-1000 rounded-full"
                                        )}>
                                            {node.text}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Right Nodes - Anchored based on SVG geometry */}
                        <div className="absolute left-[950px] top-0 bottom-0 w-[200px] flex flex-col justify-center gap-0 text-left pl-4">
                            {[135, 210, 285, 360, 435].map((top, idx) => {
                                const node = allRightNodes[idx];
                                if (!node) return null;
                                return (
                                    <div key={idx} className="absolute left-0 h-[30px] flex items-center justify-start" style={{ top: `${top}px` }}>
                                        <span className={cn(
                                            "text-sm px-4 py-1.5 whitespace-nowrap",
                                            node.type === "primary"
                                                ? "text-neutral-900 border-l-2 border-white/30 bg-neutral-100 rounded-r-full"
                                                : "text-neutral-500 border border-neutral-200 bg-neutral-1000 rounded-full"
                                        )}>
                                            {node.text}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile View: Vertical Roadmap Cards */}
            <div className="md:hidden flex flex-col gap-6 px-4 py-8 max-w-sm mx-auto">
                {steps.map((step) => (
                    <div key={step.id} className={cn(
                        "flex flex-col gap-4 border p-4 rounded-xl",
                        step.id === 3 ? "border-neutral-200 bg-neutral-100 relative overflow-hidden" : "border-neutral-200 bg-neutral-100"
                    )}>
                        {step.id === 3 && (
                            <div className="absolute top-0 right-0 w-24 h-24 bg-neutral-100 blur-2xl rounded-full translate-x-10 -translate-y-10" />
                        )}
                        <div className={cn("flex items-center gap-3 border-b  pb-3 relative z-10", step.id === 3 ? "border-white/5" : "border-white/5")}>
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-100 text-xs font-mono text-neutral-500 shrink-0">{step.id}</span>
                            <span className="text-neutral-900 font-medium text-base">{step.title}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 pl-2 relative z-10">
                            {[...step.leftNodes, ...step.rightNodes].map((node, idx) => (
                                <span key={idx} className={cn(
                                    "text-xs px-3 py-1",
                                    node.type === "primary"
                                        ? "text-neutral-900 border-l-2 border-white/30 bg-neutral-100 rounded-r-full"
                                        : "text-neutral-500 border border-neutral-200 bg-neutral-1000 rounded-full"
                                )}>
                                    {node.text}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
