"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function FloatingLogo() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="fixed top-6 left-6 z-50"
    >
      <motion.div
        className="flex items-center bg-white/20 backdrop-blur-md border border-neutral-200 rounded-full px-4 py-2"
        whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.3)" }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="relative w-24 h-6">
          <Image
            src="/assets/files/jobflix-light-logo.png"
            alt="JobFlix Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <motion.div
          className="ml-2 w-2 h-2 bg-orange-500 rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
}