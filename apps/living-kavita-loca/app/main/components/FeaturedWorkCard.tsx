import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/card";
import clsx from "clsx";

type ResumeLinkCardProps = {
  title: string;
  role: string;
  summary: string;
  bullets: string[];
  tech: string;
} & { className?: string };

export const ResumeLinkCard = ({
  title,
  role,
  summary,
  bullets,
  tech,
  className,
}: ResumeLinkCardProps) => {
  return (
    <Card
      className={clsx(
        "w-full max-w-md border-neutral-800 bg-neutral-950/70 ",
        " transition hover:border-pink-500/60 hover:shadow-[0_25px_80px_rgba(236,72,153,0.45)]",
        className,
      )}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-neutral-400">
          {role}
        </p>
        <CardDescription>{summary}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="mb-5 space-y-1 text-xs text-neutral-300">
          {bullets.map((b) => (
            <li key={b}>• {b}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <p className="text-[0.7rem] uppercase tracking-[0.18em] text-neutral-500">
          {tech}
        </p>
      </CardFooter>
    </Card>
  );
};
