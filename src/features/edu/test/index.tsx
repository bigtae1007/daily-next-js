"use client";


import { useRouter } from "next/navigation";

export default function TestUi() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4">
      {/* 뒤로 가기 */}
      <button onClick={() => router.back()} className="px-4 py-2 bg-gray-500 text-white rounded">
        뒤로 가기
      </button>
    </div>
  );
}
