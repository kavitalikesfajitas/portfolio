import clsx from "clsx";
import { Github, Linkedin, Instagram } from "lucide-react";

export function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={clsx(
        "bg-primary dark border-t border-neutral-900 py-4 text-center text-[0.65rem]",
        "uppercase tracking-[0.2em] text-black",
        "mx-auto flex w-full flex-row flex-wrap justify-between px-4",

        className,
      )}
    >
      <span className={clsx("font-medium")}>
        © {new Date().getFullYear()} Kavita Chaudhry - living kavita loca
      </span>
      <span className={clsx("flex flex-row gap-2")}>
        <span className="font-bold">Connect With me</span>
        <span className="font-medium">
          <a
            href="https://github.com/kavitalikesfajitas"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-4 w-4" />
          </a>
        </span>
        <span className="font-medium">
          <a
            href="https://linkedin.com/in/kavita-chaudhry"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </span>

        <span className="font-medium">
          <a
            href="https://instagram.com/kavitasutra"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="h-4 w-4" />
          </a>
        </span>
      </span>
    </footer>
  );
}
