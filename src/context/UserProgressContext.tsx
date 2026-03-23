"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface UserProgressContextType {
    xp: number;
    completedTopics: string[]; // Changed to string array for UUIDs
    addXp: (amount: number) => void;
    markTopicAsCompleted: (topicId: string) => void;
}

const UserProgressContext = createContext<UserProgressContextType | undefined>(undefined);

export function UserProgressProvider({ children }: { children: React.ReactNode }) {
    const [xp, setXp] = useState(0);
    const [completedTopics, setCompletedTopics] = useState<string[]>([]);

    // Fetch progress from API on mount
    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const res = await fetch("/api/progress");
                if (res.ok) {
                    const data = await res.json();
                    if (data.userProgress) {
                        setXp(data.userProgress.totalXp || 0);
                        // Assuming completedLessonIds is stored in the userProgress record
                        // If the API returns it differently, we might need to adjust.
                        // Based on the schema 'UserProgress' has 'completedLessonIds String[]'
                        setCompletedTopics(data.userProgress.completedLessonIds || []);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch progress:", error);
            }
        };

        fetchProgress();
    }, []);

    const addXp = async (amount: number) => {
        // Optimistic update
        setXp((prev) => prev + amount);

        try {
            await fetch("/api/progress", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ xp: amount })
            });
        } catch (e) {
            console.error("Failed to sync XP:", e);
        }
    };

    const markTopicAsCompleted = async (topicId: string) => {
        if (!completedTopics.includes(topicId)) {
            // Optimistic update
            setCompletedTopics((prev) => [...prev, topicId]);
            addXp(10); // Default 10 XP per topic

            try {
                await fetch("/api/progress", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ topicId: topicId })
                });
            } catch (e) {
                console.error("Failed to sync completion:", e);
            }
        }
    };

    return (
        <UserProgressContext.Provider value={{ xp, completedTopics, addXp, markTopicAsCompleted }}>
            {children}
        </UserProgressContext.Provider>
    );
}

export function useUserProgress() {
    const context = useContext(UserProgressContext);
    if (context === undefined) {
        throw new Error("useUserProgress must be used within a UserProgressProvider");
    }
    return context;
}
