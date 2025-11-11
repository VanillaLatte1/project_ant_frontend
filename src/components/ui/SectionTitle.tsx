import {Sparkles} from "lucide-react";
import React from "react";

function SectionTitle({
                          title = "상상이 현실로 이루어지는 방식",
                          subtitle = "세 단계로 빠르게 시작하세요",
                      }: { title?: string; subtitle?: string }) {
    return (
        <div className="relative mx-auto max-w-3xl text-center">
            <div className="pointer-events-none absolute inset-0 -z-10 blur-3xl opacity-40"
                 style={{ background:
                         "radial-gradient(120px 60px at 50% 30%, rgba(99,102,241,.25), transparent 60%), radial-gradient(140px 70px at 50% 70%, rgba(34,211,238,.20), transparent 70%)"
                 }} />

            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium text-slate-600 bg-white/70 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                HOW IT WORKS
            </div>

            <h3 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-600 bg-clip-text text-transparent">
                  {title}
                </span>
            </h3>

            <p className="mt-2 text-sm md:text-base text-slate-500">
                {subtitle}
            </p>

            <div className="relative mx-auto mt-4 h-5 w-56 md:w-72">
                <svg className="absolute inset-0 mx-auto text-slate-300" viewBox="0 0 288 20" fill="none"
                     aria-hidden>
                    <path d="M4 10 H284" stroke="currentColor" strokeWidth="2" strokeDasharray="6 8" />
                </svg>
                <div className="absolute left-1/2 top-1/2 h-2 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-200 to-cyan-200 opacity-70" />
            </div>
        </div>
    );
}

export {
    SectionTitle
}