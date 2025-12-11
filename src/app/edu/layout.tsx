// app/edu/layout.tsx

export default function EduLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className='flex justify-center mb-3'>
        <p className='font-bold text-2xl'>박태형의 연습장</p>
      </div>
      {children}
    </div>
  );
}
