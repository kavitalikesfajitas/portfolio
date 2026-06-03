import React from "react";
import clsx from "clsx";

type IconContainerSize = "sm" | "md" | "lg" | "xl";
type IconContainerTone = "neutral" | "muted" | "primary" | "accent";
type IconContainerVariant = "plain" | "soft" | "outline" | "solid";
type IconContainerShape = "circle" | "rounded" | "square";

type IconContainerProps = React.ComponentProps<"span"> & {
  /** The icon to render. The container sizes the SVG and sets `currentColor`,
   *  so child icons don't need their own size/color classes. */
  children?: React.ReactNode;
  className?: string;
  size?: IconContainerSize;
  tone?: IconContainerTone;
  variant?: IconContainerVariant;
  shape?: IconContainerShape;
};

// Drives the child SVG dimensions directly so icons are uniform regardless of
// their intrinsic size. The `gap`/padding chrome is supplied by the variant.
const sizeClasses: Record<IconContainerSize, string> = {
  sm: "[&_svg]:size-4",
  md: "[&_svg]:size-5",
  lg: "[&_svg]:size-7",
  xl: "[&_svg]:size-8",
};

// Padding only applies once a variant gives the container a background/border,
// so `plain` icons sit flush against neighbouring content.
const paddedSizeClasses: Record<IconContainerSize, string> = {
  sm: "p-1.5",
  md: "p-2",
  lg: "p-2.5",
  xl: "p-3",
};

// Foreground colour for plain / soft / outline. `solid` overrides this.
const toneTextClasses: Record<IconContainerTone, string> = {
  neutral: "text-gray-1000",
  muted: "text-gray-500",
  primary: "text-rose-400",
  accent: "text-orange-500",
};

const toneSoftClasses: Record<IconContainerTone, string> = {
  neutral: "bg-gray-100",
  muted: "bg-gray-100",
  primary: "bg-rose-400/10",
  accent: "bg-orange-500/10",
};

const toneOutlineClasses: Record<IconContainerTone, string> = {
  neutral: "border border-gray-300",
  muted: "border border-gray-300",
  primary: "border border-rose-400",
  accent: "border border-orange-500",
};

const toneSolidClasses: Record<IconContainerTone, string> = {
  neutral: "bg-gray-1000 text-white",
  muted: "bg-gray-500 text-white",
  primary: "bg-rose-400 text-gray-1000",
  accent: "bg-orange-500 text-white",
};

const shapeClasses: Record<IconContainerShape, string> = {
  circle: "rounded-full",
  rounded: "rounded-xl",
  square: "rounded-none",
};

export function IconContainer({
  children,
  className,
  size = "lg",
  tone = "neutral",
  variant = "plain",
  shape = "circle",
  ...rest
}: IconContainerProps) {
  const isDecorated = variant !== "plain";
  const variantClasses = clsx(
    variant === "soft" && [toneSoftClasses[tone], toneTextClasses[tone]],
    variant === "outline" && [toneOutlineClasses[tone], toneTextClasses[tone]],
    variant === "solid" && toneSolidClasses[tone],
    variant === "plain" && toneTextClasses[tone],
  );

  return (
    <span
      className={clsx(
        "inline-flex shrink-0 items-center justify-center transition-colors",
        sizeClasses[size],
        isDecorated && [paddedSizeClasses[size], shapeClasses[shape]],
        variantClasses,
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}

export type {
  IconContainerProps,
  IconContainerSize,
  IconContainerTone,
  IconContainerVariant,
  IconContainerShape,
};
