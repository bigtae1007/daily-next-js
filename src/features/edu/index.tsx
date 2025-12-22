"use client";


import { useRouter } from "next/navigation";

export default function EduUi() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4">
      {/* /edu/test로 이동 */}
      <button
        onClick={() => router.push("/edu/test")}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        test 페이지로 이동
      </button>
    </div>
  );
}
