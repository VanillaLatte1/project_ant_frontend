"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StepCard, GroupCard } from "@/components/ui/card";
import { ArrowDownDotted } from "@/components/ui/ArrowDownDotted";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ChevronRight, ChevronLeft, Sparkles, Search, Users, Plus } from "lucide-react";
import Link from "next/link";
import LoadingBar from "@/components/ui/LoadingBar";
import AntIcon from "@/components/ui/AntIcon";

export default function AntLanding() {
    /* state 관리 */
    /* useState()의 괄호안에 들어가는 건 default 값으로, boolean을 넣으면 해당 state는 boolean으로만 관리되고, string을 넣으면 string으로만 관리 가능합니다 */
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);

    /* 로딩테스트 */
    const handleApiCall = async () => {
        /* 로딩 state true / 로딩바 호출 */
        setLoading(true);
        /* 로딩완료 state false */
        setDone(false);
        /* try/catch : try 내부 코드 실행 중 error 발생 시 중단하고 catch 내부 코드 실행 */
        try {
            /* 로딩완료 state true */
            setDone(true);
            /* 로딩 state false / 1초(1000ms) 뒤에 로딩바 닫기 */
            setTimeout(() => setLoading(false), 1000);
        } catch (err) {
            console.error(err);
            /* 로딩 state false / 로딩바 닫기 */
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
            {/*loading state가 true일 때, 로딩바 호출 및 isDone으로 done state 전달 */}
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <LoadingBar isDone={done} />
                </div>
            )}

            <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b">
                <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
                    <a href="#" className="flex items-center gap-2 font-semibold text-xl">
                        <span className="inline-block">Ant</span>
                        <AntIcon className="h-5 w-20" />
                    </a>
                    <nav className="hidden md:flex items-center gap-3 text-sm">
                        <Button variant="ghost" className="rounded-2xl" asChild>
                            <Link href="/login">로그인</Link>
                        </Button>
                        <Button variant="default" className="rounded-2xl" asChild>
                            <Link href="/register">회원가입</Link>
                        </Button>
                        <Button onClick={handleApiCall} className="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600">
                            로딩테스트
                        </Button>
                    </nav>
                </div>
            </header>

            <section className="relative overflow-hidden">
            <div
                    className="absolute inset-0 -z-10 bg-cover bg-center opacity-20"
                    style={{ backgroundImage: "url('/images/landing-main.jpg')" }}
                    aria-hidden
                />
                <div className="absolute -top-20 -right-20 -z-10 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-indigo-300/40 to-cyan-200/40 blur-3xl" />
                <div className="mx-auto max-w-7xl px-4 py-20 grid gap-10 items-center">
                    <div>
                        <p className="text-sm font-medium text-indigo-600 flex items-center gap-2">
                            <Sparkles className="h-4 w-4" /> 신규 오픈
                        </p>
                        <h1 className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                            작지만 지혜롭게, 함께 준비하는 우리
                        </h1>
                        <p className="mt-4 text-slate-600 text-lg">
                            개미의 자발성과 준비성을 모티브로 한 건강한 소모임 플랫폼
                        </p>
                        <div className="mt-8 flex items-center gap-4 text-sm text-slate-500">
                            <div className="flex -space-x-2">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="h-8 w-8 rounded-full ring-2 ring-white bg-slate-300" />
                                ))}
                            </div>
                            <span>오늘 126명이 새로 가입했어요</span>
                        </div>
                    </div>
                </div>
            </section>

            <section id="popular" className="mx-auto max-w-7xl px-4 pb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">인기 소모임</h2>
                    <div className="flex items-center gap-2 text-slate-500">
                        <button className="p-2 rounded-full border hover:bg-slate-50" aria-label="이전">
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button className="p-2 rounded-full border hover:bg-slate-50" aria-label="다음">
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-5">
                    <GroupCard
                        title="건강한 다이어트 챌린지"
                        category="운동"
                        tags={["#다이어트", "#운동", "#건강"]}
                        desc="함께 운동하고 건강한 식단을 공유하며 목표 체중을 달성해요. 매일 인증샷을 올리고 서로 격려!"
                        count="18/25명"
                        badge="초급"
                        cta="참여하기"
                    />
                    <GroupCard
                        title="Python 데이터 분석"
                        category="개발"
                        tags={["#Python", "#데이터분석", "#Pandas"]}
                        desc="Pandas, NumPy, Matplotlib로 기초부터 프로젝트까지 단계별로 진행합니다."
                        count="8/12명"
                        badge="초급"
                        cta="참여하기"
                    />
                    <GroupCard
                        title="AWS 클라우드 인프라"
                        category="개발"
                        tags={["#AWS", "#클라우드", "#인프라"]}
                        desc="핵심 서비스를 활용한 인프라 구축과 운영환경 경험을 학습합니다."
                        count="6/10명"
                        badge="중급"
                        cta="참여하기"
                    />
                </div>
            </section>

            <section className="relative mx-auto max-w-7xl px-4 py-20">
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10 opacity-50"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 30% 35%, rgba(99,102,241,.06) 0 160px, transparent 160px), radial-gradient(circle at 75% 60%, rgba(34,211,238,.06) 0 180px, transparent 180px)",
                    }}
                />

                <SectionTitle
                    title="우리가 꿈을 시작하는 방식"
                    subtitle="세 단계로 빠르게 시작하세요"
                />

                <div className="mx-auto mt-12 flex w-full max-w-3xl flex-col items-center">
                    <div className="w-full">
                        <StepCard
                            icon={<Search className="h-6 w-6"/>}
                            title="이벤트 및 그룹 찾기"
                            desc="당신이 좋아하는 모든 것을 위해 로컬 이벤트를 주최하는 사람들을 확인하세요."
                            linkText="이벤트 및 그룹 검색"
                            href="/groups"
                        />
                    </div>

                    {/*만들어둔 화살표 component를 요소 간 호출*/}
                    <ArrowDownDotted className="my-8 md:my-5"/>

                    <div className="w-full">
                        <StepCard
                            icon={<Users className="h-6 w-6"/>}
                            title="당신의 사람들을 찾아보세요"
                            desc="공통의 관심사를 통해 연결하고, 의미 있는 경험을 즐기세요."
                            linkText="사람/커뮤니티 살펴보기"
                            href="/groups?tab=members"
                        />
                    </div>

                    <ArrowDownDotted className="my-8 md:my-5"/>

                    <div className="w-full">
                        <StepCard
                            icon={<Plus className="h-6 w-6"/>}
                            title="이벤트를 주최하려면 그룹을 시작하세요"
                            desc="나만의 그룹을 만들고 커뮤니티에서 회원을 확보하세요."
                            linkText="그룹 시작하기"
                            href="/groups/new"
                        />
                    </div>
                </div>
            </section>


            <footer className="mt-4 border-t">
                <div className="mx-auto max-w-7xl px-4 py-10 grid md:grid-cols-2 gap-6 items-center">
                    <div>
                        <div className="flex items-center gap-2 font-semibold text-lg">
                            <span>Ant</span>
                            <AntIcon className="h-5 w-20"/>
                        </div>
                        <p className="mt-2 text-sm text-slate-500">
                            © {new Date().getFullYear()} ANT. 함께 준비하는 소모임 플랫폼.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

