"use client";

import LoadingBar from "@/components/ui/LoadingBar";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            {/*LoadingBar component 호출 및 LoadingBar에서 사용할 매개변수로 isDone={false}을 전달*/}
            <LoadingBar isDone={false} />
        </div>
    );
}
