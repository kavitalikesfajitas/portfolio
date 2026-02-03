export const HEIGHT_CLASSES = {
  sm: "h-[40vh]",
  md: "h-[50vh]",
  lg: "h-[60vh]",
  xl: "h-[70vh]",
  full: "h-screen",
};

export type HeightKey = keyof typeof HEIGHT_CLASSES;
export type HeightClasses =
  (typeof HEIGHT_CLASSES)[keyof typeof HEIGHT_CLASSES];
