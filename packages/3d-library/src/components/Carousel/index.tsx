import { CarouselContextProvider } from "./provider";

export function Carousel(props: { children: React.ReactNode }) {
  return (
    <CarouselContextProvider>
      <div className="relative flex w-full flex-col">{props.children}</div>
    </CarouselContextProvider>
  );
}
