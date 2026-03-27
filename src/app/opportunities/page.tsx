"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HackathonsView from "@/components/HackathonsView";
import StudyAbroadView from "@/components/StudyAbroadView";

export default function OpportunitiesPage() {
    return (
        <Suspense>
            <OpportunitiesPageContent />
        </Suspense>
    );
}

function OpportunitiesPageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"hackathons" | "study-abroad">("hackathons");

    // Sync state with URL query param on mount and update
    useEffect(() => {
        const tab = searchParams.get("tab");
        if (tab === "study-abroad") {
            setActiveTab("study-abroad");
        } else {
            setActiveTab("hackathons");
        }
    }, [searchParams]);

    const handleTabChange = (tab: "hackathons" | "study-abroad") => {
        setActiveTab(tab);
        router.push(`/opportunities?tab=${tab}`, { scroll: false });
    };

    return (
        <div className="min-h-screen bg-white text-neutral-900 font-pixel flex flex-col">
            <Navbar />

            <div className="flex-grow pt-24 pb-12">
                {/* Tab Navigation */}
                <div className="container mx-auto px-6 max-w-6xl mb-8">
                    <div className="flex justify-center">
                        <div className="flex p-1 bg-white border border-neutral-200 rounded-xl relative">
                            {/* Sliding Background */}
                            <motion.div
                                className="absolute top-1 bottom-1 bg-neutral-100 rounded-lg shadow-sm z-0"
                                initial={false}
                                animate={{
                                    left: activeTab === "hackathons" ? "4px" : "50%",
                                    width: "calc(50% - 4px)",
                                    x: activeTab === "study-abroad" ? "0%" : "0" // Offset handled by left/width
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />

                            <button
                                onClick={() => handleTabChange("hackathons")}
                                className={`relative z-10 px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors w-40 md:w-48 text-center ${activeTab === "hackathons" ? "text-neutral-900" : "text-neutral-400 hover:text-neutral-600"
                                    }`}
                            >
                                Hackathons
                            </button>
                            <button
                                onClick={() => handleTabChange("study-abroad")}
                                className={`relative z-10 px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors w-40 md:w-48 text-center ${activeTab === "study-abroad" ? "text-neutral-900" : "text-neutral-400 hover:text-neutral-600"
                                    }`}
                            >
                                Study Abroad
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content View */}
                <div className="w-full">
                    {activeTab === "hackathons" ? (
                        <motion.div
                            key="hackathons"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <HackathonsView />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="study-abroad"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <StudyAbroadView />
                        </motion.div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}
