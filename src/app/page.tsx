"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { StepCard, GroupCard } from "@/components/ui/card";
import { ArrowDownDotted } from "@/components/ui/ArrowDownDotted";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ChevronRight, ChevronLeft, Sparkles, Search, Users, Plus, Check, Shield, Heart, Zap, ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/ui/LoadingScreen";
import AntIcon from "@/components/ui/AntIcon";

export default function AntLanding() {
    /* state 관리 */
    /* useState()의 괄호안에 들어가는 건 default 값으로, boolean을 넣으면 해당 state는 boolean으로만 관리되고, string을 넣으면 string으로만 관리 가능합니다 */
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    /* 인기 소모임 데이터 */
    const totalGroups = 12;
    const groupsPerPage = 3;

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

    /* 슬라이드 이전 버튼 (무한 루프) */
    const handlePrevSlide = () => {
        setCurrentSlide((prev) => {
            if (prev === 0) {
                return totalGroups - groupsPerPage;
            }
            return prev - groupsPerPage;
        });
    };

    /* 슬라이드 다음 버튼 (무한 루프) */
    const handleNextSlide = () => {
        setCurrentSlide((prev) => {
            const next = prev + groupsPerPage;
            if (next >= totalGroups) {
                return 0;
            }
            return next;
        });
    };

    /* 5초마다 자동 스크롤 */
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => {
                const next = prev + groupsPerPage;
                if (next >= totalGroups) {
                    return 0;
                }
                return next;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, [groupsPerPage, totalGroups]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
            {/*loading state가 true일 때, 로딩바 호출 및 isDone으로 done state 전달 */}
            {loading && <LoadingScreen isDone={done} />}

            <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b">
                <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
                    <a href="#" className="flex items-center gap-2 font-semibold text-xl">
                        <span className="inline-block">Ant</span>
                        <AntIcon className="h-5 w-20" />
                    </a>
                    <nav className="hidden md:flex items-center gap-3 text-sm">
                        {/*<Button variant="ghost" className="rounded-2xl" asChild>*/}
                        {/*    <Link href="/login">로그인</Link>*/}
                        {/*</Button>*/}
                        <Button variant="default" className="rounded-2xl" asChild>
                            <Link href="/login">시작하기</Link>
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
                        <div className="mt-10 flex flex-col sm:flex-row gap-4">
                            <Button size="lg" className="rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-base" asChild>
                                <Link href="/login">지금 시작하기 <ArrowRight className="ml-2 h-5 w-5" /></Link>
                            </Button>
                            <Button size="lg" variant="outline" className="rounded-2xl px-8 py-6 text-base" asChild>
                                <Link href="#popular">인기 그룹 둘러보기</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <section id="popular" className="mx-auto max-w-7xl px-4 pb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">인기 소모임</h2>
                    <div className="flex items-center gap-2 text-slate-500">
                        <button
                            onClick={handlePrevSlide}
                            className="p-2 rounded-full border hover:bg-slate-50 transition-opacity"
                            aria-label="이전"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                            onClick={handleNextSlide}
                            className="p-2 rounded-full border hover:bg-slate-50 transition-opacity"
                            aria-label="다음"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <div className="overflow-hidden">
                    <motion.div
                        className="flex gap-4"
                        animate={{
                            x: `calc(-${(currentSlide / 3) * 100}% - ${(currentSlide / 3) * 1}rem)`,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 180,
                            damping: 40,
                        }}
                    >
                        {/* 페이지 1 */}
                        <div className="grid md:grid-cols-3 gap-5 min-w-full">
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

                        {/* 페이지 2 */}
                        <div className="grid md:grid-cols-3 gap-5 min-w-full">
                            <GroupCard
                                title="영어 회화 스터디"
                                category="언어"
                                tags={["#영어", "#회화", "#스피킹"]}
                                desc="원어민 선생님과 함께하는 실전 영어 회화 연습. 주 2회 줌 미팅으로 말하기 실력 향상!"
                                count="12/15명"
                                badge="초급"
                                cta="참여하기"
                            />
                            <GroupCard
                                title="월간 독서 모임"
                                category="교양"
                                tags={["#독서", "#토론", "#인문학"]}
                                desc="매달 한 권의 책을 읽고 깊이 있는 토론을 나눕니다. 다양한 장르의 책으로 시야를 넓혀요."
                                count="15/20명"
                                badge="초급"
                                cta="참여하기"
                            />
                            <GroupCard
                                title="주식 투자 스터디"
                                category="재테크"
                                tags={["#주식", "#투자", "#재테크"]}
                                desc="기본적인 재무제표 분석부터 투자 전략까지, 함께 공부하며 성장하는 투자 모임입니다."
                                count="20/25명"
                                badge="초급"
                                cta="참여하기"
                            />
                        </div>

                        {/* 페이지 3 */}
                        <div className="grid md:grid-cols-3 gap-5 min-w-full">
                            <GroupCard
                                title="사진 촬영 클래스"
                                category="취미"
                                tags={["#사진", "#촬영", "#DSLR"]}
                                desc="카메라 기초부터 인물, 풍경 촬영까지. 매주 출사를 나가며 실력을 쌓아갑니다."
                                count="10/15명"
                                badge="초급"
                                cta="참여하기"
                            />
                            <GroupCard
                                title="React 프론트엔드"
                                category="개발"
                                tags={["#React", "#JavaScript", "#Frontend"]}
                                desc="React, TypeScript, Next.js를 활용한 현대적인 웹 개발을 배우는 실전 프로젝트 모임."
                                count="14/20명"
                                badge="중급"
                                cta="참여하기"
                            />
                            <GroupCard
                                title="요가 & 명상"
                                category="운동"
                                tags={["#요가", "#명상", "#힐링"]}
                                desc="몸과 마음의 균형을 찾는 요가와 명상 수련. 초보자도 편하게 참여 가능합니다."
                                count="8/12명"
                                badge="초급"
                                cta="참여하기"
                            />
                        </div>

                        {/* 페이지 4 */}
                        <div className="grid md:grid-cols-3 gap-5 min-w-full">
                            <GroupCard
                                title="일본어 회화"
                                category="언어"
                                tags={["#일본어", "#JLPT", "#회화"]}
                                desc="일상 회화부터 JLPT 시험 대비까지, 원어민과 함께하는 체계적인 일본어 학습."
                                count="16/20명"
                                badge="초급"
                                cta="참여하기"
                            />
                            <GroupCard
                                title="기타 연주 모임"
                                category="음악"
                                tags={["#기타", "#통기타", "#음악"]}
                                desc="기타를 처음 시작하는 분들을 위한 모임. 함께 연주하며 실력을 키워갑니다."
                                count="7/10명"
                                badge="초급"
                                cta="참여하기"
                            />
                            <GroupCard
                                title="창업 아이디어 랩"
                                category="비즈니스"
                                tags={["#창업", "#스타트업", "#비즈니스"]}
                                desc="아이디어 발굴부터 사업 계획까지, 창업을 꿈꾸는 사람들이 모여 함께 성장합니다."
                                count="9/15명"
                                badge="중급"
                                cta="참여하기"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-20">
                <SectionTitle
                    title="왜 ANT를 선택해야 하나요?"
                    subtitle="신뢰할 수 있는 소모임 플랫폼의 4가지 핵심 가치"
                />

                <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-indigo-100 text-indigo-600 mb-4">
                            <Zap className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">쉬운 시작</h3>
                        <p className="text-slate-600 text-sm">
                            복잡한 절차 없이 클릭 몇 번으로 원하는 소모임을 만들고 참여할 수 있습니다.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-emerald-100 text-emerald-600 mb-4">
                            <Shield className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">안전한 커뮤니티</h3>
                        <p className="text-slate-600 text-sm">
                            검증된 회원들과 건전한 활동을 위한 신고 시스템으로 안심하고 참여하세요.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-rose-100 text-rose-600 mb-4">
                            <Heart className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">다양한 만남</h3>
                        <p className="text-slate-600 text-sm">
                            운동, 공부, 취미까지 다양한 분야의 사람들과 의미 있는 관계를 만들어보세요.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-amber-100 text-amber-600 mb-4">
                            <Check className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">무료 참여</h3>
                        <p className="text-slate-600 text-sm">
                            모든 기본 기능을 무료로 이용하며 원하는 만큼 소모임에 참여할 수 있습니다.
                        </p>
                    </div>
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

            <section className="mx-auto max-w-4xl px-4 py-20">
                <SectionTitle
                    title="자주 묻는 질문"
                    subtitle="궁금하신 점을 확인해보세요"
                />

                <div className="mt-12 space-y-4">
                    {[
                        {
                            question: "소모임 참여는 무료인가요?",
                            answer: "네, Ant의 모든 기본 기능은 무료입니다. 소모임 생성, 참여, 이벤트 등록 등 모든 핵심 기능을 추가 비용 없이 이용하실 수 있습니다."
                        },
                        {
                            question: "어떻게 소모임을 만들 수 있나요?",
                            answer: "회원가입 후 '그룹 시작하기' 버튼을 클릭하여 간단한 정보만 입력하면 바로 소모임을 만들 수 있습니다. 그룹명, 카테고리, 설명, 인원 제한 등을 설정할 수 있습니다."
                        },
                        {
                            question: "한 번에 여러 소모임에 참여할 수 있나요?",
                            answer: "물론입니다! 관심 있는 모든 소모임에 자유롭게 참여하실 수 있습니다. 참여 인원이 제한된 경우 선착순으로 마감될 수 있으니 서둘러 참여하세요."
                        },
                        {
                            question: "소모임 활동은 어떻게 진행되나요?",
                            answer: "각 소모임마다 운영 방식이 다릅니다. 정기 모임, 온라인 세션, 프로젝트 협업 등 다양한 형태로 활동이 진행됩니다. 각 소모임 페이지에서 자세한 일정과 활동 방식을 확인할 수 있습니다."
                        },
                        {
                            question: "부적절한 소모임이나 회원을 신고할 수 있나요?",
                            answer: "네, 안전한 커뮤니티를 위해 신고 시스템을 운영하고 있습니다. 부적절한 콘텐츠나 행동을 발견하시면 즉시 신고해 주세요. 신고된 내용은 빠르게 검토 후 조치됩니다."
                        }
                    ].map((faq, index) => (
                        <div key={index} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                            <button
                                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                            >
                                <span className="font-semibold text-slate-900">{faq.question}</span>
                                <ChevronDown
                                    className={`h-5 w-5 text-slate-500 transition-transform duration-300 ${
                                        openFaq === index ? "rotate-180" : ""
                                    }`}
                                />
                            </button>
                            <AnimatePresence initial={false}>
                                {openFaq === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-4 pt-2 text-slate-600 border-t border-slate-100">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </section>

            <section className="relative mx-auto max-w-5xl px-4 py-20">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 px-8 py-16 text-center text-white shadow-2xl">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            지금 바로 시작하세요
                        </h2>
                        <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
                            나와 같은 관심사를 가진 사람들과 함께 성장하고, 새로운 경험을 만들어보세요.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button
                                size="lg"
                                className="rounded-2xl bg-white text-indigo-600 hover:bg-slate-100 px-8 py-6 text-base font-semibold shadow-lg"
                                asChild
                            >
                                <Link href="/login">
                                    무료로 시작하기 <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="rounded-2xl border-2 border-white bg-transparent !text-white hover:bg-white/10 px-8 py-6 text-base font-semibold"
                                asChild
                            >
                                <Link href="/groups" className="text-white">소모임 둘러보기</Link>
                            </Button>
                        </div>
                        <p className="mt-6 text-sm text-indigo-200">
                            이미 ???명 이상이 함께하고 있습니다
                        </p>
                    </div>
                    <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-purple-500/30 blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-indigo-500/30 blur-3xl" />
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

