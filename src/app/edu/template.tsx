// src/app/edu/template.tsx
"use client";

import { useEffect, useState } from "react";

export default function EduTemplate({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 마운트될 때마다 실행 → 페이지 이동 시 template이 다시 만들어지면 또 실행됨
    setMounted(true);
    console.log("[EduTemplate] mounted");

    return () => {
      console.log("[EduTemplate] unmounted");
    };
  }, []);

  return (
    <div className="p-6">
      <div
        className={[
          "mb-4 rounded-xl border p-4",
          "transition-all duration-500 ease-out",
          mounted ? "translate-y-0 opacity-100 scale-100" : "translate-y-3 opacity-0 scale-95",
        ].join(" ")}
      >
        template 내부
      </div>

      {children}
    </div>
  );
}