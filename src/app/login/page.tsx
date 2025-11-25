"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
    /* 추가될 소셜 로그인 버튼 정보 / 현재는 name, style을 위해 사용 중 */
    const providers = [
        {
            name: "네이버",
            name_e: "naver",
            className: "bg-[#1EC800] text-white hover:bg-[#1EC800] hover:text-white",
        },
        {
            name: "카카오",
            name_e: "kakao",
            className: "bg-[#FFEB00] text-black hover:bg-[#FFEB00] hover:text-black",
        },
        {
            name: "구글",
            name_e: "google",
            className:
                "bg-[#F2F2F2] border border-[#DADCE0] text-[#3C4043] hover:bg-[#F2F2F2] hover:text-[#3C4043]",
        },
    ];

    /* OAuth2 시작 엔드포인트로 리다이렉트하여 소셜 로그인 제공자 페이지로 이동 */
    const handleLogin = (provider: string) => {
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/${provider}`;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
            <div className="max-w-5xl w-full flex flex-col md:flex-row items-center justify-center gap-16 px-6 py-10">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center md:items-start text-center md:text-left max-w-sm"
                >
                    <Link href="/" className="cursor-pointer">
                        <Image
                            src="/images/ants-row.jpg"
                            alt="Ant Mascot"
                            width={180}
                            height={180}
                            className="mb-6 select-none"
                        />
                        <h2 className="text-3xl font-extrabold text-green-700">ANT</h2>
                    </Link>
                    <p className="mt-3 text-slate-600 leading-relaxed">
                        작지만 지혜롭게,
                        함께 성장하는 소모임 플랫폼 <br />
                        지금 개미들의 여정에 합류하세요 :)
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Card className="w-80 md:w-96 shadow-xl rounded-2xl border border-gray-200">
                        <CardContent className="flex flex-col items-center text-center p-8">
                            <h1 className="text-2xl font-bold text-green-700 mb-2">로그인</h1>
                            <p className="text-sm text-slate-500 mb-6">
                                첫 방문이시면 자동으로 가입됩니다
                            </p>
                            <div className="flex flex-col gap-3 w-full">
                                {providers.map((p) => (
                                    <button
                                        key={p.name}
                                        onClick={() => handleLogin(p.name_e.toLowerCase())}
                                        className={`flex items-center gap-3 justify-center w-full py-3 rounded-xl font-semibold ${p.className}`}
                                    >
                                        {p.name} 로그인
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
