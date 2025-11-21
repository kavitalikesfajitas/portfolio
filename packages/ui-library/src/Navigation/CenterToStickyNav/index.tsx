import clsx from "clsx";
import { useScroll, useSpring, useTransform, motion } from "motion/react";
import Image from "next/image";

export function CenterStickyNav({ children }: React.PropsWithChildren) {
  const { scrollYProgress } = useScroll();

  const progress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    mass: 0.4,
  });

  // this is the range for the nav animation
  const range: [number, number] = [0, 0.7];

  const width = useTransform(progress, range, ["30%", "100%"]);
  const borderRadius = useTransform(progress, range, [999, 0]);
  const boxShadow = useTransform(progress, range, [
    "0 12px 35px rgba(255,255,255,0.4)", // white shadow
    "0 4px 18px rgba(255,255,255,0)", // no shadow
  ]);
  const top = useTransform(progress, range, [1, 0]);

  // 💋 + text logo animation for the nav
  // Start logo animation at 40% of nav animation
  // we want this range to be slightly different because we want it to
  //  happen slightly later than the nav animation
  const logoRange: [number, number] = [0.4, 0.8];
  const logoOpacity = useTransform(progress, logoRange, [0, 1]);
  // the logo will slide in from the left and scale up slightly from 80% to 100% of its original size
  const logoScale = useTransform(progress, logoRange, [0.8, 1]);
  const logoY = useTransform(progress, logoRange, ["20%", "0%"]);

  // Use flex-basis to change the width of the logo/left side content
  // with living kavita loca logo so that it does not show up at first,
  // then it grows to 40% of the width of the nav.
  const logoFlexBasis = useTransform(progress, logoRange, ["0%", "40%"]);

  // Nav items: move from center to right as logo appears by changing the flex-grow
  // Flex-grow: starts at 1 (takes all space, centers content), ends at 0 (no extra space)
  const navFlexGrow = useTransform(progress, logoRange, [1, 0]);

  return (
    <motion.div
      className={clsx(
        "sticky left-0 z-50 mx-auto flex min-w-fit items-center justify-between overflow-visible bg-white text-gray-950",
        "rounded-full",
      )}
      style={{ width, borderRadius, boxShadow, top }}
    >
      <motion.div
        style={{
          opacity: logoOpacity,
          scale: logoScale,
          y: logoY,
          flexBasis: logoFlexBasis,
        }}
        className="flex shrink-0 items-center gap-1 overflow-hidden whitespace-nowrap md:gap-2"
      >
        <span className="pl-1 text-xs font-semibold uppercase leading-tight tracking-tight sm:text-sm md:pl-2 md:text-base md:tracking-[0.25em]">
          Living Kavita Loca
        </span>
        <div className="relative h-6 w-6 md:h-9 md:w-9">
          <Image
            src="/images/lips-glossy.png"
            alt="Living Kavita Loca lips"
            fill
            className="object-contain"
          />
        </div>
      </motion.div>

      {/* Nav items in the center/right */}
      <motion.div
        className="flex items-center justify-center"
        style={{ flexGrow: navFlexGrow }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
