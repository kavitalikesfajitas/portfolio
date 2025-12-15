import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/card";
import clsx from "clsx";
import Image from "next/image";
import { FeatureWorkCardThumbnail } from "./FeatureWorkCardThumbnail";
import { useMouseStateController } from "../AutoPlayVideo";
import Link from "next/link";

type ResumeLinkCardProps = {
  title: string;
  role: string;
  summary: string;
  bullets: string[];
  tech: string;
  animation?: string;
  imageSrc: string | undefined;
  slug?: string;
  badge: string;
  videoSrc?: string | undefined;
} & { className?: string };

export const FeaturedWorkCard = ({
  title,
  role,
  imageSrc,
  badge,
  videoSrc,
  slug,
  summary,
  bullets,
  tech,
  className,
}: ResumeLinkCardProps) => {
  const mouseController = useMouseStateController({
    enabled: !!videoSrc,
  });

  return (
    <Card
      className={clsx(
        "group transition-shadow duration-300 hover:shadow-lg",
        "w border-neutral-800 bg-neutral-950/70",
        "gap-2",
        "transition hover:border-pink-500/60 hover:shadow-[0_25px_80px_rgba(236,72,153,0.45)]",
        className,
      )}
      onMouseEnter={mouseController.onMouseEnter}
      onMouseLeave={mouseController.onMouseLeave}
    >
      <FeatureWorkCardThumbnail
        imageSrc={imageSrc}
        badge={badge}
        videoSrc={videoSrc}
        isHovered={mouseController.isHovered}
      />
      <CardHeader className="gap-0 pt-2">
        <CardTitle className="group-hover:text-primary flex items-center text-center text-lg font-semibold transition-colors">
          {title ?? "Untitled Project"}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-muted-foreground mb-2 text-sm">{tech}</div>
        <div className="text-foreground text-sm">{summary || ""}</div>
        {slug && (
          <Link href={`/work/${slug}`} className="block">
            View Project
          </Link>
        )}
      </CardContent>
    </Card>
  );
};
