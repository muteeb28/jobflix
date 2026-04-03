"use client";

import { motion } from "framer-motion";
import { Job } from "@/lib/data";
import { Briefcase, MapPin, DollarSign } from "lucide-react";

interface JobCardProps {
    job: Job;
}

export default function JobCard({ job }: JobCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="bg-neutral-100 border-4 border-neutral-200 p-6 hover:border-white/30 transition-colors group relative overflow-hidden"
        >
            {/* Pixel corner decorations */}
            <div className="absolute top-0 left-0 w-2 h-2 bg-gray-800 group-hover:bg-neutral-200 transition-colors" />
            <div className="absolute top-0 right-0 w-2 h-2 bg-gray-800 group-hover:bg-neutral-200 transition-colors" />
            <div className="absolute bottom-0 left-0 w-2 h-2 bg-gray-800 group-hover:bg-neutral-200 transition-colors" />
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-gray-800 group-hover:bg-neutral-200 transition-colors" />

            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                {/* Logo Placeholder */}
                <div className="w-16 h-16 bg-gray-800 border-2 border-neutral-200 flex items-center justify-center text-3xl shadow-[4px_4px_0_rgba(0,0,0,0.5)]">
                    {job.logo}
                </div>

                <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-2">
                        <span className="px-2 py-1 bg-neutral-100 text-neutral-900 text-xs font-bold uppercase tracking-wider border border-neutral-200">
                            {job.category}
                        </span>
                        <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/20">
                            {job.type}
                        </span>
                    </div>

                    <h3 className="text-xl font-bold text-neutral-900 mb-1 group-hover:text-brand-600 transition-colors font-pixel">
                        {job.title}
                    </h3>
                    <p className="text-neutral-900/60 font-mono text-sm mb-4">
                        {job.company} • {job.postedAt}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm text-neutral-900/80 font-mono">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            {job.location}
                        </div>
                        <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-gray-500" />
                            {job.salary}
                        </div>
                        <div className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-gray-500" />
                            {job.experienceLevel}
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-auto mt-4 md:mt-0">
                    <a href={job.url} target="_blank" rel="noopener noreferrer" className="block w-full md:w-auto">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full px-6 py-3 bg-brand-500 text-neutral-900 font-bold border-b-4 border-r-4 border-neutral-200 active:border-0 active:translate-y-1 transition-all uppercase text-sm tracking-wide"
                        >
                            Apply Now
                        </motion.button>
                    </a>
                </div>
            </div>

            {/* Skills Tags */}
            <div className="mt-6 pt-4 border-t-2 border-neutral-200 flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                    <span
                        key={skill}
                        className="px-2 py-1 bg-gray-800 text-gray-400 text-xs font-mono border border-neutral-200"
                    >
                        #{skill}
                    </span>
                ))}
            </div>
        </motion.div>
    );
}
