"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MentorsView from "@/components/MentorsView";
import AskView from "@/components/AskView";

export default function ConnectPage() {
    return (
        <Suspense>
            <ConnectPageContent />
        </Suspense>
    );
}

function ConnectPageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"mentors" | "ask">("mentors");

    // Sync state with URL query param on mount and update
    useEffect(() => {
        const tab = searchParams.get("tab");
        if (tab === "ask") {
            setActiveTab("ask");
        } else {
            setActiveTab("mentors");
        }
    }, [searchParams]);

    const handleTabChange = (tab: "mentors" | "ask") => {
        setActiveTab(tab);
        router.push(`/connect?tab=${tab}`, { scroll: false });
    };

    return (
        <div className="min-h-screen bg-black text-white font-pixel flex flex-col">
            <Navbar />

            <div className="flex-grow pt-24 pb-12">
                {/* Tab Navigation */}
                <div className="container mx-auto px-6 max-w-6xl mb-8">
                    <div className="flex justify-center">
                        <div className="flex p-1 bg-zinc-900 border border-white/10 rounded-xl relative">
                            {/* Sliding Background */}
                            <motion.div
                                className="absolute top-1 bottom-1 bg-zinc-800 rounded-lg shadow-sm z-0"
                                initial={false}
                                animate={{
                                    left: activeTab === "mentors" ? "4px" : "50%",
                                    width: "calc(50% - 4px)",
                                    x: activeTab === "ask" ? "0%" : "0" // Offset handled by left/width
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />

                            <button
                                onClick={() => handleTabChange("mentors")}
                                className={`relative z-10 px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors w-40 md:w-48 text-center ${activeTab === "mentors" ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                                    }`}
                            >
                                Mentors
                            </button>
                            <button
                                onClick={() => handleTabChange("ask")}
                                className={`relative z-10 px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors w-40 md:w-48 text-center ${activeTab === "ask" ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                                    }`}
                            >
                                Ask AI
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content View */}
                <div className="w-full">
                    {activeTab === "mentors" ? (
                        <motion.div
                            key="mentors"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <MentorsView />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="ask"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <AskView />
                        </motion.div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}
