import { ScrapbookImg } from "@kavita-likes-fajitas/ui-library/ScrapbookImg";
import Image from "next/image";
export default function Home() {
  return (
    <div className="flex min-h-screen justify-between bg-black font-helvetica-neue dark:bg-black">
      <main className="flex grow w-full h-full flex-col justify-between  px-16 bg-black  sm:items-start font-helvetica-neue">
        <h1 className="text-4xl font-bold font-helvetica-neue">Hello World</h1>
        <div className="relative w-full aspect-4/3 flex items-center justify-center">
          <div className="absolute  text-black z-10 text-3xl left-[20%] font-lobster">
            Living
            <br />
            Kavita Loca
          </div>
          <Image
            src="./images/mouth-dialog.png"
            alt="Description of image"
            fill
            className="absolute z-1"
            style={{ objectFit: "contain" }}
          />
        </div>
      </main>
    </div>
  );
}
