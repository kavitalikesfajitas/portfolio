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

type ResumeLinkCardProps = {
  title: string;
  role: string;
  summary: string;
  bullets: string[];
  tech: string;
  animation?: string;
  thumbnail: string;
  badge: string;
  videoSrc?: string | undefined;
} & { className?: string };

export const FeaturedWorkCard = ({
  title,
  role,
  thumbnail,
  badge,
  videoSrc,
  summary,
  bullets,
  tech,
  className,
}: ResumeLinkCardProps) => {
  const mouseController = useMouseStateController({
    enabled: !!videoSrc,
  });
  console.log({ mouseController });
  return (
    <Card
      className={clsx(
        "group transition-shadow duration-300 hover:shadow-lg",
        "w border-neutral-800 bg-neutral-950/70",
        "gap-2",
        "transition hover:border-pink-500/60 hover:shadow-[0_25px_80px_rgba(236,72,153,0.45)]",
        className,
      )}
    >
      <FeatureWorkCardThumbnail
        imageSrc={thumbnail}
        badge={badge}
        isHovered={mouseController.isHovered}
      />
      <CardHeader className="gap-0 pt-2">
        <CardTitle className="group-hover:text-primary flex items-center text-center text-lg font-semibold transition-colors">
          {"Untitled Project"}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-muted-foreground mb-2 text-sm">{tech}</div>
        <div className="text-foreground text-sm">{summary || ""}</div>
      </CardContent>
    </Card>
  );
};
