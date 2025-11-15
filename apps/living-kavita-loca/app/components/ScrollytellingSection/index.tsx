"use client";

import {
  startTransition,
  useEffect,
  useRef,
  useState,
  useCallback,
  memo,
} from "react";
import { MotionValue, useScroll } from "motion/react";
import clsx from "clsx";

const SCROLL_PAGES_LENGTH = 5; // Adjust this value based on your design

export type SlideAlignment = "left" | "center" | "right";

export type HTMLOverlaySlideProps = {
  alignment?: SlideAlignment;
  top: number; // Represents position in scroll (0 to 1, where 0 is start, 1 is end)
  title?: string;
  body?: string;
  wrapperClass?: string;
  children?: React.ReactNode;
  onVisible?: () => void;
};

export type ChapterDotProps = {
  id: string;
  y: number; // Represents the scroll position as a percentage (0 to 1)
};

export type ScrollytellingSectionProps = {
  children: React.ReactNode;
  backgroundImage?: string;
  backgroundColor?: string;
  chapters?: ChapterDotProps[];
  scrollPagesLength?: number;
  className?: string;
};

const dotClass = clsx(
  "cursor-pointer hover:after:bg-white",
  "py-1",
  "after:transition-all after:duration-300",
  "after:bg-white after:w-1 after:h-1 after:rounded-full after:block",
  // active styles
  "[&.chapter-active]:after:h-6",
);

const ChapterDot = ({ id, isActive }: { id: string; isActive: boolean }) => {
  return (
    <div
      className={clsx(dotClass, {
        "chapter-active": isActive,
      })}
      id={id}
      data-chapter-id={id}
    />
  );
};

const ChapterPagination = ({
  chapters,
  scrollYProgress,
}: {
  chapters?: ChapterDotProps[];
  scrollYProgress: MotionValue<number>;
}) => {
  const [activeChapter, setActiveChapter] = useState<string | null>(
    chapters?.[0]?.id ?? null,
  );

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest: number) => {
      startTransition(() => {
        // Check if latest is within the range of a given chapter
        const currentChapter = chapters
          ? chapters
              .slice()
              .reverse()
              .find((chapter) => latest >= chapter.y)
          : null;

        setActiveChapter(currentChapter ? currentChapter.id : null);
      });
    });

    return unsubscribe;
  }, [scrollYProgress, chapters]);

  if (!chapters || chapters.length === 0) return null;

  return (
    <div
      className="absolute left-[14px] md:left-[22px] top-1/2 transform -translate-y-1/2 z-20"
      id="chapter-pagination"
    >
      {chapters.map((chapter) => {
        const isActive = activeChapter === chapter.id;
        return (
          <ChapterDot key={chapter.id} id={chapter.id} isActive={isActive} />
        );
      })}
    </div>
  );
};

export const HTMLOverlaySlide = memo(function HTMLOverlaySlide({
  alignment = "left",
  top,
  title,
  body,
  wrapperClass,
  children,
  onVisible,
}: HTMLOverlaySlideProps) {
  const slideRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!slideRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            onVisible?.();
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the slide is visible
      },
    );

    observer.observe(slideRef.current);

    return () => observer.disconnect();
  }, [isVisible, onVisible]);

  const alignmentClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  return (
    <div
      ref={slideRef}
      className={clsx(
        "absolute w-full h-screen flex items-center",
        alignmentClasses[alignment],
        "px-[26px] md:px-[68px]",
      )}
      style={{
        top: `${top * 100}%`,
      }}
    >
      <div
        className={clsx(
          "relative max-w-[286px] md:max-w-[386px]",
          wrapperClass,
        )}
      >
        {title && (
          <div
            className="text-white text-4xl md:text-6xl font-bold uppercase pb-4"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        )}
        {body && (
          <div
            className="text-white text-lg md:text-xl opacity-90"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        )}
        {children}
      </div>
    </div>
  );
});

export default function ScrollytellingSection({
  children,
  backgroundImage,
  backgroundColor = "black",
  chapters,
  scrollPagesLength = SCROLL_PAGES_LENGTH,
  className,
}: ScrollytellingSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
  });

  const [isScrolledToTop, setIsScrolledToTop] = useState(true);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setIsScrolledToTop(latest === 0);
    });

    return unsubscribe;
  }, [scrollYProgress]);

  return (
    <div
      className={clsx("relative smooth-scroll isolate", className)}
      ref={scrollContainerRef}
      style={{
        height: `${scrollPagesLength * 100}vh`,
        marginBlockEnd: "-100vh",
      }}
    >
      {/* Inline slides  */}
      <div
        id="slide-container"
        className="absolute top-0 left-0 w-full h-full z-10 overflow-x-hidden pointer-events-none"
      >
        {children}

        {/* Curtain effect at the end */}
        <div
          className="absolute bottom-0 left-0 w-screen h-screen pointer-events-none"
          style={{ backgroundColor }}
        />
      </div>

      {/* Sticky wrapper */}
      <div
        className={clsx(
          "sticky top-0 h-screen bg-center bg-cover bg-no-repeat transition-opacity duration-300",
          {
            "opacity-100": isScrolledToTop,
            "opacity-90": !isScrolledToTop,
          },
        )}
        style={{
          backgroundImage: backgroundImage
            ? `url(${backgroundImage})`
            : undefined,
          backgroundColor,
        }}
      >
        <ChapterPagination
          chapters={chapters ?? []}
          scrollYProgress={scrollYProgress}
        />
      </div>
    </div>
  );
}
