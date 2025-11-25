"use client";

import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    ChevronLeft, ChevronRight, MapPin, Users as UsersIcon, Tag, Search
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";


/* ---------- 타입 ---------- */
type Group = {
    id: string;
    title: string;
    category: string;      // 예: "개발", "운동", "음악"
    region: string;        // 예: "서울", "부산"
    desc: string;
    tags: string[];
    memberCount: number;   // 현재 인원
    capacity: number;      // 정원
    updatedAt: string;     // ISO
    cover?: string;        // 이미지 경로
    popularScore?: number;
};

/* ---------- 목업 데이터 ---------- */
const ALL_GROUPS: Group[] = [
    {
        id: "g-1",
        title: "건강한 다이어트 챌린지",
        category: "운동",
        region: "서울",
        desc: "함께 운동하고 건강한 식단을 공유하며 목표 체중을 달성해요. 매일 인증샷을 올리고 서로 격려!",
        tags: ["다이어트", "운동", "건강"],
        memberCount: 18,
        capacity: 25,
        updatedAt: "2025-10-21T12:00:00+09:00",
        popularScore: 95,
    },
    {
        id: "g-2",
        title: "Python 데이터 분석",
        category: "개발",
        region: "서울",
        desc: "Pandas, NumPy, Matplotlib로 기초부터 프로젝트까지 단계별로 진행합니다.",
        tags: ["Python", "데이터분석", "Pandas"],
        memberCount: 8,
        capacity: 12,
        updatedAt: "2025-10-20T10:00:00+09:00",
        popularScore: 92,
        cover: "/images/groups/py.jpeg",
    },
    {
        id: "g-3",
        title: "AWS 클라우드 인프라",
        category: "개발",
        region: "서울",
        desc: "핵심 서비스를 활용한 인프라 구축과 운영환경 경험을 학습합니다.",
        tags: ["AWS", "클라우드", "인프라"],
        memberCount: 6,
        capacity: 10,
        updatedAt: "2025-10-19T09:00:00+09:00",
        popularScore: 88,
        cover: "/images/groups/aws.jpg",
    },
    {
        id: "g-4",
        title: "영어 회화 스터디",
        category: "언어",
        region: "서울",
        desc: "원어민 선생님과 함께하는 실전 영어 회화 연습. 주 2회 줌 미팅으로 말하기 실력 향상!",
        tags: ["영어", "회화", "스피킹"],
        memberCount: 12,
        capacity: 15,
        updatedAt: "2025-10-18T22:00:00+09:00",
        popularScore: 85,
    },
    {
        id: "g-5",
        title: "월간 독서 모임",
        category: "교양",
        region: "서울",
        desc: "매달 한 권의 책을 읽고 깊이 있는 토론을 나눕니다. 다양한 장르의 책으로 시야를 넓혀요.",
        tags: ["독서", "토론", "인문학"],
        memberCount: 15,
        capacity: 20,
        updatedAt: "2025-10-17T18:00:00+09:00",
        popularScore: 82,
        cover: "/images/groups/book.jpg",
    },
    {
        id: "g-6",
        title: "주식 투자 스터디",
        category: "재테크",
        region: "서울",
        desc: "기본적인 재무제표 분석부터 투자 전략까지, 함께 공부하며 성장하는 투자 모임입니다.",
        tags: ["주식", "투자", "재테크"],
        memberCount: 20,
        capacity: 25,
        updatedAt: "2025-10-16T14:00:00+09:00",
        popularScore: 80,
    },
    {
        id: "g-7",
        title: "사진 촬영 클래스",
        category: "취미",
        region: "부산",
        desc: "카메라 기초부터 인물, 풍경 촬영까지. 매주 출사를 나가며 실력을 쌓아갑니다.",
        tags: ["사진", "촬영", "DSLR"],
        memberCount: 10,
        capacity: 15,
        updatedAt: "2025-10-15T20:00:00+09:00",
        popularScore: 78,
    },
    {
        id: "g-8",
        title: "React 프론트엔드",
        category: "개발",
        region: "서울",
        desc: "React, TypeScript, Next.js를 활용한 현대적인 웹 개발을 배우는 실전 프로젝트 모임.",
        tags: ["React", "JavaScript", "Frontend"],
        memberCount: 14,
        capacity: 20,
        updatedAt: "2025-10-14T11:00:00+09:00",
        popularScore: 90,
    },
    {
        id: "g-9",
        title: "요가 & 명상",
        category: "운동",
        region: "인천",
        desc: "몸과 마음의 균형을 찾는 요가와 명상 수련. 초보자도 편하게 참여 가능합니다.",
        tags: ["요가", "명상", "힐링"],
        memberCount: 8,
        capacity: 12,
        updatedAt: "2025-10-13T08:00:00+09:00",
        popularScore: 75,
    },
    {
        id: "g-10",
        title: "일본어 회화",
        category: "언어",
        region: "경기",
        desc: "일상 회화부터 JLPT 시험 대비까지, 원어민과 함께하는 체계적인 일본어 학습.",
        tags: ["일본어", "JLPT", "회화"],
        memberCount: 16,
        capacity: 20,
        updatedAt: "2025-10-12T16:00:00+09:00",
        popularScore: 72,
    },
    {
        id: "g-11",
        title: "기타 연주 모임",
        category: "음악",
        region: "부산",
        desc: "기타를 처음 시작하는 분들을 위한 모임. 함께 연주하며 실력을 키워갑니다.",
        tags: ["기타", "통기타", "음악"],
        memberCount: 7,
        capacity: 10,
        updatedAt: "2025-10-11T19:00:00+09:00",
        popularScore: 68,
    },
    {
        id: "g-12",
        title: "창업 아이디어 랩",
        category: "비즈니스",
        region: "서울",
        desc: "아이디어 발굴부터 사업 계획까지, 창업을 꿈꾸는 사람들이 모여 함께 성장합니다.",
        tags: ["창업", "스타트업", "비즈니스"],
        memberCount: 9,
        capacity: 15,
        updatedAt: "2025-10-10T13:00:00+09:00",
        popularScore: 65,
    },
];

