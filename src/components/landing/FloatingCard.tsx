"use client";
import { motion } from "framer-motion";
import React from "react";

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  showBrackets?: boolean;
  tabText?: string;
}

export function FloatingCard({
  children,
  className = "",
  style,
  showBrackets = true,
  tabText,
}: FloatingCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`relative bg-white/70 dark:bg-[#09090b]/40 backdrop-blur-xl rounded-2xl rounded-tl-none border border-neutral-200/60 dark:border-white/[0.08] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] group/card ${className}`}
      style={style}
    >
      {tabText && (
        <div className="absolute -top-[21px] left-[-0.5px] h-[22px] px-3 bg-white/70 dark:bg-[#09090b]/40 backdrop-blur-xl border-t border-l border-r border-neutral-200/60 dark:border-white/[0.08] rounded-t-lg flex items-center">
          <span className="text-[9px] font-bold text-neutral-400 dark:text-zinc-500 whitespace-nowrap uppercase tracking-wider">
            {tabText}
          </span>
        </div>
      )}
      
      {/* Subtle inner glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none rounded-2xl rounded-tl-none" />
      
      {showBrackets && (
        <>
          <span className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-brand-500/20 dark:border-brand-400/10 rounded-tl-lg group-hover/card:border-brand-500/40 transition-colors" />
          <span className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-brand-500/20 dark:border-brand-400/10 rounded-tr-lg group-hover/card:border-brand-500/40 transition-colors" />
          <span className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-brand-500/20 dark:border-brand-400/10 rounded-bl-lg group-hover/card:border-brand-500/40 transition-colors" />
          <span className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-brand-500/20 dark:border-brand-400/10 rounded-br-lg group-hover/card:border-brand-500/40 transition-colors" />
        </>
      )}
      
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
