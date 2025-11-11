"use client";
import { useEffect, useState } from "react";

export default function LoadingBar({ isDone }: { isDone: boolean }) {
    /* 로딩 진행 속도를 저장하는 상태값 */
    const [progress, setProgress] = useState(0);

    /* useEffect : 지정한 값이 바뀔 때 내부 코드를 실행 */
    /* loading 통해서 전달받은 isDone에 따라서 setProgress를 통해 로딩 진행 속도 조절 */
    useEffect(() => {
        if (isDone) {
            /* 0.1초마다 (ms) / 10씩 / 100까지 */
            const fast = setInterval(() => {
                setProgress((p) => Math.min(p + 10, 100));
            }, 100);
            return () => clearInterval(fast);
        } else {
            /* 0.03초마다 (ms) / 1씩 / 90까지 (isDone이 true로 전달되기 전까지 로딩 완료라고 판단할 수 없으므로 최대 90까지로 지정) */
            const slow = setInterval(() => {
                setProgress((p) => (p < 90 ? p + 1 : p));
            }, 30);
            return () => clearInterval(slow);
        }
    }, [isDone]);

    return (
        <div className="relative w-96 h-5 rounded-full bg-gray-200 shadow-inner overflow-visible">
            <div
                className="h-full bg-amber-500 transition-all duration-75 ease-linear rounded-full"
                style={{
                    /* progress만큼 로딩바 길이 설정 */
                    width: `${progress}%`,
                }}
            />
            <div
                className="absolute -top-6 text-5xl transition-all duration-75 ease-linear select-none"
                style={{
                    /* progress에 따라 개미의 위치를 왼쪽부터 시작해서 오른쪽으로 이동 */
                    left: `${progress}%`,
                    transform: "translateX(-50%)",
                }}
            >
                <img
                    src="/images/ant_loading_r.png"
                    alt="Ant"
                    className="w-12 h-12 object-contain select-none"
                    /* 드래그 방지 처리 */
                    draggable={false}
                />
            </div>
        </div>
    );
}