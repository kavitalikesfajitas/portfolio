import { Button } from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/button";
import { Card } from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/card";
import Link from "next/link";
import { CompanyMark } from "./components/CompanyMark";
import { CompanyJobInfo } from "./components/CompanyJobInfo";
import type { CompanyJobListingRowProps } from "@/app/companies/types";

export type {
  CompanyJobListingRowProps,
  DepartmentSummary,
} from "@/app/companies/types";

export function CompanyJobListingRow({
  companyName,
  logoSrc,

  href,
  ...rest
}: CompanyJobListingRowProps) {
  return (
    <Card className="w-full rounded-lg border border-divider-1000 bg-neutral-910/80 px-5 py-4 text-cream-1000 shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_18px_60px_rgba(0,0,0,0.35)]">
      <div className="grid grid-cols-[auto_1fr] gap-4 sm:grid-cols-[auto_1fr_auto] sm:items-center">
        <CompanyMark companyName={companyName} logoSrc={logoSrc} />

        <CompanyJobInfo companyName={companyName} {...rest} />
        <Button
          asChild={Boolean(href)}
          className="col-span-2 h-12 rounded-md border border-orange-1000 bg-transparent px-7 font-overpass-mono text-sm font-bold text-orange-1000 hover:bg-orange-1000 hover:text-neutral-950 sm:col-span-1"
        >
          {href ? (
            <Link href={href}>
              Explore
              <span aria-hidden="true">-&gt;</span>
            </Link>
          ) : (
            <>
              Explore
              <span aria-hidden="true">-&gt;</span>
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
