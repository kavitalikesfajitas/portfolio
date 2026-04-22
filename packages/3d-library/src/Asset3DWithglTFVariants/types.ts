import { GLTF } from "three-stdlib";

export type Asset3DWithglTFVariantsProps = {
  onVariantsLoaded?: (variants: string[]) => void;
  currentVariant?: string;
  onVariantChange?: (variantName: string) => void;
};

/**
 * Implemented according to the KHR_materials_variants extension specification
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_variants
 */
export type KHR_materials_variants = {
  variants: { name: string }[];
  mappings: { variants: number[]; material: number }[];
};

export type Object3DMaterialVariantsExtension = {
  gltfExtensions?: {
    KHR_materials_variants?: KHR_materials_variants;
  };
};

export interface GLTFWithVariants extends GLTF {
  userData: Object3DMaterialVariantsExtension;
}

export type UseVariantsReturn = {
  variants?: string[];
  extension?: KHR_materials_variants;
  selectVariant: (variantName: string) => void;
};
