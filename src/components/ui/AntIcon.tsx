"use client";

export default function AntIcon({ className = "h-5 w-auto" }: { className?: string }) {
    return (
        <img src="/images/ants-row.jpg" alt="Ant" className={className} draggable={false} />
    );
}