import { Button } from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/button";
import {
  Card,
  CardContent,
} from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/card";
import clsx from "clsx";
import Image from "next/image";
import Cat1 from "@/public/images/cat-3.png";

export function RightContentHero() {
  return (
    <div className={clsx("flex flex-col flex-1 justify-end gap-0 relative")}>
      <div className="scale-75 lg:absolute max-w-[360px] lg:-translate-x-1/2 translate-y-1/2  ">
        <Image src={Cat1} alt="cat" className="flex grow-0 z-20 aspect-auto" />
      </div>
      <Card className="flex flex-col justify-center self-end h-56 w-56">
        <CardContent>
          <div className="font-overpass-mono tracking-tighter text-sm text-center">
            DAYS SINCE LAID OFF
          </div>
          <div className="text-orange-400 font-extrabold tracking-tightera text-8xl flex justify-center">
            37
          </div>
          <div className="flex flex-row gap-5 uppercase">
            <Button className="bg-transparent border border-black text-black font-overpass-mono uppercase tracking-tighter text-xs">
              - 1 day
            </Button>
            <Button className="bg-transparent border border-orange-500 text-orange-500 font-overpass-mono uppercase tracking-tighter text-xs">
              - 1 day
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
