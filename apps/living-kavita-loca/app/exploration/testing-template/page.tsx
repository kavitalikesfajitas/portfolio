import { LivingKavitaLocaInNavLogo } from "@/app/main/NavForMain";
import { Nav } from "@/app/ui/components/Nav";
import clsx from "clsx";
import coverImage from "@/public/images/work/thumbnails/our_force_1_header.jpg";
import { Hero } from "./components/Hero/Hero";
import { Container } from "@/app/main/components/Container";
import { Badge } from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/badge";

const tech = ["TypeScript", "Node.js", "GraphQL", "Redis", "AWS"];

export default function Home() {
  return (
    <main className="bg-gray-950 text-white relative flex flex-col min-h-screen">
      <div
        className={clsx(
          "sticky left-0 z-50 mx-auto flex w-full items-center justify-between overflow-visible bg-white text-gray-950",
          "top-0 ",
        )}
      >
        <div
          className={clsx(
            "flex shrink-0 items-center gap-1 overflow-hidden whitespace-nowrap md:gap-2",
          )}
        >
          <LivingKavitaLocaInNavLogo />
        </div>
        <Nav
          isMobile={false}
          className="h-fit flex-1 grow-0 w-full sticky top-0 "
        />
      </div>
      <div>
        <TestHero />
      </div>
      <Container maxWidth="full" size="full" className={clsx("flex grow ")}>
        <div className="flex flex-row h-fit basis-1/2 gap-1">
          {tech.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <div>dsfadfjks</div>
      </Container>
    </main>
  );
}

const TestHero = () => {
  return (
    <Hero height="md" image={coverImage}>
      <div
        className={clsx(
          "container mx-auto max-w-6xl relative z-10 text-center",
        )}
      >
        <Badge>Badge</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
    </Hero>
  );
};
