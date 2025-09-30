"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Activity, Salad, Heart, Target } from "lucide-react";

export default function MainPage() {
  const features = [
    {
      icon: <Salad className="w-10 h-10 text-green-600" />,
      title: "맞춤 식단",
      desc: "개인 목표에 맞춘 식단을 추천받으세요.",
    },
    {
      icon: <Activity className="w-10 h-10 text-blue-600" />,
      title: "운동 플랜",
      desc: "다이어트와 건강을 위한 맞춤 운동 계획 제공.",
    },
    {
      icon: <Target className="w-10 h-10 text-red-600" />,
      title: "목표 추적",
      desc: "체중과 체지방 변화를 시각적으로 확인하세요.",
    },
    {
      icon: <Heart className="w-10 h-10 text-pink-600" />,
      title: "건강 관리",
      desc: "심박수, 칼로리 소모 등 주요 지표를 관리합니다.",
    },
  ];

  return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white text-gray-800">
        {/* Header */}
        <header className="flex justify-end items-center px-6 py-4 ">
          <Button
              variant="default"
              onClick={() => (window.location.href = "/login")}
          >
            로그인
          </Button>
        </header>

        {/* Hero Section */}
        <section className="text-center py-20 px-4">
          <motion.h1
              initial={{opacity: 0, y: -20}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.8}}
              className="text-4xl md:text-6xl font-bold text-green-700 mb-4"
          >
            나만의 다이어트 파트너
          </motion.h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            식단, 운동, 목표 관리까지 한번에!
          </p>
          <div className="flex justify-center gap-2 max-w-md mx-auto">
            <Input placeholder="이메일 입력" className="rounded-l-xl"/>
            <Button className="rounded-r-xl bg-green-600 hover:bg-green-700 text-white">
              시작하기
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="grid gap-6 px-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto pb-20">
          {features.map((f, i) => (
              <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
              >
                <Card className="shadow-lg rounded-2xl border border-gray-100 hover:shadow-xl transition">
                  <CardContent className="flex flex-col items-center text-center p-6">
                    {f.icon}
                    <h3 className="text-xl font-semibold mt-4">{f.title}</h3>
                    <p className="text-gray-600 mt-2 text-sm">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
          ))}
        </section>

        {/* Call To Action */}
        <section className="bg-green-100 py-16 text-center">
          <h2 className="text-3xl font-bold text-green-700 mb-4">
            지금 시작해서 목표를 달성하세요!
          </h2>
          <Button className="bg-green-600 hover:bg-green-700 text-lg px-6 py-3 rounded-xl text-white">
            무료로 체험하기
          </Button>
        </section>
      </div>
  );
}
