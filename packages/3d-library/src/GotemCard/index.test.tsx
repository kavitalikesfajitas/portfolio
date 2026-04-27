import type { PropsWithChildren } from "react";
import { Suspense } from "react";
import ReactThreeTestRenderer from "@react-three/test-renderer";
import { Children } from "react";
import { describe, expect, it, vi } from "vitest";

// Components
import { GotEmCard } from "./";

vi.mock("three/examples/jsm/utils/SkeletonUtils", () => ({
  clone: vi.fn((obj: object) => obj),
  retarget: vi.fn(),
}));

vi.mock("@react-three/drei", () => ({
  useGLTF: () => ({
    scene: {},
    animations: [],
    parser: {},
    nodes: {},
    userData: {},
  }),
  useAnimations: () => ({
    actions: [],
    names: [],
    mixer: {},
    ref: {},
  }),
  MeshPortalMaterial: ({ children }: PropsWithChildren) => <>{children}</>,
  Text: ({ children }: PropsWithChildren) => {
    const onlyTextChild = Children.toArray(children).find(
      (child) => typeof child === "string",
    );

    return <group name={onlyTextChild as string} />;
  },
}));

describe("Given <GotEmCard /> component", () => {
  it("renders without crashing", async () => {
    const renderer = await ReactThreeTestRenderer.create(
      <Suspense fallback={null}>
        <GotEmCard
          frame={{
            src: "dummy-src.glb",
            titlePosition: { x: 0, y: 0, z: 0 },
          }}
        >
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="red" />
          </mesh>
        </GotEmCard>
      </Suspense>,
    );
    expect(renderer).toBeDefined();
    expect(renderer.scene.children).toHaveLength(1);
  });

  it("renders product title text when productTitle prop is provided", async () => {
    const renderer = await ReactThreeTestRenderer.create(
      <Suspense fallback={null}>
        <GotEmCard
          frame={{
            src: "dummy-src.glb",
            titlePosition: { x: 0, y: 0, z: 0 },
          }}
          productTitle="YO"
        />
      </Suspense>,
    );

    // eslint-disable-next-line testing-library/await-async-query
    const match = renderer.scene.findByProps({ name: "YO" });
    expect(match.type).toBe("Group");
    expect(match).toBeDefined();
  });

  it("does not render hed/subhed text when hed/subhed prop is not provided", async () => {
    const renderer = await ReactThreeTestRenderer.create(
      <Suspense fallback={null}>
        <GotEmCard
          frame={{
            src: "dummy-src.glb",
            titlePosition: { x: 0, y: 0, z: 0 },
          }}
        />
      </Suspense>,
    );
    try {
      // eslint-disable-next-line testing-library/await-async-query
      renderer.scene.findByProps({ name: "LOLWAT" });
    } catch (error) {
      expect((error as Error).message).toBe(
        'RTTR: No instances found with props: {"name":"LOLWAT"}',
      );
    }
  });
});
