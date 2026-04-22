import { useCallback, useMemo } from "react";
import type { ObjectMap } from "@react-three/fiber";
import { Object3D, Mesh, Material } from "three";

import type {
  GLTFWithVariants,
  UseVariantsReturn,
  Object3DMaterialVariantsExtension,
} from "./types";

export function useVariants(
  gltf: GLTFWithVariants & ObjectMap,
  optionalRoot?: Object3D,
  onVariantChange?: (variantName: string) => void,
): UseVariantsReturn {
  // Memo the extension and variants from the top level gltf file metadata
  const gltMaterialVariants: Omit<UseVariantsReturn, "selectVariant"> | null =
    useMemo(() => {
      const { userData } = gltf;

      const extension = userData.gltfExtensions?.KHR_materials_variants;

      if (!extension) return null;

      const variants = extension.variants.map((variant) => variant.name);

      return {
        variants,
        extension,
      };
    }, [gltf.userData]);

  const selectVariant = useCallback(
    (variantName: string) => {
      // Sanity check that we have read the extension and variants list first
      if (!gltMaterialVariants) return;

      const { scene, parser } = gltf;

      // a way we can pass in a different root (needed for when we clone the root)
      const threeScene = optionalRoot ?? scene;

      // Index of the current variant
      const variantIndex = gltMaterialVariants.extension?.variants.findIndex(
        (v: { name: string | string[] }) => v.name.includes(variantName),
      );

      threeScene.traverse(async (object: Object3D) => {
        // Is this element a mesh - only meshes have materials and therefore affected by material variants
        if (object instanceof Mesh && object.userData.gltfExtensions) {
          const castedChild = object as Mesh;
          const childMeshMetadata =
            castedChild.userData as Object3DMaterialVariantsExtension;

          const meshVariantDefinitions =
            childMeshMetadata.gltfExtensions?.KHR_materials_variants;

          // If the child mesh does not have the material variants extension, skip
          if (!meshVariantDefinitions) return;

          if (!castedChild.userData.originalMaterial) {
            castedChild.userData.originalMaterial = castedChild.material;
          }

          const mapping = meshVariantDefinitions.mappings.find(
            (mapping: { variants: any[] }) =>
              mapping.variants.includes(variantIndex),
          );

          if (mapping) {
            castedChild.material = (await parser.getDependency(
              "material",
              mapping.material,
            )) as Material;
            parser.assignFinalMaterial(castedChild);
            onVariantChange?.(variantName);
          } else {
            castedChild.material = castedChild.userData
              .originalMaterial as Material;
          }
        }
      });
    },
    [gltMaterialVariants],
  );

  return {
    variants: gltMaterialVariants?.variants,
    extension: gltMaterialVariants?.extension,
    selectVariant,
  };
}
