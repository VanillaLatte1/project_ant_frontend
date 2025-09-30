"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function LoginPage() {
    const providers = [
        {
            name: "네이버",
            logo: "/icons/naver-n-white.svg", // 배경 없는 N 심볼 (흰색)
            className: "bg-[#1EC800] text-white hover:bg-[#1EC800] hover:text-white",
        },
        {
            name: "카카오",
            logo: "/icons/kakao.svg",
            className: "bg-[#FFEB00] text-black hover:bg-[#FFEB00] hover:text-black",
        },
        {
            name: "구글",
            logo: "/icons/google.svg",
            className:
                "bg-[#F2F2F2] border border-[#DADCE0] text-[#3C4043] hover:bg-[#F2F2F2] hover:text-[#3C4043]",
        },
        {
            name: "메타",
            logo: "/icons/meta-f-white.svg", // 배경 없는 f 심볼 (흰색)
            className: "bg-[#1877F2] text-white hover:bg-[#1877F2] hover:text-white",
        },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <Card className="w-96 shadow-xl rounded-2xl border border-gray-200">
                    <CardContent className="flex flex-col items-center text-center p-8">
                        <h1 className="text-2xl font-bold text-green-700 mb-6">로그인</h1>
                        <div className="flex flex-col gap-3 w-full">
                            {providers.map((p) => (
                                <button
                                    key={p.name}
                                    className={`flex items-center gap-3 justify-center w-full py-3 rounded-xl font-semibold ${p.className}`}
                                >
                                    <img
                                        src={p.logo}
                                        alt={`${p.name} logo`}
                                        className="w-6 h-6"
                                    />
                                    {p.name} 로그인
                                </button>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
