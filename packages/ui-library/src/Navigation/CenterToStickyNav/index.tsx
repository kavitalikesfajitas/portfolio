import clsx from "clsx";
import { useScroll, useSpring, useTransform, motion } from "motion/react";

type CenterStickyNavProps = {
  children: React.ReactNode;
  InNavLogo: () => React.ReactNode;
};

export function CenterStickyNav({ children, InNavLogo }: CenterStickyNavProps) {
  const { scrollYProgress } = useScroll();

  const progress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    mass: 0.4,
  });

  // Nav animation range: 0-70% of scroll progress
  const range: [number, number] = [0, 0.5];

  const width = useTransform(progress, range, ["30%", "100%"]);
  const borderRadius = useTransform(progress, range, [999, 0]);
  // White glow that fades away as nav expands
  const boxShadow = useTransform(progress, range, [
    "0 12px 35px rgba(255,255,255,0.4)", // white shadow
    "0 4px 18px rgba(255,255,255,0)", // no shadow
  ]);
  // 💋 + text logo animation for the nav
  // Start logo animation at 40% of nav animation
  // we want this range to be slightly different
  // because we want it to happen slightly later than the nav animation
  const logoRange: [number, number] = [0.2, 0.5];
  const logoOpacity = useTransform(progress, logoRange, [0, 1]);
  // the logo will slide in from the left and scale up slightly from 80% to 100% of its original size
  const logoScale = useTransform(progress, logoRange, [0.8, 1]);
  const logoY = useTransform(progress, logoRange, ["20%", "0%"]);

  // Use flex-basis to change the width of the logo/left side content
  // with living kavita loca logo so that it does not show up at first (0%),
  // then it grows to 40% of the width of the nav.
  const logoFlexBasis = useTransform(progress, logoRange, ["0%", "40%"]);

  // Nav items shift from center to right as logo appears using flex-grow
  // Flex-grow: 1 (centered) → 0 (right-aligned)
  const navFlexGrow = useTransform(progress, logoRange, [1, 0]);

  return (
    <motion.div
      className={clsx(
        "text-gray-1000 sticky left-0 z-50 mx-auto flex min-w-fit items-center justify-between overflow-visible bg-white",
        "top-0 rounded-full",
      )}
      style={{ width, borderRadius, boxShadow }}
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
        <InNavLogo />
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
