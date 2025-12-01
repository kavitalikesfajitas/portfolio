import { useMediaQuery } from "@react-hookz/web";

const LAPTOP_BREAKPOINT = 1024;
const MOBILE_BREAKPOINT = 768;

export const useIsLaptopOrHigher = () =>
  useMediaQuery(`(min-width: ${LAPTOP_BREAKPOINT + 1}px)`);

export const useIsMobile = () =>
  useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT}px)`);
