"use client";

import { useEffect, useRef, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const FALLBACK_COUNT = 100;

function formatCount(n: number): string {
  if (n >= 1000) {
    const k = n / 1000;
    return `${parseFloat(k.toFixed(2))}k`;
  }
  return n.toString();
}

export default function OnlineIndicator() {
  const [count, setCount] = useState<number>(FALLBACK_COUNT);
  const cleanupRef = useRef<(() => void) | undefined>(undefined);

  useEffect(() => {
    fetch(`${BASE_URL}/api/online-count`, { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        if (typeof data.count === "number") setCount(data.count);
      })
      .catch(() => {});

    import("socket.io-client").then(({ io }) => {
      const socket = io(BASE_URL, {
        withCredentials: true,
        transports: ["websocket", "polling"],
      });
      socket.on("onlineCount", (n: number) => setCount(n));
      cleanupRef.current = () => socket.disconnect();
    });

    return () => cleanupRef.current?.();
  }, []);

  return (
    <>
      <style>{`
        @keyframes gfe-ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        .gfe-ping { animation: gfe-ping 1.5s cubic-bezier(0,0,0.2,1) infinite; }
      `}</style>

      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          backgroundColor: "#18181b",
          border: "1px solid #27272a",
          borderRadius: "9999px",
          padding: "7px 16px 7px 12px",
          boxShadow: "0 2px 16px rgba(0,0,0,0.5)",
          cursor: "default",
          userSelect: "none",
        }}
      >
        {/* Green pulsing dot */}
        <span style={{ position: "relative", display: "flex", width: 10, height: 10, flexShrink: 0 }}>
          <span
            className="gfe-ping"
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              backgroundColor: "#22C55E",
              opacity: 0.6,
            }}
          />
          <span
            style={{
              position: "relative",
              display: "inline-flex",
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#22C55E",
            }}
          />
        </span>

        {/* Count text */}
        <span
          style={{
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: 500,
            fontFamily: "DM Sans, Inter, -apple-system, sans-serif",
            lineHeight: 1,
            letterSpacing: "-0.01em",
          }}
        >
          {formatCount(count)} online
        </span>
      </div>
    </>
  );
}
