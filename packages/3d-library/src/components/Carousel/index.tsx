import { CarouselContextProvider } from "./provider";
import Carousel3D from "./Carousel";
import carouselData from "./carousel.json";

export function Carousel() {
  return (
    <CarouselContextProvider>
      <div className="relative flex w-full flex-col">
        <Carousel3D items={carouselData.carousel.itemsCollection.items} />
      </div>
    </CarouselContextProvider>
  );
}
