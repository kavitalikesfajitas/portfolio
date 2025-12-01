import React from "react";
import { ArrowLeft, ArrowRight } from "@nike-nvs/nvs-ds-icons";
import { Button } from "nvs-design-system/dist/Button_DEPRECATED";

type CarouselArrowNavProps = {
  onClickRightArrow: () => void;
  onClickLeftArrow: () => void;
};

export const CarouselArrowNav = (props: CarouselArrowNavProps) => {
  return (
    <div className="absolute z-1 top-[50%] w-full flex justify-between">
      <Button
        className="bg-transparent mx-2"
        buttonType={"secondary"}
        size={"lg"}
        icon={<ArrowLeft />}
        onClick={props.onClickLeftArrow}
      />
      <Button
        className="bg-transparent mx-2"
        buttonType={"secondary"}
        size={"lg"}
        icon={<ArrowRight />}
        onClick={props.onClickRightArrow}
      />
    </div>
  );
};
