import Link from "next/link";

export function CurrentInvestigationsHeader() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="mb-2 inline-flex rounded-sm border border-green-500 px-2 py-1 text-xs font-bold uppercase leading-none tracking-tighter text-green-500">
          Live job listings
        </div>
        <h2 className="text-xl font-bold leading-none uppercase tracking-tighter text-orange-1000 sm:text-2xl">
          Current Investigations
        </h2>
        <p className="mt-2 max-w-2xl text-xs leading-relaxed text-foreground-900 sm:text-sm">
          These counts come from company job boards, not a static list.
        </p>
      </div>
      <Link
        href="/companies"
        className="shrink-0 text-xs font-bold leading-none text-orange-1000 transition-colors hover:text-cream-1000 sm:text-sm"
      >
        view all -&gt;
      </Link>
    </div>
  );
}
