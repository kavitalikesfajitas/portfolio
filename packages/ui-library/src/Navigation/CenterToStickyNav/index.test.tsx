import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import type React from "react";
import { CenterStickyNav } from "./index";

// Types for mock components and values
interface MockMotionValue<T = unknown> {
  get: () => T;
  set: ReturnType<typeof vi.fn>;
  onChange: ReturnType<typeof vi.fn>;
  destroy: ReturnType<typeof vi.fn>;
}

interface MotionDivProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

type MockCallArray = unknown[];

// Create a mock MotionValue factory
const createMockMotionValue = <T = unknown,>(
  initialValue: T,
): MockMotionValue<T> => ({
  get: () => initialValue,
  set: vi.fn(),
  onChange: vi.fn(),
  destroy: vi.fn(),
});

// Mock functions that we'll control
const mockUseScroll = vi.fn();
const mockUseSpring = vi.fn();
const mockUseTransform = vi.fn();
const mockUseIsMobile = vi.fn();

// Mock @kavita-likes-fajitas/shadcn-ui-lib/hooks/useBreakpoint
vi.mock("@kavita-likes-fajitas/shadcn-ui-lib/hooks/useBreakpoint", () => ({
  useIsMobile: () => mockUseIsMobile(),
}));

// Mock motion/react
vi.mock("motion/react", async () => {
  const react = await import("react");

  const MockMotionDiv = react.forwardRef(function MockMotionDiv(
    { children, className, style, ...props }: MotionDivProps,
    ref: React.Ref<HTMLDivElement>,
  ) {
    return (
      <div ref={ref} className={className} style={style} {...props}>
        {children}
      </div>
    );
  });

  return {
    motion: {
      div: MockMotionDiv,
    },
    useScroll: (...args: unknown[]) => mockUseScroll(...args),
    useSpring: (...args: unknown[]) => mockUseSpring(...args),
    useTransform: (...args: unknown[]) => mockUseTransform(...args),
  };
});

