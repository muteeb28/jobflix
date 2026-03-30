"use client";

import { motion } from "framer-motion";
import { IconCode, IconDeviceLaptop, IconUsers, IconCertificate } from "@tabler/icons-react";
import { CornerBracket } from "@/components/ui/aceternity-decorations";

const features = [
  {
    title: "Interactive Learning",
    description: "Learn by doing with interactive coding environments and real-time feedback.",
    icon: <IconCode className="w-5 h-5 text-emerald-500" />,
  },
  {
    title: "Real-world Projects",
    description: "Build a portfolio of professional-grade projects to showcase to employers.",
    icon: <IconDeviceLaptop className="w-5 h-5 text-emerald-500" />,
  },
  {
    title: "Expert Mentorship",
    description: "Get guidance from industry veterans who have worked at top tech companies.",
    icon: <IconUsers className="w-5 h-5 text-emerald-500" />,
  },
  {
    title: "Recognized Certificates",
    description: "Earn certificates upon completion to validate your skills and boost your resume.",
    icon: <IconCertificate className="w-5 h-5 text-emerald-500" />,
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-white px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-mono uppercase tracking-widest text-emerald-500 mb-2">Why us</p>
          <h2
            className="text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight mb-3"
            style={{ fontFamily: "var(--font-bricolage)" }}
          >
            Why Choose Level Up?
          </h2>
          <p className="text-neutral-500 text-base max-w-xl">
            Everything you need to go from beginner to job-ready engineer.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="group relative bg-white border border-neutral-200 rounded-2xl p-5 hover:border-emerald-300 hover:shadow-[0_8px_32px_rgba(16,185,129,0.1)] transition-all duration-300"
            >
              <CornerBracket className="absolute top-0 left-0 opacity-40 group-hover:opacity-70 transition-opacity" />
              <CornerBracket className="absolute top-0 right-0 rotate-90 opacity-40 group-hover:opacity-70 transition-opacity" />
              <CornerBracket className="absolute bottom-0 left-0 -rotate-90 opacity-40 group-hover:opacity-70 transition-opacity" />
              <CornerBracket className="absolute bottom-0 right-0 rotate-180 opacity-40 group-hover:opacity-70 transition-opacity" />

              <div className="w-10 h-10 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-[15px] font-bold text-neutral-800 mb-2 leading-snug">
                {feature.title}
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
