"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";

export default function PhoneVerificationPage() {
    /* state 관리 */
    /* main과 동일하게 () 안에 넣는 값의 형식에 따라 관리 가능 */
    const [phone, setPhone] = useState("");                 /* 전화번호 */
    const [sent, setSent] = useState(false);                /* 인증번호 발송 여부 */
    const [verified, setVerified] = useState(false);        /* 인증번호 확인 여부 */
    const [finished, setFinished] = useState(false);        /* 회원가입 완료 여부 */
    /* 약관 동의 여부 [전체, 개별 항목] 를 따로 관리 : 전체 동의를 간단하게 체크하기 위해서 */
    const [agreements, setAgreements] = useState({
        all: false,
        terms: false,
        privacy: false,
        marketing: false,
    });

    /* 페이지 로드 시 초기화 처리 (소셜 로그인 후 데이터 처리) */
    useEffect(() => {
        const initializePage = async () => {
            try {
                // TODO: 여기에 백엔드 API 호출 추가 (사용자 정보 확인, 토큰 검증 등)
                // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/me`);
                // const userData = await response.json();
            } catch (error) {
                console.error("초기화 중 오류 발생:", error);
            }
        };

        initializePage();
    }, []);

    /* 전화번호 format */
    const formatPhone = (value: string) => {
        /* 숫자만 추출해서 4자리, 8자리마다 - 추가 처리 */
        const numbers = value.replace(/\D/g, "").slice(0, 11);
        if (numbers.length < 4) return numbers;
        if (numbers.length < 8) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
        return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
    };

    /* formatPhone 사용해서 format 적용 */
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(formatPhone(e.target.value));
    };

    /* 인증번호 발송 버튼 */
    const sendCode = () => {
        setSent(true);
    };

    /* 인증번호 확인 버튼 */
    const verifyCode = () => {
        setVerified(true);
    };

    /* 회원가입 완료 버튼 */
    const completeSignup = () => {
        setFinished(true);
    };

    /* 약관 동의 */
    const handleAgreementChange = (key: string) => {
        /* 선택된 게 [전체 동의] 이면 */
        if (key === "all") {
            /* 모든 약관의 state 업데이트 */
            const newVal = !agreements.all;
            setAgreements({
                all: newVal,
                terms: newVal,
                privacy: newVal,
                marketing: newVal,
            });
        }
        /* 아니면 */
        else {
            /* 각 약관의 state 업데이트 */
            const newAgreements = { ...agreements, [key]: !agreements[key] };
            const allChecked = newAgreements.terms && newAgreements.privacy && newAgreements.marketing;
            setAgreements({ ...newAgreements, all: allChecked });
        }
    };

    /* 전화번호 양식 검사 (11자리인지) */
    const isValidPhone = phone.replace(/\D/g, "").length === 11;

    return (
        <motion.div
            /* 적용 애니메이션 설명 */
            /* 투명한 상태로 y축 20px 아래에서 시작 */
            initial={{ opacity: 0, y: 20 }}
            /* 불투명하게 y축 0px 까지 이동 */
            animate={{ opacity: 1, y: 0 }}
            /* 0.5초 동안 */
            transition={{ duration: 0.5 }}
            className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="w-[420px] bg-white shadow-xl rounded-2xl p-8 flex flex-col gap-4 text-center"
            >
                <AnimatePresence mode="wait">
                    {!finished && (
                        <>
                            {/* 전화번호 입력 */}
                            {!sent && (
                                <motion.div
                                    key="phone"
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    transition={{ duration: 0.35 }}
                                    className="flex flex-col items-center gap-3"
                                >
                                    <h1 className="text-2xl font-bold text-green-700 mb-2">전화번호 인증</h1>
                                    <Input
                                        type="tel"
                                        placeholder="전화번호 입력 (예: 01012345678)"
                                        value={phone}
                                        onChange={handlePhoneChange}
                                    />
                                    <Button onClick={sendCode} disabled={!isValidPhone}>
                                        인증번호 발송
                                    </Button>
                                </motion.div>
                            )}

                             {/* 인증번호 입력 */}
                            {sent && !verified && (
                                <motion.div
                                    key="verify"
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    transition={{ duration: 0.35 }}
                                    className="flex flex-col items-center gap-3"
                                >
                                    <h1 className="text-2xl font-bold text-green-700 mb-2">인증번호 입력</h1>
                                    <Input placeholder="인증번호 입력 (임의로 입력)" />
                                    <Button onClick={verifyCode}>인증 확인</Button>
                                </motion.div>
                            )}

                            {/* 회원가입 약관 */}
                            {verified && (
                                <motion.div
                                    key="agreements"
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    transition={{ duration: 0.35 }}
                                    className="text-left pt-4 w-full"
                                >
                                    <h2 className="text-2xl font-bold text-green-700 mb-3">회원가입 약관</h2>
                                    <div className="border-t border-gray-200 my-4"></div>

                                    <div className="flex flex-col gap-2 text-sm text-slate-700">
                                        <label className="flex items-center gap-2">
                                            <Checkbox
                                                checked={agreements.all}
                                                onCheckedChange={() => handleAgreementChange("all")}
                                            />
                                            전체 동의
                                        </label>
                                        <label className="flex items-center gap-2 pl-4">
                                            <Checkbox
                                                checked={agreements.terms}
                                                onCheckedChange={() => handleAgreementChange("terms")}
                                            />
                                            [필수] 이용약관에 동의합니다.
                                        </label>
                                        <label className="flex items-center gap-2 pl-4">
                                            <Checkbox
                                                checked={agreements.privacy}
                                                onCheckedChange={() => handleAgreementChange("privacy")}
                                            />
                                            [필수] 개인정보 수집 및 이용에 동의합니다.
                                        </label>
                                        <label className="flex items-center gap-2 pl-4">
                                            <Checkbox
                                                checked={agreements.marketing}
                                                onCheckedChange={() => handleAgreementChange("marketing")}
                                            />
                                            [선택] 마케팅 정보 수신에 동의합니다.
                                        </label>
                                    </div>

                                    <Button
                                        className="w-full mt-6"
                                        disabled={!(agreements.terms && agreements.privacy)}
                                        onClick={completeSignup}
                                    >
                                        회원가입 완료
                                    </Button>
                                </motion.div>
                            )}
                        </>
                    )}

                    {finished && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.35 }}
                            className="flex flex-col items-center justify-center text-center">
                            <h2 className="text-3xl font-extrabold text-green-700 mb-3">
                                🎉 회원가입 완료!
                            </h2>
                            <p className="text-slate-600 text-md mb-3">
                                🐜 환영합니다! 이제 ANT와 함께 시작해보세요!
                            </p>
                            <Button onClick={() => (window.location.href = "/")}>
                                홈으로
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
}