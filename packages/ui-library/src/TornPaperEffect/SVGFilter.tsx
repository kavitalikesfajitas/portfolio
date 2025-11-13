export function SVGFilter() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false">
      <filter id="ragged-edge">
        {/* expand the block a bit so the "paper" extends past the text */}
        <feMorphology
          in="SourceGraphic"
          operator="dilate"
          radius="6"
          result="expanded"
        />
        {/* random noise for irregular edge */}
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.03"
          numOctaves="3"
          result="noise"
        />
        {/* distort the expanded shape with the noise */}
        <feDisplacementMap
          in="expanded"
          in2="noise"
          scale="18"
          xChannelSelector="R"
          yChannelSelector="G"
        />
        {/* tiny blur to round off any sharp bits */}
        <feGaussianBlur stdDeviation="1" />
      </filter>
    </svg>
  );
}
