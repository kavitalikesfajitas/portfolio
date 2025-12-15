import { LivingKavitaLocaInNavLogo } from "@/app/main/NavForMain";
import { Nav } from "@/app/ui/components/Nav";
import clsx from "clsx";

export default function Home() {
  return (
    <main className="bg-gray-950 text-white relative flex flex-col min-h-screen">
      <div
        className={clsx(
          "sticky left-0 z-50 mx-auto flex w-full items-center justify-between overflow-visible bg-white text-gray-950",
          "top-0 ",
        )}
      >
        <div
          className={clsx(
            "flex shrink-0 items-center gap-1 overflow-hidden whitespace-nowrap md:gap-2",
          )}
        >
          <LivingKavitaLocaInNavLogo />
        </div>
        <Nav
          isMobile={false}
          className="h-fit flex-1 grow-0 w-full sticky top-0 "
        />
      </div>
      <div>testing page</div>
    </main>
  );
}
