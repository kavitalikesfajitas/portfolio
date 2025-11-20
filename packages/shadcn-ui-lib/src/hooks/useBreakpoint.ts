import * as React from "react";

export function useIsMobile(mobileBreakpoint = 768) {
  return useIsBreakpointMaxWidth(mobileBreakpoint);
}

export function useIsDesktopOrLarger(desktopBreakpoint = 1024) {
  return useIsBreakpointMinWidth(desktopBreakpoint);
}

export function useIsLessThanDesktopAndLargerThanMobile() {
  const isLessThanDesktop = useIsBreakpointMaxWidth(1024);
  const isLargerThanMobile = useIsBreakpointMinWidth(768);
  return isLessThanDesktop && isLargerThanMobile;
}

export function useIsBreakpointMaxWidth(breakpoint = 768) {
  const [isBreakpoint, setIsBreakpoint] = React.useState<boolean | undefined>(
    undefined,
  );
  console.log({ breakpoint });

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const onChange = () => {
      setIsBreakpoint(window.innerWidth < breakpoint);
    };
    mql.addEventListener("change", onChange);
    setIsBreakpoint(window.innerWidth < breakpoint);
    return () => mql.removeEventListener("change", onChange);
  }, [breakpoint]);

  return !!isBreakpoint;
}

export function useIsBreakpointMinWidth(breakpoint = 768) {
  const [isBreakpoint, setIsBreakpoint] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${breakpoint}px)`);
    const onChange = () => {
      setIsBreakpoint(window.innerWidth >= breakpoint);
    };
    mql.addEventListener("change", onChange);
    setIsBreakpoint(window.innerWidth >= breakpoint);
    return () => mql.removeEventListener("change", onChange);
  }, [breakpoint]);

  return !!isBreakpoint;
}
