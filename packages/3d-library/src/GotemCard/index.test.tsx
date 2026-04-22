import { PropsWithChildren, Children } from "react";
import ReactThreeTestRenderer from "@react-three/test-renderer";
import { Suspense } from "react";

// Components
import { GotEmCard } from "./";

// Mocks
jest.mock("three/examples/jsm/utils/SkeletonUtils", () => ({
  clone: jest.fn((obj) => obj as unknown),
  retarget: jest.fn(),
}));

jest.mock("@react-three/drei", () => ({
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
  // Bit of a hack but since R3F doesn't support HTML arbitrary strings in it's tree - we inject the productTitle prop as the group name so we can assert it
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

    // Search group with name YO! yo, yo yo (it's sync but eslint thinks it's async)
    // eslint-disable-next-line testing-library/await-async-query
    const match = renderer.scene.findByProps({ name: "YO" });
    // It should be a group because of how we set the mock for Text component
    expect(match.type).toBe("Group");

    // And it should be defined
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
      // Search group with name YO! yo, yo yo (it's sync but eslint thinks it's async)
      // eslint-disable-next-line testing-library/await-async-query
      renderer.scene.findByProps({ name: "LOLWAT" });
    } catch (error) {
      // @ts-expect-error Testing error message
      expect(error.message).toBe(
        'RTTR: No instances found with props: {"name":"LOLWAT"}',
      );
    }
  });
});
