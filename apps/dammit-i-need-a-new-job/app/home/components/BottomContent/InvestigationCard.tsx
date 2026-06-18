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
    <DividedPanelItem
      dividers="none"
      className="items-stretch border-b border-divider-1000 px-4 py-4 text-left last:border-b-0 sm:border-b-0 sm:px-5 sm:odd:border-r sm:nth-[n+3]:border-t lg:border-r lg:border-t-0 lg:last:border-r-0"
    >
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:block">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-neutral-900 sm:size-12">
              {logoSrc ? (
                <Image
                  src={logoSrc}
                  alt={name}
                  width={48}
                  height={48}
                  className="size-full object-contain p-1"
                />
              ) : (
                <div className="text-xs font-bold text-cream-500">
                  {name[0]}
                </div>
              )}
            </div>
            <div className="flex min-w-0 items-center gap-2">
              <h3 className="truncate text-lg font-extrabold text-cream-1000 sm:text-xl">
                {name}
              </h3>
              <span className="size-1.5 shrink-0 rounded-full bg-green-500" />
            </div>
          </div>

          <div className="text-right sm:mt-4 sm:text-left">
            <div className="text-2xl font-extrabold leading-none text-orange-1000 sm:text-3xl">
              {jobCount}
            </div>
            <div className="mt-1 text-xs text-foreground-900 sm:mt-2 sm:text-sm">
              live engineering jobs
            </div>
          </div>
        </div>

        <Button
          asChild
          className="h-9 w-full rounded-md border border-orange-1000 bg-transparent font-overpass-mono text-xs font-bold text-orange-1000 hover:bg-orange-1000 hover:text-neutral-950 sm:h-10 sm:text-sm"
        >
          <Link href={href}>Investigate -&gt;</Link>
        </Button>
      </div>
    </DividedPanelItem>
  );
}