describe("CenterStickyNav", () => {
  const mockInNavLogo = () => <div data-testid="nav-logo">Logo</div>;
  const mockChildren = <div data-testid="nav-children">Nav Items</div>;

  beforeEach(() => {
    // Reset all mocks
    vi.clearAllMocks();

    // Mock useIsMobile to return false (desktop) by default
    mockUseIsMobile.mockReturnValue(false);

    // Set up default mock implementations
    mockUseScroll.mockReturnValue({
      scrollYProgress: createMockMotionValue(0),
    });

    mockUseSpring.mockImplementation((value) => value);

    mockUseTransform.mockImplementation((value, inputRange, outputRange) => {
      return createMockMotionValue(outputRange[0]);
    });
  });

  afterEach(() => {
    cleanup();
  });

  describe("Rendering", () => {
    it("should render the component with children and logo", () => {
      render(
        <CenterStickyNav InNavLogo={mockInNavLogo}>
          {mockChildren}
        </CenterStickyNav>,
      );

      expect(screen.getByTestId("nav-logo")).toBeInTheDocument();
      expect(screen.getByTestId("nav-children")).toBeInTheDocument();
    });

    it("should render with correct structural classes", () => {
      const { container } = render(
        <CenterStickyNav InNavLogo={mockInNavLogo}>
          {mockChildren}
        </CenterStickyNav>,
      );

      const mainNav = container.firstChild as HTMLElement;
      expect(mainNav).toHaveClass("sticky");
      expect(mainNav).toHaveClass("left-0");
      expect(mainNav).toHaveClass("z-50");
      expect(mainNav).toHaveClass("mx-auto");
      expect(mainNav).toHaveClass("flex");
      expect(mainNav).toHaveClass("items-center");
      expect(mainNav).toHaveClass("justify-between");
    });

    it("should render logo container with correct classes", () => {
      render(
        <CenterStickyNav InNavLogo={mockInNavLogo}>
          {mockChildren}
        </CenterStickyNav>,
      );

      const logoContainer = screen.getByTestId("nav-logo").parentElement;
      expect(logoContainer).toHaveClass("flex");
      expect(logoContainer).toHaveClass("shrink-0");
      expect(logoContainer).toHaveClass("items-center");
      expect(logoContainer).toHaveClass("overflow-hidden");
      expect(logoContainer).toHaveClass("whitespace-nowrap");
    });

    it("should render nav items container with correct classes", () => {
      render(
        <CenterStickyNav InNavLogo={mockInNavLogo}>
          {mockChildren}
        </CenterStickyNav>,
      );

      const navItemsContainer =
        screen.getByTestId("nav-children").parentElement;
      expect(navItemsContainer).toHaveClass("flex");
      expect(navItemsContainer).toHaveClass("items-center");
      expect(navItemsContainer).toHaveClass("justify-center");
    });
  });

  describe("Props Handling", () => {
    it("should call InNavLogo function to render logo", () => {
      const mockLogoFn = vi.fn(() => (
        <div data-testid="custom-logo">Custom Logo</div>
      ));

      render(
        <CenterStickyNav InNavLogo={mockLogoFn}>
          {mockChildren}
        </CenterStickyNav>,
      );

      expect(mockLogoFn).toHaveBeenCalled();
      expect(screen.getByTestId("custom-logo")).toBeInTheDocument();
    });

    it("should render multiple children correctly", () => {
      render(
        <CenterStickyNav InNavLogo={mockInNavLogo}>
          <a data-testid="link-1">Link 1</a>
          <a data-testid="link-2">Link 2</a>
          <a data-testid="link-3">Link 3</a>
        </CenterStickyNav>,
      );

      expect(screen.getByTestId("link-1")).toBeInTheDocument();
      expect(screen.getByTestId("link-2")).toBeInTheDocument();
      expect(screen.getByTestId("link-3")).toBeInTheDocument();
    });

    it("should handle complex logo component", () => {
      const ComplexLogo = () => (
        <div data-testid="complex-logo">
          <img src="/logo.png" alt="Logo" />
          <span>Brand Name</span>
        </div>
      );

      render(
        <CenterStickyNav InNavLogo={ComplexLogo}>
          {mockChildren}
        </CenterStickyNav>,
      );

      expect(screen.getByTestId("complex-logo")).toBeInTheDocument();
    });
  });

  describe("Motion Integration", () => {
    it("should call useScroll hook", () => {
      render(
        <CenterStickyNav InNavLogo={mockInNavLogo}>
          {mockChildren}
        </CenterStickyNav>,
      );

      expect(mockUseScroll).toHaveBeenCalled();
    });

    it("should call useSpring with correct parameters", () => {
      const mockScrollYProgress = createMockMotionValue(0);
      mockUseScroll.mockReturnValue({ scrollYProgress: mockScrollYProgress });

      render(
        <CenterStickyNav InNavLogo={mockInNavLogo}>
          {mockChildren}
        </CenterStickyNav>,
      );

      expect(mockUseSpring).toHaveBeenCalledWith(mockScrollYProgress, {
        stiffness: 200,
        damping: 30,
        mass: 0.4,
      });
    });

    it("should call useTransform for width animation", () => {
      render(
        <CenterStickyNav InNavLogo={mockInNavLogo}>
          {mockChildren}
        </CenterStickyNav>,
      );

      // Check if useTransform was called with correct parameters for width
      const calls = mockUseTransform.mock.calls;
      const widthCall = calls.find(
        (call: MockCallArray) =>
          JSON.stringify(call[2]) === JSON.stringify(["30%", "100%"]),
      );

      expect(widthCall).toBeDefined();
      expect(widthCall![1]).toEqual([0, 0.5]); // range for width
    });

    it("should call useTransform for borderRadius animation", () => {
      render(
        <CenterStickyNav InNavLogo={mockInNavLogo}>
          {mockChildren}
        </CenterStickyNav>,
      );

      const calls = mockUseTransform.mock.calls;
      const borderRadiusCall = calls.find(
        (call: MockCallArray) =>
          JSON.stringify(call[2]) === JSON.stringify([999, 0]),
      );

      expect(borderRadiusCall).toBeDefined();
      expect(borderRadiusCall![1]).toEqual([0, 0.5]); // range for borderRadius
    });

    it("should call useTransform for boxShadow animation", () => {
      render(
        <CenterStickyNav InNavLogo={mockInNavLogo}>
          {mockChildren}
        </CenterStickyNav>,
      );

      const calls = mockUseTransform.mock.calls;
      const boxShadowCall = calls.find((call: MockCallArray) => {
        const outputRange = call[2];
        if (Array.isArray(outputRange) && typeof outputRange[0] === "string") {
          return outputRange[0].includes("rgba(255,255,255,0.4)");
        }
        return false;
      });

      expect(boxShadowCall).toBeDefined();
      expect(boxShadowCall![1]).toEqual([0, 0.5]); // range for boxShadow
    });

    it("should call useTransform for logo animations with correct range", () => {
      render(
        <CenterStickyNav InNavLogo={mockInNavLogo}>
          {mockChildren}
        </CenterStickyNav>,
      );

      const calls = mockUseTransform.mock.calls;

      // Logo animations should use [0.2, 0.5] range
      const logoAnimationCalls = calls.filter(
        (call: MockCallArray) =>
          JSON.stringify(call[1]) === JSON.stringify([0.2, 0.5]),
      );

      // Should have 5 logo animations: opacity, scale, y, flexBasis, and flexGrow
      expect(logoAnimationCalls.length).toBe(5);
    });

    it("should call useTransform for logoOpacity animation", () => {
      render(
        <CenterStickyNav InNavLogo={mockInNavLogo}>
          {mockChildren}
        </CenterStickyNav>,
      );

      const calls = mockUseTransform.mock.calls;
      const opacityCall = calls.find(
        (call: MockCallArray) =>
          JSON.stringify(call[2]) === JSON.stringify([0, 1]) &&
          JSON.stringify(call[1]) === JSON.stringify([0.2, 0.5]),
      );

      expect(opacityCall).toBeDefined();
    });

    it("should call useTransform for logoScale animation", () => {
      render(
        <CenterStickyNav InNavLogo={mockInNavLogo}>
          {mockChildren}
        </CenterStickyNav>,
      );

      const calls = mockUseTransform.mock.calls;
      const scaleCall = calls.find(
        (call: MockCallArray) =>
          JSON.stringify(call[2]) === JSON.stringify([0.8, 1]) &&
          JSON.stringify(call[1]) === JSON.stringify([0.2, 0.5]),
      );

      expect(scaleCall).toBeDefined();
    });

    it("should call useTransform for logoY animation", () => {
      render(
        <CenterStickyNav InNavLogo={mockInNavLogo}>
          {mockChildren}
        </CenterStickyNav>,
      );

      const calls = mockUseTransform.mock.calls;
      const yCall = calls.find(
        (call: MockCallArray) =>
          JSON.stringify(call[2]) === JSON.stringify(["20%", "0%"]) &&
          JSON.stringify(call[1]) === JSON.stringify([0.2, 0.5]),
      );

      expect(yCall).toBeDefined();
    });

    it("should call useTransform for logoFlexBasis animation", () => {
      render(
        <CenterStickyNav InNavLogo={mockInNavLogo}>
          {mockChildren}
        </CenterStickyNav>,
      );

      const calls = mockUseTransform.mock.calls;
      const flexBasisCall = calls.find(
        (call: MockCallArray) =>
          JSON.stringify(call[2]) === JSON.stringify(["0%", "40%"]) &&
          JSON.stringify(call[1]) === JSON.stringify([0.2, 0.5]),
      );

      expect(flexBasisCall).toBeDefined();
    });

    it("should call useTransform for navFlexGrow animation", () => {
      render(
        <CenterStickyNav InNavLogo={mockInNavLogo}>
          {mockChildren}
        </CenterStickyNav>,
      );

      const calls = mockUseTransform.mock.calls;
      const flexGrowCall = calls.find(
        (call: MockCallArray) =>
          JSON.stringify(call[2]) === JSON.stringify([1, 0]) &&
          JSON.stringify(call[1]) === JSON.stringify([0.2, 0.5]),
      );

      expect(flexGrowCall).toBeDefined();
    });
  });

  describe("Edge Cases", () => {
    it("should render with empty children", () => {
      const { container } = render(
        <CenterStickyNav InNavLogo={mockInNavLogo}>{null}</CenterStickyNav>,
      );

      expect(screen.getByTestId("nav-logo")).toBeInTheDocument();
      expect(container).toBeInTheDocument();
    });

    it("should render with string children", () => {
      render(
        <CenterStickyNav InNavLogo={mockInNavLogo}>
          Text content
        </CenterStickyNav>,
      );

      expect(screen.getByText("Text content")).toBeInTheDocument();
    });

    it("should render with fragment children", () => {
      render(
        <CenterStickyNav InNavLogo={mockInNavLogo}>
          <>
            <span data-testid="item-1">Item 1</span>
            <span data-testid="item-2">Item 2</span>
          </>
        </CenterStickyNav>,
      );

      expect(screen.getByTestId("item-1")).toBeInTheDocument();
      expect(screen.getByTestId("item-2")).toBeInTheDocument();
    });
  });

  describe("Animation Ranges", () => {
    it("should use correct range for nav animations (0-50%)", () => {
      render(
        <CenterStickyNav InNavLogo={mockInNavLogo}>
          {mockChildren}
        </CenterStickyNav>,
      );

      const calls = mockUseTransform.mock.calls;
      const navAnimationCalls = calls.filter(
        (call: MockCallArray) =>
          JSON.stringify(call[1]) === JSON.stringify([0, 0.5]),
      );

      // Should have 3 nav animations: width, borderRadius, boxShadow
      expect(navAnimationCalls.length).toBe(3);
    });

    it("should use correct range for logo animations (20-50%)", () => {
      render(
        <CenterStickyNav InNavLogo={mockInNavLogo}>
          {mockChildren}
        </CenterStickyNav>,
      );

      const calls = mockUseTransform.mock.calls;
      const logoAnimationCalls = calls.filter(
        (call: MockCallArray) =>
          JSON.stringify(call[1]) === JSON.stringify([0.2, 0.5]),
      );

      // Should have 5 logo animations: opacity, scale, y, flexBasis, flexGrow
      expect(logoAnimationCalls.length).toBe(5);
    });
  });

  describe("Component Structure", () => {
    it("should have proper nesting structure", () => {
      const { container } = render(
        <CenterStickyNav InNavLogo={mockInNavLogo}>
          {mockChildren}
        </CenterStickyNav>,
      );

      // Main nav container
      const mainNav = container.firstChild as HTMLElement;
      expect(mainNav).toBeTruthy();

      // Should have 2 direct children: logo container and nav items container
      expect(mainNav.children.length).toBe(2);
    });

    it("should apply sticky positioning", () => {
      const { container } = render(
        <CenterStickyNav InNavLogo={mockInNavLogo}>
          {mockChildren}
        </CenterStickyNav>,
      );

      const mainNav = container.firstChild as HTMLElement;
      expect(mainNav).toHaveClass("sticky");
      expect(mainNav).toHaveClass("top-0");
    });

    it("should have background styling", () => {
      const { container } = render(
        <CenterStickyNav InNavLogo={mockInNavLogo}>
          {mockChildren}
        </CenterStickyNav>,
      );

      const mainNav = container.firstChild as HTMLElement;
      expect(mainNav).toHaveClass("bg-white");
      expect(mainNav).toHaveClass("text-gray-1000");
    });
  });
});
