import Image from "next/image";
import clsx from "clsx";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white relative">
      <div className="flex flex-col items-center justify-center">
        <div className="relative inline-block scale-[0.3] md:scale-[0.5] lg:scale-100">
          <img
            src="/images/logo.png"
            alt="living kavita loca"
            className={clsx(" flex self-center self-justify-center")}
          />
          <div className="absolute -right-20 top-1/2 -translate-y-1/2">
            <img
              src="/images/lips-glossy.png"
              alt="living kavita loca"
              className={clsx("lips relative z-10 scale-50 translate-x-3/8")}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
