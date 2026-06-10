import Link from "next/link";

export function CurrentInvestigationsHeader() {
  return (
    <div className="flex items-end justify-between gap-3">
      <h2 className="text-xl font-bold uppercase tracking-tighter text-orange-1000 sm:text-2xl">
        Current Investigations
      </h2>
      <Link
        href="/companies"
        className="shrink-0 text-xs font-bold text-orange-1000 transition-colors hover:text-cream-1000 sm:text-sm"
      >
        view all -&gt;
      </Link>
    </div>
  );
}
