import Link from "next/link";
import clsx from "clsx";
import { NonMainNav } from "@/app/components/Nav/NonMainNav";

export default function NotFound() {
  return (
    <main className="bg-gray-1000 text-white relative flex flex-col min-h-screen">
      <NonMainNav />
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 text-center">
        <div className="flex flex-col items-center gap-2">
          <span className="font-lobster text-8xl md:text-9xl text-rose-400">
            404
          </span>
          <div className="flex flex-col items-center gap-1">
            <div className={clsx("bg-rose-400 h-1.5 w-32")} />
            <div className={clsx("bg-rose-400 h-1.5 w-48")} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-midnight-gelactic text-2xl md:text-3xl">
            Page not found
          </h1>
          <p className="font-light text-sm md:text-base text-white/70 max-w-md">
            Looks like this page took a wrong turn. Let&apos;s get you back on
            track.
          </p>
        </div>
        <Link
          href="/"
          className={clsx(
            "mt-4 rounded-full border border-rose-400 px-6 py-2",
            "font-medium text-sm md:text-base text-rose-400",
            "transition-all hover:bg-rose-400 hover:text-gray-1000",
          )}
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
