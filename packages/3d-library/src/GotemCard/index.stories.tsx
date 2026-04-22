import { Canvas, ThreeEvent, useFrame } from "@react-three/fiber";
import { Group, Vector3 } from "three";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { animate, useMotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";
import { Environment, Gltf } from "@react-three/drei";

// Components
import { GotEmCard } from "./";
import { GotEmCardLayer } from "./components/GotemCardLayer";
import { NVSViewerCameraController } from "../NVSViewerCameraController";

// Constants
import { PresetCards, PresetFoilEffect } from "./constants";

// Types
import { GotEmVariant, GotEmVariants, type GotEmCardProps } from "./types";

type CardSceneProps = GotEmCardProps & {
  bg?: string;
  bgLayerSrc?: string;
  productLayerSrc?: string;
  preset: keyof typeof PresetCards;
};

const CardScene = (props: CardSceneProps) => {
  const { bgLayerSrc, productLayerSrc, productTitle } =
    PresetCards[props.preset];

  const mergedPresetProps = useMemo(() => {
    const preset = PresetCards[props.preset];

    return preset;
  }, [props.preset, productTitle]);

  return (
    <Canvas className="!absolute top-0 left-0 w-full h-full z-40 0 bg-transparent">
      {/* High level suspense to ensure nothing is rendered until all assets are loaded */}
      <Suspense fallback={null}>
        {props.bg && <color attach="background" args={[props.bg]} />}

        <Environment preset="studio" />

        <GotEmCard {...mergedPresetProps}>
          <Environment preset="studio" />

          {bgLayerSrc && (
            <GotEmCardLayer
              zOffset={-0.01}
              src={bgLayerSrc}
              foilConfig={PresetFoilEffect[props.preset]}
            />
          )}

          {productLayerSrc && (
            <GotEmCardLayer zOffset={0.01} src={productLayerSrc} />
          )}
        </GotEmCard>

        <NVSViewerCameraController
          currentTargetIdx={0}
          targets={[
            {
              controlsEnabled: true,
              zoomEnabled: true,
              position: new Vector3(0, 0, 1),
              lookAtCenter: new Vector3(0, 0, 0),
              zoom: 1,
              uiName: "default",
            },
          ]}
        />
      </Suspense>
    </Canvas>
  );
};

export default {
  title: "NVS 3D Library/GotEmCard",
  component: CardScene,
  tags: ["autodocs"],
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const Presets = {
  args: {
    bg: "#111111",
    preset: "aj1-low-og-game-royal",
  },
  argTypes: {
    productTitle: {
      control: {
        type: "text",
      },
    },
    bg: {
      control: {
        type: "color",
      },
    },
    preset: {
      options: Object.keys(PresetCards),
      control: {
        type: "select",
      },
    },
  },
  render: (args: CardSceneProps) => <CardScene {...args} />,
};

/**
 * CARD STACK STORY
 */

const TOTAL_CARDS = 3;
const CardStackItem = ({
  cardIdx,
  onRemove,
}: {
  cardIdx: number;
  onRemove: (cardIdx: number) => void;
}) => {
  const cardGroupRef = useRef<Group>(null);

  const initialY = cardIdx * 0.01;
  const initialZ = -cardIdx * 0.1;
  const initialRotateZ = cardIdx === 0 ? 0 : Math.random() * 0.5 - 0.1;

  // Set up motion values
  const x = useMotionValue(0);
  const y = useMotionValue(initialY);
  const z = useMotionValue(initialZ);
  const rotateZ = useMotionValue(initialRotateZ);

  useEffect(() => {
    animate(x, 0, { duration: 0.25 });
    animate(y, cardIdx * 0.01, { duration: 0.25 });
    animate(z, -cardIdx * 0.1, { duration: 0.25 });
  }, [cardIdx]);

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();

    // Animate out to exit values
    animate(x, -5, { duration: 0.5 });
    animate(y, 5, { duration: 0.5 });
    animate(z, 1, { duration: 0.5 });
    animate(rotateZ, cardIdx === 0 ? 0 : Math.random() * 0.5 - 0.1, {
      duration: 0.5,
    });
    // After animation completes, trigger removal
    setTimeout(() => {
      onRemove(cardIdx);
    }, 500);
  };

  useFrame(() => {
    if (cardGroupRef.current) {
      cardGroupRef.current.position.x = x.get();
      cardGroupRef.current.position.y = y.get();
      cardGroupRef.current.position.z = z.get();
      cardGroupRef.current.rotation.z = rotateZ.get();
    }
  });

  return (
    <motion.group
      // @ts-expect-error - motion.group is not typed correctly
      ref={cardGroupRef}
      onClick={handleClick}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
    >
      <GotEmCard {...PresetCards["aj1-low-og-game-royal"]}>
        <Environment preset="studio" />
        <GotEmCardLayer
          zOffset={-0.01}
          src={PresetCards["aj1-low-og-game-royal"].bgLayerSrc}
          foilConfig={PresetFoilEffect["aj1-low-og-game-royal"]}
        />
        <GotEmCardLayer
          zOffset={0.01}
          src={PresetCards["aj1-low-og-game-royal"].productLayerSrc}
        />
      </GotEmCard>
    </motion.group>
  );
};

const CardStackScene = () => {
  const [cards, setCards] = useState<number[]>(
    Array.from({ length: TOTAL_CARDS }, (_, i) => i),
  );

  const removeCard = (cardId: number) => {
    setCards((prev) => {
      const filtered = prev.filter((id) => id !== cardId);
      // Add new cards to maintain TOTAL_CARDS count
      const maxId = Math.max(...prev, 0);
      while (filtered.length < TOTAL_CARDS) {
        filtered.push(maxId + 1 + (TOTAL_CARDS - filtered.length));
      }
      return filtered;
    });
  };

  return (
    <Canvas className="!absolute top-0 left-0 w-full h-full z-40 0 bg-transparent">
      <Suspense fallback={null}>
        <Environment preset="studio" />
        {cards.map((cardId, idx) => (
          <CardStackItem
            key={cardId}
            cardIdx={idx}
            onRemove={() => {
              removeCard(cardId);
            }}
          />
        ))}
      </Suspense>

      {/* Controls */}
      <NVSViewerCameraController
        currentTargetIdx={0}
        targets={[
          {
            controlsEnabled: false,
            zoomEnabled: true,
            position: new Vector3(0, 0, 1),
            lookAtCenter: new Vector3(0, 0, 0),
            zoom: 1,
            uiName: "default",
          },
        ]}
      />
    </Canvas>
  );
};

export const Stack = {
  argTypes: {},
  render: () => <CardStackScene />,
};

/**
 * Card Designer Sandbox Story
 */

type CardDesignerProps = {
  bgImage: string | null;
  productImage: string | null;
  frame: string;
  productTitle: string;
  titlePosition: { x: number; y: number; z: number };
  metallicImage: string | null;
  roughnessImage: string | null;
  iridescence: number;
  variant: GotEmVariants;
  bg: string;
};

const CardDesignerComponent = (props: CardDesignerProps) => {
  const titlePosition =
    PresetCards["aj1-low-og-game-royal"].frame.titlePosition;
  const hasHoloTextures =
    props.metallicImage?.length ?? props.roughnessImage?.length;

  return (
    <Canvas className="!absolute top-0 left-0 w-full h-full z-40 bg-transparent">
      <Environment preset="studio" />
      <color attach="background" args={[props.bg]} />

      <GotEmCard
        frame={{
          src: props.frame,
          titlePosition,
        }}
        productTitle={props.productTitle}
      >
        <Environment preset="studio" />

        {props.bgImage?.length && (
          <GotEmCardLayer
            src={props.bgImage[0]}
            zOffset={-0.01}
            // If we have the required holo textures, pass them to the foil config
            foilConfig={
              hasHoloTextures
                ? {
                    metallicImageUrl: props.metallicImage?.length
                      ? props.metallicImage[0]
                      : undefined,
                    roughnessImageUrl: props.roughnessImage?.length
                      ? props.roughnessImage[0]
                      : undefined,
                    iridescence: props.iridescence,
                  }
                : undefined
            }
          />
        )}

        {props.productImage?.length && (
          <GotEmCardLayer src={props.productImage[0]} zOffset={0.01} />
        )}
      </GotEmCard>

      {/* Controls */}
      <NVSViewerCameraController
        currentTargetIdx={0}
        targets={[
          {
            controlsEnabled: true,
            zoomEnabled: true,
            position: new Vector3(0, 0, 1),
            lookAtCenter: new Vector3(0, 0, 0),
            zoom: 1,
            uiName: "default",
          },
        ]}
      />
    </Canvas>
  );
};

export const CardDesignerSandbox = {
  // Seeding some defaults for frame but mostly nulls to allow for file uploads
  args: {
    bgImage: null,
    productImage: null,
    frame: "./gotem-card/frames/card_base_jordan.glb",
    productTitle: "Hello",
    metallicImage: null,
    roughnessImage: null,
    iridescence: 0.5,
    bg: "#111111",
  },
  argTypes: {
    bgImage: {
      control: { type: "file", accept: ".jpg,.jpeg,.png" },
    },
    productImage: {
      control: { type: "file", accept: ".png" },
    },
    frame: {
      options: [
        "./gotem-card/frames/card_base_swoosh.glb",
        "./gotem-card/frames/card_base_nike.glb",
        "./gotem-card/frames/card_base_jordan.glb",
      ],
      control: {
        type: "select",
        labels: {
          "./gotem-card/frames/card_base_swoosh.glb": "dotswoosh",
          "./gotem-card/frames/card_base_nike.glb": "nike",
          "./gotem-card/frames/card_base_jordan.glb": "jordan",
        },
      },
    },
    productTitle: {
      control: { type: "text" },
    },
    metallicImage: {
      control: { type: "file", accept: ".jpg,.jpeg,.png" },
    },
    roughnessImage: {
      control: { type: "file", accept: ".jpg,.jpeg,.png" },
    },
    iridescence: {
      control: { type: "number", min: 0, max: 1, step: 0.01 },
    },
    bg: {
      control: {
        type: "color",
      },
    },
  },
  render: (args: CardDesignerProps) => <CardDesignerComponent {...args} />,
};
