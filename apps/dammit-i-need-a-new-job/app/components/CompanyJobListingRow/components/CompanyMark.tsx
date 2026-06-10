import { Badge } from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/badge";
import Image from "next/image";
import type { DepartmentSummary } from "@/app/companies/types";

type CompanyMarkProps = {
  companyName: string;
  logoSrc?: string | null;
};

export function CompanyMark({ companyName, logoSrc }: CompanyMarkProps) {
  return (
    <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-md bg-black shadow-[0_0_18px_rgba(0,0,0,0.45)] sm:size-20">
      {logoSrc ? (
        <Image
          src={logoSrc}
          alt={`${companyName} logo`}
          width={80}
          height={80}
          className="size-10 object-contain sm:size-12"
        />
      ) : (
        <div className="h-0 w-0 border-x-[17px] border-b-[30px] border-x-transparent border-b-white sm:border-x-[23px] sm:border-b-[40px]" />
      )}
    </div>
  );
}

export function DepartmentBadge({ name, count, isPrimary }: DepartmentSummary) {
  return (
    <Badge
      variant="outline"
      className={[
        "h-7 rounded-md border bg-neutral-950/35 px-3 font-overpass-mono text-xs font-semibold tracking-normal shadow-[inset_0_0_14px_rgba(255,255,255,0.025)]",
        isPrimary
          ? "border-orange-1000 text-orange-1000"
          : "border-divider-1000 text-cream-800",
      ].join(" ")}
    >
      <span>{name}</span>
      <span className="text-current/80">{count}</span>
    </Badge>
  );
}
