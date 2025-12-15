import { TornPaperEffect } from "@kavita-likes-fajitas/ui-library/TornPaperEffect";
import clsx from "clsx";
import BioImage from "@/public/images/personal/bio-photo.jpg";
import Image from "next/image";

export function Bio() {
  return (
    <section className="flex-col flex md:flex-row gap-10 pt-10 snap-start">
      <div
        className={clsx(
          "relative aspect-square",
          "w-full md:basis-1/2 h-fit max-w-[600px]",
        )}
      >
        <TornPaperEffect className="h-full w-full">
          <Image
            src={BioImage}
            alt="Kavita C"
            fill
            quality={75}
            className="object-cover p-5"
          />
        </TornPaperEffect>
      </div>
      <div className="flex flex-col basis-1/2">
        <h2 className="text-3xl font-helvetica-neue mb-6">
          Hi! I&apos;m Kavita!
        </h2>

        <div className="space-y-10 max-w-2xl">
          Hi I&apos;m Kavita! I&apos;m a software engineer and creative
          developer. I&apos;m a software engineer and creative developer.
          I&apos;m a software engineer and creative developer. I&apos;m a
          software engineer and creative developer. I&apos;m a software engineer
          and creative developer. I&apos;m a software engineer and creative
          developer. I&apos;m a software engineer and creative developer.
          I&apos;m a software engineer and creative developer. I&apos;m a
          software engineer and creative developer. I&apos;m a software engineer
          and creative developer. I&apos;m a software engineer and creative
          developer. I&apos;m a software engineer and creative developer.
        </div>
      </div>
    </section>
  );
}
