import { Button } from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/button";
import clsx from "clsx";
import { forwardRef } from "react";

export type ThemedButtonProps = React.ComponentProps<"button"> & {
  /** When true, merges props onto the single child element (via Radix Slot)
   *  instead of rendering a <button>. Expects exactly one child. */
  asChild?: boolean;
};

export const ThemedButton = forwardRef<HTMLButtonElement, ThemedButtonProps>(
  ({ children, className, asChild, ...props }, ref) => {
    const styles = clsx(
      "mt-4 self-center rounded-full border border-rose-400 px-6 py-2",
      "font-medium text-sm md:text-base text-rose-400",
      "transition-all",
      // Better hover — only on devices that support hover (not touch)
      "betterhover:hover:bg-rose-400 betterhover:hover:text-gray-1000",
      // Active styles for touch devices
      "active:scale-95 active:bg-rose-400 active:text-gray-1000",
      "bg-transparent shadow-none",
    );
    return (
      <Button
        {...props}
        variant="outline"
        asChild={asChild}
        className={clsx(styles, className)}
        ref={ref}
      >
        {children}
      </Button>
    );
  },
);
ThemedButton.displayName = "ThemedButton";
