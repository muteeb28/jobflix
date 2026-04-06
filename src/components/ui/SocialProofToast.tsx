"use client";

import { useEffect, useState, useCallback } from "react";
import { X, Star } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const SOCIAL_PROOF_MESSAGES = [
  { city: "Mumbai", action: "just signed up for Jobflix" },
  { city: "Bangalore", action: "just optimized their resume" },
  { city: "Delhi", action: "subscribed to Premium recently" },
  { city: "Hyderabad", action: "just landed an interview" },
  { city: "Pune", action: "just joined the community" },
  { city: "Chennai", action: "just applied to 3 jobs" },
  { city: "Kolkata", action: "just completed a mock interview" },
  { city: "Noida", action: "subscribed to Premium recently" },
  { city: "United States", action: "subscribed to Premium recently" },
  { city: "United Kingdom", action: "just signed up for Jobflix" },
  { city: "Canada", action: "just optimized their resume" },
  { city: "Singapore", action: "subscribed to Premium recently" },
];

export default function SocialProofToast() {
  const [isVisible, setIsVisible] = useState(false);
  const [lastCity, setLastCity] = useState("");
  const [currentMessage, setCurrentMessage] = useState(SOCIAL_PROOF_MESSAGES[0]);
  const [mounted, setMounted] = useState(false);
  
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const getRandomMessage = useCallback(() => {
    let newMsg;
    do {
      newMsg = SOCIAL_PROOF_MESSAGES[Math.floor(Math.random() * SOCIAL_PROOF_MESSAGES.length)];
    } while (newMsg.city === lastCity && SOCIAL_PROOF_MESSAGES.length > 1);
    
    setLastCity(newMsg.city);
    return newMsg;
  }, [lastCity]);

  const showToast = useCallback(() => {
    setCurrentMessage(getRandomMessage());
    setIsVisible(true);
    
    setTimeout(() => {
      setIsVisible(false);
    }, 6000);
  }, [getRandomMessage]);

  useEffect(() => {
    if (!mounted) return;
    
    const initialTimer = setTimeout(() => {
      showToast();
      
      const intervalTimer = setInterval(() => {
        showToast();
      }, 300000);
      
      return () => clearInterval(intervalTimer);
    }, 8000);
    
    return () => clearTimeout(initialTimer);
  }, [mounted, showToast]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 120 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: shouldReduceMotion ? 0 : 120 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative flex items-center bg-white dark:bg-[#1A1A1A] border border-neutral-200 dark:border-white/[0.08] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.12)] p-3 pointer-events-auto"
          style={{ width: "min(calc(100vw - 32px), 280px)" }}
        >
          <div className="flex items-center gap-3 w-full">
            <div
              className="flex items-center justify-center rounded-xl shrink-0 w-10 h-10"
              style={{ backgroundColor: "#FEF08A" }}
            >
              <Star className="w-5 h-5 text-yellow-700 fill-yellow-700" />
            </div>

            <div className="flex flex-col pr-4">
              <span className="text-[13px] font-semibold text-neutral-900 dark:text-zinc-100 leading-tight" style={{ fontFamily: "var(--font-sora, sans-serif)" }}>
                Someone from {currentMessage.city}
              </span>
              <span className="text-[12px] text-neutral-500 dark:text-zinc-400 mt-0.5" style={{ fontFamily: "var(--font-dm-sans, sans-serif)" }}>
                {currentMessage.action}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 p-1 text-neutral-400 hover:text-neutral-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
