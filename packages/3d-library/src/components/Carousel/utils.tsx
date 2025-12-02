import { useMediaQuery } from "@react-hookz/web";
import { Euler } from "three";

const LAPTOP_BREAKPOINT = 1024;
const MOBILE_BREAKPOINT = 768;

export const useIsLaptopOrHigher = () =>
  useMediaQuery(`(min-width: ${LAPTOP_BREAKPOINT + 1}px)`);

export const useIsMobile = () =>
  useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT}px)`);

/**
 * 3D helper functions
 */
/**
 * Ease out cubic function
 * @param x - The input value
 * @returns The eased value
 */
export const easeOutCubic = (x: number): number => {
  return 1 - Math.pow(1 - x, 3);
};

/**
 * Rotation function
 * @param option - The rotation option
 * @returns The rotation
 */
export const rotation = (option: number | undefined) => {
  return new Euler(0, Math.PI / 2, option, "XYZ");
};

/**
 * Array rotate function
 * @param arr - The array to rotate
 * @param count - The number of items to rotate
 * @returns The rotated array
 */
export const arrayRotate = (arr: any, count: number) => {
  const len = arr.length;
  const newArr = arr;
  newArr.push(...newArr.splice(0, ((count % len) + len) % len));
  return newArr;
};
