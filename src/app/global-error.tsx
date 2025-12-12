'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-2">예기치 못한 오류가 발생했습니다.</h1>
        <p className="text-sm text-gray-500 mb-4">{error.message}</p>
        <button className="px-4 py-2 rounded bg-black text-white" onClick={() => reset()}>
          다시 시도하기
        </button>
      </body>
    </html>
  );
}
