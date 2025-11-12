import React from "react";
import clsx from "clsx";
import "./index.module.css";
import defaultImage from "../../public/images/Image2.jpg";

type ScrapbookImgProps = React.ComponentProps<"div"> & {
  src?: string;
  alt?: string;
};

export function ScrapbookImg({
  className,
  src = defaultImage,
  alt = "Scrapbook Image",
  ...rest
}: ScrapbookImgProps) {
  return (
    <div className={clsx(className, "scrap")} {...rest}>
      <img src={src} alt={alt} />
    </div>
  );
}
