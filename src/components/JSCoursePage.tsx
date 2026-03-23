"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUserProgress } from "@/context/UserProgressContext";

interface Topic {
    id: string;
    title: string;
    xp: number;
    order: number;
    isFree: boolean;
    lessonId: string | null;
}

interface Module {
    id: string;
    title: string;
    order: number;
    topics: Topic[];
}

interface CourseData {
    id: string;
    title: string;
    description: string;
    modules: Module[];
}

export default function JSCoursePage() {
    const router = useRouter();
    const { completedTopics, xp } = useUserProgress();
    const [expandedModule, setExpandedModule] = useState<number | null>(0);
    const [course, setCourse] = useState<CourseData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await fetch("/api/courses/javascript-backend");
                if (!response.ok) {
                    throw new Error("Failed to fetch course data");
                }
                const data = await response.json();
                setCourse({
                    ...data.course,
                    modules: data.modules
                });
            } catch (err) {
                console.error("Error fetching course:", err);
                setError("Failed to load course content. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourse();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-yellow-400" />
                    <p>Loading course content...</p>
                </div>
            </div>
        );
    }

    if (error || !course) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <div className="text-center space-y-4">
                    <p className="text-red-400 text-xl">{error || "Course not found"}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-500"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    const totalTopics = course.modules.reduce((acc, module) => acc + module.topics.length, 0);
    // Count completed topics that belong to this course
    const courseTopicIds = new Set(
        course.modules.flatMap(m => m.topics.map(t => t.id))
    );
    const completedCount = completedTopics.filter(id => courseTopicIds.has(id)).length;

    // Calculate progress percentage
    const progressPercent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

    return (
        <div className="min-h-screen bg-black text-white font-pixel">
            {/* Hero Banner */}
            <div className="relative h-64 md:h-80 overflow-hidden">
                <Image
                    src="/assets/course-banner.gif"
                    alt="JS Course Banner"
                    fill
                    className="object-cover pixelated"
                    priority
                    unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>

                <div className="absolute inset-0 flex items-center">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-2xl md:text-5xl font-bold mb-4 text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)] break-words">
                                {course.title}
                            </h1>
                            <p className="text-gray-300 max-w-xl mb-6 text-sm md:text-lg">
                                {course.description}
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-2 md:px-8 md:py-3 bg-yellow-400 text-black font-bold text-sm md:text-lg border-b-4 border-r-4 border-yellow-600 uppercase"
                            >
                                Continue Learning →
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Course Curriculum - Left Side */}
                    <div className="lg:col-span-2">
                        {course.modules.map((module, moduleIndex) => {
                            const isExpanded = expandedModule === moduleIndex;
                            const startingIndex = course.modules
                                .slice(0, moduleIndex)
                                .reduce((acc, m) => acc + m.topics.length, 0);

                            return (
                                <motion.div
                                    key={module.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: moduleIndex * 0.1 }}
                                    className="mb-4"
                                >
                                    {/* Module Header */}
                                    <button
                                        onClick={() => setExpandedModule(isExpanded ? null : moduleIndex)}
                                        className="w-full flex items-center justify-between p-4 md:p-6 bg-black border-2 border-gray-800 hover:border-gray-700 transition-colors group text-left"
                                    >
                                        <div className="flex items-center gap-3 md:gap-6 flex-1">
                                            <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-900 text-white font-bold text-sm md:text-xl font-mono border-2 border-gray-800 group-hover:border-gray-600 transition-colors">
                                                {moduleIndex + 1}
                                            </div>
                                            <h3 className="text-lg md:text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors break-words">
                                                {module.title}
                                            </h3>
                                        </div>
                                        <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                                            <ChevronDown
                                                className={`w-5 h-5 md:w-6 md:h-6 text-gray-500 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                                            />
                                        </div>
                                    </button>

                                    {/* Module Topics (Accordion Content) */}
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="overflow-hidden"
                                            >
                                                <div className="bg-gray-900/50 border-x-2 border-b-2 border-gray-800 p-2 md:p-4 space-y-2">
                                                    {module.topics.map((topic, topicIndex) => {
                                                        const continuousIndex = startingIndex + topicIndex + 1;
                                                        const isCompleted = completedTopics.includes(topic.id);

                                                        return (
                                                            <motion.div
                                                                key={topic.id}
                                                                whileHover={{ x: 4 }}
                                                                onClick={() => {
                                                                    if (topic.isFree && topic.lessonId) {
                                                                        router.push(`/courses/javascript-backend/${topic.lessonId}`);
                                                                    }
                                                                }}
                                                                className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 rounded-lg gap-3 ${isCompleted ? 'bg-green-900/20 border border-green-500/30' : 'bg-gray-900 border border-gray-800'
                                                                    } ${topic.isFree ? 'hover:border-gray-600 cursor-pointer' : 'opacity-75 cursor-not-allowed'} transition-all group`}
                                                            >
                                                                <div className="flex items-start gap-3 md:gap-4 flex-1">
                                                                    <span className="text-white font-bold font-mono text-xs md:text-sm min-w-[4rem] md:min-w-[8rem] mt-1 sm:mt-0">
                                                                        Topic {continuousIndex}
                                                                    </span>
                                                                    <span className={`${isCompleted ? 'text-green-400 line-through' : 'text-white'} font-bold text-sm md:text-lg leading-tight`}>
                                                                        {topic.title}
                                                                    </span>
                                                                </div>

                                                                <div className="flex items-center justify-end sm:justify-start gap-3">
                                                                    <div className={`px-2 py-1 md:px-4 md:py-1 rounded bg-yellow-400 text-black text-[10px] md:text-xs font-bold font-mono border border-yellow-500 ${topic.isFree ? 'group-hover:bg-yellow-500' : ''}`}>
                                                                        {topic.xp} xp
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        );
                                                    })}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Sidebar - Right Side */}
                    <div className="lg:col-span-1">
                        {/* Course Progress */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-gray-900 border-4 border-gray-800 p-6 mb-6 sticky top-4"
                        >
                            <h3 className="text-xl font-bold mb-4 text-white">Course Progress</h3>

                            {/* Exercises */}
                            <div className="mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-3xl">📚</span>
                                    <div>
                                        <p className="text-white font-bold">Topics</p>
                                        <p className="text-yellow-400 text-2xl">{completedCount}/{totalTopics}</p>
                                    </div>
                                </div>
                            </div>

                            {/* XP Earned */}
                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-3xl">⭐</span>
                                    <div>
                                        <p className="text-white font-bold">XP Earned</p>
                                        {/* TODO: Calculate actual XP earned for this course */}
                                        <p className="text-yellow-400 text-2xl">{xp}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-6">
                                <div className="flex justify-between mb-2">
                                    <span className="text-white/60 text-sm">Progress</span>
                                    <span className="text-white font-bold">{progressPercent}%</span>
                                </div>
                                <div className="h-4 bg-gray-800 border-2 border-gray-700">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progressPercent}%` }}
                                        className="h-full bg-yellow-400"
                                    />
                                </div>
                            </div>

                            {/* Upgrade to Pro */}
                            <div className="bg-gradient-to-br from-yellow-500 to-orange-500 p-6 text-center border-4 border-yellow-600">
                                <span className="text-4xl mb-2 block">👑</span>
                                <h4 className="text-black font-bold text-lg mb-2">Upgrade to Pro</h4>
                                <p className="text-black/80 text-sm mb-4">
                                    Unlock premium content!
                                </p>
                                <button className="w-full px-4 py-2 bg-black text-yellow-400 font-bold border-2 border-black hover:bg-gray-900 transition-colors">
                                    Upgrade
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
