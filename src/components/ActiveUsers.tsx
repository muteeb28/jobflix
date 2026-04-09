"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { apiClient } from "@/lib/apiClient";

export default function ActiveUsers() {
  const [visible, setVisible] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    apiClient
      .get("/api/active-users")
      .then((data) => setCount(data.count))
      .catch(() => setCount(null));
  }, []);

  if (!visible || count === null) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      {/* Tooltip */}
      {showTooltip && (
        <div className="relative bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 text-sm px-3 py-2 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700 whitespace-nowrap">
          Active users in the last 2 hours
          <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-white dark:bg-zinc-800 border-r border-b border-zinc-200 dark:border-zinc-700 rotate-45" />
        </div>
      )}

      {/* Pill */}
      <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-full px-3 py-1.5 shadow-lg text-sm">
        <button
          className="flex items-center gap-1.5 focus:outline-none"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-500" />
          </span>
          <span className="font-semibold text-zinc-800 dark:text-zinc-100">
            {count ? count.toLocaleString() : "0"} online
          </span>
        </button>

        <button
          onClick={() => setVisible(false)}
          className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
          aria-label="Dismiss"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
