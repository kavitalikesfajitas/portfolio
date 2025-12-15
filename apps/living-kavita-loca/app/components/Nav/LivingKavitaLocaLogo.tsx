import Image from "next/image";

export const LivingKavitaLocaLogo = () => {
  return (
    <>
      <span className="pl-1 text-xs font-semibold uppercase leading-tight tracking-tight sm:text-sm md:pl-2 md:text-base md:tracking-[0.25em]">
        Living Kavita Loca
      </span>
      <div className="relative h-6 w-6 md:h-9 md:w-9">
        <Image
          src="/images/hero/lips-glossy.png"
          alt="Living Kavita Loca lips"
          fill
          className="object-contain"
        />
      </div>
    </>
  );
};