/* ---------- 유틸 ---------- */
const CATEGORIES = ["전체", "개발", "운동", "언어", "교양", "재테크", "취미", "음악", "비즈니스"];
const REGIONS = ["전체", "서울", "부산", "대구", "인천", "경기"];
const SORTS = [
    { value: "latest", label: "최신순" },
    { value: "popular", label: "인기순" },
    { value: "members", label: "멤버 많은순" },
];

function useQueryState() {
    const sp = useSearchParams();
    const router = useRouter();

    const state = {
        q: sp.get("q") ?? "",
        cat: sp.get("cat") ?? "전체",
        region: sp.get("region") ?? "전체",
        sort: sp.get("sort") ?? "latest",
        page: Math.max(1, Number(sp.get("page") ?? "1")),
    };

    const set = (patch: Partial<typeof state>) => {
        const next = { ...state, ...patch };
        const params = new URLSearchParams();
        if (next.q) params.set("q", next.q);
        if (next.cat) params.set("cat", next.cat);
        if (next.region) params.set("region", next.region);
        if (next.sort) params.set("sort", next.sort);
        params.set("page", String(next.page));
        router.push(`/groups?${params.toString()}`);
    };

    return [state, set] as const;
}

/* ---------- 필터 + 검색 바 ---------- */
function FilterBar({
                       value,
                       onChange,
                       onSubmit,
                   }: {
    value: { q: string; cat: string; region: string; sort: string };
    onChange: (patch: Partial<typeof value>) => void;
    onSubmit: () => void;
}) {
    return (
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            {/* 검색 */}
            <div className="flex items-center gap-2 w-full md:max-w-md">
                <div className="relative w-full">
                    <Input
                        placeholder="키워드 검색 (예: Python, 러닝)"
                        value={value.q}
                        onChange={(e) => onChange({ q: e.target.value })}
                        onKeyDown={(e) => e.key === "Enter" && onSubmit()}
                        className="pl-9"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                </div>
                <Button className="rounded-2xl" onClick={onSubmit}>
                    검색
                </Button>
            </div>

            {/* 셀렉트들 */}
            <div className="flex flex-wrap gap-2">
                <SelectLike
                    label="카테고리"
                    value={value.cat}
                    options={CATEGORIES}
                    onChange={(v) => onChange({ cat: v })}
                />
                <SelectLike
                    label="지역"
                    value={value.region}
                    options={REGIONS}
                    onChange={(v) => onChange({ region: v })}
                />
                <SelectLike
                    label="정렬"
                    value={value.sort}
                    options={SORTS.map((s) => s.label)}
                    onChange={(label) =>
                        onChange({ sort: SORTS.find((s) => s.label === label)?.value ?? "latest" })
                    }
                />
            </div>
        </div>
    );
}

