"use client";
import WorldMap from "@/components/ui/world-map";
import { motion } from "framer-motion";

export default function WorldMapDemo() {
  return (
    <div className="py-20 dark:bg-black bg-white w-full">
      <div className="max-w-7xl mx-auto text-center px-4">
        <p className="font-bold text-2xl md:text-5xl dark:text-white text-black tracking-tight">
          Our alumni are from{" "}
          <span className="text-emerald-500">
            {"everywhere".split("").map((word, idx) => (
              <motion.span
                key={idx}
                className="inline-block"
                initial={{ x: -10, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </p>
        <p className="text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto py-6 leading-relaxed">
          From top tech hubs to remote corners of the globe, Jobflix alumni are
          building the future of engineering — one offer at a time.
        </p>
      </div>
      <div className="max-w-5xl mx-auto">
        <WorldMap
          dots={[
            {
              start: { lat: 64.2008, lng: -149.4937 }, // Alaska
              end: { lat: 34.0522, lng: -118.2437 },   // Los Angeles
            },
            {
              start: { lat: 64.2008, lng: -149.4937 }, // Alaska
              end: { lat: -15.7975, lng: -47.8919 },   // Brazil
            },
            {
              start: { lat: -15.7975, lng: -47.8919 }, // Brazil
              end: { lat: 38.7223, lng: -9.1393 },     // Lisbon
            },
            {
              start: { lat: 51.5074, lng: -0.1278 },   // London
              end: { lat: 28.6139, lng: 77.209 },      // New Delhi
            },
            {
              start: { lat: 28.6139, lng: 77.209 },    // New Delhi
              end: { lat: 43.1332, lng: 131.9113 },    // Vladivostok
            },
            {
              start: { lat: 28.6139, lng: 77.209 },    // New Delhi
              end: { lat: -1.2921, lng: 36.8219 },     // Nairobi
            },
          ]}
          avatars={[
            {
              lat: 28.6139,
              lng: 77.209,
              src: "/alumni/avatar1.png",
              name: "Aryan S.",         // South Asian man – New Delhi 🇮🇳
            },
            {
              lat: -1.2921,
              lng: 36.8219,
              src: "/alumni/avatar2.png",
              name: "Amara N.",         // Black African woman – Nairobi 🇰🇪
            },
            {
              lat: 43.1332,
              lng: 131.9113,
              src: "/alumni/avatar3.png",
              name: "Mei L.",           // East Asian woman – Vladivostok 🇷🇺
            },
            {
              lat: -15.7975,
              lng: -47.8919,
              src: "/alumni/avatar4.png",
              name: "Carlos M.",        // Latino man – Brazil 🇧🇷
            },
            {
              lat: 51.5074,
              lng: -0.1278,
              src: "/alumni/avatar5.png",
              name: "Omar K.",          // Middle Eastern man – London 🇬🇧
            },
            {
              lat: 64.2008,
              lng: -149.4937,
              src: "/alumni/avatar6.png",
              name: "Rahul S.",         // Indian diaspora – Alaska 🇮🇳
            },
            {
              lat: 34.0522,
              lng: -118.2437,
              src: "/alumni/avatar7.png",
              name: "Omar Al-Rashid",   // Arabic – Los Angeles 🇸🇦
            },
            {
              lat: 38.7223,
              lng: -9.1393,
              src: "/alumni/avatar8.png",
              name: "Priya S.",         // Indian – Lisbon 🇮🇳
            },
          ]}
        />
      </div>
    </div>
  );
}
