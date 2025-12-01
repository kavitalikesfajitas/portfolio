export function SmallerSkeleton() {
  return (
    <div className="flex min-h-[60vh] animate-pulse flex-col items-center justify-center gap-8">
      {/* Fake circular logo bubble */}
      <div className="relative">
        <div className="h-36 w-36 rounded-full bg-pink-200/40 blur-lg"></div>
        <div className="absolute inset-0 h-32 w-32 rounded-full bg-pink-300/50 shadow-[0_0_30px_rgba(255,150,170,0.4)]"></div>
      </div>

      {/* Text placeholder */}
      <div className="flex w-full max-w-sm flex-col items-center gap-4">
        <div className="h-4 w-3/4 rounded-full bg-neutral-200"></div>
        <div className="h-4 w-2/3 rounded-full bg-neutral-200"></div>
        <div className="h-4 w-1/2 rounded-full bg-neutral-200"></div>
      </div>
    </div>
  );
}
