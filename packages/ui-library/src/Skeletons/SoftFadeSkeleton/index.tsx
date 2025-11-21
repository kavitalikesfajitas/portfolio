export function SoftFadeSkeleton() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-pink-100/40 to-white">
      <div className="flex animate-pulse flex-col items-center gap-5 opacity-60">
        <div className="h-10 w-48 rounded-full bg-white/50 shadow-sm"></div>
        <div className="h-3 w-64 rounded-full bg-white/50"></div>
        <div className="h-3 w-40 rounded-full bg-white/50"></div>
      </div>
    </div>
  );
}
