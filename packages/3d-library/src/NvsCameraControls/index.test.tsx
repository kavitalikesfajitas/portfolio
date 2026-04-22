import ReactThreeTestRenderer from "@react-three/test-renderer";
import { NvsCameraControls } from ".";
import { NvsControlsTypes } from "./types";

describe("given a <NvsCameraControls>", () => {
  test("able to mount children", async () => {
    const renderer = await ReactThreeTestRenderer.create(
      <NvsCameraControls controls={NvsControlsTypes.Orbit}>
        <gridHelper name="testGrid" />
      </NvsCameraControls>,
    );

    const gridObject = renderer.scene.find(
      (node) => node.instance.name === "testGrid",
    );
    expect(gridObject).toBeDefined();
  });
});
