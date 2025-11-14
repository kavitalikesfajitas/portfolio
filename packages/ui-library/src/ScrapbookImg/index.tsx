import React from "react";
import clsx from "clsx";
import "./index.css";

type ScrapbookImgProps = React.ComponentProps<"div"> & {
  src: string;
  alt?: string;
};

export function ScrapbookImg({
  className,
  src,
  alt = "Scrapbook Image",
  ...rest
}: ScrapbookImgProps) {
  return (
    <div className={clsx(className, "scrap")} {...rest}>
      <img src={src} alt={alt} />
    </div>
  );
}
