import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@kavita-likes-fajitas/ui-library/shadcn/components/ui/NavigationMenu";

import clsx from "clsx";
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white relative">
      <div className="flex flex-col items-center justify-center">
        <div className="relative inline-block scale-[0.3] md:scale-[0.5] lg:scale-100">
          <img
            src="/images/logo.png"
            alt="living kavita loca"
            className={clsx(" flex self-center self-justify-center")}
          />
          <div className="absolute -right-20 top-1/2 -translate-y-1/2">
            <img
              src="/images/lips-glossy.png"
              alt="living kavita loca"
              className={clsx("lips relative z-10 scale-50 translate-x-3/8")}
            />
          </div>
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Link</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </main>
  );
}

const ChatGPTComponent = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6">
      {/* subtle background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(248,113,113,0.16),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(236,72,153,0.24),_transparent_60%)]" />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* LOGO + LIPS (centered composition) */}
        <div className="relative inline-block">
          {/* torn paper */}
          <img
            src="/images/living-kavita-loca.png"
            alt="living kavita loca"
            className="w-[260px] md:w-[320px] drop-shadow-[0_18px_40px_rgba(0,0,0,0.85)]"
          />

          {/* lips overlapping on the right, vertically centered */}
          <div className="absolute -right-20 top-1/2 -translate-y-1/2">
            <div className="absolute inset-0 rounded-full bg-rose-500/40 blur-3xl" />
            <img
              src="/images/lips-glossy.png"
              alt="glossy lips"
              className="relative z-10 w-[150px] md:w-[180px] drop-shadow-[0_0_35px_rgba(0,0,0,0.9)]"
            />
          </div>
        </div>

        {/* NAME + TITLE */}
        <div className="mt-10 space-y-2">
          <h1 className="font-serif text-3xl md:text-4xl">Kavita C</h1>
          <p className="text-sm md:text-base text-rose-300">
            Software Engineer / Web Architect
          </p>
        </div>

        {/* CTA BUTTONS */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm">
          <a
            href="#work"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-rose-400 to-rose-700 px-8 py-3 font-semibold uppercase tracking-[0.18em] text-white shadow-[0_0_30px_rgba(248,113,113,0.9)] transition-transform duration-150 hover:translate-y-0.5"
          >
            See Work
          </a>
          <a
            href="#about"
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 font-semibold uppercase tracking-[0.18em] text-black shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-transform duration-150 hover:translate-y-0.5"
          >
            About Me
          </a>
        </div>
      </div>
    </section>
  );
};

// export default function Home() {
//   return (
//     <main className="min-h-screen bg-black text-white relative">
//       {/* NAV BAR */}
//       <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center">
//         <div className="flex w-full max-w-6xl items-center justify-between px-10 py-5 text-[0.78rem] uppercase tracking-[0.18em] text-neutral-300">
//           {/* Left brand */}
//           <div className="flex items-center gap-2">
//             <span className="h-[1px] w-5 bg-neutral-500" />
//             <span className="text-neutral-400">living kavita loca</span>
//           </div>

//           {/* Center nav links */}
//           <ul className="flex items-center gap-10">
//             <li>
//               <a href="#" className="hover:text-white transition-colors">
//                 Home
//               </a>
//             </li>
//             <li>
//               <a href="#work" className="hover:text-white transition-colors">
//                 Work
//               </a>
//             </li>
//             <li>
//               <a href="#about" className="hover:text-white transition-colors">
//                 About
//               </a>
//             </li>
//             <li>
//               <a href="#contact" className="hover:text-white transition-colors">
//                 Contact
//               </a>
//             </li>
//           </ul>
//         </div>
//       </nav>

//       {/* Placeholder sections just so anchors exist – you can replace */}
//       <section id="work" className="min-h-[40vh] bg-black" />
//       <section id="about" className="min-h-[40vh] bg-black" />
//       <section id="contact" className="min-h-[40vh] bg-black" />
//     </main>
//   );
// }
