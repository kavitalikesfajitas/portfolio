import Link from "next/link";

export function CurrentInvestigationsHeader() {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="text-2xl font-bold uppercase tracking-tighter text-orange-1000">
        Current Investigations
      </h2>
      <Link
        href="/companies"
        className="text-sm font-bold text-orange-1000 transition-colors hover:text-cream-1000"
      >
        view all -&gt;
      </Link>
    </div>
  );
}
