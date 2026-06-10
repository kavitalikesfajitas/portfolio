import { Button } from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/button";
import { DividedPanelItem } from "@kavita-likes-fajitas/ui-library";
import Image from "next/image";
import Link from "next/link";

export type Investigation = {
  name: string;
  jobCount: number;
  href: string;
  logoSrc: string | null;
};

export function InvestigationCard({
  name,
  jobCount,
  href,
  logoSrc,
}: Investigation) {
  return (
    <DividedPanelItem className="items-stretch gap-4 border-divider-1000 px-5 py-4 text-left sm:odd:border-r sm:nth-[n+3]:border-t lg:border-r lg:border-t-0 lg:last:border-r-0">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-md bg-neutral-900">
            {logoSrc ? (
              <Image
                src={logoSrc}
                alt={name}
                width={48}
                height={48}
                className="size-full object-contain p-1"
              />
            ) : (
              <div className="text-xs font-bold text-cream-500">{name[0]}</div>
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-xl font-extrabold text-cream-1000">
                {name}
              </h3>
              <span className="size-1.5 shrink-0 rounded-full bg-green-500" />
            </div>
          </div>
        </div>

        <div>
          <div className="text-3xl font-extrabold leading-none text-orange-1000">
            {jobCount}
          </div>
          <div className="mt-2 text-sm text-foreground-900">
            engineering jobs
          </div>
        </div>

        <Button
          asChild
          className="h-10 w-full rounded-md border border-orange-1000 bg-transparent font-overpass-mono text-sm font-bold text-orange-1000 hover:bg-orange-1000 hover:text-neutral-950"
        >
          <Link href={href}>Investigate -&gt;</Link>
        </Button>
      </div>
    </DividedPanelItem>
  );
}
