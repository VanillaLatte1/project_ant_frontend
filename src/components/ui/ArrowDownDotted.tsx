import React from "react";

function ArrowDownDotted({ className = "" }: { className?: string }) {
    return (
        <svg
            className={`text-slate-300 ${className}`}
            width="36"
            height="96"
            viewBox="0 0 36 96"
            aria-hidden
        >
            <defs>
                <marker id="arrow-dn" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                    <path d="M0,0 L10,5 L0,10 Z" fill="currentColor" />
                </marker>
            </defs>
            {/* 부드러운 S자 곡선으로 내려오는 점선 */}
            <path
                d="M18 4 C 18 24, 8 40, 18 56 C 28 72, 18 80, 18 88"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="4 8"
                markerEnd="url(#arrow-dn)"
            />
        </svg>
    );
}

export {
    ArrowDownDotted
}
