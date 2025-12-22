// app/edu/layout.tsx

'use client'

import { useEffect, useState } from "react";

export default function EduLayout({ children }: { children: React.ReactNode }) {

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 마운트될 때마다 실행 → 페이지 이동 시 template이 다시 만들어지면 또 실행됨
    setMounted(true);
    console.log("[layout] mounted");

    return () => {
      console.log("[layout] unmounted");
    };
  }, []);

  return (
    <div>
      <div className='flex justify-center mb-3 flex-col items-center gap-10'>
        <p className='font-bold text-2xl'>박태형의 연습장</p>
        <h2 className='font-bold text-2xl'>EUD LayOut</h2>
      </div>
      <div
        className={[
          "mb-4 rounded-xl border p-4",
          "transition-all duration-500 ease-out",
          mounted ? "translate-y-0 opacity-100 scale-100" : "translate-y-3 opacity-0 scale-95",
        ].join(" ")}
      >
        layout 내부
      </div>
      {children}
    </div>
  );
}
