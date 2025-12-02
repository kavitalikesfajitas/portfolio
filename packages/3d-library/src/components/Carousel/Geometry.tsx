import { desktopPosterSize } from "./constants";

// list of supported geomtries for the carousel
export const Geometry = (props: { option: any }) => {
  switch (props.option) {
    case "plane":
      return <planeGeometry args={desktopPosterSize} />;
    default:
      return <></>;
  }
};