function SelectLike({
                        label,
                        value,
                        options,
                        onChange,
                    }: {
    label: string;
    value: string;
    options: string[];
    onChange: (v: string) => void;
}) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500">{label}</span>
            <div className="relative">
                <select
                    className="rounded-xl border bg-white px-3 py-2 text-sm outline-none"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                >
                    {options.map((o) => (
                        <option key={o} value={o}>
                            {o}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

/* ---------- 페이지네이션 ---------- */
function Paginator({
                       page,
                       totalPages,
                       onPage,
                   }: {
    page: number;
    totalPages: number;
    onPage: (p: number) => void;
}) {
    return (
        <div className="mt-6 flex items-center justify-center gap-2">
            <Button
                variant="outline"
                className="rounded-2xl"
                onClick={() => onPage(Math.max(1, page - 1))}
                disabled={page <= 1}
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm text-slate-600">
                {page} / {totalPages}
            </div>
            <Button
                variant="outline"
                className="rounded-2xl"
                onClick={() => onPage(Math.min(totalPages, page + 1))}
                disabled={page >= totalPages}
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}

/* ---------- 빈 상태 ---------- */
function EmptyState({ q }: { q?: string }) {
    return (
        <Card className="rounded-3xl">
            <CardContent className="py-10 text-center">
                <div className="text-lg font-semibold">조건에 맞는 소모임이 없어요</div>
                <p className="mt-1 text-sm text-slate-600">
                    {q ? `‘${q}’` : "현재 필터"}에 맞는 결과가 없습니다. 조건을 바꿔보세요.
                </p>
                <Button asChild className="mt-4 rounded-2xl">
                    <Link href="/groups/new">소모임 만들기</Link>
                </Button>
            </CardContent>
        </Card>
    );
}

/* ---------- 로딩 스켈레톤 ---------- */
function ListSkeleton() {
    return (
        <div className="flex flex-col gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-stretch gap-4 rounded-2xl border p-4 animate-pulse">
                    <div className="h-24 w-32 md:h-28 md:w-36 bg-slate-100 rounded-xl" />
                    <div className="flex-1 space-y-2">
                        <div className="h-4 w-28 bg-slate-100 rounded" />
                        <div className="h-6 w-3/4 bg-slate-100 rounded" />
                        <div className="h-4 w-full bg-slate-100 rounded" />
                        <div className="h-4 w-1/2 bg-slate-100 rounded" />
                    </div>
                    <div className="hidden md:flex items-center">
                        <div className="h-9 w-24 bg-slate-100 rounded-xl" />
                    </div>
                </div>
            ))}
        </div>
    );
}

function GroupRow({ g }: { g: Group }) {
    return (
        <Card className="rounded-2xl border hover:shadow-sm transition-shadow">
            <div className="flex flex-col md:flex-row items-stretch gap-4 p-4">

                {/* 썸네일 */}
                <div className="shrink-0">
                    <div className="relative h-24 w-32 md:h-28 md:w-36 overflow-hidden rounded-xl bg-slate-100">
                        {g.cover ? (
                            <Image
                                src={g.cover}
                                alt={g.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 128px, 144px"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-slate-400 text-xs">
                                no image
                            </div>
                        )}
                    </div>
                </div>

                {/* 본문 */}
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary" className="rounded-full">{g.category}</Badge>
                        <span className="inline-flex items-center gap-1 text-xs text-slate-500">
              <MapPin className="h-3.5 w-3.5" />
                            {g.region}
            </span>
                        <span className="ml-auto hidden md:inline text-xs text-slate-400">
              {new Date(g.updatedAt).toLocaleDateString()}
            </span>
                    </div>

                    <h3 className="mt-1 text-base md:text-lg font-semibold truncate">
                        <Link href={`/groups/${g.id}`} className="hover:underline">
                            {g.title}
                        </Link>
                    </h3>

                    <p className="mt-1 text-sm text-slate-600 line-clamp-2">{g.desc}</p>

                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        <Tag className="h-3.5 w-3.5" />
                        {g.tags.map((t) => (
                            <span key={t} className="rounded-full bg-slate-50 px-2 py-0.5 border">
                #{t}
              </span>
                        ))}
                    </div>
                </div>

                {/* 액션/메타 */}
                <div className="flex md:flex-col items-center md:items-end justify-between gap-3 md:gap-2">
                    <div className="inline-flex items-center gap-2 text-sm text-slate-600 whitespace-nowrap">
                        <UsersIcon className="h-4 w-4" />
                        {g.memberCount}/{g.capacity}명
                    </div>
                    <Button asChild size="sm" className="rounded-2xl">
                        <Link href={`/groups/${g.id}`}>바로가기</Link>
                    </Button>
                </div>
            </div>
        </Card>
    );
}

function AntIcon({ className = "h-5 w-auto" }: { className?: string }) {
    return (
        <img src="/images/ants-row.jpg" alt="Ant" className={className} draggable={false} />
    );
}

/* ---------- 메인 페이지 ---------- */
export default function GroupsPage() {
    const [query, setQuery] = useQueryState();
    const [loading, setLoading] = useState(true);
    const [rows, setRows] = useState<Group[]>([]);
    const pageSize = 9;

    // fetch 시뮬레이션
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            const filtered = ALL_GROUPS.filter((g) => {
                const byQ =
                    !query.q ||
                    g.title.toLowerCase().includes(query.q.toLowerCase()) ||
                    g.tags.join(" ").toLowerCase().includes(query.q.toLowerCase());
                const byCat = query.cat === "전체" || g.category === query.cat;
                const byRegion = query.region === "전체" || g.region === query.region;
                return byQ && byCat && byRegion;
            });

            const sorted = [...filtered].sort((a, b) => {
                if (query.sort === "popular") return (b.popularScore ?? 0) - (a.popularScore ?? 0);
                if (query.sort === "members") return b.memberCount - a.memberCount;
                // latest
                return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
            });

            setRows(sorted);
            setLoading(false);
        }, 400);
        return () => clearTimeout(timer);
    }, [query.q, query.cat, query.region, query.sort]);

    const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
    const page = Math.min(query.page, totalPages);
    const pageRows = useMemo(
        () => rows.slice((page - 1) * pageSize, page * pageSize),
        [rows, page]
    );

    const [filterValue, setFilterValue] = useState({
        q: query.q,
        cat: query.cat,
        region: query.region,
        sort: SORTS.find((s) => s.value === query.sort)?.value ?? "latest",
    });

    useEffect(() => {
        setFilterValue({
            q: query.q,
            cat: query.cat,
            region: query.region,
            sort: SORTS.find((s) => s.value === query.sort)?.value ?? "latest",
        });
    }, [query]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
            {/* Nav */}
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
                    </nav>
                </div>
            </header>

            <div className="mx-auto max-w-7xl px-4 py-10">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold"></h1>
                    <Button asChild className="rounded-2xl">
                        <Link href="/groups/new">소모임 만들기</Link>
                    </Button>
                </div>

                <div className="mt-6">
                    <FilterBar
                        value={filterValue}
                        onChange={(p) => setFilterValue((v) => ({...v, ...p}))}
                        onSubmit={() => {
                            setQuery({...query, ...filterValue, page: 1});
                        }}
                    />
                </div>

                <div className="mt-6">
                    {loading ? (
                        <ListSkeleton/>
                    ) : rows.length === 0 ? (
                        <EmptyState q={query.q}/>
                    ) : (
                        <>
                            <div className="flex flex-col gap-4">
                                {pageRows.map((g) => (
                                    <GroupRow key={g.id} g={g}/>
                                ))}
                            </div>
                            <Paginator
                                page={page}
                                totalPages={totalPages}
                                onPage={(p) => setQuery({...query, page: p})}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}