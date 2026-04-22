import ReactThreeTestRenderer from "@react-three/test-renderer";
import { Group, Mesh, ObjectLoader, MeshStandardMaterial } from "three";

import Asset3DWithglTFVariants from ".";

import mockVariantGLTF from "./mockGLTF.json";
import mockTHREEScene from "./mockTHREEScene.json";

const threeParser = new ObjectLoader();
const scene = threeParser.parse(mockTHREEScene);

jest.mock("@react-three/drei", () => ({
  useGLTF: () => ({
    ...mockVariantGLTF,
    scene,
    parser: {
      getDependency: jest.fn(),
      assignFinalMaterial: jest.fn(),
    },
  }),
  useAnimations: () => ({ actions: {} }), // return a GLB with "no animations"
}));

jest.mock("three/examples/jsm/utils/SkeletonUtils.js", () => ({
  clone: (scene: Group) => scene,
}));

describe("given a <Asset3DWithglTFVariants />", () => {
  test("it enumrates glTF variants from the extension as an array of strings", async () => {
    await ReactThreeTestRenderer.create(
      <Asset3DWithglTFVariants
        asset={{
          url: "MY_AWESOME_GLB_URL", // needed for type safety - we mock the response of useGLTF above
        }}
        onVariantsLoaded={(variants) => {
          expect(variants).toEqual(["midnight", "beach", "street"]);
        }}
      />,
    );
  });

  test("it doesn't throw when provided a wrong variant", async () => {
    await ReactThreeTestRenderer.create(
      <Asset3DWithglTFVariants
        asset={{
          url: "MY_AWESOME_GLB_URL", // needed for type safety - we mock the response of useGLTF above
        }}
        onVariantsLoaded={(variants) => {
          expect(variants).toEqual(["midnight", "beach", "street"]);
        }}
        currentVariant="LOL I AM A WRONG VARIANT"
      />,
    );
  });

  test("if no variant is provided it default to the first one", async () => {
    const renderer = await ReactThreeTestRenderer.create(
      <Asset3DWithglTFVariants
        asset={{
          url: "MY_AWESOME_GLB_URL", // needed for type safety - we mock the response of useGLTF above
        }}
        onVariantsLoaded={(variants) => {
          expect(variants).toEqual(["midnight", "beach", "street"]);
        }}
      />,
    );
    const meshObj = renderer.scene.children[0].instance.children[0] as Mesh;
    const meshObjMaterial = meshObj.material as MeshStandardMaterial;

    expect(meshObjMaterial.map?.name).toBe("diffuseMidnight.jpg");
  });

  test("if a variant is provided it attempts to reassign the material", async () => {
    const renderer = await ReactThreeTestRenderer.create(
      <Asset3DWithglTFVariants
        asset={{
          url: "MY_AWESOME_GLB_URL", // needed for type safety - we mock the response of useGLTF above
        }}
        onVariantsLoaded={(variants) => {
          expect(variants).toEqual(["midnight", "beach", "street"]);
        }}
        currentVariant="beach"
      />,
    );
    const meshObj = renderer.scene.children[0].instance.children[0] as Mesh;
    const meshObjMaterial = meshObj.material as MeshStandardMaterial;

    expect(meshObjMaterial).toBe(undefined);
  });
});
