import React from "react";

export type FeaturedWorkCardProps = {
  /**
   * URL of the product image
   */
  imageSrc?: string | undefined;
  /**
   * Alt tag of the product image
   */
  imageAlt?: string;
  /**
   * URL of the video for the product to be displayed on hover
   */
  videoSrc?: string | undefined;
  /**
   * Optional className to add to the root element of the component
   */
  className?: string | undefined;
  /**
   * Optional May not be bought or sold and is not designed to have a market value
   */

  /**
   * Optional Link to the product page
   */
  link?: string | undefined;
  /**
   * Optional link onClick handler. Must provide a link prop for this to work
   */
  onLinkClick?: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => unknown;
  /**
   * Optional reveal link. If the token is able to be revealed, it should link out to the reveal collection page.
   */
  /**
   * Optional video description
   */
  videoDescription?: string | null | undefined;
  /**
   * Optional boolean on whether to enable Token Transfer capability on the
   * product card (ex. true on user's own profile page listing of NFTs)
   */
};
