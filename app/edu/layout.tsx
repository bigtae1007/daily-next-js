// app/edu/layout.tsx

export default function EduLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ border: "2px solid red", padding: "16px" }}>
      <div>baseqeq (edu layout)</div>
      {children}
    </div>
  );
}
