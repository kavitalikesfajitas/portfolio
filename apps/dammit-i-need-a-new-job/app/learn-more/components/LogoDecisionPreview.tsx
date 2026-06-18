import Image from "next/image";
import logoManifest from "@/public/images/logos/manifest.json";

const logoEntries = Object.entries(logoManifest).map(([token, src]) => ({
  token,
  src,
  label: token.charAt(0).toUpperCase() + token.slice(1),
}));

export function LogoDecisionPreview() {
  return (
    <div className="my-8 grid grid-cols-3 gap-3 sm:grid-cols-5">
      {logoEntries.map((logo) => (
        <div
          key={logo.token}
          className="flex aspect-square items-center justify-center rounded-md border border-divider-1000 bg-cream-1000 p-4"
        >
          <Image
            src={logo.src}
            alt={`${logo.label} logo`}
            width={72}
            height={72}
            className="h-12 w-12 object-contain"
          />
        </div>
      ))}
    </div>
  );
}
