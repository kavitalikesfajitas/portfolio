import { Color, Texture } from "three";
import { shaderMaterial } from "@react-three/drei";

import fragShader from "./shaders/wave.frag";
import vertShader from "./shaders/wave.vert";

export const WaveShaderMaterial = shaderMaterial(
  // Uniforms
  {
    uTime: 0,
    uTexture: new Texture(),
    uOpacity: 1,
    uFactor: 0.5,
    uNoiseFrequency: 1.5,
    uNoiseAmplitude: 0.2,
    uBackgroundColor: new Color("black"),
  },
  vertShader,
  fragShader,
);
