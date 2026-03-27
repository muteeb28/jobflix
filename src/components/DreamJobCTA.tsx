import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export interface CTAData {
    title: string;
    buttonText: string;
    subText: string;
}

export const DreamJobCTA = ({ cta }: { cta?: CTAData }) => {
    return (
        <div className="w-full bg-white relative overflow-hidden pb-16 pt-0 md:pb-24">
            {/* Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute right-10 top-10 text-neutral-900/20">
                    <Sparkles size={120} />
                </div>
                {/* Gradient glow for depth */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neutral-100 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-neutral-900 mb-8 max-w-4xl uppercase font-pixel drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
                    {cta?.title || "Your dream job is absolutely worth it"}
                </h2>

                <div className="flex flex-col items-center gap-4">
                    <Link
                        href="#"
                        className="inline-flex items-center justify-center px-8 py-4 bg-teal-500 text-neutral-900 font-bold text-lg md:text-xl border-b-4 border-r-4 border-neutral-200 active:border-0 active:translate-y-1 transition-all uppercase"
                    >
                        {cta?.buttonText || "Get started now"}
                    </Link>
                    <p className="text-neutral-400 text-sm md:text-base font-medium">
                        {cta?.subText || "200+ questions are free to do"}
                    </p>
                </div>
            </div>
        </div>
    );
};
