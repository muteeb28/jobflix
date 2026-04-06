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
            await apiClient.post("/api/progress", { xp: amount });
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
                await apiClient.post("/api/progress", { topicId });
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
