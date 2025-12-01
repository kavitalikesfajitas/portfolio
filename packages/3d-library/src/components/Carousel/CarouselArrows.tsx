import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

type CarouselArrowNavProps = {
  onClickRightArrow: () => void;
  onClickLeftArrow: () => void;
};

export const CarouselArrowNav = (props: CarouselArrowNavProps) => {
  return (
    <div className="z-1 absolute top-[50%] flex w-full justify-between">
      <button
        className="mx-2 bg-transparent text-white"
        onClick={props.onClickLeftArrow}
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>

      <button
        className="mx-2 bg-transparent text-white"
        onClick={props.onClickRightArrow}
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>
    </div>
  );
};
