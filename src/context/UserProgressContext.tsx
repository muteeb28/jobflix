"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { apiClient } from "@/lib/apiClient";

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
                const data = await apiClient.get("/api/progress");
                if (data.success) {
                    setXp(data.totalXp || 0);
                    setCompletedTopics(data.completedTopics || []);
                }
            } catch {
                // Backend not running — app works offline, progress just won't sync
            }
        };

        fetchProgress();
    }, []);

    const addXp = async (amount: number) => {
        // Optimistic update
        setXp((prev) => prev + amount);

        try {
            await apiClient.post("/api/progress", { xp: amount });
        } catch {
            // Silently fail — XP already updated optimistically
        }
    };

    const markTopicAsCompleted = async (topicId: string) => {
        if (!completedTopics.includes(topicId)) {
            // Optimistic update
            setCompletedTopics((prev) => [...prev, topicId]);
            addXp(10); // Default 10 XP per topic

            try {
                await apiClient.post("/api/progress", { topicId });
            } catch {
                // Silently fail — completion already updated optimistically
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
